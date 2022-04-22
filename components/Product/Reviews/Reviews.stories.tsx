import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductReviewsProps, ProductReviews } from './Reviews';

export default {
  component: ProductReviews,
  title: 'ProductReviews',
} as Meta;

const Template: ComponentStory<typeof ProductReviews> = function (
  args: ProductReviewsProps
) {
  return <ProductReviews {...args} />;
};

export const DefaultProductInformation = Template.bind({});

const props: Partial<ProductReviewsProps> = {};

DefaultProductInformation.args = props;
