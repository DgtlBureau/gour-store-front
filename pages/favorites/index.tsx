import React, { useMemo } from 'react';

import { Typography } from '@mui/material';

import { useGetCategoryListQuery } from 'store/api/categoryApi';
import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { useGetProductListQuery } from 'store/api/productApi';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { CartEmpty } from 'components/Cart/Empty/Empty';
import { useAppNavigation } from 'components/Navigation';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';

import { IProduct } from 'types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';

import { useAppDispatch } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { computeProductsWithCategories } from 'utils/catalogUtil';
import { getErrorMessage } from 'utils/errorUtil';

import translation from './Favorites.i18n.json';

import sx from '../basket/Basket.styles';

export function Favorites() {
  const dispatch = useAppDispatch();
  const { language, currency, goToHome } = useAppNavigation();
  const { t } = useLocalTranslation(translation);

  const { data: products = [] } = useGetProductListQuery({ withDiscount: true, withCategories: true });
  const { data: favoriteProducts = [], isFetching } = useGetFavoriteProductsQuery();
  const { data: categories = [] } = useGetCategoryListQuery();

  const formattedProducts = useMemo(
    () => computeProductsWithCategories(products, categories, favoriteProducts),
    [products, categories, favoriteProducts],
  );

  const addToBasket = (product: IProduct, gram: number) => dispatch(addBasketProduct({ product, gram }));
  const removeFromBasket = (product: IProduct, gram: number) => dispatch(subtractBasketProduct({ product, gram }));

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const electProduct = async (id: number, isElect: boolean) => {
    try {
      if (isElect) {
        await removeFavorite(id);
      } else {
        await addFavorite(id);
      }
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  const favoriteProductsIds = useMemo(() => new Set(favoriteProducts.map(product => product.id)), [favoriteProducts]);
  const filteredProducts = formattedProducts.filter(product => favoriteProductsIds.has(product.id));

  return (
    <PrivateLayout>
      <ShopLayout>
        {filteredProducts.length === 0 && (
          <>
            <Typography variant='h3' sx={sx.title}>
              {t('favorites')}
            </Typography>

            <CartEmpty title={t('emptyTitle')} actionText={t('emptyButton')} onClick={goToHome}>
              <Typography variant='body1'>{t('emptyText')}</Typography>
            </CartEmpty>
          </>
        )}

        {isFetching && <ProgressLinear />}

        {!!filteredProducts.length && (
          <ProductCatalog
            title={t('favorites')}
            products={filteredProducts}
            categories={categories}
            language={language}
            onAdd={addToBasket}
            onRemove={removeFromBasket}
            onElect={electProduct}
          />
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}

export default Favorites;
