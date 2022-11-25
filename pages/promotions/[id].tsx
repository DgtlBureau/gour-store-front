import React, { memo, useMemo } from 'react';

import { useGetCategoryListQuery } from 'store/api/categoryApi';
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
import { ProductSlider } from 'components/Product/Slider/Slider';
import { PromotionHeader } from 'components/Promotion/Header/Header';
import { Box } from 'components/UI/Box/Box';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

import { IProduct } from 'types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';

import { useAppDispatch } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { computeProductsWithCategories } from 'utils/catalogUtil';
import { getErrorMessage } from 'utils/errorUtil';

import translations from './Promotion.i18n.json';

import { sx } from './Promotion.styles';

// eslint-disable-next-line prefer-arrow-callback
const Promotion = memo(function Promotion() {
  const dispatch = useAppDispatch();

  const { t } = useLocalTranslation(translations);

  const {
    language,
    currency,
    query: { id: queryId },
  } = useAppNavigation();

  const promotionId = queryId ? +queryId : 0;

  const {
    data: promotion,
    isLoading: isPromotionLoading,
    isError,
  } = useGetPromotionQuery(promotionId, { skip: !queryId });
  const { data: categories = [], isLoading: categoriesIsLoading } = useGetCategoryListQuery();
  const { data: favoriteProducts = [], isLoading: favoriteProductsLoading } = useGetFavoriteProductsQuery();

  const isLoading = isPromotionLoading || categoriesIsLoading || favoriteProductsLoading;

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const formattedPromotionProducts = useMemo(
    () => promotion?.products && computeProductsWithCategories(promotion?.products, categories, favoriteProducts),
    [promotion, categories, favoriteProducts],
  );

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

  const addToBasket = (product: IProduct, gram: number) => dispatch(addBasketProduct({ product, gram }));
  const removeFromBasket = (product: IProduct, gram: number) => dispatch(subtractBasketProduct({ product, gram }));

  const hasProducts = !!formattedPromotionProducts?.length;

  return (
    <PrivateLayout>
      <ShopLayout>
        {isLoading && <ProgressLinear />}

        {!isLoading && isError && <Typography variant='h5'>Произошла ошибка</Typography>}

        {!isLoading && !isError && !promotion && <Typography variant='h5'>Акция не найдена</Typography>}

        {!isLoading && !isError && promotion && (
          <>
            <Box sx={sx.promotion}>
              <Link href='/'>{t('goBack')}</Link>

              <PromotionHeader image={promotion.pageImage?.full} end={promotion.end} sx={sx.header} />

              <Typography variant='h5' sx={sx.title}>
                {promotion.title[language]}
              </Typography>

              <Typography variant='body1' sx={sx.description}>
                {promotion.description[language]}
              </Typography>
            </Box>

            {hasProducts && (
              <ProductSlider
                title={t('sliderTitle')}
                products={formattedPromotionProducts}
                discount={promotion?.discount}
                language={language}
                currency={currency}
                onAdd={addToBasket}
                onRemove={removeFromBasket}
                onElect={electProduct}
              />
            )}
          </>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
});

export default Promotion;
