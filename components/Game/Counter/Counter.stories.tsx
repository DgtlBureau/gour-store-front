import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { GameCounter, GameCounterProps } from './Counter';

export default {
  component: GameCounter,
  title: 'Game/Counter',
} as Meta;

const Template: ComponentStory<typeof GameCounter> = args => <GameCounter {...args} />;
export const DefaultGameCounter = Template.bind({});

const props: Partial<GameCounterProps> = {
  value: 1234,
};

DefaultGameCounter.args = props;
