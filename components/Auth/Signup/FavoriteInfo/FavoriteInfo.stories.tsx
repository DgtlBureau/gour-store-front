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
      iconKey: '',
      title: 'Россия',
      id: 1,
    },
    {
      iconKey: '',
      title: 'Англия',
      id: 2,
    },
    {
      iconKey: '',
      title: 'Испания',
      id: 3,
    },
    {
      iconKey: '',
      title: 'Италия',
      id: 4,
    },
  ],
  products: [],
};

DefaultSignupFavoriteInfo.args = props;
