import type { NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/router';
import Image from 'next/image';

import {
  addBasketProduct,
  selectProductsIdInOrder,
  subtractBasketProduct,
} from '../store/slices/orderSlice';
import translations from './index.i18n.json';
import { useLocalTranslation, LocalConfig } from '../hooks/useLocalTranslation';
import { useAppSelector } from 'hooks/store';
import { useGetPageQuery } from '../store/api/pageApi';
import { useGetPromotionListQuery } from '../store/api/promotionApi';
import {
  useGetNoveltiesProductListQuery,
  useGetProductListQuery,
} from '../store/api/productApi';

import { ShopLayout } from '../layouts/Shop/Shop';
import { Box } from '../components/UI/Box/Box';
import { Typography } from '../components/UI/Typography/Typography';
import { CardSlider } from '../components/CardSlider/CardSlider';
import { PromotionCard } from '../components/PromotionCard/PromotionCard';
import { IOrderProduct } from '../@types/entities/IOrderProduct';
import { IProduct } from '../@types/entities/IProduct';
import { ProductCard } from '../components/Product/Card/Card';

import bannerImg from '../assets/images/banner.jpeg';

import { sx } from '../styles/index.styles';
import { Currency } from '../@types/entities/Currency';

type SliderProductCardProps = {
  product: IProduct;
  basket: IOrderProduct[];
  currency: Currency;
  locale: 'en' | 'ru';
  addToBasket: (product: IProduct) => {};
  removeFromBasket: (product: IProduct) => {};
  goToProductPage: (id: number) => {};
};

const Home: NextPage = () => {
  const { t } = useLocalTranslation(translations);

  const router = useRouter();
  const basket = useAppSelector(state => state.order);

  const dispatch = useDispatch();

  const { data: products } = useGetProductListQuery();
  const { data: novelties } = useGetNoveltiesProductListQuery();
  const { data: promotions } = useGetPromotionListQuery();

  const { data: page } = useGetPageQuery('MAIN');

  const locale: keyof LocalConfig =
    (router?.locale as keyof LocalConfig) || 'ru';
  const currentCurrency = locale === 'ru' ? 'rub' : 'eur';

  const productsIdInOrder = useSelector(selectProductsIdInOrder);

  const goToPromotionPage = (id: number) => router.push(`promotions/${id}`);
  const goToProductPage = (id: number) => router.push(`products/${id}`);

  const addToBasket = (product: IProduct) =>
    dispatch(addBasketProduct(product));
  const removeFromBasket = (product: IProduct) =>
    dispatch(subtractBasketProduct(product));

  const promotionsList = promotions?.map(promotion => (
    <PromotionCard
      key={promotion.id}
      title={promotion.title[locale]}
      image={promotion.cardImage.small}
      onClickMore={() => goToPromotionPage(promotion.id)}
    />
  ));

  const noveltiesList = novelties?.map(product => (
    <SliderProductCard
      product={product}
      basket={basket.products}
      currency={currentCurrency}
      locale={locale}
      addToBasket={addToBasket}
      removeFromBasket={removeFromBasket}
      goToProductPage={goToProductPage}
    />
  ));

  const catalogList = products?.map(product => (
    <SliderProductCard
      product={product}
      basket={basket.products}
      currency={currentCurrency}
      locale={locale}
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

  return (
    <ShopLayout>
      {!!promotionsList && (
        <CardSlider title={t('promotions')} cardsList={promotionsList} />
      )}
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
          title={t('catalog')}
          slidesPerView={4}
          spaceBetween={0}
          rows={getCatalogRows()}
          cardsList={catalogList}
        />
      )}
      {!!page && (
        <>
          <Box sx={sx.banner}>
            <Image
              src={bannerImg}
              objectFit="cover"
              width={1200}
              height={350}
              alt=""
            />
            <Typography variant="h4" sx={sx.bannerTitle}>
              {page.info?.title?.[locale]}
            </Typography>
          </Box>

          <Typography variant="body1">
            {page.info?.description?.[locale]}
          </Typography>
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
  locale,
  addToBasket,
  removeFromBasket,
  goToProductPage,
}: SliderProductCardProps) => {
  const productInBasket = basket.find(it => it.product.id === product.id);

  const count =
    (product.isWeightGood
      ? productInBasket?.weight
      : productInBasket?.amount) || 0;

  return (
    <ProductCard
      key={product.id}
      title={product.title[locale]}
      description={product.description[locale]}
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
