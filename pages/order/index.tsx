import React from 'react';
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
import { InfoBlock } from '../../components/UI/InfoBlock/InfoBlock';
import { useCreateOrderMutation } from 'store/api/orderApi';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import translation from './Order.i18n.json';

export type basketProps = {};

export function Order({}: basketProps) {
  const router = useRouter();
  const { t } = useLocalTranslation(translation);
  const productsInOrder = useSelector(selectProductsInOrder);
  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);

  const currency = 'rub';

  const [fetchCreateOrder] = useCreateOrderMutation();

  const handleSubmitForm = async (FormData: OrderFields) => {
    try {
      await fetchCreateOrder(FormData).unwrap();
      router.push('/');
    } catch (error) {
      console.log(error);
    }
  };

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
        <Typography variant="h4">{t('title')}</Typography>
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
              onSubmit={handleSubmitForm}
              onPromo={(code: string) => {
                return code;
              }}
            />
          </Grid>
          <Grid item xs={4}>
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
