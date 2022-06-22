import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { OrderForm, PersonalFields, DeliveryFields } from './Form';

export default {
  component: OrderForm,
  title: 'OrderForm',
} as Meta;

const profiles = [
  {
    value: 0,
    label: 'Латышских стрелков, 5',
  },
  {
    value: 1,
    label: 'Стрелков латышских, 10',
  },
];

const Template: ComponentStory<typeof OrderForm> = function () {
  return (
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
};
export const DefaultOrderForm = Template.bind({});
