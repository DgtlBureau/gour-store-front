import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { SigninPassRecovery, SigninPassRecoveryProps } from './PassRecovery';

export default {
  component: SigninPassRecovery,
  title: 'Signin/PassRecovery',
} as Meta;

const Template: ComponentStory<typeof SigninPassRecovery> = function (args: SigninPassRecoveryProps) {
  return <SigninPassRecovery {...args} />;
};
export const DefaultSigninPassRecovery = Template.bind({});

const props: Partial<SigninPassRecoveryProps> = {
  onSendSMS: phone => '1234',
  onSubmit: data => console.log(data),
};

DefaultSigninPassRecovery.args = props;
