import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { Header, HeaderProps } from './Header';

export default {
  component: Header,
  title: 'components/Header',
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
  basketProductCurrency: 'usd',
  cities: [
    {
      title: 'Санкт-Петербург',
      value: 'SPb',
    },
    {
      title: 'Москва и область',
      value: 'Moscow',
    },
    {
      title: 'Казань',
      value: 'Kazan',
    },
    {
      title: 'Новосибирск',
      value: 'someText',
    },
    {
      title: 'Екатеринбург',
      value: 'someText2',
    },
    {
      title: 'Новгород',
      value: 'newCity',
    },
  ],
};

DefaultHeader.args = props;
