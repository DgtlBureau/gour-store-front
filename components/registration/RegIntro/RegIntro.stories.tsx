import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Box } from '../../UI/Box/Box';
import { RegIntro, RegIntroProps } from './RegIntro';

export default {
  component: RegIntro,
  title: 'RegIntro',
} as Meta;

const boxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  backgroundColor: 'gray',
};

const Template: ComponentStory<typeof RegIntro> = function (args: RegIntroProps) {
  return (
    <Box sx={boxSx}>
      <RegIntro {...args} />
    </Box>
  );
};
export const DefaultRegIntro = Template.bind({});

const props: Partial<RegIntroProps> = {

};

DefaultRegIntro.args = props;
