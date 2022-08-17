import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { GameFrame, GameFrameProps } from './Frame';

export default {
  component: GameFrame,
  title: 'Game/Frame',
} as Meta;

const Template: ComponentStory<typeof GameFrame> = (args: GameFrameProps) => <GameFrame {...args} />;
export const DefaultGameFrame = Template.bind({});
const props: Partial<GameFrameProps> = {};

DefaultGameFrame.args = props;
