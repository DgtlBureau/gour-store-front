import type { NextPage } from 'next';
import Image from 'next/image';
import React, { useCallback, useMemo } from 'react';

import { useGetCategoryListQuery } from 'store/api/categoryApi';
import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { useGetPageQuery } from 'store/api/pageApi';
import { useGetNoveltiesProductListQuery, useGetProductListQuery } from 'store/api/productApi';
import { useGetPromotionListQuery } from 'store/api/promotionApi';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { CardSlider } from 'components/CardSlider/CardSlider';
import { useAppNavigation } from 'components/Navigation';
import { PageContent } from 'components/PageContent/PageContent';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { computeProductsWithCategories } from 'components/Product/Catalog/CatalogHelpers';
import { PromotionCard } from 'components/Promotion/Card/Card';
import { Box } from 'components/UI/Box/Box';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

import { IProduct } from 'types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';

import { useAppDispatch } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import bannerImg from 'assets/images/banner.jpeg';

import translations from './Main.i18n.json';
import sx from './Main.styles';

const NOW = new Date();

const Home: NextPage = () => {
  const { t } = useLocalTranslation(translations);

  const { goToPromotionPage, goToProductPage, language, currency } = useAppNavigation();

  const { data: favoriteProducts = [] } = useGetFavoriteProductsQuery();

  // TODO: вынести сюда в useMemo добавление к продуктам favoriteProducts, миллион расчетов для категорий
  // а в каждом отдельном компоненте <ProductCard /> чекать корзину по ключу "id:id", чтобы избежать ререндера у всех компонентов

  const dispatch = useAppDispatch();

  const { data: categories = [], isLoading: categoriesIsLoading } = useGetCategoryListQuery();
  const { data: products = [], isLoading: productsIsLoading } = useGetProductListQuery({
    withDiscount: true,
    withCategories: true,
  });
  const { data: novelties = [], isLoading: noveltiesIsLoading } = useGetNoveltiesProductListQuery({
    withDiscount: true,
    withCategories: true,
  });
  const { data: promotions, isLoading: promotionsIsLoading } = useGetPromotionListQuery();

  const { data: page, isLoading: mainPageIsLoading } = useGetPageQuery('MAIN');

  const formattedNovelties = useMemo(
    () =>
      // TODO: вынести вычисление любимых продуктов в каждый компонент, чтобы избежать ререндера всего приложения после добавления в любимые продукты
      computeProductsWithCategories(novelties, categories, favoriteProducts),
    [novelties, categories, favoriteProducts],
  );

  const formattedProducts = useMemo(
    () => computeProductsWithCategories(products, categories, favoriteProducts),
    [products, categories, favoriteProducts],
  );

  const isLoading =
    categoriesIsLoading || productsIsLoading || noveltiesIsLoading || promotionsIsLoading || mainPageIsLoading;

  const addToBasket = (product: IProduct, gram: number) => dispatch(addBasketProduct({ product, gram }));
  const removeFromBasket = (product: IProduct, gram: number) => dispatch(subtractBasketProduct({ product, gram }));

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const electProduct = useCallback(async (id: number, isElect: boolean) => {
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
  }, []);

  const filteredPromotions = promotions?.filter(it => new Date(it.end) > NOW);

  return (
    <PrivateLayout>
      <ShopLayout currency={currency} language={language}>
        {isLoading && <ProgressLinear />}
        {!!filteredPromotions?.length && (
          <CardSlider
            title={t('promotions')}
            cardsList={filteredPromotions.map(promotion => (
              <PromotionCard
                key={promotion.id}
                image={promotion.cardImage.small}
                onClickMore={() => goToPromotionPage(promotion.id)}
              />
            ))}
          />
        )}
        {!!novelties.length && (
          <ProductCatalog
            title={t('novelties')}
            products={formattedNovelties}
            categories={categories}
            language={language}
            currency={currency}
            rows={1}
            sx={sx.productList}
            onAdd={addToBasket}
            onRemove={removeFromBasket}
            onElect={electProduct}
            onDetail={goToProductPage}
          />
        )}

        {!!products.length && (
          <ProductCatalog
            withFilters
            title={t('catalog')}
            products={formattedProducts}
            categories={categories}
            language={language}
            currency={currency}
            sx={sx.productList}
            onAdd={addToBasket}
            onRemove={removeFromBasket}
            onElect={electProduct}
            onDetail={goToProductPage}
          />
        )}

        {!!page && (
          <Box>
            <Box sx={sx.banner}>
              {!!bannerImg && (
                <Image
                  loader={() =>
                    'https://i.pinimg.com/736x/ca/f2/48/caf24896f739c464073ee31edfebead2--images-for-website-website-designs.jpg'
                  }
                  src={
                    bannerImg ||
                    'https://i.pinimg.com/736x/ca/f2/48/caf24896f739c464073ee31edfebead2--images-for-website-website-designs.jpg'
                  }
                  objectFit='cover'
                  layout='fill'
                  alt=''
                />
              )}
            </Box>

            <PageContent
              title={page?.info?.title?.[language] || ''}
              description={page?.info?.description?.[language]}
            />
          </Box>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
};

export default Home;
