import React, { useEffect, useState } from 'react';
import type { NextPage } from 'next';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

import translations from './index.i18n.json';
import { useLocalTranslation, LocalConfig } from '../hooks/useLocalTranslation';
import { addBasketProduct, subtractBasketProduct } from '../store/slices/orderSlice';
import { useAppSelector } from 'hooks/store';
import { useGetCategoryListQuery } from 'store/api/categoryApi';
import { useGetPageQuery } from '../store/api/pageApi';
import { useGetPromotionListQuery } from '../store/api/promotionApi';
import { useGetNoveltiesProductListQuery, useGetProductListQuery } from '../store/api/productApi';

import { Box } from '../components/UI/Box/Box';
import { Typography } from '../components/UI/Typography/Typography';
import { ShopLayout } from '../layouts/Shop/Shop';
import { CardSlider } from '../components/CardSlider/CardSlider';
import { PromotionCard } from '../components/PromotionCard/PromotionCard';
import { ProductCard } from '../components/Product/Card/Card';
import { CatalogFilter, Filters } from 'components/CatalogFilter/CatalogFilter';
import { Path } from 'constants/routes';

import { IProduct } from '../@types/entities/IProduct';
import { IOrderProduct } from '../@types/entities/IOrderProduct';

import bannerImg from '../assets/images/banner.jpeg';

import { sx } from '../styles/index.styles';
import { Currency } from '../@types/entities/Currency';
import { Language } from '../@types/entities/Language';

type SliderProductCardProps = {
  product: IProduct;
  basket: IOrderProduct[];
  currency: Currency;
  language: Language;
  addToBasket: (product: IProduct) => {};
  removeFromBasket: (product: IProduct) => {};
  goToProductPage: (id: number) => {};
};

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

  const [filters, setFilters] = useState<Filters>({
    isReversed: false,
    category: 'all',
    characteristics: {},
  });

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';
  const currency: Currency = 'cheeseCoin';

  const goToPromotionPage = (id: number) => router.push(`${Path.PROMOTIONS}/${id}`);
  const goToProductPage = (id: number) => router.push(`${Path.PRODUCTS}/${id}`);

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));
  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

  const toggleSequence = () => setFilters({ ...filters, isReversed: !filters.isReversed });
  const selectCategory = (value: string) =>
    setFilters({
      ...filters,
      category: filters.category !== value ? value : 'all',
      characteristics: {},
    });
  const selectCharacteristics = (key: string, selected: string[]) =>
    setFilters({
      ...filters,
      characteristics: {
        [key]: selected,
      },
    });

  const checkCategory = (key: string) => filters.category === 'all' || key === filters.category;
  const checkCharacteristics = (characteristics: { [key: string]: string }) =>
    Object.keys(filters.characteristics).every(
      it => filters.characteristics[it].length === 0 || filters.characteristics[it].includes(characteristics[it])
    );

  const promotionsList = promotions?.map(promotion => (
    <PromotionCard
      key={promotion.id}
      title={promotion.title[language]}
      image={promotion.cardImage.small}
      onClickMore={() => goToPromotionPage(promotion.id)}
    />
  ));

  const noveltiesList = novelties?.map(product => (
    <SliderProductCard
      key={product.id}
      product={product}
      basket={basket.products}
      currency={currency}
      language={language}
      addToBasket={addToBasket}
      removeFromBasket={removeFromBasket}
      goToProductPage={goToProductPage}
    />
  ));

  const catalogList = products
    ?.filter(product => checkCategory(product.category.key))
    .filter(product => checkCharacteristics(product.characteristics))
    .map(product => (
      <SliderProductCard
        key={product.id}
        product={product}
        basket={basket.products}
        currency={currency}
        language={language}
        addToBasket={addToBasket}
        removeFromBasket={removeFromBasket}
        goToProductPage={goToProductPage}
      />
    ));

  const getCatalogRows = () => {
    const length = catalogList?.length || 0;
    if (length > 8) return 3;
    else if (length > 4) return 2;
    else return 1;
  };

  useEffect(() => console.log(filters, catalogList), [filters]);

  return (
    <ShopLayout currency={currency} language={language}>
      {!!promotionsList && <CardSlider title={t('promotions')} cardsList={promotionsList} />}
      {!!noveltiesList && (
        <CardSlider
          title={t('novelties')}
          slidesPerView={4}
          spaceBetween={0}
          rows={1}
          cardsList={noveltiesList}
          sx={sx.novelties}
        />
      )}
      {!!catalogList && (
        <CardSlider
          key={`catalog/${filters.category}`}
          title={t('catalog')}
          slidesPerView={4}
          spaceBetween={0}
          rows={getCatalogRows()}
          cardsList={filters.isReversed ? catalogList.reverse() : catalogList}
          head={
            <CatalogFilter
              categories={categories || []}
              filters={filters}
              onReverse={toggleSequence}
              onCategoryChange={selectCategory}
              onCharacteristicChange={selectCharacteristics}
            />
          }
        />
      )}
      {!!page && (
        <>
          <Box sx={sx.banner}>
            <Image src={bannerImg} objectFit="cover" width={1200} height={350} alt="" />
            <Typography variant="h4" sx={sx.bannerTitle}>
              {page.info?.title?.[language]}
            </Typography>
          </Box>

          <Typography variant="body1">{page.info?.description?.[language]}</Typography>
        </>
      )}
    </ShopLayout>
  );
};

export default Home;

const SliderProductCard = ({
  product,
  basket,
  currency,
  language,
  addToBasket,
  removeFromBasket,
  goToProductPage,
}: SliderProductCardProps) => {
  const productInBasket = basket.find(it => it.product.id === product.id);

  const count = (product.isWeightGood ? productInBasket?.weight : productInBasket?.amount) || 0;

  return (
    <ProductCard
      key={product.id}
      title={product.title[language]}
      description={product.description[language]}
      rating={product.grade}
      price={product.price[currency]}
      previewSrc={product.images[0] ? product.images[0].small : ''}
      currency={currency}
      currentCount={count}
      inCart={!!productInBasket}
      isElected={false}
      isWeightGood={product.isWeightGood}
      onAdd={() => addToBasket(product)}
      onRemove={() => removeFromBasket(product)}
      onElect={() => {}}
      onDetail={() => goToProductPage(product.id)}
    />
  );
};
