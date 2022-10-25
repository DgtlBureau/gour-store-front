import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { CodeInput } from './CodeInput';

export default {
  component: CodeInput,
  title: 'CodeInput',
} as Meta;

const Template: ComponentStory<typeof CodeInput> = args => <CodeInput {...args} />;
export const DefaultCodeInput = Template.bind({});

const props = {};

DefaultCodeInput.args = props;
