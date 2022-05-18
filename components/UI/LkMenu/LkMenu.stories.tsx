import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { LkMenu, LkMenuProps } from './LkMenu';

export default {
  component: LkMenu,
  title: 'components/UI/LkMenu',
} as Meta;

const Template: ComponentStory<typeof LkMenu> = (args: LkMenuProps) => (
  <LkMenu {...args} />
);
export const DefaultLkMenu = Template.bind({});
const props: Partial<LkMenuProps> = {
  active: 'Заказы',
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

DefaultLkMenu.args = props;
