import React from 'react';

import { SxProps } from '@mui/material';

import { CardSlider } from 'components/CardSlider/CardSlider';

import { IExtendedProduct, IProduct } from 'types/entities/IProduct';
import { Language } from 'types/entities/Language';

import { ProductCard } from '../Card/Card';
import { getPriceByRole } from '../../../types/entities/IPrice';
import { useGetCurrentUserQuery } from '../../../store/api/currentUserApi';

export type ProductSliderProps = {
  title?: string;
  emptyText?: string;
  products: IExtendedProduct[];
  language: Language;
  discount?: number;
  sx?: SxProps;
  onAdd: (product: IProduct, gram: number) => void;
  onRemove: (product: IProduct, gram: number) => void;
  onElect: (productId: number, isElect: boolean) => void;
};

export function ProductSlider({
  title,
  emptyText = 'Продукты не найдены',
  products,
  language,
  discount,
  sx,
  onAdd,
  onRemove,
  onElect,
}: ProductSliderProps) {
  const { data: currentUser } = useGetCurrentUserQuery();


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
          price={getPriceByRole(product.price,currentUser?.role)}
          discount={discount || product.discount}
          productType={product.productType}
          previewImg={product.images[0]?.small || ''}
          countryImg={product.countryImg}
          backgroundImg={product.backgroundImg}
          isElected={product.isElected}
          onAdd={(gram: number) => onAdd(product, gram)}
          onRemove={(gram: number) => onRemove(product, gram)}
          onElect={() => onElect(product.id, product.isElected)}
          defaultWeight={product.defaultWeight}
          defaultStock={product.defaultStock}
          weight={product.weight}
        />
      ))}
      sx={sx}
    />
  );
}
