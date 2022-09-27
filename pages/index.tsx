import React from 'react';
import type { NextPage } from 'next';
import Image from 'next/image';

import { useAppDispatch, useAppSelector } from 'hooks/store';
import { useGetCategoryListQuery } from 'store/api/categoryApi';
import {
  useCreateFavoriteProductsMutation,
  useDeleteFavoriteProductMutation,
  useGetFavoriteProductsQuery,
} from 'store/api/favoriteApi';
import translations from './Main.i18n.json';
import { useLocalTranslation } from '../hooks/useLocalTranslation';
import { addBasketProduct, subtractBasketProduct } from 'store/slices/orderSlice';
import { useGetPageQuery } from 'store/api/pageApi';
import { useGetPromotionListQuery } from 'store/api/promotionApi';
import { useGetNoveltiesProductListQuery, useGetProductListQuery } from 'store/api/productApi';

import { PrivateLayout } from 'layouts/Private/Private';
import { ShopLayout } from '../layouts/Shop/Shop';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { useAppNavigation } from 'components/Navigation';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { CardSlider } from 'components/CardSlider/CardSlider';
import { PromotionCard } from 'components/Promotion/Card/Card';
import { dispatchNotification } from 'packages/EventBus';
import { getErrorMessage } from 'utils/errorUtil';

import { Currency } from '../types/entities/Currency';
import { IProduct } from '../types/entities/IProduct';
import { NotificationType } from 'types/entities/Notification';
import { ICategoryNew } from 'types/entities/ICategory';

import bannerImg from '../assets/images/banner.jpeg';

import sx from './Main.styles';

const NOW = new Date();

// eslint-disable-next-line react/function-component-definition
const Home: NextPage = () => {
  const { t } = useLocalTranslation(translations);

  const { goToPromotionPage, goToProductPage, language } = useAppNavigation();

  const basket = useAppSelector(state => state.order);

  const { data: favoriteProducts = [] } = useGetFavoriteProductsQuery();

  const dispatch = useAppDispatch();

  const { data: categories = [], isLoading: categoriesIsLoading } = useGetCategoryListQuery();
  const { data: products = [], isLoading: productsIsLoading } = useGetProductListQuery({
    withDiscount: true,
    withCategories: true,
  });
  const { data: novelties = [], isLoading: noveltiesIsLoading } = useGetNoveltiesProductListQuery({
    withDiscount: true,
  });
  const { data: promotions, isLoading: promotionsIsLoading } = useGetPromotionListQuery();

  const { data: page, isLoading: mainPageIsLoading } = useGetPageQuery('MAIN');

  const isLoading =
    categoriesIsLoading || productsIsLoading || noveltiesIsLoading || promotionsIsLoading || mainPageIsLoading;

  const currency: Currency = 'cheeseCoin';

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));
  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

  const [removeFavorite] = useDeleteFavoriteProductMutation();
  const [addFavorite] = useCreateFavoriteProductsMutation();

  const electProduct = async (id: number, isElect: boolean) => {
    try {
      if (isElect) {
        await removeFavorite(id);
      } else {
        await addFavorite({ productId: id });
      }
    } catch (error) {
      const message = getErrorMessage(error);

      dispatchNotification(message, { type: NotificationType.DANGER });
    }
  };

  return (
    <PrivateLayout>
      <ShopLayout currency={currency} language={language}>
        {isLoading && <ProgressLinear />}
        {!!promotions?.length && (
          <CardSlider
            title={t('promotions')}
            cardsList={promotions
              .filter(it => new Date(it.end) > NOW)
              .map(promotion => (
                <PromotionCard
                  key={promotion.id}
                  image={promotion.cardImage.small}
                  onClickMore={() => goToPromotionPage(promotion.id)}
                />
              ))}
          />
        )}
        {novelties?.length && (
          <ProductCatalog
            title={t('novelties')}
            products={novelties}
            favoritesList={favoriteProducts}
            basket={basket.products}
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
            title={t('catalog')}
            favoritesList={favoriteProducts}
            products={products}
            basket={basket.products}
            categories={categories as unknown as ICategoryNew[]} // FIXME:
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
              {bannerImg && (
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

            <Typography variant='h4' sx={sx.title}>
              {page.info?.title?.[language]}
            </Typography>

            <Typography variant='body1' sx={{ marginTop: { xs: '20px', md: '40px' } }}>
              {page.info?.description?.[language]}
            </Typography>
          </Box>
        )}
      </ShopLayout>
    </PrivateLayout>
  );
};

export default Home;
