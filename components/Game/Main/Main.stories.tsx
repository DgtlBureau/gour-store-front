import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { GameMain } from './Main';

export default {
  component: GameMain,
  title: 'Game/Main',
} as Meta;

const Template: ComponentStory<typeof GameMain> = function () {
  return <GameMain onHelpClick={() => console.log('help click')} />;
};
export const DefaultGameMain = Template.bind({});
