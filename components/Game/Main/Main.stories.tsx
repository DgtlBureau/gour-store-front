import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { GameMain } from './Main';

export default {
  component: GameMain,
  title: 'Game/Main',
} as Meta;

const Template: ComponentStory<typeof GameMain> = () => (
  <GameMain lives={1} isLivesLoading={false} onEndGame={async () => undefined} onHelpClick={() => ({})} />
);
export const DefaultGameMain = Template.bind({});
