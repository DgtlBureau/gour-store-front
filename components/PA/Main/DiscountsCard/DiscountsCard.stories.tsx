import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { PADiscountsCard, PADiscountsCardProps } from './DiscountsCard';

export default {
  component: PADiscountsCard,
  title: 'PA/Main/DiscountsCard',
} as Meta;

const Template: ComponentStory<typeof PADiscountsCard> = args => <PADiscountsCard {...args} />;
export const DefaultPAOrdersCard = Template.bind({});

const props: Partial<PADiscountsCardProps> = {
  discounts: [
    {
      id: 1,
      title: {
        ru: 'Страны',
        en: 'Страны',
      },
      category: {
        id: 1,
        discountPrice: 10,
        title: {
          ru: 'Россия',
          en: 'Россия',
        },
      },
    },
    {
      id: 2,
      title: {
        ru: 'Вид молока',
        en: 'Вид молока',
      },
      category: {
        id: 1,
        title: {
          ru: 'Козье',
          en: 'Козье',
        },
        discountPrice: 20,
      },
    },
    {
      id: 3,
      title: {
        ru: 'Test 3',
        en: 'Test 3',
      },
      category: {
        id: 3,
        title: {
          ru: 'category 3',
          en: 'category 3',
        },
        discountPrice: 15,
      },
    },
  ],
};

DefaultPAOrdersCard.args = props;
