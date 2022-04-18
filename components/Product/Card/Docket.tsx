import React, { useState } from 'react';
import { Menu, MenuItem, IconButton } from '@mui/material';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { defaultTheme as t } from '../../../themes';
import { Weight } from '../../../@types/entities/Weight';

import Arrow from '@mui/icons-material/KeyboardArrowDown';

const sx = {
  docket: {
    display: 'flex',
    flexDirection: 'column',
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
    alignItems: 'center',
    marginRight: '5px',
    fontWeight: 'bold',
  },
  price: {
    fontWeight: 'bold',
    fontFamily: ' Roboto slab',
  },
  oldPrice: {
    textDecoration: 'line-through',
  },
  list: {
    ul: {
      backgroundColor: t.palette.background.default,
    }
  },
  listOldPrice: {
    marginLeft: '4px',
    textDecoration: 'line-through',
    color: t.palette.text.muted,
  },
};

type Props = {
  inCart: boolean;
  currentWeight: Weight;
  weights: Weight[];
  weightId: number;
  price: number;
  discount: number;
  onEdit: (id: number) => void;
}

export function ProductCardDocket({
  inCart,
  currentWeight,
  weights,
  weightId,
  price,
  discount,
  onEdit,
}: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const getCost = (weight: {value: number; unit: 'г' | 'кг'}) => (price / (weight.unit === 'г' ? 100 : 1000)) * weight.value;

  const total = getCost(currentWeight);

  const openList = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    setAnchorEl(e.currentTarget);
  };
  const closeList = () => setAnchorEl(null);

  const selectWeight = (i: number) => {
    onEdit(i);
    setAnchorEl(null);
  };

  return (
    <Box sx={{ ...sx.docket, ...(inCart && sx.deployed)}}>
      <Box sx={sx.weight}>
        {
          !!discount && (
            <>
              <Typography variant="body2" sx={sx.oldPrice}>
                {total}
                ₽
              </Typography>
              {!inCart && '/'}
            </>
          )
        }
        {
          !inCart && (
            <Typography variant="body2">
              {currentWeight.value}
              {currentWeight.unit}
            </Typography>
          )
        }
      </Box>

      <Box sx={sx.total}>
        <Typography 
          variant={inCart ? 'h6' : 'h5'} 
          color={discount ? 'error' : 'primary'}
          sx={sx.price}
        >
          {discount ? total * (1 - discount) : total}
          ₽
        </Typography>
        {
          !inCart && (
            <>
              <IconButton onClick={openList} size="small">
                <Arrow color="primary" />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={!!anchorEl}
                onClose={closeList}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
                }}
                sx={sx.list}
              >
                {
                  weights.map((weight, i) => (
                    <MenuItem
                      key={`${weight.value}${weight.unit}`}
                      selected={i === weightId}
                      onClick={() => selectWeight(i)}
                    >
                      <Typography variant="body1">
                        {weight.value}
                        {weight.unit}
                        {' / '}
                        {discount ? getCost(weight) * (1 - discount) : getCost(weight)}
                        ₽
                      </Typography>
                      {
                        discount && (
                          <Typography variant="body2" sx={sx.listOldPrice}>
                            {getCost(weight)}
                            ₽
                          </Typography>
                        )
                      }
                    </MenuItem>
                  ))
                }
              </Menu>
            </>
          )
        }
      </Box>
    </Box>
  );
}
