import React, { useState } from 'react';

import { Grid, SxProps } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Select, SelectOption } from 'components/UI/Select/Select';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';
import { IOrderProduct } from 'types/entities/IOrderProduct';
import { ProductTypeLabel } from 'types/entities/IProduct';

import { useAppSelector } from 'hooks/store';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getDefaultGramByProductType } from 'utils/catalogUtil';
import { getCurrencySymbol } from 'utils/currencyUtil';

import PlusIcon from '@mui/icons-material/Add';
import TrashIcon from '@mui/icons-material/DeleteForever';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MinusIcon from '@mui/icons-material/Remove';
import CartIcon from '@mui/icons-material/ShoppingCart';
import { productGramList } from 'constants/gramList';
import { getProductKeyInBasket } from 'pages/personal-area/orders/ordersHelper';

import translations from './Actions.i18n.json';
import sxActions from './Actions.styles';

export type ProductActionsProps = {
  id: number;
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
  price,
  discount = 0,
  currency,
  productType,
  sx,
  isElect,
  onAdd,
  onRemove,
  onElect,
}: ProductActionsProps) {
  const { t } = useLocalTranslation(translations);

  const [productGramValue, selectProductGramValue] = useState(() => getDefaultGramByProductType(productType));

  const basketProductsKey = getProductKeyInBasket(id, productGramValue);
  const basketProduct = useAppSelector(state => state.order.products[basketProductsKey]) as IOrderProduct | undefined;
  const [productGramOptions] = useState<SelectOption[]>(
    () =>
      (productType &&
        productGramList[productType].map(gram => ({
          label: `${gram} гр.`,
          value: gram,
        }))) ||
      [],
  );

  const onSelectGram = (value: string | number) => selectProductGramValue(+value);

  const pricePerCount = price;

  const total = pricePerCount * ((100 - discount) / 100);

  return (
    <Box sx={{ ...sxActions.container, ...sx }}>
      <Box sx={sxActions.docket}>
        <Box sx={sxActions.total}>
          <Typography variant='h6' color={discount ? 'error' : 'primary'} sx={sxActions.price}>
            {total}&nbsp; {getCurrencySymbol(currency)}
          </Typography>
        </Box>

        {!!discount && (
          <Typography variant='body2' sx={sxActions.oldPrice}>
            {pricePerCount}
            {getCurrencySymbol(currency)}
          </Typography>
        )}
      </Box>

      <Select
        selectSx={sxActions.select}
        value={productGramValue}
        onChange={onSelectGram}
        options={productGramOptions}
      />

      <Box sx={sxActions.actions}>
        <Box sx={sxActions.cart}>
          {!basketProduct || basketProduct.amount === 0 ? (
            <IconButton onClick={() => onAdd(productGramValue)}>
              <CartIcon sx={sxActions.icon} />
            </IconButton>
          ) : (
            <Grid container sx={sxActions.btnGroup}>
              <Grid item xs={4} sx={sxActions.action}>
                <IconButton onClick={() => onRemove(productGramValue)}>
                  {basketProduct?.amount === 1 ? <TrashIcon sx={sxActions.icon} /> : <MinusIcon sx={sxActions.icon} />}
                </IconButton>
              </Grid>

              <Grid item xs={4} sx={sxActions.action}>
                {basketProduct.amount * basketProduct.gram}&nbsp;{t('g')}
              </Grid>

              <Grid item xs={4} sx={sxActions.action}>
                <IconButton onClick={() => onAdd(productGramValue)}>
                  <PlusIcon sx={sxActions.icon} />
                </IconButton>
              </Grid>
            </Grid>
          )}
        </Box>

        <IconButton sx={isElect ? sxActions.favoriteBtn : sxActions.favoriteElect} onClick={onElect}>
          <FavoriteIcon sx={sxActions.icon} />
        </IconButton>
      </Box>
    </Box>
  );
}
