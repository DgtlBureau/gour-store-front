import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { RadioButton } from './RadioButton';

export default {
  title: 'UI/RadioButton',
  component: RadioButton,
} as ComponentMeta<typeof RadioButton>;

const Template: ComponentStory<typeof RadioButton> = args => <RadioButton {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {
  checked: true,
  size: 'small',
  color: 'primary',
  defaultChecked: true,
};
