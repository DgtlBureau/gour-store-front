import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Box } from '../../UI/Box/Box';
import { RegGreeting, RegGreetingProps } from './RegGreeting';

export default {
  component: RegGreeting,
  title: 'registration/Intro',
} as Meta;

const boxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  backgroundColor: 'gray',
};

const Template: ComponentStory<typeof RegGreeting> = function (args: RegGreetingProps) {
  return (
    <Box sx={boxSx}>
      <RegGreeting {...args} />
    </Box>
  );
};
export const DefaultRegGreeting = Template.bind({});

const props: Partial<RegGreetingProps> = {

};

DefaultRegGreeting.args = props;
