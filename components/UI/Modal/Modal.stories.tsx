import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { Modal, ModalProps } from './Modal';

export default {
  component: Modal,
  title: 'UI/Modal',
} as Meta;

const Template: ComponentStory<typeof Modal> = args => <Modal {...args} />;
export const DefaultModal = Template.bind({});

const props: Partial<ModalProps> = {
  isOpen: true,
  title: 'Изменение телефона',
  description: 'Пожалуйста, укажите новый номер мобильного телефона. На него мы отправим код подтверждения.',
  acceptText: 'Подтвердить',
  showRefuseButton: true,
};

DefaultModal.args = props;
