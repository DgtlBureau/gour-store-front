import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CartEmpty } from './Empty';

export default {
  title: 'Cart/Empty',
  component: CartEmpty,
} as ComponentMeta<typeof CartEmpty>;

const DEFAULT_TITLE = 'В корзине нет товаров';
const DEFAULT_BTN = {
  label: 'Вернуться к покупкам',
  onClick: () => ({}),
};

const Template: ComponentStory<typeof CartEmpty> = () => (
  <CartEmpty title={DEFAULT_TITLE} btn={DEFAULT_BTN}>
    Акции, специальные предложения интересных товаров на помогут вам определиться с выбором!
  </CartEmpty>
);

export const DefaultState = Template.bind({});
