import React, { Fragment, useEffect, useMemo, useState } from 'react';

import { Grid, Stack } from '@mui/material';

import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useCreateOrderMutation, usePayOrderMutation } from 'store/api/orderApi';
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

import { PayInvoiceDto } from 'types/dto/invoice/payInvoice.dto';
import { CreateOrderDto } from 'types/dto/order/create.dto';
import { CreateOrderProfileDto } from 'types/dto/order/createOrderProfile.dto';
import { OrderProductDto } from 'types/dto/order/product.dto';
import { InvoiceStatus } from 'types/entities/IInvoice';
import type { IOrder } from 'types/entities/IOrder';
import { IProduct } from 'types/entities/IProduct';
import { IPromoCode } from 'types/entities/IPromoCode';
import { NotificationType } from 'types/entities/Notification';

import { noExistingId } from 'constants/default';
import { Path } from 'constants/routes';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { getPriceByGrams } from 'utils/currencyUtil';
import { getErrorMessage } from 'utils/errorUtil';
import { filterOrderProductsByCategories, getOrderDiscountValue } from 'utils/orderUtil';

import translation from './Order.i18n.json';

import sx from './Order.styles';

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
};

type BuyCoinsState = { isOpen: false } | { isOpen: true; price: number; orderData: OrderFormType };

type OrderStatusModal =
  | {
      status: 'success';
      orderId: number;
    }
  | {
      status: 'failure';
    }
  | null;

const DELIVERY_PRICE = 500;

export function Order() {
  const { goToOrders, goToHome, language, currency, goToSuccessPayment, goToFailurePayment } = useAppNavigation();

  const { t } = useLocalTranslation(translation);

  const dispatch = useAppDispatch();

  const [fetchPayOrder, { isLoading: isPayOrderLoading }] = usePayOrderMutation();
  const [fetchCreateOrderProfile, { isLoading: isCreatingProfile }] = useCreateOrderProfileMutation();
  const [fetchCreateOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();
  const [applyPromoCode, { isLoading: isPromoCodeApplies }] = useApplyPromoCodeMutation();

  const [isSubmitError, setIsSubmitError] = useState(false);

  const [payCoinsState, setPayCoinsState] = useState<BuyCoinsState>({
    isOpen: false,
  });

  const [personalFields, setPersonalFields] = useState<PersonalFields>(defaultPersonalFields);

  const [deliveryFields, setDeliveryFields] = useState<DeliveryFields>(defaultDeliveryFields);

  const [promoCode, setPromoCode] = useState<IPromoCode | null>(null);

  const [referralCodeDiscountValue, setReferralCodeDiscountValue] = useState(0);
  const [promoCodeDiscountValue, setPromoCodeDiscountValue] = useState(0);

  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: deliveryProfiles = [] } = useGetOrderProfilesListQuery();
  const { cities } = useGetCityListQuery(undefined, {
    selectFromResult: ({ data, ...params }) => ({
      cities:
        data?.map(city => ({
          value: city.id,
          label: city.name[language],
        })) || [],
      ...params,
    }),
  });

  const [orderStatusModal, toggleOrderStatusModal] = useState<OrderStatusModal>(null);

  const productsInOrder = useAppSelector(selectBasketProducts);
  const count = useAppSelector(selectedProductCount);
  const totalProductsSum = useAppSelector(selectedProductSum);
  const sumDiscount = useAppSelector(selectedProductDiscount);

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

  const handleCreateOrder = (orderData: OrderFormType) => {
    setPayCoinsState({
      isOpen: true,
      orderData,
      price: totalProductsSum,
    });
  };

  const handlePayOrder = async (orderData: OrderFormType) => {
    if (!payCoinsState.isOpen) return;

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
    };

    return fetchCreateOrder(formattedOrderData).unwrap();

    // toggleOrderStatusModal({ status: 'success', orderId });

    // productsInOrder.forEach(product => deleteProductFromOrder(product.product, product.gram));
  };

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

      if (result.status === InvoiceStatus.PAID) goToSuccessPayment(buyData.price);
      if (result.status === InvoiceStatus.FAILED) goToFailurePayment();
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

  // TODO: вынести на бек
  const delivery = totalProductsSum > 2990 ? 0 : DELIVERY_PRICE;

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
                cities={cities}
                isFetching={isCreatingProfile || isCreatingOrder}
                isPromoCodeApplies={isPromoCodeApplies}
                isSubmitError={isSubmitError}
                productsCount={count}
                cost={totalProductsSum}
                delivery={delivery}
                deliveryProfiles={formattedDeliveryProfiles}
                promotionsDiscount={sumDiscount}
                referralCodeDiscount={referralCodeDiscountValue}
                promoCodeDiscount={promoCodeDiscountValue}
                onAddPromoCode={addPromoCode}
                onSelectDeliveryProfile={selectDeliveryProfile}
                onSubmit={handleCreateOrder}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <OrderCard currency={currency} language={language} products={productsInOrder} />
            </Grid>
          </Grid>
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
          price={payCoinsState.isOpen ? payCoinsState.price : undefined}
          isLoading={isPayOrderLoading}
          onClose={handleCloseBuyModal}
          onSubmit={handleBuyCheeseCoins}
        />
      </ShopLayout>
    </PrivateLayout>
  );
}

export default Order;
