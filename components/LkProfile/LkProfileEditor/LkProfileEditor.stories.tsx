import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { LkProfileEditor, LkProfileEditorProps } from './LkProfileEditor';

export default {
  component: LkProfileEditor,
  title: 'components/LkProfile/LkProfileEditor',
} as Meta;

const Template: ComponentStory<typeof LkProfileEditor> = (
  args: LkProfileEditorProps
) => <LkProfileEditor {...args} />;
export const DefaultLkProfileEditor = Template.bind({});
const props: Partial<LkProfileEditorProps> = {
  user: {
    firstName: 'Михаил',
    lastName: 'Барулин',
    referralCode: '123456789',
  },
  email: 'bebzhyzh@gmail.com',
  phone: '89218650538',
};

DefaultLkProfileEditor.args = props;
