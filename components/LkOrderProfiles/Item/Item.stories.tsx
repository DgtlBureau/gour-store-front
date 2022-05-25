import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { LkOrderProfilesItem, LkOrderProfilesItemProps } from './Item';

export default {
  component: LkOrderProfilesItem,
  title: 'LkOrderProfiles/Item',
} as Meta;

const Template: ComponentStory<typeof LkOrderProfilesItem> = function (args: LkOrderProfilesItemProps) {
  return <LkOrderProfilesItem {...args} />;
};
export const DefaultItem = Template.bind({});

const props: Partial<LkOrderProfilesItemProps> = {

};

DefaultItem.args = props;
