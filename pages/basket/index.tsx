import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mui/material';

import {
  addBasketProduct,
  selectedProductCount,
  selectedProductSum,
  selectedProductWeight,
  selectedProductDiscount,
  selectProductsInOrder,
  subtractBasketProduct,
  removeProduct,
} from '../../store/slices/orderSlice';
import translation from './Basket.i18n.json';
import { useLocalTranslation, LocalConfig } from 'hooks/useLocalTranslation';
import { Button } from '../../components/UI/Button/Button';
import { CartInfo } from '../../components/Cart/Info/Info';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { CartCard } from '../../components/Cart/Card/Card';
import { CartEmpty } from '../../components/Cart/Empty/Empty';
import { Typography } from '../../components/UI/Typography/Typography';
import { InfoBlock } from '../../components/UI/Info/Block/Block';
import { IProduct } from '../../@types/entities/IProduct';
import { PrivateLayout } from 'layouts/Private/Private';
import { useAppDispatch, useAppSelector } from 'hooks/store';

const sx = {
  title: {
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: 'text.secondary',
  },
};

export function Basket() {
  const router = useRouter();

  const dispatch = useAppDispatch();

  const { t } = useLocalTranslation(translation);

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';

  const currency = 'cheeseCoin';

  const productsInOrder = useAppSelector(selectProductsInOrder);
  const count = useAppSelector(selectedProductCount);
  const weight = useAppSelector(selectedProductWeight);
  const sum = useAppSelector(selectedProductSum);
  const sumDiscount = useAppSelector(selectedProductDiscount);

  //TODO: вынести логику стоимости доставки на бек
  const delivery = 500;
  const sumToFreeDelivery = 2990 - sum;
  const isDeliveryFree = sumToFreeDelivery <= 0;

  const goToHome = () => router.push('/');
  const goToOrder = () => router.push('/order');

  const deleteProduct = (product: IProduct) => dispatch(removeProduct(product));
  const addProduct = (product: IProduct) => dispatch(addBasketProduct(product));
  const subtractProduct = (product: IProduct) => dispatch(subtractBasketProduct(product));

  return (
    <PrivateLayout>
      <ShopLayout currency={currency} language={language}>
        <Typography variant="h3" sx={sx.title}>
          {t('cart')}
        </Typography>

        {productsInOrder.length === 0 && (
          <CartEmpty
            title={t('emptyTitle')}
            btn={{
              label: t('emptyButton'),
              onClick: goToHome,
            }}
          >
            <Typography variant="body1">{t('emptyText')}</Typography>
          </CartEmpty>
        )}

        {productsInOrder.length !== 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {productsInOrder.map((it, i) => (
                <CartCard
                  key={`${it.product.id}-${i}`}
                  title={it.product.title[language] || '...'}
                  price={it.product.price[currency] || 0}
                  amount={it.amount}
                  weight={it.weight}
                  isWeightGood={it.product.isWeightGood}
                  productImg={it.product.images[0]?.small}
                  discount={it.product.discount}
                  currency={currency}
                  onDelete={() => deleteProduct(it.product)}
                  onAdd={() => addProduct(it.product)}
                  onSubtract={() => subtractProduct(it.product)}
                />
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              <Button onClick={goToOrder} sx={{ width: '100%', marginBottom: '10px' }}>
                {t('orderButton')}
              </Button>

              <CartInfo
                count={count}
                weight={weight}
                discount={sumDiscount}
                delivery={isDeliveryFree ? 0 : delivery}
                price={sum}
                currency={currency}
              />

              {!isDeliveryFree && (
                <InfoBlock
                  sx={{ marginTop: '10px' }}
                  text={`${t('freeDeliveryText.part1')} ${sumToFreeDelivery}₽ ${t('freeDeliveryText.part2')} `}
                />
              )}
              <InfoBlock
                sx={{ marginTop: '10px' }}
                text={t('aboutDelivery')}
                link={{ label: t('continueShopping'), path: '/' }}
              />
            </Grid>
          </Grid>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}

export default Basket;
