import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { PAEmailChangeModal, PAEmailChangeModalProps } from './EmailChangeModal';

export default {
  component: PAEmailChangeModal,
  title: 'PA/Credentials/EmailChangeModal',
} as Meta;

const Template: ComponentStory<typeof PAEmailChangeModal> = (args: PAEmailChangeModalProps) => (
  <PAEmailChangeModal {...args} />
);
export const DefaultPasswordChangeModal = Template.bind({});
const props: Partial<PAEmailChangeModalProps> = {
  isOpen: true,
};

DefaultPasswordChangeModal.args = props;
