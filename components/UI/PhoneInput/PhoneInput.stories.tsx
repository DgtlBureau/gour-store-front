import React from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { PhoneInput } from './PhoneInput';

export default {
  title: 'UI/PhoneInput',
  component: PhoneInput,
} as ComponentMeta<typeof PhoneInput>;

const Template: ComponentStory<typeof PhoneInput> = args => <PhoneInput {...args} />;

export const DefaultState = Template.bind({});
DefaultState.args = {
  id: 'input',
  label: 'Super input',
  variant: 'standard',
};
