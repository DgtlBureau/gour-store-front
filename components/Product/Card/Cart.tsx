import React from 'react';
import { Grid, IconButton } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { defaultTheme as t } from '../../../themes';
import { Weight } from '../../../@types/entities/Weight';

import CartIcon from '@mui/icons-material/ShoppingCart';
import PlusIcon from '@mui/icons-material/Add';
import MinusIcon from '@mui/icons-material/Remove';
import TrashIcon from '@mui/icons-material/DeleteForever';
import { useLocalTranslation } from 'hooks/useLocalTranslation';
import translation from './Cart.i18n.json';

const sx = {
  box: {
    display: 'flex',
    alignItems: 'center',

    marginLeft: 0,

    borderRadius: '99px',

    fontFamily: 'Roboto slab',

    background: t.palette.primary.main,
    color: t.palette.common.white,

    '&: hover': {
      background: t.palette.common.black,
    },
  },
  icon: {
    color: t.palette.common.white,
  },
  deployed: {
    width: '100%',
  },
  action: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
};

type Props = {
  currentCount: number;
  isWeightGood: boolean;
  onAdd: () => void;
  onRemove: () => void;
};

export function ProductCardCart({
  onRemove,
  currentCount,
  isWeightGood,
  onAdd,
}: Props) {
  const { t } = useLocalTranslation(translation);
  return (
    <Box sx={{ ...sx.box, ...(currentCount !== 0 && sx.deployed) }}>
      {currentCount === 0 ? (
        <IconButton onClick={onAdd}>
          <CartIcon sx={sx.icon} />
        </IconButton>
      ) : (
        <Grid container xs>
          <Grid item xs={4} sx={sx.action}>
            <IconButton onClick={onRemove}>
              {currentCount === 1 ? (
                <TrashIcon sx={sx.icon} />
              ) : (
                <MinusIcon sx={sx.icon} />
              )}
            </IconButton>
          </Grid>

          <Grid item xs={4} sx={sx.action}>
            {currentCount} {isWeightGood ? t('kilo') : t('piece')}
          </Grid>

          <Grid item xs={4} sx={sx.action}>
            <IconButton onClick={onAdd}>
              <PlusIcon sx={sx.icon} />
            </IconButton>
          </Grid>
        </Grid>
      )}
    </Box>
  );
}
