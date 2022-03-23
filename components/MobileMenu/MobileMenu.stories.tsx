import React, { useState } from "react";
import { ComponentStory, Meta } from "@storybook/react";

import { MobileMenu } from "./MobileMenu";

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

export default {
    component: MobileMenu,
    title: "components/MobileMenu",
} as Meta;

const Template: ComponentStory<typeof MobileMenu> = function () {
  const [selectedCity, setSelectedCity] = useState(cities[0].value);
  const [selectedLanguage, setSelectedLanguage] = useState<'ru' | 'en'>('ru');

  return (
    <MobileMenu
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
  );
};
export const DefaultMobileMenu = Template.bind({});
