import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { RegFavoriteInfo, RegFavoriteInfoProps } from './RegFavoriteInfo';

export default {
    component: RegFavoriteInfo,
    title: "registration/FavoriteInfo",
} as Meta;

const Template: ComponentStory<typeof RegFavoriteInfo> = (
  args: RegFavoriteInfoProps
) => <RegFavoriteInfo {...args} />;
export const DefaultRegFavoriteInfo = Template.bind({});
const props: Partial<RegFavoriteInfoProps> = {
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
  products: [
    {
      image:
        'https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      title: 'Мясо',
      id: 1,
    },
    {
      image:
        'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80',
      title: 'Сыр',
      id: 2,
    },
    {
      image: '',
      title: 'Паста',
      id: 3,
    },
    {
      image:
        'https://images.unsplash.com/photo-1513104890138-7c749659a591?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      title: 'Пицца',
      id: 4,
    },
    {
      image: '',
      title: 'Фрукты',
      id: 5,
    },
  ],
};

DefaultRegFavoriteInfo.args = props;
