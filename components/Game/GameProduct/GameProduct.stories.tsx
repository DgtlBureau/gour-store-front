import React from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { GameProduct, GameProductProps } from "./GameProduct";

export default {
  component: GameProduct,
  title: "Game/Product",
} as Meta;

const Template: ComponentStory<typeof GameProduct> = (args: GameProductProps) => <GameProduct {...args} />;
export const DefaultGameProduct = Template.bind({});
const props: Partial<GameProductProps> = {
  isActive: true,
  step: 1,
  type: 'cheese',
};

DefaultGameProduct.args = props;
