import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Box } from 'components/UI/Box/Box';
import { SignupReferralCode, SignupReferralCodeProps } from './ReferralCode';

export default {
  component: SignupReferralCode,
  title: 'Signup/Greeting',
} as Meta;

const boxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  backgroundColor: 'gray',
};

const Template: ComponentStory<typeof SignupReferralCode> = function (args: SignupReferralCodeProps) {
  return (
    <Box sx={boxSx}>
      <SignupReferralCode {...args} />
    </Box>
  );
};
export const DefaultSignupGreeting = Template.bind({});

const props: Partial<SignupReferralCodeProps> = {};

DefaultSignupGreeting.args = props;
