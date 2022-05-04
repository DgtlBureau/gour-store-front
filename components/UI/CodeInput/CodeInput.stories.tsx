import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { CodeInput, CodeInputProps } from './CodeInput';

export default {
  component: CodeInput,
  title: 'CodeInput',
} as Meta;

const Template: ComponentStory<typeof CodeInput> = function (args: CodeInputProps) {
  return <CodeInput {...args} />;
};
export const DefaultCodeInput = Template.bind({});

const props: Partial<CodeInputProps> = {

};

DefaultCodeInput.args = props;
