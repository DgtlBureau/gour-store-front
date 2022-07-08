import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { SignupFavoriteInfo, SignupFavoriteInfoProps } from './FavoriteInfo';

export default {
  component: SignupFavoriteInfo,
  title: 'Signup/FavoriteInfo',
} as Meta;

const Template: ComponentStory<typeof SignupFavoriteInfo> = (
  args: SignupFavoriteInfoProps
) => <SignupFavoriteInfo {...args} />;
export const DefaultSignupFavoriteInfo = Template.bind({});
const props: Partial<SignupFavoriteInfoProps> = {
  countries: [],
  products: [],
};

DefaultSignupFavoriteInfo.args = props;
