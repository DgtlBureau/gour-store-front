import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Typography } from '../Typography/Typography';
import { BaseInformationCard, BaseInformationCardProps } from './BaseInformationCard';

export default {
  component: BaseInformationCard,
  title: 'UI/BaseInformationCard',
} as Meta;

const Template: ComponentStory<typeof BaseInformationCard> = function (args: BaseInformationCardProps) {
  return <BaseInformationCard {...args} />;
};
export const DefaultBaseInformationCard = Template.bind({});

const props: Partial<BaseInformationCardProps> = {
  title: 'Личные данные',
  footerText: 'Настройка личных данных',
  children: <Typography>sdhfgsjhdfgjsdgfjsdhjfsjhdfjsdfgjsdfj</Typography>,
};

DefaultBaseInformationCard.args = props;
