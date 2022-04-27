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
import { ShopLayout } from '../../layouts/ShopLayout';
import { PromotionHeader } from 'components/PromotionHeader/PromotionHeader';
import { CardSlider } from 'components/CardSlider/CardSlider';
import { ProductCard } from 'components/Product/Card/Card';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { Link as CustomLink } from '../../components/UI/Link/Link';
import { useGetPromotionQuery } from 'store/api/promotionApi';
import { useGetProductListQuery } from 'store/api/productApi';
import { LocalConfig } from '../../@types/entities/LocalConfig';
import { Weight } from '../../@types/entities/Weight';
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

// FIX ME!!!
const defaultWeights = [
  {
    value: 100,
    unit: 'г',
  },
  {
    value: 200,
    unit: 'г',
  },
] as Weight[];

export default function Promotion() {
  const dispatch = useDispatch();

  const productsIdInOrder = useSelector(selectProductsIdInOrder);
  
  const { t } = useLocalTranslation(translations);

  const router = useRouter();
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
              title={t('catalogTitle')}
              rows={2}
              slidesPerView={4}
              cardsList={
                products.map(product => (
                  <ProductCard
                    key={product.id}
                    title={product.title ? product.title[locale] : ''}
                    description={product.description ? product.description[locale] : ''}
                    rating={product.grade}
                    weightId={0}
                    weights={defaultWeights}
                    price={product.price[currentCurrency]}
                    cost={'200 руб'}
                    previewSrc={product.images[0] ? product.images[0].small : ''}
                    inCart={productsIdInOrder.includes(product.id)}
                    isElected={false}
                    onAdd={() => dispatch(addBasketProduct(product))}
                    onRemove={() => dispatch(subtractBasketProduct(product))}
                    onEdit={() => {}}
                    onElect={() => {}}
                    onDetail={() => {}}
                  />
                ))
              }
            />
          )
        }
      </>
    </ShopLayout>
  );
}
