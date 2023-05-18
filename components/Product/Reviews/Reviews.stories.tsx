import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { ProductReviews, ProductReviewsProps } from './Reviews';

export default {
  component: ProductReviews,
  title: 'Product/Reviews',
} as Meta;

const Template: ComponentStory<typeof ProductReviews> = args => <ProductReviews {...args} />;
export const DefaultProductInformation = Template.bind({});

const props: Partial<ProductReviewsProps> = {
  reviews: [
    {
      productId: 0,
      id: 0,
      clientName: 'Али',
      value: 3,
      comment: 'ЭЭЭЭЭЭ',
      date: new Date(),
    },
    {
      productId: 0,
      id: 1,
      clientName: 'Колян',
      value: 5,
      comment: 'По кайфу',
      date: new Date(),
    },
    {
      productId: 0,
      id: 3,
      clientName: 'Али',
      value: 3,
      comment: 'ЭЭЭЭЭЭ',
      date: new Date(),
    },
    {
      productId: 0,
      id: 4,
      clientName: 'Колян',
      value: 5,
      comment: 'По кайфу',
      date: new Date(),
    },
  ],
};

DefaultProductInformation.args = props;
