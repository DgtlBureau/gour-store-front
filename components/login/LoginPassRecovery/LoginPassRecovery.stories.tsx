import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { LoginPassRecovery, LoginPassRecoveryProps } from './LoginPassRecovery';

export default {
  component: LoginPassRecovery,
  title: 'Login/PassRecovery',
} as Meta;

const Template: ComponentStory<typeof LoginPassRecovery> = function (args: LoginPassRecoveryProps) {
  return <LoginPassRecovery {...args} />;
};
export const DefaultLoginPassRecovery = Template.bind({});

const props: Partial<LoginPassRecoveryProps> = {
  onSendSMS: phone => '1234',
  onSubmit: data => console.log(data),
};

DefaultLoginPassRecovery.args = props;
