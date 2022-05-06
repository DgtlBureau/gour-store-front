import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {LkMainAddressCard, LkMainAddressCardProps} from "./LkMainAddressCard";

export default {
    component: LkMainAddressCard,
    title: "components/LkMain/LkMainAddressCard",
} as Meta;

const Template: ComponentStory<typeof LkMainAddressCard> = (args: LkMainAddressCardProps) =>
    <LkMainAddressCard {...args} />;
export const DefaultLkMainAddressCard = Template.bind({});
const props: Partial<LkMainAddressCardProps> = {};

DefaultLkMainAddressCard.args = props;
