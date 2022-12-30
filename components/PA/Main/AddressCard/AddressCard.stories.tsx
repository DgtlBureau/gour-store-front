import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { PAAddressCard, PAAddressCardProps } from './AddressCard';

export default {
  component: PAAddressCard,
  title: 'PA/Main/AddressCard',
} as Meta;

const Template: ComponentStory<typeof PAAddressCard> = args => <PAAddressCard {...args} />;
export const DefaultPAAddressCard = Template.bind({});

const props: Partial<PAAddressCardProps> = {
  addresses: [
    {
      id: 0,
      title: 'Работа',
      address: 'Рабочий адрес',
    },
    {
      id: 1,
      title: 'Дом',
      address: 'Домашний адрес',
    },
  ],
};

DefaultPAAddressCard.args = props;
