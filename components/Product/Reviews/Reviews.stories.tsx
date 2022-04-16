import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { ProductReviews, ProductReviewsProps } from './Reviews';

export default {
  component: ProductReviews,
  title: 'ProductReviews',
} as Meta;

const Template: ComponentStory<typeof ProductReviews> = function (
  args: ProductReviewsProps
) {
  return <ProductReviews {...args} />;
};
export const DefaultProductPreview = Template.bind({});

const props: Partial<ProductReviewsProps> = {
  reviews: [
    {
      id: 1,
      clientName: 'Mikhail',
      value: 5,
      comment: 'Lorem',
      date: '12.04.2022',
    },
    {
      id: 4,
      clientName: 'Test1',
      value: 5,
      comment: 'Lorem dwqd qwdqw dwq dqwdqwdwg qteb erghtrj w ',
      date: '12.04.2022',
    },
    {
      id: 5,
      clientName: 'Test2',
      value: 5,
      comment: 'Lorem FWE FWERG ERG TNRT VWE F  ED SCA V bfb ebev',
      date: '12.04.2022',
    },
    {
      id: 2,
      clientName: 'Kirill',
      value: 4,
      comment: 'Some text',
      date: '10.04.2022',
    },
    {
      id: 3,
      clientName: 'Mikhail',
      value: 2,
      comment:
        'Lorem ipsum dolor sit amet consectetur adipisicing elit. Et iusto consectetur eos, illo laboriosam libero rerum reiciendis nulla, qui odio tenetur consequatur, velit eaque aperiam harum quo. Architecto, cum beatae!',
      date: '04.04.2022',
    },
  ],
};

DefaultProductPreview.args = props;
