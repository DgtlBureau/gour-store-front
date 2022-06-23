import React from 'react';
import type { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

import translations from './main.i18n.json';
import { useLocalTranslation, LocalConfig } from '../hooks/useLocalTranslation';
import { addBasketProduct, subtractBasketProduct } from '../store/slices/orderSlice';
import { useAppSelector } from 'hooks/store';
import { useGetCategoryListQuery } from 'store/api/categoryApi';
import { useGetPageQuery } from '../store/api/pageApi';
import { useGetPromotionListQuery } from '../store/api/promotionApi';
import { useGetNoveltiesProductListQuery, useGetProductListQuery } from '../store/api/productApi';

import { ProductCatalog } from '../components/Product/Catalog/Catalog';
import { Box } from '../components/UI/Box/Box';
import { Typography } from '../components/UI/Typography/Typography';
import { ShopLayout } from '../layouts/Shop/Shop';
import { CardSlider } from '../components/CardSlider/CardSlider';
import { PromotionCard } from '../components/Promotion/Card/Card';
import { Path } from 'constants/routes';

import { IProduct } from '../@types/entities/IProduct';

import bannerImg from '../assets/images/banner.jpeg';

import { Currency } from '../@types/entities/Currency';

import sx from './Main.styles';

const Home: NextPage = () => {
  const { t } = useLocalTranslation(translations);

  const router = useRouter();
  const basket = useAppSelector(state => state.order);

  const dispatch = useDispatch();

  const { data: categories } = useGetCategoryListQuery();
  const { data: products } = useGetProductListQuery();
  const { data: novelties } = useGetNoveltiesProductListQuery();
  const { data: promotions } = useGetPromotionListQuery();

  const { data: page } = useGetPageQuery('MAIN');

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';
  const currency: Currency = 'cheeseCoin';

  const goToPromotionPage = (id: number) => router.push(`${Path.PROMOTIONS}/${id}`);
  const goToProductPage = (id: number) => router.push(`${Path.PRODUCTS}/${id}`);

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));
  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

  return (
    <ShopLayout currency={currency} language={language}>
      {!!promotions && (
        <CardSlider
          title={t('promotions')}
          cardsList={promotions.map(promotion => (
            <PromotionCard
              key={promotion.id}
              image={promotion.cardImage.small}
              onClickMore={() => goToPromotionPage(promotion.id)}
            />
          ))}
        />
      )}

      {!!novelties && (
        <ProductCatalog
          title={t('novelties')}
          products={novelties}
          basket={basket.products}
          language={language}
          currency={currency}
          rows={1}
          sx={sx.productList}
          onAdd={addToBasket}
          onRemove={removeFromBasket}
          onElect={() => ({})}
          onDetail={goToProductPage}
        />
      )}

      {!!products && (
        <ProductCatalog
          title={t('catalog')}
          products={products}
          basket={basket.products}
          categories={categories}
          language={language}
          currency={currency}
          sx={sx.productList}
          onAdd={addToBasket}
          onRemove={removeFromBasket}
          onElect={() => ({})}
          onDetail={goToProductPage}
        />
      )}

      {!!page && (
        <>
          <Box sx={sx.banner}>
            <Image src={bannerImg} objectFit="cover" layout="fill" alt="" />
          </Box>

          <Typography variant="h4" sx={sx.title}>
            {page.info?.title?.[language]}
          </Typography>

          <Typography variant="body1" sx={{ marginTop: { xs: '20px', md: '40px' } }}>
            {page.info?.description?.[language]}
          </Typography>
        </>
      )}
    </ShopLayout>
  );
};

export default Home;
