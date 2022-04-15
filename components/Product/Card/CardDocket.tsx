import React, { useState } from 'react';
import classNames from 'classnames';
import { Menu, MenuItem, IconButton } from '@mui/material';

import arrowIcon from '../../../assets/icons/arrow.svg';

import s from './Card.module.scss';

const listOldPriceSx = {
  marginLeft: '4px',
  fontSize: '13px',
  textDecoration: 'line-through',
  color: '#778192',
};

const listItemSx = {
  fontSize: '15px',
};

type Props = {
  inCart: boolean;
  price: number;
  discount: number;
}

export function ProductCardDocket({
  inCart,
  price,
  discount,
}: Props) {

  return (
    <div className={s.docket}>
      <div className={s.weight_n_discount}>
        {discount && (
          <>
            <span className={s.old_price}>
              {price}
              ₽
            </span>
            {!inCart && ' / '}
          </>
        )}
        {!inCart && (
          <span className={s.weight}>
            100 г
          </span>
        )}
      </div>

      <div className={s.total}>
        <span className={classNames(s.price, discount && s.with_discount)}>
          {discount ? price * (1 - discount) : price}
          ₽
        </span>
      </div>
    </div>
  );
}
