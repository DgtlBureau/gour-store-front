import React from 'react';

import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { useAppNavigation } from 'components/Navigation';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { PrivateLayout } from 'layouts/Private/Private';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { ShopLayout } from 'layouts/Shop/Shop';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { IProduct } from 'types/entities/IProduct';
import { dispatchNotification } from 'packages/EventBus';
import { NotificationType } from 'types/entities/Notification';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { getErrorMessage } from 'utils/errorUtil';
import { useGetCategoryListQuery } from 'store/api/categoryApi';
import { useGetProductListQuery } from 'store/api/productApi';

export function Favorites() {
  const dispatch = useAppDispatch();
  const { language, currency, goToProductPage } = useAppNavigation();

  const { data: products = [] } = useGetProductListQuery({ withDiscount: true, withCategories: true });
  const { data: favoriteProducts = [], isFetching } = useGetFavoriteProductsQuery();
  const { data: categories = [] } = useGetCategoryListQuery();

  const basket = useAppSelector(state => state.order);

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));
  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

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

  const filteredProducts = products.filter(product => !!favoriteProducts.find(favorite => favorite.id === product.id));

  return (
    <PrivateLayout>
      <ShopLayout currency='cheeseCoin' language='ru'>
        <Link href='/' sx={{ marginBottom: '20px' }}>
          Вернуться на главную
        </Link>

        {isFetching && <ProgressLinear />}

        {!!filteredProducts.length && (
          <ProductCatalog
            title='Избранные продукты'
            emptyTitle='Нет избранных продуктов'
            products={filteredProducts}
            favoritesList={favoriteProducts}
            categories={categories}
            basket={basket.products}
            language={language}
            currency={currency}
            onAdd={addToBasket}
            onRemove={removeFromBasket}
            onElect={electProduct}
            onDetail={goToProductPage}
          />
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}

export default Favorites;
