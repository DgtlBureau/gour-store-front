import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { PACredentialsCard, PACredentialsCardProps } from './CredentialsCard';

export default {
  component: PACredentialsCard,
  title: 'PA/Main/CredentialsCard',
} as Meta;

const Template: ComponentStory<typeof PACredentialsCard> = args => <PACredentialsCard {...args} />;
export const DefaultPACredentialsCard = Template.bind({});

const props: Partial<PACredentialsCardProps> = {
  name: 'Олег Сырный',
  phone: '89998887766',
  photo: 'https://preview.redd.it/oru9zomyzyb81.jpg?auto=webp&s=f49acef933c272c5e48de6f838b8f14329072999',
};

DefaultPACredentialsCard.args = props;
