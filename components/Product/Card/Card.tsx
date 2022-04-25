import React from 'react';
import classNames from 'classnames';
import { Card, CardContent, CardMedia, CardActions } from '@mui/material';

import HeartIcon from '@mui/icons-material/Favorite';

import { ProductCardRate as Rate } from './CardRate';
import { ProductCardDocket as Docket } from './CardDocket';
import { ProductCardCart as Cart } from './CardCart';

import s from './Card.module.scss';

export type ProductCardProps = {
  title: string;
  description: string;
  rating: number;
  currentWeight: number;
  price: number;
  discount?: number;
  currency: string;
  previewSrc: string;
  countrySrc?: string;
  inCart: boolean;
  isElected: boolean;
  onAdd: () => void;
  onSubtract: () => void;
  onRemove: () => void;
  onEdit: (id: number) => void;
  onElect: () => void;
  onDetail: () => void;
};

export function ProductCard({
  title,
  description,
  rating,
  currentWeight,
  discount = 0,
  price,
  previewSrc,
  countrySrc,
  inCart,
  isElected,
  onAdd, //добавить
  onSubtract, //вычесть
  onElect,
  onDetail,
}: ProductCardProps) {
  return (
    <Card className={s.card}>
      <CardContent className={s.content}>
        <div className={s.preview_n_heart}>
          <HeartIcon
            className={classNames(s.heart, isElected && s.elected)}
            onClick={onElect}
          />

          <CardMedia
            className={s.preview}
            component="img"
            image={previewSrc}
            onClick={onDetail}
          />

          {countrySrc && <img src={countrySrc} className={s.country} alt="" />}
        </div>

        <Rate rating={rating} price={price} />

        <div className={s.info}>
          <span
            role="button"
            tabIndex={0}
            onKeyPress={undefined}
            className={s.title}
            onClick={onDetail}
          >
            {title}
          </span>

          <span className={s.description}>{description}</span>
        </div>
      </CardContent>

      <CardActions className={classNames(s.actions, inCart && s.deployed)}>
        <Docket inCart={inCart} price={price} discount={discount} />

        <Cart
          inCart={inCart}
          onAdd={onAdd}
          currentWeight={currentWeight}
          increaseWeight={onAdd}
          decreaseWeight={onSubtract}
        />
      </CardActions>
    </Card>
  );
}
