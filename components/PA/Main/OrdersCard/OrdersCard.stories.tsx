import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { PAOrdersCard, PAOrdersCardProps } from './OrdersCard';

export default {
  component: PAOrdersCard,
  title: 'PA/Main/OrdersCard',
} as Meta;

const Template: ComponentStory<typeof PAOrdersCard> = args => <PAOrdersCard {...args} />;
export const DefaultPAOrdersCard = Template.bind({});

const props: Partial<PAOrdersCardProps> = {
  orders: [
    {
      id: 'T212486314',
      date: new Date(),
      status: 'Ваш заказ ожидает оплаты',
      sum: 1000,
      currency: 'cheeseCoin',
    },
    {
      id: 'T123486314',
      date: new Date(),
      status: 'Ваш заказ ожидает оплаты',
      sum: 2000,
      currency: 'cheeseCoin',
    },
    {
      id: 'T5678986314',
      date: new Date(),
      status: 'Ваш заказ ожидает оплаты',
      sum: 500,
      currency: 'cheeseCoin',
    },
  ],
};

DefaultPAOrdersCard.args = props;
