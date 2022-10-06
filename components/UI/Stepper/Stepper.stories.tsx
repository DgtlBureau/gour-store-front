import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { Stepper } from './Stepper';

export default {
  component: Stepper,
  title: 'Item',
} as Meta;

const Template: ComponentStory<typeof Stepper> = args => <Stepper {...args} />;

export const DefaultItem = Template.bind({});
const props = {
  activeStep: 5,
  stepsCount: 10,
};

DefaultItem.args = props;
