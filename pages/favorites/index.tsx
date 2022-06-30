import { Grid, Stack } from '@mui/material';
import { Typography } from '../../components/UI/Typography/Typography';
import { ShopLayout } from '../../layouts/Shop/Shop';
import React, { useState } from 'react';
import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { ProductCard } from 'components/Product/Card/Card';
import { LocalConfig } from '../../hooks/useLocalTranslation';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';
import { IProduct } from '../../@types/entities/IProduct';
import { useAppSelector } from '../../hooks/store';
import { IOrderProduct } from '../../@types/entities/IOrderProduct';
import { Currency } from '../../@types/entities/Currency';
import { isProductFavorite } from './favoritesHelper';

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

export function Favorites() {
  const dispatch = useDispatch();
  const router = useRouter();
  const locale: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';

  const currentCurrency: Currency = 'cheeseCoin';

  const { data: favoriteProducts = [], isLoading, isError } = useGetFavoriteProductsQuery();

  const basket = useAppSelector(state => state.order);

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));
  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const handleElect = async (id: number, isElect: boolean) => {
    if (isElect) {
      try {
        await removeFavorite(id);
      } catch (error) {
        console.log(error);
      }
    } else {
      try {
        await addFavorite({ productId: id });
      } catch (error) {
        console.log(error);
      }
    }
  };
  const handleDetail = (id: number) => {
    router.push(`/products/${id}`);
  };

  if (favoriteProducts.length === 0) {
    return (
      <ShopLayout currency={'cheeseCoin'} language={'en'}>
        <Stack spacing={2}>
          <Typography sx={sx.title}>Избранные продукты</Typography>
          <Typography variant="h5">Нет избранных продуктов</Typography>
        </Stack>
      </ShopLayout>
    );
  }

  return (
    <ShopLayout currency={'cheeseCoin'} language={'en'}>
      <Stack spacing={2}>
        <Typography sx={sx.title}>Избранные продукты</Typography>
        <Grid container>
          {favoriteProducts.map(product => (
            <FavoriteProductCard
              key={product.id}
              product={product}
              basket={basket.products}
              currency={currentCurrency}
              locale={locale}
              isElect={isProductFavorite(product.id, favoriteProducts)}
              addToBasket={addToBasket}
              removeFromBasket={removeFromBasket}
              handleElect={handleElect}
              goToProductPage={handleDetail}
            />
          ))}
        </Grid>
      </Stack>
    </ShopLayout>
  );
}

export default Favorites;

type FavoriteProductType = {
  product: IProduct;
  basket: IOrderProduct[];
  currency: Currency;
  locale: 'en' | 'ru';
  isElect: boolean;
  addToBasket: (product: IProduct) => void;
  removeFromBasket: (product: IProduct) => void;
  handleElect: (id: number, isElect: boolean) => void;
  goToProductPage: (id: number) => void;
};

const FavoriteProductCard = ({
  product,
  basket,
  locale,
  currency,
  isElect,
  addToBasket,
  removeFromBasket,
  handleElect,
  goToProductPage,
}: FavoriteProductType) => {
  const productInBasket = basket.find(it => it.product.id === product.id);
  const count = (product.isWeightGood ? productInBasket?.weight : productInBasket?.amount) || 0;

  const onElect = () => {
    handleElect(product.id, isElect);
  };

  return (
    <ProductCard
      title={product.title[locale]}
      description={product.description[locale]}
      rating={product.grade}
      discount={product.discount}
      currentCount={count}
      isWeightGood={product.isWeightGood}
      price={product.price[currency]}
      previewSrc={product.images[0]?.small || ''}
      currency={currency}
      inCart={!!productInBasket}
      isElected={isElect}
      onAdd={() => {
        addToBasket(product);
      }}
      onRemove={() => {
        removeFromBasket(product);
      }}
      onElect={onElect}
      onDetail={() => {
        goToProductPage(product.id);
      }}
    />
  );
};
