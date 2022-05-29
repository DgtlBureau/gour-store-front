import React from "react";

import {ComponentStory, Meta} from "@storybook/react";
import {GameAlarm, GameAlarmProps} from "./GameAlarm";

export default {
    component: GameAlarm,
    title: "components/Game/GameAlarm",
} as Meta;

const Template: ComponentStory<typeof GameAlarm> = (args: GameAlarmProps) => <GameAlarm {...args} />;
export const DefaultGameAlarm = Template.bind({});
const props: Partial<GameAlarmProps> = {};

DefaultGameAlarm.args = props;
