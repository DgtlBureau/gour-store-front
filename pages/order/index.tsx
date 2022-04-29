import React from 'react';
import { ShopLayout } from '../../layouts/ShopLayout';
import { useDispatch, useSelector } from 'react-redux';
import {
  selectedProductCount,
  selectedProductSum,
  selectedProductWeight,
  selectProductsInOrder,
} from '../../store/slices/orderSlice';
import { OrderForm } from '../../components/Order/Form';
import { Typography } from '../../components/UI/Typography/Typography';
import { Grid, Stack } from '@mui/material';
import { OrderCard } from 'components/Order/Card';
import { Button } from '../../components/UI/Button/Button';
import { useRouter } from 'next/router';
import { InfoBlock } from '../../components/UI/InfoBlock/InfoBlock';

export type basketProps = {};

export function Order({}: basketProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const productsInOrder = useSelector(selectProductsInOrder);
  const count = useSelector(selectedProductCount);

  const weight = useSelector(selectedProductWeight);
  const sum = useSelector(selectedProductSum);

  return (
    <ShopLayout>
      <Stack>
        <Button
          sx={{ width: '250px' }}
          variant="contained"
          onClick={() => router.push('/')}
        >
          Назад
        </Button>
        <Typography variant="h4">Оформление заказа</Typography>
        <Grid container spacing={2}>
          <Grid item xs={8}>
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
              productsCount={count}
              cost={sum}
              delivery={500}
              deliveryProfiles={[]}
              onSubmit={() => {}}
              onPromo={(code: string) => {
                return code;
              }}
            />
          </Grid>
          <Grid item xs={4}>
            <OrderCard
              totalCartPrice={sum}
              currency="rub"
              totalProductCount={count}
              productsList={productsInOrder}
            />
            <InfoBlock
              sx={{ margin: '10px 0 0 0' }}
              text="Добавьте ещё товаров на 1330 ₽ для бесплатной доставки по Москве и Санкт-Петербургу "
              link={{ label: 'Продолжить покупки', path: '/' }}
            />
            <InfoBlock
              sx={{ margin: '10px 0 0 0' }}
              text="Заказы обрабатываются ежедневно, все заказы, поступившие в день обращения, доставляются на следующий день, включая выходные и праздничные дни. "
              link={{ label: 'Подробнее', path: '/test' }}
            />
          </Grid>
        </Grid>
      </Stack>
    </ShopLayout>
  );
}

export default Order;
