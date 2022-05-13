import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { LoginCredentials, LoginCredentialsProps } from './LoginCredentials';

export default {
  component: LoginCredentials,
  title: 'Login/Credentials',
} as Meta;

const Template: ComponentStory<typeof LoginCredentials> = function (args: LoginCredentialsProps) {
  return <LoginCredentials {...args} />;
};
export const DefaultLoginCredentials = Template.bind({});

const props: Partial<LoginCredentialsProps> = {
};

DefaultLoginCredentials.args = props;
