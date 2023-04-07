import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';
import { getDeclensionWordByCount } from 'utils/wordUtil';

import translations from './Form.i18n.json';

import sx from './FormDocket.styles';

type Props = {
  productsCount: number;
  cost: number;
  promotionsDiscount?: number;
  promoCodeDiscount?: number;
  referralCodeDiscount?: number;
  delivery: number;
};

export function OrderFormDocket({
  productsCount,
  cost,
  promotionsDiscount = 0,
  promoCodeDiscount = 0,
  referralCodeDiscount = 0,
  delivery,
}: Props) {
  const { t } = useLocalTranslation(translations);

  const total = cost + delivery - promotionsDiscount - (promoCodeDiscount || referralCodeDiscount);

  const productsDeclision = getDeclensionWordByCount(productsCount, [
    t('manyProducts'),
    t('oneProduct'),
    t('someProducts'),
  ]);

  const currencySymbol = getCurrencySymbol();

  return (
    <Box sx={sx.docket}>
      <Box sx={sx.field}>
        <Typography variant='body1' sx={sx.label}>
          {productsCount} {productsDeclision}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant='h6' sx={sx.value}>
          {cost}&nbsp;
          {currencySymbol}
        </Typography>
      </Box>

      {!!promotionsDiscount && (
        <Box sx={sx.field}>
          <Typography variant='body1' sx={sx.label}>
            {t('promotions')}
          </Typography>
          <hr style={sx.divider} />
          <Typography variant='h6' sx={{ ...sx.value, ...sx.discountValue }}>
            -{promotionsDiscount}&nbsp;
            {currencySymbol}
          </Typography>
        </Box>
      )}

      {promoCodeDiscount ? (
        <Box sx={sx.field}>
          <Typography variant='body1' sx={sx.label}>
            {t('promoCode')}
          </Typography>
          <hr style={sx.divider} />
          <Typography variant='h6' sx={{ ...sx.value, ...sx.discountValue }}>
            -{promoCodeDiscount}&nbsp;
            {currencySymbol}
          </Typography>
        </Box>
      ) : (
        !!referralCodeDiscount && (
          <Box sx={sx.field}>
            <Typography variant='body1' sx={sx.label}>
              {t('referralCode')}
            </Typography>
            <hr style={sx.divider} />
            <Typography variant='h6' sx={{ ...sx.value, ...sx.discountValue }}>
              -{referralCodeDiscount}&nbsp;
              {currencySymbol}
            </Typography>
          </Box>
        )
      )}

      <Box sx={sx.field}>
        <Typography variant='body1' sx={sx.label}>
          {t('delivery')}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant='h6' sx={sx.value}>
          {delivery === 0 ? (
            t('free')
          ) : (
              t('freeAboveCost')          )}
        </Typography>
      </Box>

      <Box sx={{ ...sx.field, ...sx.total }}>
        <Typography variant='body1' sx={sx.label}>
          {t('total')}
        </Typography>
        <hr style={sx.divider} />
        <Typography variant='h5' sx={sx.value}>
          {total}&nbsp;
          {currencySymbol}
        </Typography>
      </Box>
    </Box>
  );
}
