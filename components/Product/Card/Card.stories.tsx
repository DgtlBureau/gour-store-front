import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductCard } from './Card';
import { Weight } from '../../../@types/entities/Weight';

import spainIcon from '../../../assets/icons/countries/spain.svg';

export default {
  component: ProductCard,
  title: 'Product/Card',
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

const countrySrc = spainIcon;

const PREVIEW_SRC =
  'https://posta-magazine.ru/wp-content/uploads/2020/01/l_main_goatcheese-places_posta-magazine.jpg';

const Template: ComponentStory<typeof ProductCard> = function () {
  const [weightId, setWeightId] = useState(0);
  const [inCart, setInCart] = useState(false);
  const [isElected, setIsElected] = useState(false);

  return (
    <ProductCard
      currentCount={1}
      isWeightGood={true}
      currency="cheeseCoin"
      title="Chevrano XO Козий Элитный Сыр"
      description={DESCRIPTION}
      rating={4.3}
      price={PRICE}
      previewSrc={PREVIEW_SRC}
      country={countrySrc}
      inCart={inCart}
      isElected={isElected}
      onAdd={() => setInCart(true)}
      onRemove={() => setInCart(false)}
      onElect={() => setIsElected(!isElected)}
      onDetail={() => ({})}
    />
  );
};

export const DefaultProductCard = Template.bind({});
