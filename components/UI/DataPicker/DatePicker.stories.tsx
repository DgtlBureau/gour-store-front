import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { DatePicker } from './DatePicker';

export default {
  title: 'UI/DataPicker',
  component: DatePicker,
} as ComponentMeta<typeof DatePicker>;

const Template: ComponentStory<typeof DatePicker> = function (args) {
  return <DatePicker {...args} />;
};

export const DefaultState = Template.bind({});

DefaultState.args = {

};
