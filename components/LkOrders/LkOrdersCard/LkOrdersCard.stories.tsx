import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { LkOrdersCard, LkOrdersCardProps } from './LkOrdersCard';

export default {
  component: LkOrdersCard,
  title: 'components/LkOrders/LkOrdersCard',
} as Meta;

const Template: ComponentStory<typeof LkOrdersCard> = (
  args: LkOrdersCardProps
) => <LkOrdersCard {...args} />;
export const DefaultLkOrdersCard = Template.bind({});
const props: Partial<LkOrdersCardProps> = {
  isOpened: true,
  title: 'Заказ T212486314',
  status: {
    title: 'test',
    color: 'yellow',
  },
  createdAt: new Date(),
  address: 'Санкт-Петербург, Каменноостровский пр., дом 43, квартира 44',
  client: 'Иван Иванов',
  currency: 'rub',
  products: [
    {
      photo:
        'https://images.unsplash.com/photo-1652173254238-38fb2aa89ffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      title: 'string',
      weight: 200,
      amount: 4,
      cost: 6000,
      isWeightGood: true,
    },
    {
      photo:
        'https://images.unsplash.com/photo-1652173254238-38fb2aa89ffd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80',
      title: 'string',
      weight: 500,
      amount: 1,
      cost: 2500,
      isWeightGood: false,
    },
  ],
  promotions: [
    { title: 'string', amount: 150 },
    { title: 'string', amount: 500 },
    { title: 'string', amount: 360 },
  ],
  deliveryCost: 500,
};

DefaultLkOrdersCard.args = props;
