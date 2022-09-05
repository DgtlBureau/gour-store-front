import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { GameLives, GameLivesProps } from './Lives';

export default {
  component: GameLives,
  title: 'Game/Lives',
} as Meta;

const Template: ComponentStory<typeof GameLives> = function (args: GameLivesProps) {
  return <GameLives {...args} />;
};
export const DefaultGameLives = Template.bind({});

const props: Partial<GameLivesProps> = {
  value: 2.5,
};

DefaultGameLives.args = props;
