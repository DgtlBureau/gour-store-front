import React from 'react';

import { ProductPrice } from 'components/Product/Price/Price';
import { Box } from 'components/UI/Box/Box';

import { IOption } from 'types/entities/IOption';

import { getPriceByGrams } from 'utils/currencyUtil';

import { ProductCardGramSelect as GramSelect } from '../GramSelect/GramSelect';

import sx from './Docket.styles';

type ProductCardDocketProps = {
  gram: number;
  gramOptions: IOption[];
  price: number;
  discount?: number;
  onChangeGram(value: number): void;
};

export function ProductCardDocket({
  gram,
  gramOptions,
  price,
  discount,
  onChangeGram,
}: ProductCardDocketProps) {
  const priceByGrams = getPriceByGrams(price, gram);

  const changeGram = (value: number) => onChangeGram(value);

  return (
    <Box sx={sx.docket}>
      <ProductPrice price={priceByGrams} discount={discount} withResponsiveFont />

      <GramSelect gram={gram} options={gramOptions} onChange={changeGram} />
    </Box>
  );
}
