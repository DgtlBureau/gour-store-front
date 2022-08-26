import React, { ChangeEvent, useState } from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { PhoneInput } from './PhoneInput';

export default {
  title: 'UI/PhoneInput',
  component: PhoneInput,
} as ComponentMeta<typeof PhoneInput>;

const Template: ComponentStory<typeof PhoneInput> = function ({ onChange, ...args }) {
  const [value, setValue] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.currentTarget.value);
    onChange?.(e);
  };

  return <PhoneInput value={value} {...args} onChange={handleChange} />;
};

export const DefaultState = Template.bind({});
DefaultState.args = {
  id: 'input',
  label: 'Super input',
  variant: 'standard',
};
