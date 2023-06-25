import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { Box } from 'components/UI/Box/Box';

import { SignupCredentials, SignupCredentialsProps } from './Credentials';

export default {
  component: SignupCredentials,
  title: 'Signup/Credentials',
} as Meta;

const boxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'gray',
};

const Template: ComponentStory<typeof SignupCredentials> = args => (
  <Box sx={boxSx}>
    <SignupCredentials {...args} />
  </Box>
);
export const DefaultSignupCredentials = Template.bind({});

const props: Partial<SignupCredentialsProps> = {
  defaultValues: {
    role: 'CLIENT',
    email: '',
    firstName: '',
    lastName: '',
    password: '',
    passwordConfirm: '',
    code: '',
    referralCode: '',
    city: '',
  },
};

DefaultSignupCredentials.args = props;
