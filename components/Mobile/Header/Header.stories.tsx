import React, { useState } from 'react';
import { ComponentStory, Meta } from '@storybook/react';

import { Box } from '../../UI/Box/Box';
import { Typography } from '../../UI/Typography/Typography';
import { MobileHeader } from './Header';

export default {
  component: MobileHeader,
  title: 'components/MobileHeader',
} as Meta;

const cities = [
  {
    value: 'petersburg',
    title: 'Санкт-Петербург',
  },
  {
    value: 'moscow',
    title: 'Москва и область',
  },
];

const Template: ComponentStory<typeof MobileHeader> = function () {
  const [selectedCity, setSelectedCity] = useState(cities[0].value);
  const [selectedLanguage, setSelectedLanguage] = useState<'ru' | 'en'>('ru');

  return (
    <Box sx={{ width: '375px' }}>
      <MobileHeader
        selectedCity={selectedCity}
        cities={cities}
        selectedLanguage={selectedLanguage}
        firstPhone="+7 812 602-52-61"
        secondPhone="+372 880-45-21"
        email="rk@gour-food.com"
        fb="https://www.facebook.com/"
        inst="https://www.instagram.com/"
        vk="https://www.vk.com/"
        onChangeCity={value => setSelectedCity(value)}
        onChangeLanguage={value => setSelectedLanguage(value)}
        onClickFavorite={() => ({})}
        onClickPersonalArea={() => ({})}
        onClickSignout={() => ({})}
      />
      <Typography>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
        Curabitur et suscipit mauris, eget sagittis tortor. 
        Pellentesque facilisis pellentesque orci, non tincidunt tellus ullamcorper suscipit. 
        Aliquam ut mauris eu felis auctor convallis. Vivamus eu lacinia justo. 
      </Typography>
    </Box>
  );
};
export const DefaultMobileHeader = Template.bind({});

