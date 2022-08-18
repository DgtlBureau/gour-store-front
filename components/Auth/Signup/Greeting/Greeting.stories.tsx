import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Box } from 'components/UI/Box/Box';
import { SignupGreeting, SignupGreetingProps } from './Greeting';

export default {
  component: SignupGreeting,
  title: 'Signup/Greeting',
} as Meta;

const boxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  backgroundColor: 'gray',
};

const Template: ComponentStory<typeof SignupGreeting> = function (args: SignupGreetingProps) {
  return (
    <Box sx={boxSx}>
      <SignupGreeting {...args} />
    </Box>
  );
};
export const DefaultSignupGreeting = Template.bind({});

const props: Partial<SignupGreetingProps> = {};

DefaultSignupGreeting.args = props;
