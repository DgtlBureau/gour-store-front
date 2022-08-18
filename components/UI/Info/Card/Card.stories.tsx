import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { InfoCard, InfoCardProps } from './Card';

export default {
  component: InfoCard,
  title: 'UI/Info/Card',
} as Meta;

const Template: ComponentStory<typeof InfoCard> = function (args: InfoCardProps) {
  return <InfoCard {...args} />;
};
export const DefaultInfoCard = Template.bind({});
const props: Partial<InfoCardProps> = {
  title: 'title',
  footerText: 'footer text',
  children: 'Lorem ipsum con-tent '.repeat(100),
};

DefaultInfoCard.args = props;
