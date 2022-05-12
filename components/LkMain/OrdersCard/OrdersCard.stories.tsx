import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { LkMainOrdersCard, LkMainOrdersCardProps } from './OrdersCard';

export default {
  component: LkMainOrdersCard,
  title: 'LkMain/OrdersCard',
} as Meta;

const Template: ComponentStory<typeof LkMainOrdersCard> = function (args: LkMainOrdersCardProps) {
  return <LkMainOrdersCard {...args} />;
};
export const DefaultLkMainOrdersCard = Template.bind({});

const props: Partial<LkMainOrdersCardProps> = {
  orders: [
    {
      id: 'T212486314',
      date: new Date(),
      status: 'Ваш заказ ожидает оплаты',
      sum: 1000,
      currency: 'rub',
    },
    {
      id: 'T123486314',
      date: new Date(),
      status: 'Ваш заказ ожидает оплаты',
      sum: 2000,
      currency: 'rub',
    },
    {
      id: 'T5678986314',
      date: new Date(),
      status: 'Ваш заказ ожидает оплаты',
      sum: 500,
      currency: 'rub',
    }
  ]
};

DefaultLkMainOrdersCard.args = props;
