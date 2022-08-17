import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { GameAlarm, GameAlarmProps } from './Alarm';

export default {
    component: GameAlarm,
    title: 'Game/Alarm',
} as Meta;

const Template: ComponentStory<typeof GameAlarm> = (args: GameAlarmProps) => <GameAlarm {...args} />;
export const DefaultGameAlarm = Template.bind({});
const props: Partial<GameAlarmProps> = {};

DefaultGameAlarm.args = props;
