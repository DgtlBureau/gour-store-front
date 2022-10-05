import React from 'react';

import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { useGetPromotionQuery } from 'store/api/promotionApi';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { useAppNavigation } from 'components/Navigation';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { PromotionHeader } from 'components/Promotion/Header/Header';
import { Box } from 'components/UI/Box/Box';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

import { IProduct } from 'types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import translations from './Promotion.i18n.json';
import { sx } from './Promotion.styles';

export default function Promotion() {
  const dispatch = useAppDispatch();

  const { t } = useLocalTranslation(translations);

  const {
    goToHome,
    goToProductPage,
    language,
    currency,
    query: { id: queryId },
  } = useAppNavigation();

  const promotionId = queryId ? +queryId : 0;

  const { data: promotion, isLoading, isError } = useGetPromotionQuery(promotionId, { skip: !queryId });

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const basket = useAppSelector(state => state.order);

  const { data: favoriteProducts = [] } = useGetFavoriteProductsQuery();

  if (!promotionId) return goToHome();

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

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));
  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

  return (
    <PrivateLayout>
      <ShopLayout language={language} currency={currency}>
        {isLoading && <ProgressLinear />}

        {!isLoading && isError && <Typography variant='h5'>Произошла ошибка</Typography>}

        {!isLoading && !isError && !promotion && <Typography variant='h5'>Продукт не найден</Typography>}

        {!isLoading && !isError && promotion && (
          <>
            <Box sx={sx.promotion}>
              <Link href='/'>{t('goBack')}</Link>

              <PromotionHeader image={promotion.pageImage?.full} end={new Date(promotion.end)} sx={sx.header} />

              <Typography variant='h5' sx={sx.title}>
                {promotion.title[language]}
              </Typography>

              <Typography variant='body1' sx={sx.description}>
                {promotion.description[language]}
              </Typography>
            </Box>

            {!!promotion?.products?.length && (
              <ProductCatalog
                title={t('sliderTitle')}
                products={promotion.products}
                basket={basket.products}
                language={language}
                currency={currency}
                discount={promotion?.discount}
                onAdd={addToBasket}
                onRemove={removeFromBasket}
                onElect={electProduct}
                onDetail={goToProductPage}
                favoritesList={favoriteProducts}
              />
            )}
          </>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}
