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

export type basketProps = {};

export function Basket({}: basketProps) {
  const router = useRouter();
  const dispatch = useDispatch();
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

  const handleClickOrder = () => {};

  return (
    <ShopLayout>
      <Stack>
        <Typography variant="h3">Корзина</Typography>
        {productsInOrder.length === 0 && (
          <CartEmpty
            title={'В корзине нет товаров'}
            btn={{
              label: 'Вернуться к покупкам',
              onClick: () => {
                router.push('/');
              },
            }}
          >
            <Typography variant="body1">
              Акции, специальные предложения интересных товаров на главной
              странице помогут вам определиться с выбором!
            </Typography>
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
                Перейти к оформлению
              </Button>
              <CartInfo
                count={count}
                weight={weight}
                price={sum}
                delivery={500}
                discount={sumDiscount}
              />
            </Grid>
          </Grid>
        )}
      </Stack>
    </ShopLayout>
  );
}

export default Basket;
