import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {GameFrame, GameFrameProps} from "./GameFrame";

export default {
    component: GameFrame,
    title: "components/Game/GameFrame",
} as Meta;

const Template: ComponentStory<typeof GameFrame> = (args: GameFrameProps) => <GameFrame {...args} />;
export const DefaultGameFrame = Template.bind({});
const props: Partial<GameFrameProps> = {};

DefaultGameFrame.args = props;
