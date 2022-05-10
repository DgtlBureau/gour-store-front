import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import Image from 'next/image';
import type { NextPage } from 'next'

import {
  addBasketProduct,
  selectProductsIdInOrder,
  selectProductsInOrder,
  subtractBasketProduct,
} from "../store/slices/orderSlice";
import translations from './index.i18n.json';
import { useLocalTranslation } from '../hooks/useLocalTranslation';
import { useAppSelector } from 'hooks/store';
import { useGetPageQuery } from '../store/api/pageApi';
import { useGetPromotionListQuery } from "../store/api/promotionApi";
import { useGetNoveltiesProductListQuery, useGetProductListQuery } from "../store/api/productApi";

import { ShopLayout } from "../layouts/ShopLayout/ShopLayout";
import { Box } from '../components/UI/Box/Box';
import { Typography } from '../components/UI/Typography/Typography';
import { CardSlider } from "../components/CardSlider/CardSlider";
import { ProductCard } from "../components/Product/Card/Card";
import { PromotionCard } from "../components/PromotionCard/PromotionCard";

import { LocalConfig } from '../@types/entities/LocalConfig';
import { IProduct } from '../@types/entities/IProduct';

import bannerImg from '../assets/images/banner.jpeg';

import sx from './index.styles';

const Home: NextPage = () => {
  const { t } = useLocalTranslation(translations);

  const router = useRouter();
  const basket = useAppSelector(state => state.order);

  const dispatch = useDispatch();

  const { data: products } = useGetProductListQuery();
  const { data: novelties } = useGetNoveltiesProductListQuery();
  const { data: promotions } = useGetPromotionListQuery();

  const { data: page } = useGetPageQuery('MAIN');

  const locale: keyof LocalConfig= router?.locale as keyof LocalConfig || 'ru';
  const currentCurrency = 'rub';

  const productsIdInOrder = useSelector(selectProductsIdInOrder);
  const productsInOrder = useSelector(selectProductsInOrder);

  const goToPromotionPage = (id: number) => router.push(`promotions/${id}`);
  const goToProductPage = (id: number) => router.push(`products/${id}`);

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));
  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

  const getProductCard = (product: IProduct, count: number) => (
    <ProductCard
      key={product.id}
      title={product.title[locale]}
      description={product.description[locale]}
      rating={product.grade}
      price={product.price[currentCurrency]}
      previewSrc={product.images[0] ? product.images[0].small : ''}
      inCart={productsIdInOrder.includes(product.id)}
      isElected={false}
      onAdd={() => addToBasket(product)}
      onRemove={() => removeFromBasket(product)}
      onElect={() => {}}
      onDetail={() => goToProductPage(product.id)}
      currentCount={count}
      isWeightGood={product.isWeightGood}
    />
  );

  const promotionsList = promotions?.map(promotion => (
    <PromotionCard
      key={promotion.id}
      title={promotion.title[locale]}
      image={promotion.cardImage.small}
      onClickMore={() => goToPromotionPage(promotion.id)}
    />
  ));

  const noveltiesList = novelties?.map(product => {
    const productInBasket = basket.products.find(it => it.product.id === product.id);

    const count = (product.isWeightGood ? productInBasket?.weight : productInBasket?.amount) || 0;

    return getProductCard(product, count)
  });

  const catalogList = products?.map(product => {
    const productInBasket = basket.products.find(it => it.product.id === product.id);

    const count = (product.isWeightGood ? productInBasket?.weight : productInBasket?.amount) || 0;

    return getProductCard(product, count)
  })

  const getCatalogRows = () => {
    const length = catalogList?.length || 0;
    if (length > 8) return 3;
    else if (length > 4) return 2;
    else return 1;
  };

  return (
    <ShopLayout>
      {
        !!promotionsList && (
          <CardSlider
            title={t('promotions')}
            cardsList={promotionsList}
          />
        )
      }
      {
        !!noveltiesList && (
          <CardSlider
            title={t('novelties')}
            slidesPerView={4}
            spaceBetween={0}
            rows={1}
            cardsList={noveltiesList}
            sx={sx.novelties}
          />
        )
      }
      {
        !!catalogList && (
          <CardSlider
            title={t('catalog')}
            slidesPerView={4}
            spaceBetween={0}
            rows={getCatalogRows()}
            cardsList={catalogList}
          />
        )
      }
      {
        !!page && (
          <>
            <Box sx={sx.banner}>
              <Image src={bannerImg} objectFit="cover" width={1200} height={350} alt="" />
              <Typography variant="h4" sx={sx.bannerTitle}>
                {page.info?.title?.[locale]}
              </Typography>
            </Box>

            <Typography variant="body1">
              {page.info?.description?.[locale]}
            </Typography>
          </>
        )
      }
    </ShopLayout>
  );
}

export default Home;
