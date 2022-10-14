import React, { useState } from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import cheeseBackground from 'assets/images/categories/cheese-background.png';
import { imageByCountry } from 'constants/countries';

import { ProductCard, ProductCardProps } from './Card';

export default {
  component: ProductCard,
  title: 'Product/Card',
} as Meta;

const Template: ComponentStory<typeof ProductCard> = args => {
  const [isElected, setIsElected] = useState(false);
  const [amount, setWeight] = useState(0);
  const [gram, setGram] = useState(0);

  const changeIsElect = () => setIsElected(!isElected);

  const increaseWeight = () => setWeight(amount + 1);
  const decreaseWeight = () => setWeight(amount - 1);

  const changeGram = (value: number) => setGram(value);

  return (
    <ProductCard
      {...args}
      productType='Сыр'
      amount={amount}
      gram={gram}
      onElect={changeIsElect}
      onAdd={increaseWeight}
      onRemove={decreaseWeight}
      onGramChange={changeGram}
    />
  );
};

export const DefaultProductInformation = Template.bind({});

const props: Partial<ProductCardProps> = {
  title: 'Русский сыр',
  rating: 4.93,
  price: 350,
  discount: 10,
  currency: 'cheeseCoin',
  previewImg: '',
  countryImg: imageByCountry.Russia,
  backgroundImg: cheeseBackground,
  isElected: false,
  remains: 5,
};

DefaultProductInformation.args = props;
