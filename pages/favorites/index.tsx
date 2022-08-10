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
import { LinkRef as Link } from '../../components/UI/Link/Link';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';
import { IProduct } from '../../@types/entities/IProduct';
import { useAppSelector } from '../../hooks/store';
import { IOrderProduct } from '../../@types/entities/IOrderProduct';
import { Currency } from '../../@types/entities/Currency';
import { isProductFavorite } from './favoritesHelper';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Path } from 'constants/routes';
import { PrivateLayout } from 'layouts/Private/Private';

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

  const { data: favoriteProducts = [], isFetching } = useGetFavoriteProductsQuery();

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
  const goToProduct = (id: number) => {
    router.push(`/${Path.PRODUCTS}/${id}`);
  };

  return (
    <PrivateLayout>
      <ShopLayout currency="cheeseCoin" language="ru">
        <Link href="/" sx={{ marginBottom: '20px' }}>
          Вернуться на главную
        </Link>

        <Stack spacing={3}>
          <Typography sx={sx.title}>Избранные продукты</Typography>

          {isFetching && <ProgressLinear />}

          {favoriteProducts.length === 0 ? (
            <Typography variant="h5">Нет избранных продуктов</Typography>
          ) : (
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
                  goToProductPage={goToProduct}
                />
              ))}
            </Grid>
          )}
        </Stack>
      </ShopLayout>
    </PrivateLayout>
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
