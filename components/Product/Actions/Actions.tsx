import React, { useState } from 'react';

import { Grid, SxProps, useMediaQuery } from '@mui/material';

import { useGetStockQuery } from 'store/api/warehouseApi';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
import { IOption } from 'types/entities/IOption';
import { IOrderProduct } from 'types/entities/IOrderProduct';
import { ProductTypeLabel } from 'types/entities/IProduct';

import { useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getDefaultGramByProductType } from 'utils/catalogUtil';
import { getCurrencySymbol } from 'utils/currencyUtil';
import { getErrorMessage } from 'utils/errorUtil';

import PlusIcon from '@mui/icons-material/Add';
import TrashIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MinusIcon from '@mui/icons-material/Remove';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { productGramList } from 'constants/gramList';
import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

import { ProductCardGramSelect } from '../Card/GramSelect/GramSelect';
import translations from './Actions.i18n.json';
import sxActions from './Actions.styles';

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
  discount = 0,
  currency,
  productType,
  sx = {},
  isElect,
  onAdd,
  onRemove,
  onElect,
}: ProductActionsProps) {
  const { t } = useLocalTranslation(translations);
  const isMobileAndSmallTablet = useMediaQuery('(max-width: 744px)');

  const [productGramValue, selectProductGramValue] = useState(() => getDefaultGramByProductType(productType));

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
      skip: !productGramValue || !moyskladId,
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

  const onSelectGram = (value: string | number) => selectProductGramValue(+value);

  const pricePerCount = price;

  const total = Math.round(pricePerCount * ((100 - discount) / 100));

  const isAmountMoreThanCost = !isStockFetching && (basketProduct?.amount || 0) >= Number(stock?.value);
  const isAddDisabled = isStockFetching || isStockError || isAmountMoreThanCost;

  const handleAddClick = () => {
    if (!isAddDisabled) onAdd(productGramValue);
  };

  const handleRemoveClick = () => {
    onRemove(productGramValue);
  };

  return (
    <Box sx={{ ...sx, ...sxActions.container } as SxProps}>
      {!isStockFetching && stockError && (
        <Typography variant='body1' sx={{ width: '100%', order: -2, marginBottom: '10px', color: 'red' }}>
          {stockError}
        </Typography>
      )}

      <Typography variant='body2' sx={sxActions.stock}>
        {isStockFetching && 'Загрузка остатков...'}
        {!isStockFetching && !moyskladId && 'Не указан ID у МойСклад'}
        {!isStockFetching && moyskladId && !isStockError && <>Осталось на складе: {stock?.value}&nbsp;шт.</>}
      </Typography>

      <Box sx={sxActions.docket}>
        <Box sx={sxActions.total}>
          <Typography variant='h6' color={discount ? 'error' : 'primary'} sx={sxActions.price}>
            {total}&nbsp;{getCurrencySymbol(currency)}
          </Typography>
        </Box>

        {!!discount && (
          <Typography variant='body2' sx={sxActions.oldPrice}>
            {pricePerCount}
            {getCurrencySymbol(currency)}
          </Typography>
        )}
      </Box>

      <ProductCardGramSelect
        showLabelOnTablets
        sx={sxActions.select}
        gram={productGramValue}
        onChange={onSelectGram}
        options={productGramOptions}
      />

      <Box sx={sxActions.buyBtnWrapper}>
        {isMobileAndSmallTablet ? (
          <IconButton disabled={isAddDisabled} onClick={handleAddClick} sx={{ cursor: 'pointer' }}>
            <CartIcon sx={sxActions.icon} />
          </IconButton>
        ) : (
          <Grid container sx={sxActions.btnGroup}>
            {basketProduct ? (
              <>
                <Grid item xs={4} sx={sxActions.action}>
                  <IconButton onClick={handleRemoveClick}>
                    {basketProduct?.amount === 1 ? (
                      <TrashIcon sx={sxActions.icon} />
                    ) : (
                      <MinusIcon sx={sxActions.icon} />
                    )}
                  </IconButton>
                </Grid>

                <Grid item xs={4} sx={sxActions.action}>
                  {basketProduct.amount * basketProduct.gram}&nbsp;{t('g')}
                </Grid>

                <Grid item xs={4} sx={sxActions.action}>
                  <IconButton
                    sx={{ cursor: isAddDisabled ? 'not-allowed' : 'pointer' }}
                    disabled={isAddDisabled}
                    onClick={handleAddClick}
                  >
                    <PlusIcon sx={sxActions.icon} />
                  </IconButton>
                </Grid>
              </>
            ) : (
              <Box sx={sxActions.buyBtnCircle} onClick={handleAddClick}>
                <CartIcon sx={sxActions.icon} />
                <Typography sx={sxActions.buyBtnLabel} variant='body1'>
                  Купить
                </Typography>
              </Box>
            )}
          </Grid>
        )}
      </Box>

      <IconButton sx={{ ...sxActions.favoriteBtn, ...(isElect && sxActions.favoriteBtnElected) }} onClick={onElect}>
        <FavoriteIcon sx={sxActions.icon} />
      </IconButton>
    </Box>
  );
}
