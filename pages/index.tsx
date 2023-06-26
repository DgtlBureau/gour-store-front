import type { NextPage } from 'next';
import Image from 'next/image';
import React, {useCallback, useMemo, useRef} from 'react';

import { useGetCategoryListQuery } from 'store/api/categoryApi';
import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import { useGetPageQuery } from 'store/api/pageApi';
import { useGetNoveltiesProductListQuery, useGetProductListQuery } from 'store/api/productApi';
import { useGetPromotionListQuery } from 'store/api/promotionApi';
import { selectCurrentUser } from 'store/selectors/auth';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from 'layouts/Shop/Shop';

import { CardSlider } from 'components/CardSlider/CardSlider';
import { useAppNavigation } from 'components/Navigation';
import { PageContent } from 'components/PageContent/PageContent';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { ProductSlider } from 'components/Product/Slider/Slider';
import { PromotionCard } from 'components/Promotion/Card/Card';
import { Box } from 'components/UI/Box/Box';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import {WhyUs} from 'components/WhyUs/WhyUs';

import { IProduct } from 'types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';

import { Path } from 'constants/routes';
import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { dispatchNotification } from 'packages/EventBus';
import { computeProductsWithCategories } from 'utils/catalogUtil';
import { getErrorMessage } from 'utils/errorUtil';

import translations from './Main.i18n.json';

import sx from './Main.styles';

import defaultBannerImg from 'assets/images/banner.jpeg';


import { Review } from '../components/Product/Reviews/Reviews';
import { getProductReviews } from '../utils/reviewUtil';
import { useGetGradeListQuery} from '../store/api/productGradeApi';
import { ProductReviewsForMain } from '../components/Product/Reviews/ReviewsForMain';


const NOW = new Date();

const Home: NextPage = () => {
  const { t } = useLocalTranslation(translations);

  const { goToPromotionPage, goToProductPage, language } = useAppNavigation();

  // TODO: вынести сюда в useMemo добавление к продуктам favoriteProducts, миллион расчетов для категорий
  // а в каждом отдельном компоненте <ProductCard /> чекать корзину по ключу "id:id", чтобы избежать ререндера у всех компонентов

  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectCurrentUser);

  // todo не запрашивать когда !currentUser
  const { data: favoriteProducts = [] } = useGetFavoriteProductsQuery(undefined, { skip: currentUser !== undefined });

  const isIndividual = currentUser?.role.key === 'individual';

  const { data: categories = [], isLoading: categoriesIsLoading } = useGetCategoryListQuery();

  // todo УДАЛИТЬ
  /* eslint prefer-const: 1 */
  let { data: products = [], isLoading: productsIsLoading } = useGetProductListQuery({
    withDiscount: true,
    withCategories: true,
  });

  let { data: novelties = [], isLoading: noveltiesIsLoading } = useGetNoveltiesProductListQuery({
    withDiscount: true,
    withCategories: true,
  });

  novelties = novelties.filter((product) => product.id !== 65);
  products = products.filter((product) => product.id !== 65);
  // TODO: УДАЛИТЬ

  const { data: promotions, isLoading: promotionsIsLoading } = useGetPromotionListQuery();

  const { data: page, isLoading: mainPageIsLoading } = useGetPageQuery('main');

  const bannerImg = page?.bannerImg?.full || defaultBannerImg;

  const { data: grades = [] } = useGetGradeListQuery(
      { withComments: true, isApproved: true, length: 8 }
  );
  const reviews = getProductReviews(grades);
  const hasReviews = !!reviews.length;

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

  const addToBasket = (product: IProduct, gram: number) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    ym(92190821,'reachGoal','add-product-to-basket');
    dispatch(addBasketProduct({product, gram}))
  };

  const removeFromBasket = (product: IProduct, gram: number) => dispatch(subtractBasketProduct({ product, gram }));

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const electProduct = useCallback(
    async (id: number, isElect: boolean) => {
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
    },
    [addFavorite, removeFavorite],
  );

  const filteredPromotions = promotions?.filter(it => {
    const start = new Date(it.start);
    const end = new Date(it.end);

    return NOW > start && NOW < end;
  });

  const promotionCardList = useMemo(
    () =>
      filteredPromotions?.map(promotion => (
        <Link href={`/${Path.PROMOTIONS}/${promotion.id}`}>
          <PromotionCard
            key={promotion.id}
            image={promotion.cardImage.small}
            onClickMore={() => goToPromotionPage(promotion.id)}
          />
        </Link>
      )) || [],
    [filteredPromotions, goToPromotionPage],
  );

  const hasPromotions = !!filteredPromotions?.length;
  const hasNovelties = !!novelties.length;
  const hasProducts = !!products.length;
  const commentBlockRef = useRef<HTMLDivElement>(null);
  const onReviewClick = (review: Review) => {
    goToProductPage(review.productId);
  };

  return (
    <PrivateLayout>
      <ShopLayout>
        {isLoading && <ProgressLinear />}

        {hasPromotions && <CardSlider title={t('promotions')} cardList={promotionCardList} />}

        {hasNovelties && (
          <ProductSlider
            title={t('novelties')}
            products={formattedNovelties}
            language={language}
            sx={sx.productList}
            onAdd={addToBasket}
            onRemove={removeFromBasket}
            onElect={electProduct}
          />
        )}

        {hasProducts && (
          <ProductCatalog
            withFilters
            title={t('catalog')}
            products={formattedProducts}
            categories={categories}
            language={language}
            sx={sx.productList}
            onAdd={addToBasket}
            onRemove={removeFromBasket}
            onElect={electProduct}
          />
        )}

        {hasReviews && !productsIsLoading && (
          <ProductReviewsForMain sx={sx.reviews} reviews={reviews} ref={commentBlockRef} onReviewClick={onReviewClick} />
        )}

        {!!page && (
          <Box>
            {!!bannerImg && (
              <Box sx={sx.banner}>
                <Image unoptimized loader={() => bannerImg} src={bannerImg} objectFit='cover' layout='fill' alt='' />
              </Box>
            )}

            <PageContent
              title={page?.info?.title?.[language] || ''}
              description={page?.info?.description?.[language]}
            />
          </Box>
        )}
        <WhyUs/>
      </ShopLayout>
    </PrivateLayout>
  );
};

export default Home;
