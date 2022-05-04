import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {LkMainOrdersCard, LkMainOrdersCardProps} from "./LkMainOrdersCard";

export default {
    component: LkMainOrdersCard,
    title: "components/LkMain/LkMainOrdersCard",
} as Meta;

const Template: ComponentStory<typeof LkMainOrdersCard> = (args: LkMainOrdersCardProps) =>
    <LkMainOrdersCard {...args} />;
export const DefaultLkMainOrdersCard = Template.bind({});
const props: Partial<LkMainOrdersCardProps> = {};

DefaultLkMainOrdersCard.args = props;
