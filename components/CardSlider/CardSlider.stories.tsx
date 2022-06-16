import React from 'react';

import { ComponentStory, ComponentMeta } from '@storybook/react';

import { CardSlider } from './CardSlider';
import { PromotionCard } from '../PromotionCard/PromotionCard';

export default {
  title: 'CardSlider',
  component: CardSlider,
} as ComponentMeta<typeof CardSlider>;

const Template: ComponentStory<typeof CardSlider> = function (args) {
  return <CardSlider {...args} />;
};

export const DefaultState = Template.bind({});

const defaultImg =
  'https://images.unsplash.com/photo-1646309244219-9583e1341a00?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80';

DefaultState.args = {
  title: 'Акции и скидки',
  cardsList: [
    <PromotionCard key="test1" title="test1" image={defaultImg} onClickMore={() => ({})} />,
    <PromotionCard key="test2" title="test2" image={defaultImg} onClickMore={() => ({})} />,
    <PromotionCard key="test3" title="test3" image={defaultImg} onClickMore={() => ({})} />,
    <PromotionCard key="test4" title="test4" image={defaultImg} onClickMore={() => ({})} />,
    <PromotionCard key="test5" title="test5" image={defaultImg} onClickMore={() => ({})} />,
  ],
  slidesPerView: 4,
};
