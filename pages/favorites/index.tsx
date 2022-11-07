import React, { useMemo } from 'react';

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

import { useAppNavigation } from 'components/Navigation';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';

import { IProduct } from 'types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';

import { useAppDispatch } from 'hooks/store';
import { dispatchNotification } from 'packages/EventBus';
import { computeProductsWithCategories } from 'utils/catalogUtil';
import { getErrorMessage } from 'utils/errorUtil';

export function Favorites() {
  const dispatch = useAppDispatch();
  const { language, currency } = useAppNavigation();

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

  const filteredProducts = formattedProducts.filter(
    product => !!favoriteProducts.find(favorite => favorite.id === product.id),
  );

  return (
    <PrivateLayout>
      <ShopLayout>
        <Link href='/' sx={{ marginBottom: '20px' }}>
          Вернуться на главную
        </Link>

        {isFetching && <ProgressLinear />}

        {!!filteredProducts.length && (
          <ProductCatalog
            title='Избранные продукты'
            emptyText='Нет избранных продуктов'
            products={formattedProducts}
            categories={categories}
            language={language}
            currency={currency}
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
