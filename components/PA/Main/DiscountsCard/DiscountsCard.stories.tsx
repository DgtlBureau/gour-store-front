import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { PADiscountsCard, PADiscountsCardProps } from './DiscountsCard';

export default {
  component: PADiscountsCard,
  title: 'PA/Main/DiscountsCard',
} as Meta;

const Template: ComponentStory<typeof PADiscountsCard> = function (args: PADiscountsCardProps) {
  return <PADiscountsCard {...args} />;
};
export const DefaultPAOrdersCard = Template.bind({});

const props: Partial<PADiscountsCardProps> = {
  discounts: [
    {
      id: '1',
      title: 'Страны',
      category: 'Россия',
      percent: 10,
    },
    {
      id: '2',
      title: 'Вид молока',
      category: 'Козье',
      percent: 20,
    },
    {
      id: '3',
      title: 'Test 3',
      category: 'category 3',
      percent: 15,
    },
    {
      id: '4',
      title: 'Страны',
      category: 'Россия',
      percent: 10,
    },
    {
      id: '5',
      title: 'Вид молока',
      category: 'Козье',
      percent: 20,
    },
    {
      id: '6',
      title: 'Test 3',
      category: 'category 3',
      percent: 15,
    },
  ],
};

DefaultPAOrdersCard.args = props;
