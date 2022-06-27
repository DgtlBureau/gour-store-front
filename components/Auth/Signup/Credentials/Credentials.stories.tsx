import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Box } from '../../../UI/Box/Box';
import { SignupCredentials, SignupCredentialsProps } from './Credentials';
import { SignUpFormDto } from '../../../../@types/dto/signup-form.dto';

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

const Template: ComponentStory<typeof SignupCredentials> = function (
  args: SignupCredentialsProps
) {
  return (
    <Box sx={boxSx}>
      <SignupCredentials {...args} />
    </Box>
  );
};
export const DefaultSignupCredentials = Template.bind({});

const props: Partial<SignupCredentialsProps> = {
  defaultValues: {
    role: 'CLIENT',
    phone: '',
    sms: '',
    password: '',
    passwordConfirm: '',
  },
  onSubmit: (data: SignUpFormDto) => console.log(data),
};

DefaultSignupCredentials.args = props;
