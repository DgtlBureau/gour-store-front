import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { DiscountsGroup } from './Group';

export default {
  component: DiscountsGroup,
  title: 'Group',
} as Meta;

const Template: ComponentStory<typeof DiscountsGroup> = args => <DiscountsGroup {...args} />;
export const DefaultGroup = Template.bind({});
const props = {
  key: 'milk',
  title: 'Молоко',
  categories: [
    {
      title: 'Коровье',
      summary: 205600,
    },
    {
      title: 'Козье',
      summary: 105780,
    },
    {
      title: 'Овечье',
      summary: 687460,
    },
  ],
};

DefaultGroup.args = props;
