import React from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { RegCitySelect, RegCitySelectProps } from './RegCitySelect';
import { Box } from '../../UI/Box/Box';

export default {
  component: RegCitySelect,
  title: 'registration/RegCitySelect',
} as Meta;

const boxSx = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '500px',
  backgroundColor: 'gray',
};

const Template: ComponentStory<typeof RegCitySelect> = function (args: RegCitySelectProps) {
  return (
    <Box sx={boxSx}>
      <RegCitySelect {...args} />
    </Box>
  );
};
export const DefaultRegCitySelect = Template.bind({});

const props: Partial<RegCitySelectProps> = {
  options: [
    {
      label: 'Москва',
      value: 'moscow',
    },
    {
      label: 'Санкт-Петербург',
      value: 'petersburg',
    },
  ],
  onSubmit: city => console.log(city),
};

DefaultRegCitySelect.args = props;
