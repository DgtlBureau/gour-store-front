import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { PAOrdersCard, PAOrdersCardProps } from './OrdersCard';

export default {
  component: PAOrdersCard,
  title: 'PA/Main/OrdersCard',
} as Meta;

const Template: ComponentStory<typeof PAOrdersCard> = function (args: PAOrdersCardProps) {
  return <PAOrdersCard {...args} />;
};
export const DefaultPAOrdersCard = Template.bind({});

const defaultOrder = {
  date: new Date(),
  status: 'Ваш заказ ожидает оплаты',
  currency: 'cheeseCoin',
} as const;

const props: Partial<PAOrdersCardProps> = {
  orders: [
    {
      id: 'T212486314',
      sum: 1000,
      ...defaultOrder,
    },
    {
      id: 'T123486314',
      sum: 2000,
      ...defaultOrder,
    },
    {
      id: 'T5678986314',
      sum: 500,
      ...defaultOrder,
    },
  ],
};

DefaultPAOrdersCard.args = props;
