import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { LkMainAddressCard, LkMainAddressCardProps } from './AddressCard';

export default {
  component: LkMainAddressCard,
  title: 'LkMain/AddressCard',
} as Meta;

const Template: ComponentStory<typeof LkMainAddressCard> = function (args: LkMainAddressCardProps) {
  return <LkMainAddressCard {...args} />;
};
export const DefaultLkMainAddressCard = Template.bind({});

const props: Partial<LkMainAddressCardProps> = {
  addresses: [
    {
      label: 'Работа',
      value: 'Рабочий адрес',
    },
    {
      label: 'Дом',
      value: 'Домашний адрес',
    },
  ],
};

DefaultLkMainAddressCard.args = props;
