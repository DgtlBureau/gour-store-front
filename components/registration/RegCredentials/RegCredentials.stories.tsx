import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Box } from '../../UI/Box/Box';
import { RegCredentials, RegCredentialsProps } from './RegCredentials';
import { SignUpDto } from '../../../@types/dto/signup.dto';

export default {
  component: RegCredentials,
  title: 'components/RegCredentials',
} as Meta;

const boxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh',
  backgroundColor: 'gray',
};

const Template: ComponentStory<typeof RegCredentials> = function (args: RegCredentialsProps) {
  return (
    <Box sx={boxSx}>
      <RegCredentials {...args} />
    </Box>
  );
};
export const DefaultRegCredentials = Template.bind({});

const props: Partial<RegCredentialsProps> = {
  defaultValues: {
    type: 'physical',
    phone: '',
    sms: '',
    password: '',
    passwordConfirm: '',
    referral: '',
  },
  onSendSMS: (phone: string) => '1234',
  onSubmit: (data: SignUpDto) => console.log(data),
};

DefaultRegCredentials.args = props;
