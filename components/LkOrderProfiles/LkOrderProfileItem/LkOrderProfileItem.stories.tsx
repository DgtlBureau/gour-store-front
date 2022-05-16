import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {LkOrderProfileItem, LkOrderProfileItemProps} from "./LkOrderProfileItem";

export default {
    component: LkOrderProfileItem,
    title: "components/LkOrderProfiles/LkOrderProfileItem",
} as Meta;

const Template: ComponentStory<typeof LkOrderProfileItem> = (args: LkOrderProfileItemProps) =>
    <LkOrderProfileItem {...args} />;
export const DefaultLkOrderProfileItem = Template.bind({});
const props: Partial<LkOrderProfileItemProps> = {};

DefaultLkOrderProfileItem.args = props;
