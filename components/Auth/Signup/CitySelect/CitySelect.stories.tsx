import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { SignupCitySelect, SignupCitySelectProps } from './CitySelect';
import { Box } from '../../../UI/Box/Box';

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

const Template: ComponentStory<typeof SignupCitySelect> = function (args: SignupCitySelectProps) {
  return (
    <Box sx={boxSx}>
      <SignupCitySelect {...args} />
    </Box>
  );
};
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
  onSubmit: city => console.log(city),
};

DefaultSignupCitySelect.args = props;
