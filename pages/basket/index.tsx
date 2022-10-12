/* eslint-disable react/no-array-index-key */
import React, { useMemo } from 'react';

import { Divider, Grid } from '@mui/material';

import { useGetCategoryListQuery } from 'store/api/categoryApi';
import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { useGetSimilarProductsByIdQuery } from 'store/api/productApi';
import {
  addBasketProduct,
  removeProduct,
  selectBasketProducts,
  selectProductsIdInOrder,
  selectedProductCount,
  selectedProductDiscount,
  selectedProductSum,
  subtractBasketProduct,
} from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { CartCard } from 'components/Cart/Card/Card';
import { CartEmpty } from 'components/Cart/Empty/Empty';
import { CartInfo } from 'components/Cart/Info/Info';
import { useAppNavigation } from 'components/Navigation';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { computeProductsWithCategories } from 'components/Product/Catalog/CatalogHelpers';
import { Button } from 'components/UI/Button/Button';
import { InfoBlock } from 'components/UI/Info/Block/Block';
import { Typography } from 'components/UI/Typography/Typography';

import { IProduct } from 'types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { getProductBackground, getProductTypeLabel } from 'utils/categoryUtil';
import { getCountryImage } from 'utils/countryUtil';
import { getErrorMessage } from 'utils/errorUtil';

import { isProductFavorite } from 'pages/favorites/favoritesHelper';

import translation from './Basket.i18n.json';
import sx from './Basket.styles';

export function Basket() {
  const { language, currency, goToHome, goToOrder, goToProductPage } = useAppNavigation();

  const dispatch = useAppDispatch();

  const { t } = useLocalTranslation(translation);

  const { data: favoriteProducts = [] } = useGetFavoriteProductsQuery();
  const { data: categories = [] } = useGetCategoryListQuery();

  const productsInOrder = useAppSelector(selectBasketProducts);
  const count = useAppSelector(selectedProductCount);
  const sum = useAppSelector(selectedProductSum);
  const sumDiscount = useAppSelector(selectedProductDiscount);

  const productIds = useAppSelector(selectProductsIdInOrder);

  const { data: similarProducts = [] } = useGetSimilarProductsByIdQuery({ productIds });

  const formattedSimilarProducts = useMemo(
    () => computeProductsWithCategories(similarProducts, categories, favoriteProducts),
    [similarProducts, categories, favoriteProducts],
  );

  // TODO: вынести логику стоимости доставки на бек
  const delivery = 500;
  const sumToFreeDelivery = 2990 - sum;
  const isDeliveryFree = sumToFreeDelivery <= 0;

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const deleteProduct = (product: IProduct, gram: number) => dispatch(removeProduct({ product, gram })); // FIXME:
  const addProduct = (product: IProduct, gram: number) => dispatch(addBasketProduct({ product, gram }));
  const subtractProduct = (product: IProduct, gram: number) => dispatch(subtractBasketProduct({ product, gram }));

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

  return (
    <PrivateLayout>
      <ShopLayout currency={currency} language={language}>
        <Typography variant='h3' sx={sx.title}>
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
            <Typography variant='body1'>{t('emptyText')}</Typography>
          </CartEmpty>
        )}

        {productsInOrder.length !== 0 && (
          <Grid container spacing={2}>
            <Grid item xs={12} md={8}>
              {productsInOrder.map(it => (
                <>
                  <CartCard
                    key={it.product.id}
                    title={it.product.title[language] || '...'}
                    price={it.product.price[currency] || 0}
                    amount={it.amount}
                    gram={it.gram}
                    productImg={it.product.images[0]?.small}
                    backgroundImg={getProductBackground(categories, it.product.categories || [])}
                    discount={it.product.discount}
                    currency={currency}
                    onDetail={() => goToProductPage(it.product.id)}
                    onDelete={() => deleteProduct(it.product, it.gram)}
                    onAdd={() => addProduct(it.product, it.gram)}
                    onSubtract={() => subtractProduct(it.product, it.gram)}
                  />

                  <Divider sx={sx.divider} />
                </>
              ))}
            </Grid>

            <Grid item xs={12} md={4}>
              <Button onClick={goToOrder} sx={sx.desktopOrderBtn}>
                {t('orderButton')}
              </Button>

              <CartInfo
                count={count}
                discount={sumDiscount}
                delivery={isDeliveryFree ? 0 : delivery}
                price={sum}
                currency={currency}
              />

              {!isDeliveryFree && (
                <InfoBlock
                  sx={{ marginTop: '10px' }}
                  text={`${t('freeDeliveryText.part1')} ${sumToFreeDelivery}₽ ${t('freeDeliveryText.part2')} `}
                  link={{ label: t('continueShopping'), path: '/' }}
                />
              )}
              <InfoBlock
                sx={{ marginTop: '10px' }}
                text={t('aboutDelivery')}
                link={{
                  label: t('detailed'),
                  path: '/rules',
                }}
              />
            </Grid>

            {!!similarProducts?.length && (
              <Grid item xs={12}>
                <ProductCatalog
                  title={t('similar')}
                  products={formattedSimilarProducts}
                  language={language}
                  currency={currency}
                  onAdd={addProduct}
                  onRemove={subtractProduct}
                  onElect={electProduct}
                  onDetail={goToProductPage}
                />
              </Grid>
            )}

            <Grid item xs={12} sx={{ display: { md: 'none' } }}>
              <Button onClick={goToOrder} sx={sx.mobileOrderBtn}>
                {t('orderButton')}
              </Button>
            </Grid>
          </Grid>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}

export default Basket;
