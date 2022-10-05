import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { Box } from 'components/UI/Box/Box';

import { SignupCitySelect, SignupCitySelectProps } from './CitySelect';

export default {
  component: SignupCitySelect,
  title: 'Signup/CitySelect',
} as Meta;

const boxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  backgroundColor: 'gray',
};

const Template: ComponentStory<typeof SignupCitySelect> = args => (
  <Box sx={boxSx}>
    <SignupCitySelect {...args} />
  </Box>
);
export const DefaultSignupCitySelect = Template.bind({});

const props: Partial<SignupCitySelectProps> = {
  options: [
    {
      label: 'Москва',
      value: 'moscow',
    },
    {
      label: 'Санкт-Петербург',
      value: 'petersburg',
    },
  ],
};

DefaultSignupCitySelect.args = props;
