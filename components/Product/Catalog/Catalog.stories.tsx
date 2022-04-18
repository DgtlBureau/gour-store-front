import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { ProductCatalog, ProductCatalogProps } from './Catalog';
import { Weight } from '../../../@types/entities/Weight';

export default {
  component: ProductCatalog,
  title: 'Product/Catalog',
} as Meta;

const DESCRIPTION = `
  Обладает белым цветом, чистым, кисломолочным, 
  чуть сладковатым вкусом и нежной, ломкой структурой. 
  Благодаря изготовлению из козьего молока усиливает иммунитет,
  содержит ценные витамины и минералы.
  Прекрасен как самостоятельное блюдо в сочетании с белым или розовым вином.
`;

const WEIGHTS = [
  {
    value: 100,
    unit: 'г',
  },
  {
    value: 200,
    unit: 'г',
  },
  {
    value: 300,
    unit: 'г',
  },
] as Weight[];

const PRICE = 350;

const PREVIEW_SRC =
  'https://posta-magazine.ru/wp-content/uploads/2020/01/l_main_goatcheese-places_posta-magazine.jpg';

const createProductById = (id: number) => (
  {
    id,
    title: "Chevrano XO Козий Элитный Сыр",
    description: DESCRIPTION,
    rating: 4.3,
    weightId: 0,
    weights: WEIGHTS,
    price: PRICE,
    cost: `${PRICE * 10}₽/кг`,
    previewSrc: PREVIEW_SRC,
    inCart: false,
    isElected: false,
  }
);

const Template: ComponentStory<typeof ProductCatalog> = function (args: ProductCatalogProps) {
  return <ProductCatalog {...args} />;
};
export const DefaultCatalog = Template.bind({});

const props: Partial<ProductCatalogProps> = {
  products: [
    createProductById(0),
    createProductById(1),
    createProductById(2),
    createProductById(3),
    createProductById(4),
    createProductById(5),
    createProductById(6),
    createProductById(7),
    createProductById(8),
    createProductById(9),
    createProductById(10),
    createProductById(11),
    createProductById(12),
    createProductById(13),
    createProductById(14),
    createProductById(15),
    createProductById(16),
    createProductById(17),
    createProductById(18),
    createProductById(19),
  ],
};

DefaultCatalog.args = props;
