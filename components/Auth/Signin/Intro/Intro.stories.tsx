import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { Box } from 'components/UI/Box/Box';

import { SigninIntro, SigninIntroProps } from './Intro';

export default {
  component: SigninIntro,
  title: 'Signin/Intro',
} as Meta;

const boxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  backgroundColor: 'gray',
};

const Template: ComponentStory<typeof SigninIntro> = args => (
  <Box sx={boxSx}>
    <SigninIntro {...args} />
  </Box>
);
export const DefaultSigninIntro = Template.bind({});

const props: Partial<SigninIntroProps> = {};

DefaultSigninIntro.args = props;
