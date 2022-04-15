import React from 'react';

import { ComponentStory, Meta } from '@storybook/react';
import { PromotionHeader, PromotionHeaderProps } from './PromotionHeader';

export default {
  component: PromotionHeader,
  title: 'Promotion/Header',
} as Meta;

const Template: ComponentStory<typeof PromotionHeader> = (
  args: PromotionHeaderProps
) => <PromotionHeader {...args} />;

export const DefaultPromotionHeader = Template.bind({});
const props: Partial<PromotionHeaderProps> = {
  image:
    'https://images.unsplash.com/photo-1486297678162-eb2a19b0a32d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1773&q=80',
  title: 'Заголовок акции',
  end: new Date(2022, 5, 1),
};

DefaultPromotionHeader.args = props;
