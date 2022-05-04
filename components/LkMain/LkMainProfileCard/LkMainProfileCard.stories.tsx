import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {LkMainProfileCard, LkMainProfileCardProps} from "./LkMainProfileCard";

export default {
    component: LkMainProfileCard,
    title: "components/LkMain/LkMainProfileCard",
} as Meta;

const Template: ComponentStory<typeof LkMainProfileCard> = (args: LkMainProfileCardProps) =>
    <LkMainProfileCard {...args} />;
export const DefaultLkMainProfileCard = Template.bind({});
const props: Partial<LkMainProfileCardProps> = {};

DefaultLkMainProfileCard.args = props;
