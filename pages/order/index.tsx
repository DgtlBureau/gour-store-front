import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, Stack } from '@mui/material';

import translation from './Order.i18n.json';
import { useLocalTranslation, LocalConfig } from 'hooks/useLocalTranslation';
import { selectedProductCount, selectedProductSum, selectProductsInOrder } from '../../store/slices/orderSlice';
import { useCreateOrderMutation } from '../../store/api/orderApi';
import { useCreateOrderProfileMutation, useGetOrderProfilesListQuery } from '../../store/api/orderProfileApi';
import { useGetCityListQuery } from '../../store/api/cityApi';
import { removeProduct } from 'store/slices/orderSlice';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { DeliveryFields, OrderForm, OrderFormType, PersonalFields } from '../../components/Order/Form/Form';
import { Typography } from '../../components/UI/Typography/Typography';
import { OrderCard } from 'components/Order/Card/Card';
import { CartEmpty } from '../../components/Cart/Empty/Empty';
import { CreateOrderDto } from '../../@types/dto/order/create.dto';
import { CreateOrderProfileDto } from '../../@types/dto/order/createOrderProfile.dto';
import { OrderProductDto } from '../../@types/dto/order/product.dto';
import { IProduct } from '../../@types/entities/IProduct';
import { Path } from '../../constants/routes';
import { PrivateLayout } from 'layouts/Private/Private';
import { eventBus, EventTypes } from 'packages/EventBus';
import { NotificationType } from '../../@types/entities/Notification';
import { useGetCurrentUserQuery } from 'store/api/currentUserApi';

const sx = {
  title: {
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: 'text.secondary',
    marginBottom: '16px',
  },
  order: {
    flexDirection: {
      xs: 'column-reverse',
      md: 'row',
    },
  },
};

const DELIVERY_PRICE = 500;

export function Order() {
  const router = useRouter();

  const { t } = useLocalTranslation(translation);

  const dispatch = useDispatch();

  const [fetchCreateOrderProfile] = useCreateOrderProfileMutation();
  const [fetchCreateOrder] = useCreateOrderMutation();

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';

  const currency = 'cheeseCoin';

  const [isSubmitError, setIsSubmitError] = useState(false);

  const [personalFields, setPersonalFields] = useState<PersonalFields>({
    firstName: '',
    lastName: '',
    phone: '',
    email: '',
  });

  const [deliveryFields, setDeliveryFields] = useState<DeliveryFields>({
    deliveryProfileId: 0,
    cityId: 0,
    street: '',
    house: '',
    apartment: '',
    entrance: '',
    floor: '',
    comment: '',
  });

  const { data: currentUser } = useGetCurrentUserQuery();
  const { data: deliveryProfiles = [] } = useGetOrderProfilesListQuery();
  const { data: citiesList = [] } = useGetCityListQuery();

  const productsInOrder = useSelector(selectProductsInOrder);
  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);
  const sumDiscount = productsInOrder.reduce((acc, currentProduct) => {
    return acc + (currentProduct.product.price[currency] * currentProduct.product.discount) / 100;
  }, 0);

  const goToMain = () => router.push('/');
  const goToOrders = () => router.push(`/${Path.PERSONAL_AREA}/${Path.ORDERS}`);

  const deleteProductFromOrder = (product: IProduct) => dispatch(removeProduct(product));

  const submit = async (orderData: OrderFormType) => {
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

      if (currentDeliveryProfileId === 0) {
        const deliveryProfileData: CreateOrderProfileDto = {
          title: `${street}, ${house}`,
          cityId,
          street,
          house,
          apartment,
          entrance,
          floor,
        };

        const currentDeliveryProfile = await fetchCreateOrderProfile(deliveryProfileData).unwrap();

        currentDeliveryProfileId = currentDeliveryProfile.id;
      }

      const orderProducts: OrderProductDto[] = productsInOrder.map(product => ({
        productId: product.product.id,
        amount: product.amount,
        weight: product.weight,
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

      await fetchCreateOrder(formattedOrderData).unwrap();
      eventBus.emit(EventTypes.notification, {
        message: 'Заказ оформлен',
        type: NotificationType.SUCCESS,
      });

      productsInOrder.forEach(product => deleteProductFromOrder(product.product));

      goToOrders();
    } catch (error) {
      console.error(error);
      eventBus.emit(EventTypes.notification, {
        message: 'Ошибка оформления заказа',
        type: NotificationType.DANGER,
      });

      setIsSubmitError(true);
    }
  };

  const onChangeDeliveryProfile = (deliveryProfileId: number) => {
    const currentProfile = deliveryProfiles.find(profile => profile.id === deliveryProfileId);

    if (!currentProfile) return;

    setDeliveryFields({
      deliveryProfileId,
      cityId: currentProfile.city.id,
      street: currentProfile.street,
      house: currentProfile.house,
      apartment: currentProfile.apartment,
      entrance: currentProfile.entrance,
      floor: currentProfile.floor,
    });
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

    if (mainOrderProfileId && mainOrderProfileId !== 0)
      setDeliveryFields({ ...deliveryFields, deliveryProfileId: mainOrderProfileId });
  }, [currentUser]);

  const formattedDeliveryProfiles = deliveryProfiles.map(profile => ({
    label: profile.title,
    value: profile.id,
  }));

  const formattedCitiesList = citiesList.map(city => ({
    value: city.id,
    label: city.name[language],
  }));

  //TODO: вынести на бек
  const delivery = sum > 2990 ? 0 : DELIVERY_PRICE;

  return (
    <PrivateLayout>
      <ShopLayout language={language} currency={currency}>
        <Typography variant="h4" sx={sx.title}>
          {t('title')}
        </Typography>

        {productsInOrder.length === 0 ? (
          <Stack alignItems="center">
            <CartEmpty
              title={t('emptyBasket')}
              btn={{
                label: t('toHome'),
                onClick: goToMain,
              }}
            >
              <Typography variant="body1">{t('emptyBasketText')}</Typography>
            </CartEmpty>
          </Stack>
        ) : (
          <>
            <Grid container sx={sx.order} spacing={2}>
              <Grid item md={8} xs={12}>
                <OrderForm
                  defaultPersonalFields={personalFields}
                  defaultDeliveryFields={deliveryFields}
                  citiesList={formattedCitiesList}
                  isSubmitError={isSubmitError}
                  discount={sumDiscount}
                  productsCount={count}
                  cost={sum}
                  delivery={delivery}
                  deliveryProfiles={formattedDeliveryProfiles}
                  onChangeDeliveryProfile={onChangeDeliveryProfile}
                  onSubmit={submit}
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
          </>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}

export default Order;
