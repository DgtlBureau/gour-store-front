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
} from '../../store/slices/orderSlice';
import translation from './index.i18n.json';
import { useLocalTranslation, LocalConfig } from 'hooks/useLocalTranslation';
import { Button } from '../../components/UI/Button/Button';
import { CartInfo } from '../../components/Cart/Info/Info';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { CartCard } from '../../components/Cart/Card/Card';
import { CartEmpty } from '../../components/Cart/Empty/Empty';
import { Typography } from '../../components/UI/Typography/Typography';
import { InfoBlock } from '../../components/UI/InfoBlock/InfoBlock';
import { IProduct } from '../../@types/entities/IProduct';
import { Currency } from '../../@types/entities/Currency';  

export function Basket() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useLocalTranslation(translation);

  const locale: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';
  const currency: Currency = locale === 'ru' ? 'rub' : 'eur';

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
    <ShopLayout>
      <Stack>
        <Typography variant="h3">{t('cart')}</Typography>
        {
          productsInOrder.length === 0 && (
            <CartEmpty
              title={t('emptyTitle')}
              btn={{ label: t('emptyButton'), onClick: goToHome }}
            >
              <Typography variant="body1">{t('emptyText')}</Typography>
            </CartEmpty>
          )
        }
        {
          productsInOrder.length !== 0 && (
            <Grid container spacing={2}>
              <Grid item xs={8}>
                {
                  productsInOrder.map((it, i) => (
                    <CartCard
                      key={`${it.product.id}-${i}`}
                      title={it.product.title[locale] || '...'}
                      price={it.product.price[currency] || 0}
                      amount={it.amount}
                      weight={it.weight}
                      isWeightGood={it.product.isWeightGood}
                      productImg={it.product.images[0]?.small}
                      discount={it.product.discount}
                      currency={currency}
                      onElect={() => electProduct(it.product)}
                      onDelete={() => deleteProduct(it.product)}
                      onAdd={() => addProduct(it.product)}
                      onSubtract={() => subtractProduct(it.product)}
                    />
                  ))
                }
              </Grid>
              <Grid item xs={4}>
                <Button sx={{ width: '100%', margin: '0 0 10px 0' }} onClick={goToOrder}>
                  {t('orderButton')}
                </Button>
                <CartInfo
                  count={count}
                  weight={weight}
                  price={sum}
                  delivery={isDeliveryFree ? 0 : 500} //TODO: вынести логику стоимости заказа на бек
                  discount={sumDiscount}
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
