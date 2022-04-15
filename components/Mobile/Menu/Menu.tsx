import React, { useState, Fragment } from 'react';
import {
  Box,
  List,
  ListItemButton,
  Collapse,
  Divider,
} from '@mui/material';
import Image from 'next/image';

import translations from './Menu.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Typography } from '../../UI/Typography/Typography';
import { MobileMenuContacts } from './MenuContacts';

import locationIcon from '../../../assets/icons/mobile/location.svg';
import arrowIcon from '../../../assets/icons/mobile/arrow.svg';
import lightArrowIcon from '../../../assets/icons/mobile/light-arrow.svg';
import russiaImage from '../../../assets/images/countries/russia.png';
import britainImage from '../../../assets/images/countries/britain.png';

import sx from './Menu.styles';

const languages = [
  {
    value: 'ru',
    title: 'Русский',
    src: russiaImage,
  },
  {
    value: 'en',
    title: 'English',
    src: britainImage,
  },
];

export type MobileMenuProps = {
  selectedCity: string;
  cities: {
    title: string;
    value: string;
  }[];
  selectedLanguage: 'ru'|'en';
  firstPhone: string;
  secondPhone: string;
  email: string;
  fb: string;
  inst: string;
  vk: string;
  onChangeCity(value: string): void;
  onChangeLanguage(value: 'ru' | 'en'): void;
  onClickFavorite(): void;
  onClickPersonalArea(): void;
  onClickSignout(): void;
};

export function MobileMenu({
  selectedCity,
  cities,
  selectedLanguage,
  firstPhone,
  secondPhone,
  email,
  fb,
  inst,
  vk,
  onChangeCity,
  onChangeLanguage,
  onClickFavorite,
  onClickPersonalArea,
  onClickSignout,
}: MobileMenuProps) {
  const [citiesIsOpened, setCitiesIsOpened] = useState(false);
  const [languagesIsOpened, setLanguagesIsOpened] = useState(false);

  const { t } = useLocalTranslation(translations);

  const currentCity = cities.find(city => city.value === selectedCity);
  const currentLanguage = languages.find(language => language.value === selectedLanguage);

  const selectCity = (value: string) => {
    onChangeCity(value);
    setCitiesIsOpened(false);
  };

  const selectLanguage = (value: 'ru' | 'en') => {
    onChangeLanguage(value);
    setLanguagesIsOpened(false);
  };

  return (
    <List sx={sx.list} disablePadding>
      <ListItemButton
        sx={sx.listItem}
        onClick={() => setCitiesIsOpened(!citiesIsOpened)}
      >
        <Box sx={sx.city}>
          <Box sx={sx.locationIcon}>
            <Image src={locationIcon} layout="fill" alt=""/>
          </Box>

          <Typography sx={sx.title}>{currentCity?.title}</Typography>
        </Box>

        <Box sx={Object.assign([sx.arrowIcon, citiesIsOpened && sx.invertedArrow])}>
          <Image src={arrowIcon} layout="fill" alt="" />
        </Box>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <Collapse in={citiesIsOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            cities.map(city => (
              <Fragment key={city.title}>
                <ListItemButton
                  sx={sx.listItem}
                  onClick={() => selectCity(city.value)}
                >
                  <Typography
                    sx={Object.assign([
                      sx.title,
                      sx.cityTitle,
                      city.value === currentCity?.value && sx.accent,
                    ])}
                  >
                    {city.title}
                  </Typography>
                </ListItemButton>
                <Divider sx={sx.divider} />
              </Fragment>
            ))
          }
        </List>
      </Collapse>

      <ListItemButton
        sx={{ ...sx.listItem, ...sx.languageItem }}
        onClick={() => setLanguagesIsOpened(!languagesIsOpened)}
      >
        <Box sx={sx.language}>
          <Box sx={sx.languageIcon}>
            <Image src={currentLanguage!.src} layout="fill" alt="" />
          </Box>

          <Typography sx={sx.title}>{currentLanguage?.title}</Typography>
        </Box>

        <Box sx={Object.assign([sx.arrowIcon, languagesIsOpened && sx.invertedArrow])}>
          <Image src={arrowIcon} layout="fill" alt="" />
        </Box>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <Collapse in={languagesIsOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {
            languages.map(language => (
              <Fragment key={language.title}>
                <ListItemButton
                  sx={{ ...sx.listItem, ...sx.languageItem }}
                  onClick={() => selectLanguage(language.value as typeof selectedLanguage)}
                >
                  <Typography
                    sx={Object.assign([
                      sx.title,
                      sx.languageTitle,
                      language.value === currentLanguage?.value && sx.accent,
                    ])}
                  >
                    {language.title}
                  </Typography>
                </ListItemButton>
                <Divider sx={sx.divider} />
              </Fragment>
            ))
          }
        </List>
      </Collapse>

      <ListItemButton sx={{ ...sx.listItem, ...sx.bigItem }} onClick={onClickPersonalArea}>
        <Typography sx={sx.title}>{t('personalArea')}</Typography>

        <Box sx={{ ...sx.arrowIcon, ...sx.grayArrow }}>
          <Image src={lightArrowIcon} layout="fill" alt="" />
        </Box>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <ListItemButton sx={{ ...sx.listItem, ...sx.bigItem }} onClick={onClickFavorite}>
        <Typography sx={sx.title}>{t('favorites')}</Typography>

        <Box sx={{ ...sx.arrowIcon, ...sx.grayArrow }}>
          <Image src={lightArrowIcon} layout="fill" alt="" />
        </Box>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <ListItemButton sx={sx.bigItem} onClick={onClickSignout}>
        <Typography sx={sx.title}>{t('signOut')}</Typography>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <MobileMenuContacts
       firstPhone={firstPhone}
       secondPhone={secondPhone}
       email={email}
       fb={fb}
       inst={inst}
       vk={vk}
      />
    </List>
  );
}
