import React from 'react';
import { ShopLayout } from '../../layouts/ShopLayout';
import { CartCard } from '../../components/Cart/Card/Card';
import { useDispatch, useSelector } from 'react-redux';
import {
  addBasketProduct,
  selectedProductCount,
  selectedProductSum,
  selectedProductWeight,
  selectProductsInOrder,
  subtractBasketProduct,
} from '../../store/slices/orderSlice';
import { Button } from '../../components/UI/Button/Button';
import { CartInfo } from '../../components/Cart/Info/Info';
import { Grid, Stack } from '@mui/material';
import { Typography } from '../../components/UI/Typography/Typography';
import { CartEmpty } from 'components/Cart/Empty/Empty';
import { useRouter } from 'next/router';
import { InfoBlock } from '../../components/UI/InfoBlock/InfoBlock';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import translation from './Basket.i18n.json';

export type basketProps = {};

export function Basket({}: basketProps) {
  const router = useRouter();
  const dispatch = useDispatch();
  const { t } = useLocalTranslation(translation);
  const lang: 'ru' | 'en' = 'ru';
  const currency: 'rub' | 'usd' | 'eur' = 'rub';

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

  const sumToFreeDelivery = 2990 - sum;
  const isDeliveryFree = sumToFreeDelivery <= 0;

  const handleClickOrder = () => {};

  return (
    <ShopLayout>
      <Stack>
        <Typography variant="h3">Корзина</Typography>
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
              {productsInOrder.map(it => (
                <CartCard
                  title={it.product.title[lang] || '...'}
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
                    dispatch(subtractBasketProduct(it.product));
                  }}
                  onAdd={() => {
                    dispatch(addBasketProduct(it.product));
                  }}
                  onSubtract={() => {
                    dispatch(subtractBasketProduct(it.product));
                  }}
                />
              ))}
            </Grid>
            <Grid item xs={4}>
              <Button
                sx={{ width: '100%', margin: '0 0 10px 0' }}
                onClick={handleClickOrder}
              >
                {t('orderButton')}
              </Button>
              <CartInfo
                count={count}
                weight={weight}
                price={sum}
                delivery={500}
                discount={sumDiscount}
              />
              {!isDeliveryFree && (
                <InfoBlock
                  styles={{ margin: '10px 0 0 0' }}
                  text={`Добавьте ещё товаров на ${sumToFreeDelivery}₽ для бесплатной доставки по Москве и Санкт-Петербургу`}
                  link={{ label: 'Продолжить покупки', path: '/' }}
                />
              )}
              <InfoBlock
                styles={{ margin: '10px 0 0 0' }}
                text="Заказы обрабатываются ежедневно, все заказы, поступившие в день обращения, доставляются на следующий день, включая выходные и праздничные дни. "
                link={{ label: 'Подробнее', path: '/test' }}
              />
            </Grid>
          </Grid>
        )}
      </Stack>
    </ShopLayout>
  );
}

export default Basket;
