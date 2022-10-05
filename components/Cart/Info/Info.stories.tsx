import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CartInfo } from './Info';

export default {
  title: 'Cart/Info',
  component: CartInfo,
} as ComponentMeta<typeof CartInfo>;

const Template: ComponentStory<typeof CartInfo> = args => <CartInfo {...args} />;

export const DefaultState = Template.bind({});

DefaultState.args = {
  count: 3,
  weight: 0.6,
  price: 2230,
  delivery: 500,
  discount: 570,
};
