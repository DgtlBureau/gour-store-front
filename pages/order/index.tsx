import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, Stack } from '@mui/material';

import translation from './Order.i18n.json';
import { useLocalTranslation, LocalConfig } from 'hooks/useLocalTranslation';
import { selectedProductCount, selectedProductSum, selectProductsInOrder } from '../../store/slices/orderSlice';
import { useCreateOrderMutation } from '../../store/api/orderApi';
import { useCreateOrderProfileMutation, useGetOrderProfilesListQuery } from '../../store/api/orderProfileApi';
import { useGetCityListQuery } from '../../store/api/cityApi';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { DeliveryFields, OrderForm, OrderFormType } from '../../components/Order/Form/Form';
import { Typography } from '../../components/UI/Typography/Typography';
import { OrderCard } from 'components/Order/Card/Card';
import { Button } from '../../components/UI/Button/Button';
import { CartEmpty } from '../../components/Cart/Empty/Empty';
import { CreateOrderDto } from '../../@types/dto/order/create.dto';
import { CreateOrderProfileDto } from '../../@types/dto/order/createOrderProfile.dto';
import { OrderProductDto } from '../../@types/dto/order/product.dto';

const DELIVERY_PRICE = 500;

export function Order() {
  const router = useRouter();

  const { t } = useLocalTranslation(translation);

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';

  const currency = 'cheeseCoin';

  const [isSubmitError, setIsSubmitError] = useState(false);
  const [fetchCreateOrderProfile] = useCreateOrderProfileMutation();
  const [deliveryFields, setDeliveryFields] = useState<DeliveryFields>({
    deliveryProfileId: 0,
    cityId: 0,
    street: '',
    house: '',
    apartment: '',
    entrance: '',
    floor: '',
  });
  const {
    data: deliveryProfiles = [],
    isLoading: isDeliveryProfilesLoading = false,
    isError: isDeliveryProfilesError = false,
  } = useGetOrderProfilesListQuery();
  const {
    data: citiesList = [],
    isLoading: isCitiesListLoading = false,
    isError: isCitiesListError = false,
  } = useGetCityListQuery();
  const productsInOrder = useSelector(selectProductsInOrder);
  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);
  const sumDiscount = productsInOrder.reduce((acc, currentProduct) => {
    return acc + (currentProduct.product.price[currency] * currentProduct.product.discount) / 100;
  }, 0);

  const [fetchCreateOrder] = useCreateOrderMutation();

  const handleSubmitForm = async (orderData: OrderFormType) => {
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
      if (currentDeliveryProfileId !== 0) {
        const deliveryProfileData: CreateOrderProfileDto = {
          title: `${street}, ${house}`,
          cityId,
          street,
          house,
          apartment,
          entrance,
          floor,
        };

        currentDeliveryProfileId = (await fetchCreateOrderProfile(deliveryProfileData).unwrap()).id;
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

      router.push('/');
    } catch (error) {
      console.log(error);
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

  if (productsInOrder.length === 0)
    return (
      <ShopLayout language={language} currency={currency}>
        <Stack alignItems="center">
          <CartEmpty
            title={t('emptyBasket')}
            btn={{
              label: t('toHome'),
              onClick: () => {
                router.push('/');
              },
            }}
          >
            <Typography variant="body1">{t('emptyBasketText')}</Typography>
          </CartEmpty>
        </Stack>
      </ShopLayout>
    );

  return (
    <ShopLayout language={language} currency={currency}>
      <Stack>
        <Button sx={{ width: '250px', margin: '0 0 30px 0' }} variant="contained" onClick={() => router.push('/')}>
          На главную
        </Button>
        <Typography variant="h4">{t('title')}</Typography>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <OrderForm
              defaultPersonalFields={{
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                comment: '',
              }}
              defaultDeliveryFields={deliveryFields}
              citiesList={formattedCitiesList}
              onChangeDeliveryProfile={onChangeDeliveryProfile}
              discount={sumDiscount}
              productsCount={count}
              cost={sum}
              delivery={delivery}
              deliveryProfiles={formattedDeliveryProfiles}
              onSubmit={handleSubmitForm}
              isSubmitError={isSubmitError}
            />
          </Grid>
          <Grid item md={4} xs={12}>
            <OrderCard
              totalCartPrice={sum}
              currency={currency}
              totalProductCount={count}
              productsList={productsInOrder}
            />
          </Grid>
        </Grid>
      </Stack>
    </ShopLayout>
  );
}

export default Order;
