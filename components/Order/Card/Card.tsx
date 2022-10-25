import React from 'react';

import { Stack, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
import { IOrderProduct } from 'types/entities/IOrderProduct';
import { Language } from 'types/entities/Language';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';
import { getDeclensionWordByCount } from 'utils/wordUtil';

import translation from './Card.i18n.json';
import cardSx from './Card.styles';

type Props = {
  currency: Currency;
  language: Language;
  totalProductCount: number;
  totalCartPrice: number;
  productsList: IOrderProduct[];
  sx?: SxProps;
};

export function OrderCard({ totalProductCount, totalCartPrice, productsList, currency, language, sx }: Props) {
  const { t } = useLocalTranslation(translation);

  const currencySymbol = getCurrencySymbol(currency);

  const productInfo = productsList.map(product => {
    const productTotalPrice = product.amount * product.product.price[currency];

    const productTotalCount = product.amount; // FIXME:

    return {
      id: product.product.id,
      title: product.product.title[language],
      price: product.product.price[currency],
      totalPrice: productTotalPrice,
      totalCount: `${productTotalCount} ${t('kg')}`,
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

          <Box sx={cardSx.fieldPrice}>
            <Typography variant='body1' sx={cardSx.product}>
              {product.price} {currencySymbol}
            </Typography>
            <Typography variant='body1' sx={cardSx.product}>
              • {product.totalCount}
            </Typography>
          </Box>
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
