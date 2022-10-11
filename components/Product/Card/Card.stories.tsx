import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import russiaIcon from 'assets/icons/countries/russia.svg';

import { ProductCard } from './Card';

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

const Template: ComponentStory<typeof ProductCard> = () => {
  const [isElected, setIsElected] = useState(false);

  return (
    <ProductCard
      id={1}
      productType='Мясо'
      isWeightGood
      currency='cheeseCoin'
      title='Chevrano XO Козий Элитный Сыр'
      description={DESCRIPTION}
      rating={4.3}
      price={PRICE}
      previewImg={PREVIEW_SRC}
      countryImg={russiaIcon}
      isElected={isElected}
      onAdd={() => ({})}
      onRemove={() => ({})}
      onElect={() => setIsElected(!isElected)}
      onDetail={() => ({})}
    />
  );
};

export const DefaultProductCard = Template.bind({});
