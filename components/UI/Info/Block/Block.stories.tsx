import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';

import { InfoBlock } from './Block';

export default {
  component: InfoBlock,
  title: 'UI/Info/Block',
} as Meta;

const DEFAULT_TEXT = 'Добавьте ещё товаров на 1330 ₽ для бесплатной доставки по Москве и Санкт-Петербургу';
const DEFAULT_LINK = {
  label: 'Продолжить покупки',
  path: 'https://sib.fm/storage/article/March2021/IDsV2DD5Qhwj5kWTpfYG.jpeg',
};

const Template: ComponentStory<typeof InfoBlock> = () => (
  <InfoBlock title={DEFAULT_TEXT} href={DEFAULT_LINK.path} actionText={DEFAULT_LINK.label} />
);
export const DefaultInfoBlock = Template.bind({});
