import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';

import { Box, CircularProgress, Grid, Modal, Stack } from '@mui/material';

import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import {
  useCheckSBPQueryMutation,
  useCreateOrderMutation,
  useGetSBPQueryMutation,
  usePayOrderMutation,
} from 'store/api/orderApi';
import { useCreateOrderProfileMutation, useGetOrderProfilesListQuery } from 'store/api/orderProfileApi';
import { useApplyPromoCodeMutation } from 'store/api/promoCodeApi';
import {
  removeProduct,
  selectBasketProducts,
  selectedProductCount,
  selectedProductDiscount,
  selectedProductSum,
} from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { CartEmpty } from 'components/Cart/Empty/Empty';
import { BuyCheeseCoinsModal } from 'components/Cheesecoins/BuyModal/BuyModal';
import { useAppNavigation } from 'components/Navigation';
import { OrderCard } from 'components/Order/Card/Card';
import { DeliveryFields, OrderForm, OrderFormType, PersonalFields } from 'components/Order/Form/Form';
import { InfoModal } from 'components/UI/InfoModal/InfoModal';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { PayInvoiceDto, PayServerInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { UserAgent } from 'types/dto/order/SBP.dto';
import { CreateOrderDto } from 'types/dto/order/create.dto';
import { CreateOrderProfileDto } from 'types/dto/order/createOrderProfile.dto';
import { OrderProductDto } from 'types/dto/order/product.dto';
import { InvoiceStatus } from 'types/entities/IInvoice';
import type { IOrder } from 'types/entities/IOrder';
import { IProduct } from 'types/entities/IProduct';
import { IPromoCode } from 'types/entities/IPromoCode';
import { NotificationType } from 'types/entities/Notification';

import { minCostForFreeDelivery, noExistingId } from 'constants/default';
import { Path } from 'constants/routes';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { getPriceByGrams } from 'utils/currencyUtil';
import { getErrorMessage } from 'utils/errorUtil';
import { filterOrderProductsByCategories, getOrderDiscountValue } from 'utils/orderUtil';

import translation from './Order.i18n.json';

import sx from './Order.styles';
import { selectIsAuth } from '../../store/selectors/auth';

const defaultPersonalFields = {
  firstName: '',
  lastName: '',
  phone: '',
  email: '',
};

const defaultProfileOption = {
  label: 'Новый профиль доставки',
  value: noExistingId,
};

const defaultDeliveryFields: DeliveryFields = {
  deliveryProfileId: noExistingId,
  cityId: noExistingId,
  street: '',
  house: '',
  apartment: '',
  entrance: '',
  floor: '',
  comment: '',
  paymentMethod: 'SBP',
};

type BuyCoinsState = { isOpen: false } | { isOpen: true; price: number; orderData: OrderFormType };

type OrderStatusModal =
  | {
      status: 'success';
      orderId: number|string;
    }
  | {
      status: 'failure';
    }
  | null;

export function Order() {
  const { goToOrders, goToHome, language, goToFailurePayment } = useAppNavigation();

  const { t } = useLocalTranslation(translation);

  const dispatch = useAppDispatch();

  const [fetchPayOrder, { isLoading: isPayOrderLoading, isSuccess: isPaySuccess, data: payData }] =
    usePayOrderMutation();
  const [fetchCreateOrderProfile, { isLoading: isCreatingProfile }] = useCreateOrderProfileMutation();
  const [fetchSBPQuery, { isLoading: isGettingSBPQuery }] = useGetSBPQueryMutation();
  const [fetchCheckSBPQuery, { isLoading: isGettingCheckSBPQuery }] = useCheckSBPQueryMutation();
  const [fetchCreateOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const [applyPromoCode, { isLoading: isPromoCodeApplies }] = useApplyPromoCodeMutation();

  const [isSubmitError, setIsSubmitError] = useState(false);
  const payFormRef = useRef<HTMLFormElement>(null);

  const [payCoinsState, setPayCoinsState] = useState<BuyCoinsState>({
    isOpen: false,
  });

  const [personalFields, setPersonalFields] = useState<PersonalFields>(defaultPersonalFields);

  const [deliveryFields, setDeliveryFields] = useState<DeliveryFields>(defaultDeliveryFields);

  const [promoCode, setPromoCode] = useState<IPromoCode | null>(null);

  const [referralCodeDiscountValue, setReferralCodeDiscountValue] = useState(0);
  const [promoCodeDiscountValue, setPromoCodeDiscountValue] = useState(0);

  const isAuth = useAppSelector(selectIsAuth);
  const { data: currentUser } = useGetCurrentUserQuery(undefined,{skip: !isAuth});
  const { data: deliveryProfiles = [] } = useGetOrderProfilesListQuery();
  const { data: cities = [] } = useGetCityListQuery();

  const [formDeliveryCityId, setFormDeliveryCityId] = useState<number | null>(null);

  const [openModal, setOpenModal] = useState(false);
  const [qrImage, setQrImage] = useState('');
  const [SBPCheckData, setSBPCheckData] = useState({ transactionId: 0, email: '' });
  const userAgent =
    /Mobile|iP(hone|od|ad)|Android|BlackBerry|IEMobile|Kindle|NetFront|Silk-Accelerated|(hpw|web)OS|Fennec|Minimo|Opera M(obi|ini)|Blazer|Dolfin|Dolphin|Skyfire|Zune/i.test(
      navigator.userAgent,
    )
      ? UserAgent.MOBILE
      : UserAgent.DESKTOP;

  const [SBPFetching, setSBPFetching] = useState(false);

  const handleCloseModal = () => {
    setOpenModal(false);
    setQrImage('');
  };

  const formattedCities = useMemo(
    () =>
      cities.map(city => ({
        value: city.id,
        label: city.name[language],
      })) || [],
    [cities, language],
  );

  const [orderStatusModal, toggleOrderStatusModal] = useState<OrderStatusModal>(null);

  const productsInOrder = useAppSelector(selectBasketProducts);
  const [isCash, changeIsCash] = useState(false);

  const totalProductsSum = useAppSelector((state) => selectedProductSum(state,currentUser,isCash));
  const sumDiscount = useAppSelector((state) => selectedProductDiscount(state,currentUser,isCash));

  const totalDeliveryCost = useMemo(() => {
    if (totalProductsSum >= minCostForFreeDelivery) return 0;
    if (formDeliveryCityId) {
      const cityForDelivery = cities.find(city => city.id === formDeliveryCityId);
      if (cityForDelivery) {
        return cityForDelivery.deliveryCost;
      }
    }
    return currentUser?.city.deliveryCost || 0;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser, totalProductsSum, formDeliveryCityId, isCash]);

  useEffect(() => {
    if (isPaySuccess) {
      payFormRef.current?.submit();
    }
  }, [isPaySuccess]);

  const addPromoCode = async (key: string) => {
    try {
      const code = await applyPromoCode({ key }).unwrap();

      const promoCodeOrderProducts = filterOrderProductsByCategories(productsInOrder, code.categories);

      const isUseful = !!promoCodeOrderProducts.length;

      if (isUseful) {
        const codeDiscountValue = getOrderDiscountValue(code.discount, promoCodeOrderProducts);

        setPromoCode(code);
        setPromoCodeDiscountValue(codeDiscountValue);

        dispatchNotification('Промокод успешно применён', { type: NotificationType.SUCCESS });
      } else {
        dispatchNotification('Промокод не подходит к товарам из заказа', { type: NotificationType.WARNING });
      }
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const deleteProductFromOrder = (product: IProduct, gram: number) => dispatch(removeProduct({ product, gram }));


  const handlePayOrder = async (orderData: OrderFormType) => {
    const {
      firstName,
      lastName,
      phone,
      email,
      cityId,
      street,
      house,
      apartment,
      entrance,
      floor,
      comment,
      deliveryProfileId,
      paymentMethod
    } = orderData;

    let currentDeliveryProfileId = deliveryProfileId;

    if (currentDeliveryProfileId === noExistingId) {
      const deliveryProfileData: CreateOrderProfileDto = {
        title: `${street}, ${house}`,
        cityId,
        street,
        house,
        apartment,
        entrance,
        floor,
      };

      const newDeliveryProfile = await fetchCreateOrderProfile(deliveryProfileData).unwrap();

      currentDeliveryProfileId = newDeliveryProfile.id;
    }

    const orderProducts: OrderProductDto[] = productsInOrder.map(product => ({
      productId: product.product.id,
      amount: product.amount,
      gram: product.gram,
    }));

    const formattedOrderData: CreateOrderDto = {
      firstName,
      lastName,
      phone,
      email,
      comment,
      promoCodeId: promoCode?.id,
      deliveryProfileId: currentDeliveryProfileId,
      orderProducts,
      paymentMethod
    };

    return fetchCreateOrder(formattedOrderData).unwrap();
  };

  const handleCreateOrder = async (orderData: OrderFormType) => {
    const price = promoCodeDiscountValue
        ? totalProductsSum + totalDeliveryCost - promoCodeDiscountValue
        : totalProductsSum + totalDeliveryCost - referralCodeDiscountValue;

    setPayCoinsState(orderData.paymentMethod === 'cash' ? {isOpen: false} : {
      isOpen: true,
      orderData,
      price,
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ym(92190821,'reachGoal','completed-order');

    if (orderData.paymentMethod === 'cash') {
      try {
        const payOrderDto = (await handlePayOrder(orderData)) as IOrder;
        productsInOrder.forEach(product => deleteProductFromOrder(product.product, product.gram));
        toggleOrderStatusModal({ status: 'success',orderId: payOrderDto.leadId });
      } catch {
        setPayCoinsState({ isOpen: false });
        setIsSubmitError(true);
        toggleOrderStatusModal({ status: 'failure' });
      }
    }
  };

  const handleClickSBPButton = async (orderData: OrderFormType) => {
    setOpenModal(true);
    const amount = promoCodeDiscountValue
      ? totalProductsSum + totalDeliveryCost - promoCodeDiscountValue
      : totalProductsSum + totalDeliveryCost - referralCodeDiscountValue;
    const sbpCurrency = 'RUB';
    const payOrderDto = (await handlePayOrder(orderData)) as any;
    const userFullName = [currentUser?.firstName, currentUser?.lastName].join(' ');

    const SBPData = {
      userAgent,
      ipAddress: '5.18.144.32',
      currency: sbpCurrency,
      amount,
      description: '',
      invoiceUuid: payOrderDto.invoiceUuid,
      payerUuid: payOrderDto.client.id,
      email: payOrderDto.email,
      fullName: userFullName,
      code: currentUser?.referralCode?.code || '',
    };

    const SBPResponse = await fetchSBPQuery(SBPData).unwrap();

    if (SBPResponse.Model.QrImage) {
      setQrImage(SBPResponse.Model.QrImage);
    }

    setSBPCheckData({
      transactionId: SBPResponse.Model.TransactionId,
      email: payOrderDto.email,
    });
  };

  const redirectToSBPLink = async (orderData: OrderFormType) => {
    const isIphoneSafari = /^(?=.*(?:iP(hone|ad|od)))^(?=.*(?:Version))^(?=.*(?:Safari))/gim.test(navigator.userAgent);
    let windowRef;
    if (isIphoneSafari) {
      windowRef = window.open('about:blank', '_blank');
    }
    setOpenModal(true);
    setSBPFetching(true);
    const amount = promoCodeDiscountValue
      ? totalProductsSum + totalDeliveryCost - promoCodeDiscountValue
      : totalProductsSum + totalDeliveryCost - referralCodeDiscountValue;
    const sbpCurrency = 'RUB';
    const payOrderDto = (await handlePayOrder(orderData)) as any;
    const userFullName = [currentUser?.firstName, currentUser?.lastName].join(' ');

    const SBPData = {
      userAgent: UserAgent.MOBILE,
      ipAddress: '5.18.144.32',
      currency: sbpCurrency,
      amount,
      description: '',
      invoiceUuid: payOrderDto.invoiceUuid,
      payerUuid: payOrderDto.client.id,
      email: payOrderDto.email,
      fullName: userFullName,
      code: currentUser?.referralCode?.code || '',
    };

    const SBPResponse = await fetchSBPQuery(SBPData).unwrap();

    setSBPCheckData({
      transactionId: SBPResponse.Model.TransactionId,
      email: payOrderDto.email,
    });

    if (isIphoneSafari && windowRef) {
      windowRef.location = SBPResponse.Model.QrUrl;
    } else {
      window.open(SBPResponse.Model.QrUrl, '_blank');
    }

    setSBPFetching(false);
    const timer = 1000 * 60 * 15;
    setTimeout(() => setOpenModal(false), timer);
  };

  useEffect(() => {
    let intervalId: any;

    const intervalCalling = async () => {
      const SBPCheckResponse = await fetchCheckSBPQuery(SBPCheckData).unwrap();

      if (SBPCheckResponse.status === 'Completed' || SBPCheckResponse.status === 'Declined') {
        if (SBPCheckResponse.status === 'Completed') {
          dispatchNotification('Оплата прошла успешно', { type: NotificationType.SUCCESS });
          productsInOrder.forEach(product => deleteProductFromOrder(product.product, product.gram));
          setOpenModal(false);
        } else {
          dispatchNotification('Оплата не прошла', { type: NotificationType.DANGER });
        }
        clearInterval(intervalId);
      }
    };

    const delay = 4 * 1000;
    if (openModal && SBPCheckData.transactionId) {
      intervalId = setInterval(intervalCalling, delay);
    }
    if (!openModal && SBPCheckData.transactionId) {
      clearInterval(intervalId);
    }
    return () => {
      clearInterval(intervalId);
    };
  }, [openModal, SBPCheckData]);

  const handleBuyCheeseCoins = async (buyData: PayInvoiceDto) => {
    if (!payCoinsState.isOpen) return;

    try {
      let invoiceUuid: string;
      try {
        const payOrderDto = (await handlePayOrder(payCoinsState.orderData)) as IOrder;
        invoiceUuid = payOrderDto.invoiceUuid;
      } catch {
        setPayCoinsState({ isOpen: false });
        setIsSubmitError(true);
        toggleOrderStatusModal({ status: 'failure' });
        return;
      }

      const result = await fetchPayOrder({ ...buyData, invoiceUuid }).unwrap();
      productsInOrder.forEach(product => deleteProductFromOrder(product.product, product.gram));
    } catch (e) {
      const mayBeError = getErrorMessage(e);
      if (mayBeError) {
        dispatchNotification(mayBeError, { type: NotificationType.DANGER });
        setIsSubmitError(true);
      } else {
        goToFailurePayment();
      }
    }
  };

  const handleCloseBuyModal = () => {
    setPayCoinsState({ isOpen: false });
  };

  const onCloseOrderStatusModal = () => {
    if (orderStatusModal?.status === 'success') goToOrders();
    else toggleOrderStatusModal(null);
  };

  const selectDeliveryProfile = (deliveryProfileId: number) => {
    const currentProfile = deliveryProfiles.find(profile => profile.id === deliveryProfileId);

    if (currentProfile) {
      setDeliveryFields({
        deliveryProfileId,
        cityId: currentProfile.city.id,
        street: currentProfile.street,
        house: currentProfile.house,
        apartment: currentProfile.apartment,
        entrance: currentProfile.entrance,
        floor: currentProfile.floor,
      });
    } else {
      setDeliveryFields(defaultDeliveryFields);
    }
  };

  useEffect(() => {
    if (!currentUser) return;

    const { firstName, lastName, phone, email, mainOrderProfileId, referralCode } = currentUser;

    setPersonalFields(fields => ({
      ...fields,
      firstName,
      lastName,
      phone,
      email,
    }));

    if (mainOrderProfileId) selectDeliveryProfile(mainOrderProfileId);

    if (referralCode) {
      const codeDiscountValue = productsInOrder.reduce((acc, { product, gram, amount }) => {
        const discount = product.totalCost * (currentUser.referralCode.discount / 100);
        const discountByGram = getPriceByGrams(discount, gram);

        return acc + discountByGram * amount;
      }, 0);

      setReferralCodeDiscountValue(codeDiscountValue);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const formattedDeliveryProfiles = useMemo(
    () => [
      defaultProfileOption,
      ...deliveryProfiles.map(profile => ({
        value: profile.id,
        label: profile.title,
      })),
    ],
    [deliveryProfiles],
  );

  const changePaymentMethodHandle = (value: any) => {
    changeIsCash(value === 'cash');
  }

  const infoModalContent = useMemo(() => {
    if (!orderStatusModal)
      return {
        title: '',
        content: Fragment,
      };

    if (orderStatusModal.status === 'success') {
      return {
        title: `Заказ №${orderStatusModal.orderId} успешно оформлен`,
        content: (
          <Typography color='text.secondary' sx={sx.infoModalContent} variant='body1'>
            Вы можете отслеживать статус заказа в&nbsp;разделе{' '}
            <Link href={`/${Path.PERSONAL_AREA}/${Path.ORDERS}`}>
              <Typography color='accent.main' variant='caption' sx={sx.infoModalLink}>
                Заказы
              </Typography>
            </Link>{' '}
            в&nbsp;личном кабинете.
          </Typography>
        ),
      };
    }

    return {
      title: 'Не получилось оформить заказ',
      content: (
        <Typography color='text.secondary' sx={sx.infoModalContent} variant='body1'>
          При оформлении заказа возникла ошибка.&#10;&#13;Пожалуйста, попробуйте ещё раз.
        </Typography>
      ),
    };
  }, [orderStatusModal]);

  return (
    <PrivateLayout>
      <ShopLayout>
        <Typography variant='h4' sx={sx.title}>
          {t('title')}
        </Typography>

        {productsInOrder.length === 0 ? (
          <Stack alignItems='center'>
            <CartEmpty title={t('emptyBasket')} actionText={t('toHome')} onClick={goToHome}>
              <Typography variant='body1'>{t('emptyBasketText')}</Typography>
            </CartEmpty>
          </Stack>
        ) : (
          <Grid container sx={sx.order} spacing={2}>
            <Grid item md={8} xs={12}>
              <OrderForm
                defaultPersonalFields={personalFields}
                defaultDeliveryFields={deliveryFields}
                cities={formattedCities}
                isFetching={isCreatingProfile || isCreatingOrder}
                isSBPFetching={SBPFetching}
                isPromoCodeApplies={isPromoCodeApplies}
                isSubmitError={isSubmitError}
                deliveryProfiles={formattedDeliveryProfiles}
                onAddPromoCode={addPromoCode}
                onSelectDeliveryProfile={selectDeliveryProfile}
                onChangePaymentMethod={changePaymentMethodHandle}
                onSubmit={handleCreateOrder}
                onChangeDeliveryCity={setFormDeliveryCityId}
                handleClickSBPButton={userAgent === UserAgent.MOBILE ? redirectToSBPLink : handleClickSBPButton}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <OrderCard
                isByCash={isCash}
                products={productsInOrder}
                cost={totalProductsSum}
                promotionsDiscount={sumDiscount}
                referralCodeDiscount={referralCodeDiscountValue}
                promoCodeDiscount={promoCodeDiscountValue}
                delivery={totalDeliveryCost}
                language={language}
              />
            </Grid>
          </Grid>
        )}
        {userAgent === UserAgent.DESKTOP && (
          <Modal
            open={openModal}
            onClose={handleCloseModal}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={sx.modal}>
              <Typography variant='h6' component='h2'>
                {t('modalTypo')}
              </Typography>
              {openModal && qrImage ? (
                <img alt='QR' src={`data:image/svg+xml+png;base64,${qrImage}`} />
              ) : (
                <CircularProgress sx={sx.SBPSpinner} size={120} />
              )}
            </Box>
          </Modal>
        )}
        <InfoModal
          isOpen={!!orderStatusModal?.status}
          status={orderStatusModal?.status}
          title={infoModalContent.title}
          content={infoModalContent.content}
          onClose={onCloseOrderStatusModal}
        />

        <BuyCheeseCoinsModal
          isOpened={payCoinsState.isOpen}
          invoiceUuid='invoiceData?.uuid'
          userId={currentUser?.id}
          userEmail={currentUser?.email}
          fullName={[currentUser?.firstName, currentUser?.lastName].join(' ')}
          code={currentUser?.referralCode?.code || ''}
          price={payCoinsState.isOpen ? payCoinsState.price : undefined}
          isLoading={isPayOrderLoading}
          onClose={handleCloseBuyModal}
          onSubmit={handleBuyCheeseCoins}
        />

        <form hidden ref={payFormRef} action={payData?.acsUrl} method='POST'>
          <input name='MD' value={payData?.MD} />
          <input name='PaReq' value={payData?.PaReq} />
          <input name='TermUrl' value={payData?.TermUrl} />
        </form>
      </ShopLayout>
    </PrivateLayout>
  );
}

export default Order;
