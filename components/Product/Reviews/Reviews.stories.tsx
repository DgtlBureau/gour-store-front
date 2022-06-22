import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { ProductReviewsProps, ProductReviews } from './Reviews';

export default {
  component: ProductReviews,
  title: 'Product/Reviews',
} as Meta;

const Template: ComponentStory<typeof ProductReviews> = function (args: ProductReviewsProps) {
  return <ProductReviews {...args} />;
};
export const DefaultProductInformation = Template.bind({});

const props: Partial<ProductReviewsProps> = {
  reviews: [
    {
      id: 0,
      clientName: 'Али',
      value: 3,
      comment: 'ЭЭЭЭЭЭ',
      date: new Date(),
    },
    {
      id: 1,
      clientName: 'Колян',
      value: 5,
      comment: 'По кайфу',
      date: new Date(),
    },
    {
      id: 3,
      clientName: 'Али',
      value: 3,
      comment: 'ЭЭЭЭЭЭ',
      date: new Date(),
    },
    {
      id: 4,
      clientName: 'Колян',
      value: 5,
      comment: 'По кайфу',
      date: new Date(),
    },
  ],
};

DefaultProductInformation.args = props;
