import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { DeliveryFields, OrderForm, PersonalFields } from './Form';

export default {
  component: OrderForm,
  title: 'OrderForm',
} as Meta;

const Template: ComponentStory<typeof OrderForm> = () => (
  <OrderForm
    defaultPersonalFields={{} as PersonalFields}
    defaultDeliveryFields={{} as DeliveryFields}
    productsCount={0}
    cost={100}
    discount={10}
    citiesList={[]}
    delivery={0}
    deliveryProfiles={[]}
    onSubmit={() => ({})}
    onChangeDeliveryProfile={() => ({})}
  />
);
export const DefaultOrderForm = Template.bind({});
