import React from 'react';

import { CardSlider } from '../../CardSlider/CardSlider';
import { ProductCard } from '../Card/Card';
import { Weight } from '../../../@types/entities/Weight';

const windowWidth = document.documentElement.clientWidth;

function getSlidesPerView() {
  if (windowWidth > 1200) return 4;
  if (windowWidth > 940) return 3;
  return 2;
}

type Product = {
  id: number;
  title: string;
  description: string;
  rating: number;
  weightId: number;
  weights: Weight[];
  price: number;
  discount?: number;
  cost: string;
  previewSrc: string;
  countrySrc?: string;
  inCart: boolean;
  isElected: boolean;
};

export type ProductCatalogProps = {
  products: Product[];
  onAdd: (id: number) => void;
  onRemove: (id: number) => void;
  onEdit: (id: number) => void;
  onElect: (id: number) => void;
  onDetail: (id: number) => void;
}

export function ProductCatalog({
  products,
  onAdd,
  onRemove,
  onEdit,
  onElect,
  onDetail,
}: ProductCatalogProps) {
  const slidesPerView = getSlidesPerView();

  return (
    <CardSlider
      title="Каталог товаров"
      rows={3}
      slidesPerView={slidesPerView}
      spaceBetween={0}
      cardsList={(
        products.map(product => (
          <ProductCard 
            key={product.id}
            title={product.title}
            description={product.description}
            rating={product.rating}
            weightId={product.weightId}
            weights={product.weights}
            price={product.price}
            discount={product.discount}
            cost={product.cost}
            previewSrc={product.previewSrc}
            countrySrc={product.countrySrc}
            inCart={product.inCart}
            isElected={product.isElected}
            onAdd={() => onAdd(product.id)}
            onRemove={() => onRemove(product.id)}
            onEdit={() => onEdit(product.id)}
            onElect={() => onElect(product.id)}
            onDetail={() => onDetail(product.id)}
          />
        ))
      )}
    />
  );
}
