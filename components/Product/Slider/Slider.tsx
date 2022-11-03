import React from 'react';

import { SxProps } from '@mui/material';

import { CardSlider } from 'components/CardSlider/CardSlider';

import { Currency } from 'types/entities/Currency';
import { IExtendedProduct, IProduct } from 'types/entities/IProduct';
import { Language } from 'types/entities/Language';

import { ProductCard } from '../Card/Card';

export type ProductSliderProps = {
  title?: string;
  emptyText?: string;
  products: IExtendedProduct[];
  language: Language;
  currency: Currency;
  discount?: number;
  sx?: SxProps;
  onAdd: (product: IProduct, gram: number) => void;
  onRemove: (product: IProduct, gram: number) => void;
  onElect: (productId: number, isElect: boolean) => void;
  onDetail: (productId: number) => void;
};

export function ProductSlider({
  title,
  emptyText = 'Продукты не найдены',
  products,
  language,
  currency,
  discount,
  sx,
  onAdd,
  onRemove,
  onElect,
  onDetail,
}: ProductSliderProps) {
  return (
    <CardSlider
      title={title}
      emptyText={emptyText}
      cardList={products.map(product => (
        <ProductCard
          key={product.id}
          id={product.id}
          moyskladId={product.moyskladId}
          title={product.title[language]}
          rating={product.grade}
          price={product.price[currency]}
          discount={discount || product.discount}
          currency={currency}
          productType={product.productType}
          previewImg={product.images[0]?.small || ''}
          countryImg={product.countryImg}
          backgroundImg={product.backgroundImg}
          isElected={product.isElected}
          onAdd={(gram: number) => onAdd(product, gram)}
          onRemove={(gram: number) => onRemove(product, gram)}
          onElect={() => onElect(product.id, product.isElected)}
          onDetail={() => onDetail(product.id)}
        />
      ))}
      sx={sx}
    />
  );
}
