import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { PAProfilesItem, PAProfilesItemProps } from './Item';

export default {
  component: PAProfilesItem,
  title: 'PA/Profiles/Item',
} as Meta;

const Template: ComponentStory<typeof PAProfilesItem> = args => <PAProfilesItem {...args} />;
export const DefaultItem = Template.bind({});

const props: Partial<PAProfilesItemProps> = {};

DefaultItem.args = props;
