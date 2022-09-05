import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { PACredentialsEditor, PACredentialsEditorProps } from './Editor';

export default {
  component: PACredentialsEditor,
  title: 'PA/Credentials/Editor',
} as Meta;

const Template: ComponentStory<typeof PACredentialsEditor> = (args: PACredentialsEditorProps) => (
  <PACredentialsEditor {...args} />
);
export const DefaultPACredentialsEditor = Template.bind({});
const props: Partial<PACredentialsEditorProps> = {
  user: {
    firstName: 'Михаил',
    lastName: 'Барулин',
    email: 'test@test.com',
    referralCode: '123456789',
  },
  phone: '89218650538',
};

DefaultPACredentialsEditor.args = props;
