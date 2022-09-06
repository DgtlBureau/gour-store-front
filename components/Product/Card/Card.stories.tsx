import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductCard } from './Card';

import russiaIcon from 'assets/icons/countries/russia.svg';

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

const PRICE = 350;

const PREVIEW_SRC = 'https://posta-magazine.ru/wp-content/uploads/2020/01/l_main_goatcheese-places_posta-magazine.jpg';

const Template: ComponentStory<typeof ProductCard> = function () {
  const [, setInCart] = useState(false);
  const [isElected, setIsElected] = useState(false);

  return (
    <ProductCard
      currentCount={1}
      isWeightGood
      currency='cheeseCoin'
      title='Chevrano XO Козий Элитный Сыр'
      description={DESCRIPTION}
      rating={4.3}
      price={PRICE}
      previewSrc={PREVIEW_SRC}
      countrySrc={russiaIcon}
      isElected={isElected}
      onAdd={() => setInCart(true)}
      onRemove={() => setInCart(false)}
      onElect={() => setIsElected(!isElected)}
      onDetail={() => ({})}
    />
  );
};

export const DefaultProductCard = Template.bind({});
