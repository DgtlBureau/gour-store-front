import React from 'react';
import { Grid, Stack } from '@mui/material';

import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { useAppNavigation } from 'components/Navigation';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';
import { ProductCard } from 'components/Product/Card/Card';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { PrivateLayout } from 'layouts/Private/Private';
import { useAppDispatch, useAppSelector } from '../../hooks/store';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { Typography } from '../../components/UI/Typography/Typography';
import { LinkRef as Link } from '../../components/UI/Link/Link';
import { IProduct } from '../../@types/entities/IProduct';
import { IOrderProduct } from '../../@types/entities/IOrderProduct';
import { Currency } from '../../@types/entities/Currency';
import { Language } from '../../@types/entities/Language';
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

function FavoriteProductCard({
  product,
  basket,
  language,
  currency,
  isElect,
  addToBasket,
  removeFromBasket,
  handleElect,
  goToProductPage,
}: FavoriteProductType) {
  const productInBasket = basket.find(it => it.product.id === product.id);
  const count = (product.isWeightGood ? productInBasket?.weight : productInBasket?.amount) || 0;

  const elect = () => handleElect(product.id, isElect);

  return (
    <ProductCard
      title={product.title[language]}
      description={product.description[language]}
      rating={product.grade}
      discount={product.discount}
      currentCount={count}
      isWeightGood={product.isWeightGood}
      price={product.price[currency]}
      previewSrc={product.images[0]?.small || ''}
      currency={currency}
      isElected={isElect}
      onElect={elect}
      onAdd={() => addToBasket(product)}
      onRemove={() => removeFromBasket(product)}
      onDetail={() => goToProductPage(product.id)}
    />
  );
}

export function Favorites() {
  const dispatch = useAppDispatch();
  const { language, goToProductPage } = useAppNavigation();

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

  return (
    <PrivateLayout>
      <ShopLayout currency='cheeseCoin' language='ru'>
        <Link href='/' sx={{ marginBottom: '20px' }}>
          Вернуться на главную
        </Link>

        <Stack spacing={3}>
          <Typography sx={sx.title}>Избранные продукты</Typography>

          {isFetching && <ProgressLinear />}

          {favoriteProducts.length === 0 ? (
            <Typography variant='h5'>Нет избранных продуктов</Typography>
          ) : (
            <Grid container>
              {favoriteProducts.map(product => (
                <FavoriteProductCard
                  key={product.id}
                  product={product}
                  basket={basket.products}
                  currency={currentCurrency}
                  language={language}
                  isElect={isProductFavorite(product.id, favoriteProducts)}
                  addToBasket={addToBasket}
                  removeFromBasket={removeFromBasket}
                  handleElect={handleElect}
                  goToProductPage={goToProductPage}
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
  language: Language;
  isElect: boolean;
  addToBasket: (product: IProduct) => void;
  removeFromBasket: (product: IProduct) => void;
  handleElect: (id: number, isElect: boolean) => void;
  goToProductPage: (id: number) => void;
};
