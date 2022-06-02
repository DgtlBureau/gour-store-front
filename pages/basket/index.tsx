import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import { Grid, Stack } from '@mui/material';

import {
  addBasketProduct,
  selectedProductCount,
  selectedProductSum,
  selectedProductWeight,
  selectProductsInOrder,
  subtractBasketProduct,
  removeProduct
} from '../../store/slices/orderSlice';
import translation from './Basket.i18n.json';
import { useLocalTranslation, LocalConfig } from 'hooks/useLocalTranslation';
import { Button } from '../../components/UI/Button/Button';
import { CartInfo } from '../../components/Cart/Info/Info';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { CartCard } from '../../components/Cart/Card/Card';
import { CartEmpty } from '../../components/Cart/Empty/Empty';
import { Typography } from '../../components/UI/Typography/Typography';
import { InfoBlock } from '../../components/UI/InfoBlock/InfoBlock';

export function Basket() {
  const router = useRouter();

  const dispatch = useDispatch();

  const { t } = useLocalTranslation(translation);


  const language: keyof LocalConfig =
    (router?.locale as keyof LocalConfig) || 'ru';

  const currency = 'cheeseCoin';

  const productsInOrder = useSelector(selectProductsInOrder);
  const count = useSelector(selectedProductCount);
  const weight = useSelector(selectedProductWeight);
  const sum = useSelector(selectedProductSum);

  const sumDiscount = productsInOrder.reduce((acc, currentProduct) => {
    return (
      acc +
      (currentProduct.product.price[currency] *
        currentProduct.product.discount) /
        100
    );
  }, 0);

  const sumToFreeDelivery = 2990 - sum; //TODO: вынести логику стоимости заказа на бек
  const isDeliveryFree = sumToFreeDelivery <= 0;

  const goToHome = () => router.push('/');
  const goToOrder = () => router.push('/order');

  const electProduct = (product: IProduct) => ({});
  const deleteProduct = (product: IProduct) => dispatch(subtractBasketProduct(product));
  const addProduct = (product: IProduct) => dispatch(addBasketProduct(product));
  const subtractProduct = (product: IProduct) => dispatch(subtractBasketProduct(product));

  return (
    <ShopLayout currency={currency} language={language}>
      <Stack>
        <Typography 
          variant="h3" 
          sx={{ fontWeight: 'bold' ,fontFamily: 'Roboto slab', color: 'primary.main'}}
        >
          {t('cart')}
        </Typography>
        {productsInOrder.length === 0 && (
          <CartEmpty
            title={t('emptyTitle')}
            btn={{
              label: t('emptyButton'),
              onClick: () => {
                router.push('/');
              },
            }}
          >
            <Typography variant="body1">{t('emptyText')}</Typography>
          </CartEmpty>
        )}

        {productsInOrder.length !== 0 && (
          <Grid container spacing={2}>
            <Grid item xs={8}>
              {productsInOrder.map((it, i) => (
                <CartCard
                  key={`${it.product.id}-${i}`}
                  title={it.product.title[language] || '...'}
                  price={it.product.price[currency] || 0}
                  amount={it.amount}
                  weight={it.weight}
                  isWeightGood={it.product.isWeightGood}
                  productImg={it.product.images[0]?.small}
                  discount={10}
                  currency={currency}
                  onElect={() => {
                    dispatch(addBasketProduct(it.product));
                  }}
                  onDelete={() => {
                    dispatch(removeProduct(it.product));
                  }}
                  onAdd={() => {
                    dispatch(addBasketProduct(it.product));
                  }}
                  onSubtract={() => {
                    dispatch(subtractBasketProduct(it.product));
                  }}
                />
                {
                  !isDeliveryFree && (
                    <InfoBlock
                      styles={{ margin: '10px 0 0 0' }}
                      text={`${t('freeDeliveryText.part1')} ${sumToFreeDelivery}₽ ${t('freeDeliveryText.part2')} `}
                      link={{ label: t('continueShopping'), path: '/' }}
                    />
                  )
                }
                <InfoBlock
                  styles={{ margin: '10px 0 0 0' }}
                  text={t('aboutDelivery')}
                  link={{ label: t('continueShopping'), path: '/' }}
                />
              </Grid>
            </Grid>
          )
        }
      </Stack>
    </ShopLayout>
  );
}

export default Basket;
