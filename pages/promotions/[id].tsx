import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from "react-redux";

import {
  addBasketProduct,
  selectProductsIdInOrder,
  subtractBasketProduct,
} from "../../store/slices/orderSlice";
import translations from './Promotion.i18n.json';
import { useLocalTranslation } from './../../hooks/useLocalTranslation';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { PromotionHeader } from 'components/PromotionHeader/PromotionHeader';
import { CardSlider } from 'components/CardSlider/CardSlider';
import { ProductCard } from 'components/Product/Card/Card';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { Link as CustomLink } from '../../components/UI/Link/Link';
import { useGetPromotionQuery } from 'store/api/promotionApi';
import { useGetProductListQuery } from 'store/api/productApi';
import { useAppSelector } from 'hooks/store';
import { LocalConfig } from '../../@types/entities/LocalConfig';
import { defaultTheme as theme } from 'themes';

const sx= {
  promotion: {
    marginBottom: '100px',
  },
  header: {
    margin: '20px 0',
  },
  description: {
    maxWidth: '1200px',
    color: theme.palette.text.muted,
  }
}

export default function Promotion() {
  const dispatch = useDispatch();

  const productsIdInOrder = useSelector(selectProductsIdInOrder);
  
  const { t } = useLocalTranslation(translations);

  const router = useRouter();
  const basket = useAppSelector(state => state.order);

  const { id } = router.query;

  const currentCurrency = 'rub';
  const locale: keyof LocalConfig= router?.locale as keyof LocalConfig || 'ru';

  const promotionId = id ? +id : 0;

  const { data: promotion } = useGetPromotionQuery(promotionId, { skip: !id });

  const { data: products } = useGetProductListQuery();

  return (
    <ShopLayout>
      <>
        {
          promotion && (
            <Box sx={sx.promotion}>
              <CustomLink path="/">
                {t('goBack')}
              </CustomLink>

              <PromotionHeader
                title={promotion.title[locale]}
                image={promotion.pageImage.full}
                end={promotion.end}
                sx={sx.header}
              />

              <Typography variant="body1" sx={sx.description}>
                {promotion.description[locale]}
              </Typography>
            </Box>
          )
        }
        {
          products && (
            <CardSlider
              title="Товары из акции"
              slidesPerView={4}
              spaceBetween={0}
              rows={2}
              cardsList={
                products.map(product => {
                  const productInBasket = basket.products.find(
                    it => it.product.id === product.id
                  );
                  const count =
                    (product.isWeightGood
                      ? productInBasket?.weight
                      : productInBasket?.amount) || 0;
                  return (
                    <ProductCard
                      key={product.id}
                      currency={currentCurrency}
                      title={product.title ? product.title[locale] : ''}
                      description={
                        product.description
                          ? product.description[locale]
                          : ''
                      }
                      rating={product.grade}
                      price={product.price[currentCurrency]}
                      previewSrc={product.images[0] ? product.images[0].small : ''}
                      inCart={productsIdInOrder.includes(product.id)}
                      isElected={false}
                      onAdd={() => {
                        dispatch(addBasketProduct(product));
                      }}
                      onRemove={() => {
                        dispatch(subtractBasketProduct(product));
                      }}
                      onEdit={() => {}}
                      onElect={() => {}}
                      onDetail={() => router.push(`products/${product.id}`)}
                      currentCount={count}
                      isWeightGood={product.isWeightGood}
                    />
                  );
                })
              }
            />
          )
        }
      </>
    </ShopLayout>
  );
}
