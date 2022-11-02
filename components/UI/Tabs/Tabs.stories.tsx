import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { Tabs } from './Tabs';

export default {
  title: 'UI/Tabs',
  component: Tabs,
} as ComponentMeta<typeof Tabs>;

const OPTIONS = [
  {
    value: 'tab0',
    label: 'Tab 0',
  },
  {
    value: 'tab1',
    label: 'Tab 1',
  },
  {
    value: 'tab2',
    label: 'Tab 2',
  },
  {
    value: 'tab3',
    label: 'Tab 3',
  },
];

const Template: ComponentStory<typeof Tabs> = function Template() {
  const [value, setValue] = useState('tab0');

  return <Tabs value={value} options={OPTIONS} onChange={id => setValue(id)} />;
};

export const DefaultState = Template.bind({});
