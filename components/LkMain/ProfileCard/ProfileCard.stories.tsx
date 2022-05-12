import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { LkMainProfileCard, LkMainProfileCardProps } from './ProfileCard';

export default {
  component: LkMainProfileCard,
  title: 'LkMain/ProfileCard',
} as Meta;

const Template: ComponentStory<typeof LkMainProfileCard> = function (args: LkMainProfileCardProps) {
  return <LkMainProfileCard {...args} />;
};
export const DefaultLkMainProfileCard = Template.bind({});

const props: Partial<LkMainProfileCardProps> = {
  name: 'Олег Сырный',
  phone: '89998887766',
  photo: 'https://preview.redd.it/oru9zomyzyb81.jpg?auto=webp&s=f49acef933c272c5e48de6f838b8f14329072999',
};

DefaultLkMainProfileCard.args = props;
