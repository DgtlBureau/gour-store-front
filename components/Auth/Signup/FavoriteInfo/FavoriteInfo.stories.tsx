import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { SignupFavoriteInfo, SignupFavoriteInfoProps } from './FavoriteInfo';

export default {
  component: SignupFavoriteInfo,
  title: 'Signup/FavoriteInfo',
} as Meta;

const Template: ComponentStory<typeof SignupFavoriteInfo> = (args: SignupFavoriteInfoProps) => (
  <SignupFavoriteInfo {...args} />
);
export const DefaultSignupFavoriteInfo = Template.bind({});
const props: Partial<SignupFavoriteInfoProps> = {
  countries: [
    {
      image: '',
      title: 'Россия',
      id: 1,
    },
    {
      image: '',
      title: 'Англия',
      id: 2,
    },
    {
      image: '',
      title: 'Испания',
      id: 3,
    },
    {
      image: '',
      title: 'Италия',
      id: 4,
    },
  ],
  products: [],
};

DefaultSignupFavoriteInfo.args = props;
