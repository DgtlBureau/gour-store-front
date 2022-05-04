import React, { useState } from 'react';
import { ShopLayout } from '../../layouts/ShopLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectedProductCount,
  selectedProductSum,
  selectedProductWeight,
  selectProductsInOrder,
} from '../../store/slices/orderSlice';
import { OrderFields, OrderForm } from '../../components/Order/Form';
import { Typography } from '../../components/UI/Typography/Typography';
import { Grid, Stack } from '@mui/material';
import { OrderCard } from 'components/Order/Card';
import { Button } from '../../components/UI/Button/Button';
import { useRouter } from 'next/router';
import { CartEmpty } from '../../components/Cart/Empty/Empty';
import { useCreateOrderMutation } from 'store/api/orderApi';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import translation from './Order.i18n.json';

export type basketProps = {};

const DELIVERY_PRICE = 500;

export function Order({}: basketProps) {
  const router = useRouter();
  const { t } = useLocalTranslation(translation);
  const productsInOrder = useSelector(selectProductsInOrder);
  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);

  const currency = 'rub';

  const [discount, setDiscount] = useState(0);
  const [isSubmitError, setIsSubmitError] = useState(false);

  const [fetchCreateOrder] = useCreateOrderMutation();

  const handleSubmitForm = async (FormData: OrderFields) => {
    try {
      await fetchCreateOrder(FormData).unwrap();
      router.push('/');
    } catch (error) {
      console.log(error);
      setIsSubmitError(true);
    }
  };

  const delivery = sum > 2990 ? 0 : DELIVERY_PRICE;
  const discountSum = sum * (discount / 100);

  if (productsInOrder.length === 0)
    return (
      <ShopLayout>
        <Stack alignItems="center">
          <CartEmpty
            title={'Корзина пуста'}
            btn={{
              label: 'На главную',
              onClick: () => {
                router.push('/');
              },
            }}
          >
            <Typography variant="body1">
              Ваша корзина пуста. Чтобы оформить заказ добавьте товары в
              корзину.
            </Typography>
          </CartEmpty>
        </Stack>
      </ShopLayout>
    );

  return (
    <ShopLayout>
      <Stack>
        <Button
          sx={{ width: '250px', margin: '0 0 30px 0' }}
          variant="contained"
          onClick={() => router.push('/')}
        >
          На главную
        </Button>
        <Typography variant="h4">{t('title')}</Typography>
        <Grid container spacing={2}>
          <Grid item md={8} xs={12}>
            <OrderForm
              order={{
                firstName: '',
                lastName: '',
                phone: '',
                email: '',
                deliveryProfile: '',
                city: '',
                street: '',
                house: '',
                apartment: '',
                entrance: '',
                floor: '',
                comment: '',
                promo: '',
              }}
              discount={discountSum}
              productsCount={count}
              cost={sum}
              delivery={delivery}
              deliveryProfiles={[]}
              onSubmit={handleSubmitForm}
              isSubmitError={isSubmitError}
              onPromo={(code: string) => {
                if (code === '12345') {
                  setDiscount(10);
                  return 'Промокод активирован!';
                }
                return 'Промокод не существует или недействителен!';
              }}
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
