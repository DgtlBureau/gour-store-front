import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { CodeInput, CodeInputProps } from './CodeInput';

export default {
  component: CodeInput,
  title: 'UI/Inputs/CodeInput',
} as Meta;

const Template: ComponentStory<typeof CodeInput> = args => <CodeInput {...args} />;
export const DefaultCodeInput = Template.bind({});

const props: Partial<CodeInputProps> = {
  helperText: 'код',
};

DefaultCodeInput.args = props;
