import React from 'react';

import { Box } from 'components/UI/Box/Box';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
import { IOption } from 'types/entities/IOption';

import { getCurrencySymbol, getPriceWithDiscount } from 'utils/currencyUtil';

import { ProductCardGramSelect as GramSelect } from '../GramSelect/GramSelect';
import sx from './Docket.styles';

type ProductCardDocketProps = {
  gram: number;
  gramOptions: IOption[];
  inCart: boolean;
  price: number;
  discount?: number;
  currency: Currency;
  onChangeGram(value: number): void;
};

export function ProductCardDocket({
  gram,
  gramOptions,
  inCart,
  price,
  discount = 0,
  currency,
  onChangeGram,
}: ProductCardDocketProps) {
  const priceBy100g = Math.ceil(price / 10); // изначально цена указывается за 1кг
  const priceWithDiscount = getPriceWithDiscount(priceBy100g, discount);
  const currencySymbol = getCurrencySymbol(currency);

  const changeGram = (value: number) => onChangeGram(value);

  return (
    <Box sx={{ ...sx.docket, ...(inCart && sx.deployed) }}>
      <Box>
        <Box sx={sx.weight}>
          {!!discount && (
            <>
              <Typography variant='body2' sx={sx.oldPrice}>
                {priceBy100g}
                {currencySymbol}
              </Typography>
              &nbsp;/&nbsp;
            </>
          )}

          <Typography variant='body2' sx={sx.unit}>
            100г
          </Typography>
        </Box>

        <Box sx={sx.total}>
          <Typography variant='h6' color={discount ? 'error' : 'primary'} sx={sx.price}>
            {priceWithDiscount}&nbsp;
            {currencySymbol}
          </Typography>
        </Box>
      </Box>

      <GramSelect gram={gram} options={gramOptions} onChange={changeGram} />
    </Box>
  );
}
