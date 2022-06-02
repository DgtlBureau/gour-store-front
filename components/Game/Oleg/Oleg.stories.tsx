import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {GameOleg, GameOlegProps} from "./Oleg";

export default {
    component: GameOleg,
    title: "components/Game/GameOleg",
} as Meta;

const Template: ComponentStory<typeof GameOleg> = (args: GameOlegProps) => <GameOleg {...args} />;
export const DefaultGameOleg = Template.bind({});
const props: Partial<GameOlegProps> = {};

DefaultGameOleg.args = props;
