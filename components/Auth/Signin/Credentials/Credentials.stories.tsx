import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { SigninCredentials, SigninCredentialsProps } from './Credentials';

export default {
  component: SigninCredentials,
  title: 'Signin/Credentials',
} as Meta;

const Template: ComponentStory<typeof SigninCredentials> = function (args: SigninCredentialsProps) {
  return <SigninCredentials {...args} />;
};
export const DefaultSigninCredentials = Template.bind({});

const props: Partial<SigninCredentialsProps> = {};

DefaultSigninCredentials.args = props;
