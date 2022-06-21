import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { InfoCard, InfoCardProps } from './Card';

export default {
  component: InfoCard,
  title: 'UI/Info/Card',
} as Meta;

const Template: ComponentStory<typeof InfoCard> = (args: InfoCardProps) => <InfoCard {...args} />;
export const DefaultInfoCard = Template.bind({});
const props: Partial<InfoCardProps> = {
  title: 'title',
  footerText: 'footer text',
  children: 'children',
};

DefaultInfoCard.args = props;
