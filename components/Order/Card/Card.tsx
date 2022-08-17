import React from 'react';
import { Stack, SxProps } from '@mui/material';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { Typography } from 'components/UI/Typography/Typography';
import { getDeclensionWordByCount } from 'utils/wordHelper';
import { getCurrencySymbol } from 'helpers/currencyHelper';
import { Box } from '../../UI/Box/Box';
import translation from './Card.i18n.json';
import { Currency } from '../../../@types/entities/Currency';
import { Language } from '../../../@types/entities/Language';
import { IOrderProduct } from '../../../@types/entities/IOrderProduct';

type Props = {
  currency: Currency;
  language: Language;
  totalProductCount: number;
  totalCartPrice: number;
  productsList: IOrderProduct[];
  sx?: SxProps;
};

const cardSx = {
  card: {
    width: '100%',
    padding: '30px',
    backgroundColor: 'background.paper',
    borderRadius: '6px',
  },
  footer: {
    width: '100%',
    borderTop: '1px dashed',
    borderColor: 'text.muted',
    margin: '20px 0 0 0',
    padding: '20px 0 0 0',
  },
  field: {
    display: 'flex',
    flexDirection: {
      xs: 'column',
      sm: 'row',
      md: 'column',
    },
    gap: {
      xs: 0,
      sm: '20px',
      md: 0,
    },
    marginBottom: '10px',
  },
  count: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    margin: '0 0 20px 0',
  },
  product: {
    width: 'fit-content',
    color: 'text.muted',
  },
  total: {
    fontFamily: 'Roboto slab',
    fontWeight: 'bold',
    color: 'text.secondary',
  },
};

export function OrderCard({ totalProductCount, totalCartPrice, productsList, currency, language, sx }: Props) {
  const { t } = useLocalTranslation(translation);

  const currencySymbol = getCurrencySymbol(currency);

  const productInfo = productsList.map(product => {
    const productTotalPrice = product.product.isWeightGood
      ? product.weight * (product.product.price[currency] / 100)
      : product.amount * product.product.price[currency];
    const productTotalCount = product.product.isWeightGood ? product.weight / 1000 : product.amount;
    return {
      id: product.product.id,
      title: product.product.title[language],
      totalPrice: productTotalPrice,
      totalCount: `${productTotalCount} ${product.product.isWeightGood ? t('kg') : t('piece')}`,
    };
  });

  const productsCountText = getDeclensionWordByCount(totalProductCount, [
    t('manyProducts'),
    t('oneProduct'),
    t('someProducts'),
  ]);

  return (
    <Stack sx={{ ...cardSx.card, ...sx }}>
      <Typography sx={cardSx.count} variant='h6'>
        {totalProductCount} {productsCountText} {t('inOrder')}
      </Typography>

      {productInfo.map(product => (
        <Box key={product.id} sx={cardSx.field}>
          <Typography variant='body1' sx={cardSx.product}>
            {product.title}
          </Typography>

          <Typography variant='body1' sx={cardSx.product}>
            {product.totalPrice} {currencySymbol} • {product.totalCount}
          </Typography>
        </Box>
      ))}

      <Stack sx={cardSx.footer} direction='row' justifyContent='space-between'>
        <Typography variant='h6' sx={cardSx.total}>
          {t('total')}
        </Typography>
        <Typography variant='h6' sx={cardSx.total}>
          {totalCartPrice} {currencySymbol}
        </Typography>
      </Stack>
    </Stack>
  );
}
