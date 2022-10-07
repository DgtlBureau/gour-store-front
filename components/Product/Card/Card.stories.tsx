import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { imageByCountry } from 'constants/countries';

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
      currentCount={1}
      isWeightGood
      currency='cheeseCoin'
      title='Chevrano XO Козий Элитный Сыр'
      description={DESCRIPTION}
      rating={4.3}
      price={PRICE}
      previewImg={PREVIEW_SRC}
      countryImg={imageByCountry.Russia}
      isElected={isElected}
      onAdd={() => ({})}
      onRemove={() => ({})}
      onElect={() => setIsElected(!isElected)}
      onDetail={() => ({})}
    />
  );
};

export const DefaultProductCard = Template.bind({});
