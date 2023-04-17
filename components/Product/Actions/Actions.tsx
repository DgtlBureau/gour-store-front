import React, {useEffect, useState} from 'react';

import { Grid, SxProps } from '@mui/material';
import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

import { IconButton } from 'components/UI/IconButton/IconButton';

import { IOption } from 'types/entities/IOption';
import { IOrderProduct } from 'types/entities/IOrderProduct';
import { ProductTypeLabel } from 'types/entities/IProduct';

import { productGramList } from 'constants/gramList';
import { useAppSelector } from 'hooks/store';
import { getDefaultGramByProductType } from 'utils/catalogUtil';
import { getPriceByGrams } from 'utils/currencyUtil';

import { getStockLabel } from '../Card/Card';
import { ProductCardCart } from '../Card/Cart/Cart';
import { ProductCardGramSelect } from '../Card/GramSelect/GramSelect';
import { ProductPrice } from '../Price/Price';
import { ProductStock } from '../Stock/Stock';

import sxActions from './Actions.styles';

import FavoriteIcon from '@mui/icons-material/Favorite';
import { useLazyGetStockQuery } from 'store/api/warehouseApi';

export type ProductActionsProps = {
  id: number;
  weight: number;
  moyskladId: string | null;
  currentUserCity?: string;
  price: number;
  discount?: number;
  productType: ProductTypeLabel;
  sx?: SxProps;
  isElect: boolean;
  onAdd: (gram: number) => void;
  onRemove: (gram: number) => void;
  onElect: () => void;
  defaultStock?: object;
};

export function ProductActions({
  id,
  weight,
  moyskladId,
  currentUserCity,
  price,
  discount,
  productType,
  sx = {},
  isElect,
  onAdd,
  onRemove,
  onElect,
  defaultStock
}: ProductActionsProps) {
  const [productGramValue, selectProductGramValue] = useState(() => getDefaultGramByProductType(productType));

  // const shouldSkipGettingStocks = !productGramValue || !moyskladId;
  //   const [
  //       getStockQuery, {
  //           data: stock,
  //           isFetching: isStockFetching,
  //           isError: isStockError
  //       }
  //   ] = useLazyGetStockQuery();
  //   useEffect(() => {
  //       getStockQuery({
  //           city: 'Санкт-Петербург',
  //           gram: String(productGramValue),
  //           warehouseId: String(moyskladId),
  //       })
  //   },[]);


  // const someStock: any = Object.keys(stock ?? {}).length ? stock : defaultStock;
  const changeGram = (value: string | number) => {
      selectProductGramValue(+value);
      // if (!weight) {
      //     getStockQuery({
      //         city: 'Санкт-Петербург',
      //         gram: String(value),
      //         warehouseId: String(moyskladId),
      //     })
      // }
  }

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

  // const maxPossibleAmount = weight ? (weight / productGramValue) : someStock?.value;
    // const isAddDisabled = isStockFetching || isStockError || isAmountMoreThanCost || shouldSkipGettingStocks  || (!someStock?.value && !weight);
    // const isAmountMoreThanCost = !isStockFetching && amount >= Number(maxPossibleAmount);
  const maxPossibleAmount = weight / productGramValue;
  const isAmountMoreThanCost = amount >= Number(maxPossibleAmount);
  const isAddDisabled = isAmountMoreThanCost|| !weight;

  const stockLabel = getStockLabel(false, false, moyskladId,weight,productGramValue,undefined);

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
        <ProductPrice price={totalCost} discount={discount} />
      </Grid>
      <Grid item>
        <ProductCardGramSelect
          gram={productGramValue}
          onChange={changeGram}
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
