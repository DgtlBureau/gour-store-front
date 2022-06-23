import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { PAPasswordChangeModal, PAPasswordChangeModalProps } from './PasswordChangeModal';

export default {
  component: PAPasswordChangeModal,
  title: 'PA/Credentials/PasswordChangeModal',
} as Meta;

const Template: ComponentStory<typeof PAPasswordChangeModal> = (args: PAPasswordChangeModalProps) => (
  <PAPasswordChangeModal {...args} />
);
export const DefaultPAPasswordChangeModal = Template.bind({});
const props: Partial<PAPasswordChangeModalProps> = {
  isOpen: true,
};

DefaultPAPasswordChangeModal.args = props;
