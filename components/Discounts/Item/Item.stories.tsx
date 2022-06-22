import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Item } from './Item';

export default {
  component: Item,
  title: 'Item',
} as Meta;

const Template: ComponentStory<typeof Item> = args => <Item {...args} />;
export const DefaultItem = Template.bind({});
const props = {
  activeStep: 5,
  stepsCount: 10,
};

DefaultItem.args = props;
