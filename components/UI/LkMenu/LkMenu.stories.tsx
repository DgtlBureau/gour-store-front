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
const props: Partial<LkMenuProps> = {};

DefaultLkMenu.args = props;
