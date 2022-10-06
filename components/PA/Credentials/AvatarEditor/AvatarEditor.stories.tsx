import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { PACredentialsAvatarEditor, PACredentialsAvatarEditorProps } from './AvatarEditor';

export default {
  component: PACredentialsAvatarEditor,
  title: 'PA/Credentials/AvatarEditor',
} as Meta;

const Template: ComponentStory<typeof PACredentialsAvatarEditor> = (args: PACredentialsAvatarEditorProps) => (
  <PACredentialsAvatarEditor {...args} />
);
export const DefaultPACredentialsAvatarEditor = Template.bind({});
const props: Partial<PACredentialsAvatarEditorProps> = {
  image:
    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774',
};

DefaultPACredentialsAvatarEditor.args = props;
