import React from 'react';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';

import translations from './Promotion.i18n.json';
import { useLocalTranslation, LocalConfig } from './../../hooks/useLocalTranslation';
import { addBasketProduct, subtractBasketProduct } from '../../store/slices/orderSlice';
import { ShopLayout } from '../../layouts/Shop/Shop';
import { PromotionHeader } from 'components/Promotion/Header/Header';
import { ProductCatalog } from 'components/Product/Catalog/Catalog';
import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';
import { LinkRef as Link } from '../../components/UI/Link/Link';
import { useGetPromotionQuery } from 'store/api/promotionApi';
import { useGetProductListQuery } from 'store/api/productApi';
import { useAppSelector } from 'hooks/store';
import { Path } from '../../constants/routes';
import { IProduct } from '../../@types/entities/IProduct';
import { defaultTheme as theme } from 'themes';
import { PrivateLayout } from 'layouts/Private/Private';

const sx = {
  promotion: {
    margin: {
      md: '0 0 100px 0',
      sm: '0 0 70px 0',
      xs: '0 0 30px 0',
    },
  },
  header: {
    margin: '20px 0',
  },
  title: {
    margin: {
      xs: '0 0 10px 0',
      md: '0 0 20px 0',
    },
    fontSize: {
      sm: '40px',
      xs: '24px',
    },
    fontWeight: 'bold',
    fontFamily: 'Roboto slab',
    color: 'primary.main',
  },
  description: {
    maxWidth: '1200px',
    color: theme.palette.text.muted,
  },
};

export default function Promotion() {
  const dispatch = useDispatch();

  const { t } = useLocalTranslation(translations);

  const router = useRouter();
  const basket = useAppSelector(state => state.order);

  const { id } = router.query;

  const language: keyof LocalConfig = (router?.locale as keyof LocalConfig) || 'ru';
  const currency = 'cheeseCoin';

  const promotionId = id ? +id : 0;

  if (!promotionId) return router.push('/');

  const { data: promotion } = useGetPromotionQuery(promotionId, { skip: !id });
  const { data: products } = useGetProductListQuery();

  const goToProductPage = (id: number) => router.push(`${Path.PRODUCTS}/${id}`);

  const addToBasket = (product: IProduct) => dispatch(addBasketProduct(product));
  const removeFromBasket = (product: IProduct) => dispatch(subtractBasketProduct(product));

  return (
    <PrivateLayout>
      <ShopLayout language={language} currency={currency}>
        {promotion && (
          <Box sx={sx.promotion}>
            <Link href="/">{t('goBack')}</Link>

            <PromotionHeader image={promotion.pageImage.full} end={new Date(promotion.end)} sx={sx.header} />

            <Typography variant="h5" sx={sx.title}>
              {promotion.title[language]}
            </Typography>

            <Typography variant="body1" sx={sx.description}>
              {promotion.description[language]}
            </Typography>
          </Box>
        )}

        {!!products && (
          <ProductCatalog
            title={t('sliderTitle')}
            products={products}
            basket={basket.products}
            language={language}
            currency={currency}
            onAdd={addToBasket}
            onRemove={removeFromBasket}
            onElect={() => ({})}
            onDetail={goToProductPage}
          />
        )}
      </ShopLayout>
    </PrivateLayout>
  );
}
