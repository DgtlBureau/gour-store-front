import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { Typography } from 'components/UI/Typography/Typography';

import { InfoModal, InfoModalProps } from './InfoModal';

export default {
  component: InfoModal,
  title: 'UI/Modal',
} as Meta;

const Template: ComponentStory<typeof InfoModal> = args => <InfoModal {...args} />;
export const DefaultModal = Template.bind({});

const props: Partial<InfoModalProps> = {
  isOpen: true,
  status: 'success',
  title: 'Платёж успешно зачислен',
  content: <Typography>5000 ₽</Typography>,
  onClose: () => ({}),
};

DefaultModal.args = props;
