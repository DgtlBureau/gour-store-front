import React, { useState } from 'react';

import { Grid, SxProps } from '@mui/material';
import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

import { useGetStockQuery } from 'store/api/warehouseApi';

import { IconButton } from 'components/UI/IconButton/IconButton';

import { Currency } from 'types/entities/Currency';
import { IOption } from 'types/entities/IOption';
import { IOrderProduct } from 'types/entities/IOrderProduct';
import { ProductTypeLabel } from 'types/entities/IProduct';

import { productGramList } from 'constants/gramList';
import { useAppSelector } from 'hooks/store';
import { getDefaultGramByProductType } from 'utils/catalogUtil';
import { getPriceByGrams } from 'utils/currencyUtil';
import { getErrorMessage } from 'utils/errorUtil';

import { getStockLabel } from '../Card/Card';
import { ProductCardCart } from '../Card/Cart/Cart';
import { ProductCardGramSelect } from '../Card/GramSelect/GramSelect';
import { ProductPrice } from '../Price/Price';
import { ProductStock } from '../Stock/Stock';

import sxActions from './Actions.styles';

import FavoriteIcon from '@mui/icons-material/Favorite';

export type ProductActionsProps = {
  id: number;
  moyskladId: string | null;
  currentUserCity?: string;
  price: number;
  discount?: number;
  productType: ProductTypeLabel;
  currency: Currency;
  sx?: SxProps;
  isElect: boolean;
  onAdd: (gram: number) => void;
  onRemove: (gram: number) => void;
  onElect: () => void;
};

export function ProductActions({
  id,
  moyskladId,
  currentUserCity,
  price,
  discount,
  currency,
  productType,
  sx = {},
  isElect,
  onAdd,
  onRemove,
  onElect,
}: ProductActionsProps) {
  const [productGramValue, selectProductGramValue] = useState(() => getDefaultGramByProductType(productType));

  const shouldSkipGettingStocks = !productGramValue || !moyskladId;
  const {
    data: stock,
    isFetching: isStockFetching,
    isError: isStockError,
    error: stockError,
  } = useGetStockQuery(
    {
      city: 'Санкт-Петербург' ?? currentUserCity, // TODO: в будущем отправлять currentUserCity
      gram: String(productGramValue),
      warehouseId: String(moyskladId),
    },
    {
      skip: shouldSkipGettingStocks,
      selectFromResult: ({ error, ...rest }) => ({ ...rest, error: getErrorMessage(error) }),
    },
  );

  const basketProductsKey = getProductKeyInBasket(id, productGramValue);
  const basketProduct = useAppSelector(state => state.order.products[basketProductsKey]) as IOrderProduct | undefined;
  const [productGramOptions] = useState<IOption[]>(() =>
    productGramList[productType]?.map(
      gram =>
        ({
          label: `${gram}\u00A0г`,
          value: String(gram),
        } || []),
    ),
  );

  const amount = basketProduct?.amount || 1;

  const onSelectGram = (value: string | number) => selectProductGramValue(+value);

  const isAmountMoreThanCost = !isStockFetching && amount >= Number(stock?.value);
  const isAddDisabled = isStockFetching || isStockError || isAmountMoreThanCost || shouldSkipGettingStocks;

  const stockLabel = getStockLabel(isStockFetching, isStockError, moyskladId, stock?.value);

  const priceByGram = getPriceByGrams(price, productGramValue);
  const totalCost = priceByGram * amount;

  const handleAddClick = () => {
    if (!isAddDisabled) onAdd(productGramValue);
  };

  const handleRemoveClick = () => {
    onRemove(productGramValue);
  };

  return (
    <Grid container sx={{ ...sx, ...sxActions.container } as SxProps}>
      <Grid item xs md={12}>
        <ProductPrice price={totalCost} discount={discount} currency={currency} />
      </Grid>
      <Grid item>
        <ProductCardGramSelect
          gram={productGramValue}
          onChange={onSelectGram}
          options={productGramOptions}
          sx={sxActions.gramSelect}
        />
      </Grid>
      <Grid item xs={5} md>
        <ProductCardCart
          isDisabled={isAddDisabled}
          amount={basketProduct?.amount}
          gram={productGramValue}
          onAdd={handleAddClick}
          onRemove={handleRemoveClick}
        />
      </Grid>
      <Grid
        item
        sx={{
          display: {
            xs: 'none',
            sm: 'flex',
          },
        }}
      >
        <IconButton sx={{ ...sxActions.favoriteBtn, ...(isElect && sxActions.favoriteBtnElected) }} onClick={onElect}>
          <FavoriteIcon sx={sxActions.icon} />
        </IconButton>
      </Grid>

      <Grid item xs={12}>
        <ProductStock label={stockLabel} fullWidth multiLine />
      </Grid>
    </Grid>
  );
}
