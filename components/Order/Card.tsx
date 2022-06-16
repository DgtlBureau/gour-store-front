import { Stack } from '@mui/material';
import { IOrderProduct } from '../../@types/entities/IOrderProduct';
import React from 'react';
import { Typography } from 'components/UI/Typography/Typography';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import translation from './Card.i18n.json';
import { getDeclensionWordByCount } from 'utils/wordHelper';
import { getCurrencySymbol } from 'helpers/currencyHelper';
import { Currency } from '../../@types/entities/Currency';

type Props = {
  currency: Currency;
  totalProductCount: number;
  totalCartPrice: number;
  productsList: IOrderProduct[];
};

const sx = {
  card: {
    width: '100%',
    padding: '30px',
    backgroundColor: 'rgba(235, 235, 235, 1)',
  },
  footer: {
    width: '100%',
    borderTop: 'dashed',
    margin: '20px 0 0 0',
    padding: '20px 0 0 0',
  },
};

export const OrderCard = ({
  totalProductCount,
  totalCartPrice,
  productsList,
  currency,
}: Props) => {
  const { t } = useLocalTranslation(translation);

  const lang = 'ru';
  const currencySymbol = getCurrencySymbol(currency);

  const productInfo = productsList.map(product => {
    const productTotalPrice = product.product.isWeightGood
      ? product.weight * (product.product.price[currency] / 100)
      : product.amount * product.product.price[currency];
    const productTotalCount = product.product.isWeightGood
      ? product.weight / 1000
      : product.amount;
    return {
      id: product.product.id,
      title: product.product.title[lang],
      totalPrice: productTotalPrice,
      totalCount: `${productTotalCount} ${
        product.product.isWeightGood ? t('kg') : t('piece')
      }`,
    };
  });

  const productsCountText = getDeclensionWordByCount(totalProductCount, [
    t('manyProducts'),
    t('oneProduct'),
    t('someProducts'),
  ]);

  return (
    <Stack sx={sx.card}>
      <Typography sx={{ margin: '0 0 20px 0' }} variant="h5">
        {totalProductCount} {productsCountText} в заказе
      </Typography>
      {productInfo.map(product => (
        <Stack key={product.id} sx={{ margin: '0 0 10px 0' }}>
          <Typography variant="body1">{product.title}</Typography>
          <Typography variant="body1">
            {product.totalPrice}
            {currencySymbol} • {product.totalCount}
          </Typography>
        </Stack>
      ))}
      <Stack sx={sx.footer} direction="row" justifyContent="space-between">
        <Typography variant="h5">Итого</Typography>
        <Typography variant="h5">
          {totalCartPrice} {currencySymbol}
        </Typography>
      </Stack>
    </Stack>
  );
};
