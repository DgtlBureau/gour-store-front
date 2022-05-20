import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import {
  LkProfileAvatarEditor,
  LkProfileAvatarEditorProps,
} from './LkProfileAvatarEditor';

export default {
  component: LkProfileAvatarEditor,
  title: 'components/LkProfile/LkProfileAvatarEditor',
} as Meta;

const Template: ComponentStory<typeof LkProfileAvatarEditor> = (
  args: LkProfileAvatarEditorProps
) => <LkProfileAvatarEditor {...args} />;
export const DefaultLkProfileAvatarEditor = Template.bind({});
const props: Partial<LkProfileAvatarEditorProps> = {
  image:
    'https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?crop=entropy&cs=tinysrgb&fm=jpg&ixlib=rb-1.2.1&q=80&raw_url=true&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774',
};

DefaultLkProfileAvatarEditor.args = props;
