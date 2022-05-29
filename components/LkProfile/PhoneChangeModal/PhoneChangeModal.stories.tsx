import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { PhoneChangeModal, PhoneChangeModalProps } from './PhoneChangeModal';

export default {
  component: PhoneChangeModal,
  title: 'LkProfile/PhoneChangeModal',
} as Meta;

const Template: ComponentStory<typeof PhoneChangeModal> = function (args: PhoneChangeModalProps) {
  return <PhoneChangeModal {...args} />;
};
export const DefaultPhoneChangeModal = Template.bind({});

const props: Partial<PhoneChangeModalProps> = {
  isOpen: true,
  error: 'Неверный код!'
};

DefaultPhoneChangeModal.args = props;
