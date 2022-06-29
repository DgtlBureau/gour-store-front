import React, { useEffect, useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PhoneInput } from './PhoneInput';

export default {
  title: 'UI/PhoneInput',
  component: PhoneInput,
} as ComponentMeta<typeof PhoneInput>;

const Template: ComponentStory<typeof PhoneInput> = function (args) {
  return <PhoneInput {...args} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  id: 'input',
  label: 'Super input',
  variant: 'standard',
};
