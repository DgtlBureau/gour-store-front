import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Header, HeaderProps } from './Header';

export default {
  component: Header,
  title: 'Header',
} as Meta;

const Template: ComponentStory<typeof Header> = (args: HeaderProps) => (
  <Header {...args} />
);
export const DefaultHeader = Template.bind({});
const props: Partial<HeaderProps> = {
  phone: '8 (921) 865-05-38',
  selectedCity: 'Москва и область',
  basketProductCount: 5,
  basketProductSum: 15000,
  cities: [
    {
      name: 'Санкт-Петербург',
      id: 1,
    },
    {
      name: 'Москва и область',
      id: 2,
    },
    {
      name: 'Казань',
      id: 3,
    },
    {
      name: 'Новосибирск',
      id: 4,
    },
    {
      name: 'Екатеринбург',
      id: 5,
    },
    {
      name: 'Новгород',
      id: 6,
    },
  ],
};

DefaultHeader.args = props;
