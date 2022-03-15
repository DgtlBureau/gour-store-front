import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {PromotionCard, PromotionCardProps} from "./PromotionCard";

export default {
    component: PromotionCard,
    title: "components/PromotionCard",
} as Meta;

const Template: ComponentStory<typeof PromotionCard> = (args: PromotionCardProps) => <PromotionCard {...args} />;
export const DefaultPromotionCard = Template.bind({});
const props: Partial<PromotionCardProps> = {};

DefaultPromotionCard.args = props;
