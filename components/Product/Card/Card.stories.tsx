import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { imageByCountry } from 'constants/countries';

import { ProductCard, ProductCardProps } from './Card';

export default {
  component: ProductCard,
  title: 'Product/Card',
} as Meta;

const Template: ComponentStory<typeof ProductCard> = args => {
  const [isElected, setIsElected] = useState(false);
  const [weight, setWeight] = useState(0);

  const changeIsElect = () => setIsElected(!isElected);

  const increaseWeight = (gram: number) => setWeight(weight + gram);
  const decreaseWeight = (gram: number) => setWeight(weight - gram);

  return <ProductCard {...args} onElect={changeIsElect} onAdd={increaseWeight} onRemove={decreaseWeight} />;
};

export const DefaultProductInformation = Template.bind({});

const props: Partial<ProductCardProps> = {
  title: 'Prima Donna Прима Донна',
  rating: 4.93,
  price: 350,
  discount: 0,
  currency: 'cheeseCoin',
  productType: 'Сыр',
  previewImg: '',
  countryImg: '',
  backgroundImg: '',
  isElected: false,
  isWeightGood: false,
};

DefaultProductInformation.args = props;
