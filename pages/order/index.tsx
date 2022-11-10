import React, { Fragment, useEffect, useMemo, useState } from 'react';

import { Grid, Stack } from '@mui/material';

import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';
import { useCreateOrderMutation } from 'store/api/orderApi';
import { useCreateOrderProfileMutation, useGetOrderProfilesListQuery } from 'store/api/orderProfileApi';
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
import { useAppNavigation } from 'components/Navigation';
import { OrderCard } from 'components/Order/Card/Card';
import { DeliveryFields, OrderForm, OrderFormType, PersonalFields } from 'components/Order/Form/Form';
import { InfoModal } from 'components/UI/InfoModal/InfoModal';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { CreateOrderDto } from 'types/dto/order/create.dto';
import { CreateOrderProfileDto } from 'types/dto/order/createOrderProfile.dto';
import { OrderProductDto } from 'types/dto/order/product.dto';
import { IProduct } from 'types/entities/IProduct';

import { noExistingId } from 'constants/default';
import { Path } from 'constants/routes';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';

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
  const { goToOrders, goToHome, language, currency } = useAppNavigation();

  const { t } = useLocalTranslation(translation);

  const dispatch = useAppDispatch();

  const [fetchCreateOrderProfile, { isLoading: isCreatingProfile }] = useCreateOrderProfileMutation();
  const [fetchCreateOrder, { isLoading: isCreatingOrder }] = useCreateOrderMutation();

  const [isSubmitError, setIsSubmitError] = useState(false);

  const [personalFields, setPersonalFields] = useState<PersonalFields>(defaultPersonalFields);

  const [deliveryFields, setDeliveryFields] = useState<DeliveryFields>(defaultDeliveryFields);

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
  const sum = useAppSelector(selectedProductSum);
  const sumDiscount = useAppSelector(selectedProductDiscount);

  const deleteProductFromOrder = (product: IProduct, gram: number) => dispatch(removeProduct({ product, gram }));

  const createOrder = async (orderData: OrderFormType) => {
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

    try {
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
        deliveryProfileId: currentDeliveryProfileId,
        orderProducts,
      };

      const { id: orderId } = await fetchCreateOrder(formattedOrderData).unwrap();

      toggleOrderStatusModal({ status: 'success', orderId });

      productsInOrder.forEach(product => deleteProductFromOrder(product.product, product.gram));
    } catch {
      toggleOrderStatusModal({ status: 'failure' });

      setIsSubmitError(true);
    }
  };

  const onCloseOrderStatusModal = () => {
    if (orderStatusModal?.status === 'success') goToOrders();
    else toggleOrderStatusModal(null);
  };

  const selectDeliveryProfile = (deliveryProfileId: number) => {
    let deliveryFieldsData: DeliveryFields = defaultDeliveryFields;

    if (deliveryProfileId !== noExistingId) {
      const currentProfile = deliveryProfiles.find(profile => profile.id === deliveryProfileId);

      if (currentProfile)
        deliveryFieldsData = {
          deliveryProfileId,
          cityId: currentProfile.city.id,
          street: currentProfile.street,
          house: currentProfile.house,
          apartment: currentProfile.apartment,
          entrance: currentProfile.entrance,
          floor: currentProfile.floor,
        };
    }

    setDeliveryFields(deliveryFieldsData);
  };

  useEffect(() => {
    if (!currentUser) return;

    const { firstName, lastName, phone, email, mainOrderProfileId } = currentUser;

    setPersonalFields({
      ...personalFields,
      firstName,
      lastName,
      phone,
      email,
    });

    if (mainOrderProfileId && mainOrderProfileId !== noExistingId)
      setDeliveryFields({ ...deliveryFields, deliveryProfileId: mainOrderProfileId });
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
  const delivery = sum > 2990 ? 0 : DELIVERY_PRICE;

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
                isSubmitError={isSubmitError}
                discount={sumDiscount}
                productsCount={count}
                cost={sum}
                delivery={delivery}
                deliveryProfiles={formattedDeliveryProfiles}
                onSelectDeliveryProfile={selectDeliveryProfile}
                onSubmit={createOrder}
              />
            </Grid>

            <Grid item md={4} xs={12}>
              <OrderCard
                totalCartPrice={sum}
                currency={currency}
                language={language}
                totalProductCount={count}
                productsList={productsInOrder}
              />
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
      </ShopLayout>
    </PrivateLayout>
  );
}

export default Order;
