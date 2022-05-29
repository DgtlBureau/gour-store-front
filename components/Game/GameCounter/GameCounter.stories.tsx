import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {GameCounter, GameCounterProps} from "./GameCounter";

export default {
    component: GameCounter,
    title: "components/Game/GameCounter",
} as Meta;

const Template: ComponentStory<typeof GameCounter> = (args: GameCounterProps) => <GameCounter {...args} />;
export const DefaultGameCounter = Template.bind({});
const props: Partial<GameCounterProps> = {};

DefaultGameCounter.args = props;
