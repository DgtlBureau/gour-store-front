import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { PAMenu, PAMenuProps } from './Menu';

export default {
  component: PAMenu,
  title: 'PA/Menu',
} as Meta;

const Template: ComponentStory<typeof PAMenu> = (args: PAMenuProps) => <PAMenu {...args} />;
export const DefaultPAMenu = Template.bind({});
const props: Partial<PAMenuProps> = {
  active: '/1',
  options: [
    {
      label: 'Главная',
      value: '/',
    },
    {
      label: 'Заказы',
      value: '/1',
    },
    {
      label: 'Личные данные',
      value: '/2',
    },
    {
      label: 'Адреса доставки',
      value: '/3',
    },
    {
      label: 'Система скидок',
      value: '/4',
    },
  ],
};

DefaultPAMenu.args = props;
