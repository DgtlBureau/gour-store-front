import React from 'react';

import translations from '../Actions/Actions.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { getCurrencySymbol } from '../../../helpers/currencyHelper';
import { Currency } from '../../../@types/entities/Currency';
import { defaultTheme as t } from '../../../themes';

const sx = {
  docket: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  deployed: {
    flexDirection: 'row-reverse',
    alignItems: 'center',
    justifyContent: 'flex-end',

    width: '100%',
    marginBottom: '8px',
  },
  weight: {
    display: 'flex',
    color: t.palette.text.muted,
  },
  total: {
    display: 'flex',
    marginRight: '5px',
    fontWeight: 'bold',
  },
  price: {
    fontSize: {
      xs: '16px',
      sm: '20px',
      md: '24px',
    },
    fontWeight: 'bold',
    fontFamily: ' Roboto slab',
  },
  unit: {
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
  },
  oldPrice: {
    fontSize: {
      xs: '12px',
      sm: '13px',
      md: '14px',
    },
    textDecoration: 'line-through',
  },
};

type Props = {
  inCart: boolean;
  isWeightGood: boolean;
  price: number;
  discount?: number;
  currency: Currency;
};

export function ProductCardDocket({ inCart, price, isWeightGood, discount = 0, currency }: Props) {
  const { t } = useLocalTranslation(translations);

  const pricePerCount = isWeightGood ? price / 100 : price;

  return (
    <Box sx={{ ...sx.docket, ...(inCart && sx.deployed) }}>
      <Box sx={sx.weight}>
        {!!discount && (
          <>
            <Typography variant="body2" sx={sx.oldPrice}>
              {pricePerCount}&nbsp;
              {getCurrencySymbol(currency)}
            </Typography>
            &nbsp;
            {!inCart && '/'}
            &nbsp;
          </>
        )}
        {!inCart && (
          <Typography variant="body2" sx={sx.unit}>
            {isWeightGood ? `100${t('g')}` : t('pcs')}
          </Typography>
        )}
      </Box>

      <Box sx={sx.total}>
        <Typography variant="h6" color={discount ? 'error' : 'primary'} sx={sx.price}>
          {pricePerCount * (1 - discount / 100)}&nbsp;
          {getCurrencySymbol(currency)}
        </Typography>
      </Box>
    </Box>
  );
}
