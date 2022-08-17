import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { PromotionHeader } from 'components/Promotion/Header/Header';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { useGetPromotionQuery } from 'store/api/promotionApi';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { PrivateLayout } from 'layouts/Private/Private';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { useAppNavigation } from 'components/Navigation';
import { Path } from '../../constants/routes';
import { IProduct } from '../../@types/entities/IProduct';

import { sx } from './Promotion.styles';
import { LinkRef as Link } from '../../components/UI/Link/Link';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { addBasketProduct, subtractBasketProduct } from '../../store/slices/orderSlice';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import translations from './Promotion.i18n.json';

export default function Promotion() {
  const dispatch = useAppDispatch();

  const { t } = useLocalTranslation(translations);

  const {
    goToHome,
    goToProductPage,
    language,
    query: { id: queryId },
  } = useAppNavigation();
  const promotionId = queryId ? +queryId : 0;

  const { data: promotion, isLoading, isError } = useGetPromotionQuery(promotionId, { skip: !queryId });

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const basket = useAppSelector((state) => state.order);

  const currency = 'cheeseCoin';

  const { data: favoriteProducts = [] } = useGetFavoriteProductsQuery();

  if (!promotionId) return goToHome();

  const elect = async (id: number, isElect: boolean) => {
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

              <PromotionHeader image={promotion.pageImage.full} end={new Date(promotion.end)} sx={sx.header} />

              <Typography variant='h5' sx={sx.title}>
                {promotion.title[language]}
              </Typography>

              <Typography variant='body1' sx={sx.description}>
                {promotion.description[language]}
              </Typography>
            </Box>

            <ProductCatalog
              title={t('sliderTitle')}
              products={promotion?.products || []}
              basket={basket.products}
              language={language}
              currency={currency}
              discount={promotion?.discount}
              onAdd={addToBasket}
              onRemove={removeFromBasket}
              onElect={elect}
              onDetail={goToProductPage}
              favoritesList={favoriteProducts}
            />
          </>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}
