import React from "react";

import { ComponentStory, Meta } from "@storybook/react";
import { GamePlayer, GamePlayerProps } from "./Player";
import { FIELD_POSITIONS } from "../Main/Core";

export default {
  component: GamePlayer,
  title: "Game/Player",
} as Meta;

const Template: ComponentStory<typeof GamePlayer> = (args: GamePlayerProps) => <GamePlayer {...args} />;
export const DefaultGamePlayer = Template.bind({});
const props: Partial<GamePlayerProps> = {
  position: 'bottomRight',
};

DefaultGamePlayer.args = props;
