import React, { useMemo } from 'react';

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
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
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

export default function Promotion() {
  const dispatch = useAppDispatch();

  const { t } = useLocalTranslation(translations);

  const {
    goToProductPage,
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

  const isLoading = isPromotionLoading && categoriesIsLoading && favoriteProductsLoading;

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  // const basket = useAppSelector(selectBasketProducts);

  const formattedPromotionProducts = useMemo(
    () => computeProductsWithCategories(promotion?.products || [], categories, favoriteProducts || []),
    [promotion?.products, categories, favoriteProducts],
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

  return (
    <PrivateLayout>
      <ShopLayout language={language} currency={currency}>
        {isLoading && <ProgressLinear />}

        {!isLoading && isError && <Typography variant='h5'>Произошла ошибка</Typography>}

        {!isLoading && !isError && !promotion && <Typography variant='h5'>Промоакция не найден</Typography>}

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

            {!!formattedPromotionProducts?.length && (
              <ProductCatalog
                title={t('sliderTitle')}
                products={formattedPromotionProducts}
                language={language}
                currency={currency}
                discount={promotion?.discount}
                categories={categories}
                onAdd={addToBasket}
                onRemove={removeFromBasket}
                onElect={electProduct}
                onDetail={goToProductPage}
              />
            )}
          </>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}
