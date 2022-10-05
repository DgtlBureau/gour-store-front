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
  menuList: [
    {
      label: 'Главная',
      path: '/',
    },
    {
      label: 'Заказы',
      path: '/1',
    },
    {
      label: 'Личные данные',
      path: '/2',
    },
    {
      label: 'Адреса доставки',
      path: '/3',
    },
    {
      label: 'Система скидок',
      path: '/4',
    },
  ],
};

DefaultPAMenu.args = props;
