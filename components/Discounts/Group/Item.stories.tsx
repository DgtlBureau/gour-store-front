import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Group } from './Group';

export default {
  component: Group,
  title: 'Group',
} as Meta;

const Template: ComponentStory<typeof Group> = args => <Group {...args} />;
export const DefaultGroup = Template.bind({});
const props = {
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
      summary: 615460,
    },
  ],
};

DefaultGroup.args = props;
