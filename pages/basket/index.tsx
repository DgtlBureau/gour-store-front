/* eslint-disable react/no-array-index-key */
import React from 'react';

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
  selectProductsIdInOrder,
  selectProductsInOrder,
  selectedProductCount,
  selectedProductDiscount,
  selectedProductSum,
  selectedProductWeight,
  subtractBasketProduct,
} from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { CartCard } from 'components/Cart/Card/Card';
import { CartEmpty } from 'components/Cart/Empty/Empty';
import { CartInfo } from 'components/Cart/Info/Info';
import { useAppNavigation } from 'components/Navigation';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { Button } from 'components/UI/Button/Button';
import { InfoBlock } from 'components/UI/Info/Block/Block';
import { Typography } from 'components/UI/Typography/Typography';

import { IProduct } from 'types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { getProductBackground } from 'utils/categoryUtil';
import { getErrorMessage } from 'utils/errorUtil';

import translation from './Basket.i18n.json';
import sx from './Basket.styles';

export function Basket() {
  const { language, currency, goToHome, goToOrder, goToProductPage } = useAppNavigation();

  const dispatch = useAppDispatch();

  const { t } = useLocalTranslation(translation);

  const { data: favoriteProducts = [] } = useGetFavoriteProductsQuery();
  const { data: categories = [] } = useGetCategoryListQuery();

  const productsInOrder = useAppSelector(selectProductsInOrder);
  const count = useAppSelector(selectedProductCount);
  const weight = useAppSelector(selectedProductWeight);
  const sum = useAppSelector(selectedProductSum);
  const sumDiscount = useAppSelector(selectedProductDiscount);

  const productIds = useAppSelector(selectProductsIdInOrder);

  const { data: similarProducts = [] } = useGetSimilarProductsByIdQuery({ productIds });

  // TODO: вынести логику стоимости доставки на бек
  const delivery = 500;
  const sumToFreeDelivery = 2990 - sum;
  const isDeliveryFree = sumToFreeDelivery <= 0;

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const deleteProduct = (product: IProduct) => dispatch(removeProduct(product));
  const addProduct = (product: IProduct) => dispatch(addBasketProduct(product));
  const subtractProduct = (product: IProduct) => dispatch(subtractBasketProduct(product));

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
                    price={it.product.price[currency] || 0} // FIXME: TODO: избавиться от any
                    amount={it.amount}
                    weight={it.weight}
                    isWeightGood={it.product.isWeightGood}
                    productImg={it.product.images[0]?.small}
                    backgroundImg={getProductBackground(categories, it.product.categories)}
                    discount={it.product.discount}
                    currency={currency}
                    onDetail={() => goToProductPage(it.product.id)}
                    onDelete={() => deleteProduct(it.product)}
                    onAdd={() => addProduct(it.product)}
                    onSubtract={() => subtractProduct(it.product)}
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
                  link={{ label: t('continueShopping'), path: '/' }}
                />
              )}
              <InfoBlock
                sx={{ marginTop: '10px' }}
                text={t('aboutDelivery')}
                link={{
                  label: t('detailed'),
                  path: '/#purchase-rules-block',
                }}
              />
            </Grid>

            {!!similarProducts?.length && (
              <Grid item xs={12}>
                <ProductCatalog
                  title={t('similar')}
                  products={similarProducts}
                  language={language}
                  currency={currency}
                  favoritesList={favoriteProducts}
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
