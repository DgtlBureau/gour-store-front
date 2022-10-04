import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { PAPhoneChangeModal, PAPhoneChangeModalProps } from './PhoneChangeModal';

export default {
  component: PAPhoneChangeModal,
  title: 'PA/Credentials/PhoneChangeModal',
} as Meta;

const Template: ComponentStory<typeof PAPhoneChangeModal> = args => <PAPhoneChangeModal {...args} />;
export const DefaultPAPhoneChangeModal = Template.bind({});

const props: Partial<PAPhoneChangeModalProps> = {
  isOpen: true,
  error: 'Неверный код!',
};

DefaultPAPhoneChangeModal.args = props;
