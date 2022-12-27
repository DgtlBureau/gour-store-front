import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { OrderForm, OrderFormProps } from './Form';

export default {
  component: OrderForm,
  title: 'OrderForm',
} as Meta;

const Template: ComponentStory<typeof OrderForm> = args => <OrderForm {...args} />;

export const DefaultOrderForm = Template.bind({});

const props: Partial<OrderFormProps> = {};

DefaultOrderForm.args = props;
