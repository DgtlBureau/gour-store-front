import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Footer, FooterProps } from './Footer';

export default {
  component: Footer,
  title: 'Footer',
} as Meta;

const Template: ComponentStory<typeof Footer> = function (args: FooterProps) {
  return <Footer {...args} />;
};
export const DefaultFooter = Template.bind({});

const props: Partial<FooterProps> = {
  firstPhone: '+7 812 602-52-61',
  secondPhone: '+372 880-45-21',
  email: 'rk@gour-food.com',
  fb: 'https://www.facebook.com/gourfood.spb/',
  inst: 'https://www.instagram.com/gourfood_/',
  vk: 'https://vk.com/gour_food',
  copyright: '',
  rules: '',
  privacy: '',
  cookie: '',
  terms: '',
};

DefaultFooter.args = props;
