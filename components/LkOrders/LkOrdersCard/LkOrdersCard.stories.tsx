import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {LkOrdersCard, LkOrdersCardProps} from "./LkOrdersCard";

export default {
    component: LkOrdersCard,
    title: "components/LkOrders/LkOrdersCard",
} as Meta;

const Template: ComponentStory<typeof LkOrdersCard> = (args: LkOrdersCardProps) => <LkOrdersCard {...args} />;
export const DefaultLkOrdersCard = Template.bind({});
const props: Partial<LkOrdersCardProps> = {};

DefaultLkOrdersCard.args = props;
