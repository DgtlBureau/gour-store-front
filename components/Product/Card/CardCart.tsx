import React from 'react';
import { Grid, IconButton } from '@mui/material';

import cartIcon from './cart.svg';
import bucketIcon from './bucket.svg';
import plusIcon from './plus.svg';
import minusIcon from './minus.svg';

import s from './Card.module.scss';

type Props = {
  inCart: boolean;
  onAdd: () => void;
  currentWeight: number;
  increaseWeight: () => void;
  decreaseWeight: () => void;
}

export function ProductCardCart({
  inCart,
  onAdd,
  currentWeight,
  increaseWeight,
  decreaseWeight,
}: Props) {

  return (
    <div className={s.cart}>
      {!inCart ? (
        <IconButton onClick={onAdd}>
          <img src={cartIcon} alt="cartIcon" />
        </IconButton>
      ) : (
        <Grid container>
          <Grid item xs={4}>
            <IconButton className={s.remove} onClick={decreaseWeight}>
              <img src={currentWeight === 100 ? bucketIcon : minusIcon} alt="" />
            </IconButton>
          </Grid>

          <Grid item xs={4}>
            {currentWeight} г
          </Grid>

          <Grid item xs={4}>
            {inCart && (
              <IconButton className={s.add} onClick={increaseWeight}>
                <img src={plusIcon} alt="" />
              </IconButton>
            )}
          </Grid>
        </Grid>
      )}
    </div>
  );
}
