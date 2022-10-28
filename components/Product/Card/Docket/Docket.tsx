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
  price: number;
  discount?: number;
  currency: Currency;
  onChangeGram(value: number): void;
};

export function ProductCardDocket({
  gram,
  gramOptions,
  price,
  discount = 0,
  currency,
  onChangeGram,
}: ProductCardDocketProps) {
  const priceByGrams = Math.ceil((price / 1000) * gram); // изначально цена указывается за 1кг
  const priceWithDiscount = getPriceWithDiscount(priceByGrams, discount);
  const currencySymbol = getCurrencySymbol(currency);

  const changeGram = (value: number) => onChangeGram(value);

  return (
    <Box sx={sx.docket}>
      <Box>
        <Box sx={sx.weight}>
          {!!discount && (
            <>
              <Typography variant='body2' sx={sx.oldPrice}>
                {priceByGrams}
                {currencySymbol}
              </Typography>
              &nbsp;/&nbsp;
            </>
          )}

          <Typography variant='body2' sx={sx.unit}>
            {gram}&nbsp;г
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
