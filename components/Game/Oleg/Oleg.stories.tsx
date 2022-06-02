import React from "react";

import { ComponentStory, Meta } from "@storybook/react";
import { GameOleg, GameOlegProps, PlayerPosition } from "./Oleg";

export default {
  component: GameOleg,
  title: "Game/Oleg",
} as Meta;

const Template: ComponentStory<typeof GameOleg> = (args: GameOlegProps) => <GameOleg {...args} />;
export const DefaultGameOleg = Template.bind({});
const props: Partial<GameOlegProps> = {
  position: PlayerPosition.bottomRight,
};

DefaultGameOleg.args = props;
