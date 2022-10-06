import Image from 'next/image';
// import NextLink from 'next/link';
import React, { Fragment, useState } from 'react';

import { Box, Collapse, Divider, List, ListItemButton } from '@mui/material';

// import { useAppNavigation } from 'components/Navigation';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { useLocalTranslation } from 'hooks/useLocalTranslation';
import { getCurrencySymbol } from 'utils/currencyUtil';

import AddIcon from '@mui/icons-material/Add';
import arrowIcon from 'assets/icons/mobile/arrow.svg';
import lightArrowIcon from 'assets/icons/mobile/light-arrow.svg';
import locationIcon from 'assets/icons/mobile/location.svg';

// import britainImage from 'assets/images/countries/britain.png';
// import russiaImage from 'assets/images/countries/russia.png';
import translations from './Menu.i18n.json';
import sx from './Menu.styles';
import { MobileMenuContacts } from './MenuContacts';

// const languages = [
//   {
//     value: 'ru',
//     title: 'Русский',
//     src: russiaImage,
//   },
//   {
//     value: 'en',
//     title: 'English',
//     src: britainImage,
//   },
// ];

export type MobileMenuProps = {
  selectedCityId: number;
  cities: {
    name: string;
    id: number;
  }[];
  firstPhone: string;
  secondPhone: string;
  email: string;
  fb: string;
  inst: string;
  vk: string;
  moneyAmount: number;
  currency: Currency;
  onChangeCity(id: number): void;
  onClickFavorite(): void;
  onClickPersonalArea(): void;
  onClickSignout(): void;
  onClickReplenishment(): void;
  onClickGame(): void;
};

export function MobileMenu({
  selectedCityId,
  cities,
  firstPhone,
  secondPhone,
  email,
  fb,
  inst,
  vk,
  moneyAmount,
  currency,
  onChangeCity,
  onClickFavorite,
  onClickPersonalArea,
  onClickSignout,
  onClickReplenishment,
  onClickGame,
}: MobileMenuProps) {
  const [citiesIsOpened, setCitiesIsOpened] = useState(false);
  // const [languagesIsOpened, setLanguagesIsOpened] = useState(false);

  const { t } = useLocalTranslation(translations);

  // const { language } = useAppNavigation();

  const currentCity = cities.find(city => city?.id === selectedCityId);
  // const currentLanguage = languages.find(i => i.value === language);

  const currencySymbol = getCurrencySymbol(currency);

  const selectCity = (id: number) => {
    onChangeCity(id);
    setCitiesIsOpened(false);
  };

  return (
    <List sx={sx.list} disablePadding>
      <Box sx={sx.money}>
        <Typography variant='body2' sx={sx.moneyAmount}>
          {moneyAmount}
          &nbsp;
          {currencySymbol}
        </Typography>

        <IconButton onClick={onClickReplenishment} color='inherit' sx={sx.replenishment}>
          <AddIcon color='primary' />
        </IconButton>
      </Box>

      <Divider sx={sx.divider} />

      <ListItemButton sx={sx.listItem} onClick={() => setCitiesIsOpened(!citiesIsOpened)}>
        <Box sx={sx.city}>
          <Box sx={sx.locationIcon}>
            <Image src={locationIcon} layout='fill' alt='' />
          </Box>

          <Typography sx={sx.title}>{currentCity?.name}</Typography>
        </Box>

        <Box sx={Object.assign([sx.arrowIcon, citiesIsOpened && sx.invertedArrow])}>
          <Image src={arrowIcon} layout='fill' alt='' />
        </Box>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <Collapse in={citiesIsOpened} timeout='auto' unmountOnExit>
        <List component='div' disablePadding>
          {cities.map(city => (
            <Fragment key={city.name}>
              <ListItemButton sx={sx.listItem} onClick={() => selectCity(city.id)}>
                <Typography sx={Object.assign([sx.title, sx.cityTitle, city.id === currentCity?.id && sx.accent])}>
                  {city.name}
                </Typography>
              </ListItemButton>
              <Divider sx={sx.divider} />
            </Fragment>
          ))}
        </List>
      </Collapse>

      {/* <ListItemButton
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
      </ListItemButton> */}

      <Divider sx={sx.divider} />

      {/* <Collapse in={languagesIsOpened} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          {languages.map(language => (
            <Fragment key={language.title}>
              <ListItemButton sx={{ ...sx.listItem, ...sx.languageItem }} onClick={() => setLanguagesIsOpened(false)}>
                <NextLink href={router?.asPath || ''} locale={locale === 'ru' ? 'en' : 'ru'} passHref>
                  <Typography
                    sx={Object.assign([
                      sx.title,
                      sx.languageTitle,
                      language.value === currentLanguage?.value && sx.accent,
                    ])}
                  >
                    {language.title}
                  </Typography>
                </NextLink>
              </ListItemButton>
              <Divider sx={sx.divider} />
            </Fragment>
          ))}
        </List>
      </Collapse> */}

      <ListItemButton sx={{ ...sx.listItem, ...sx.bigItem }} onClick={onClickGame}>
        <Typography sx={sx.title}>{t('game')}</Typography>

        <Box sx={{ ...sx.arrowIcon, ...sx.grayArrow }}>
          <Image src={lightArrowIcon} layout='fill' alt='' />
        </Box>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <ListItemButton sx={{ ...sx.listItem, ...sx.bigItem }} onClick={onClickPersonalArea}>
        <Typography sx={sx.title}>{t('personalArea')}</Typography>

        <Box sx={{ ...sx.arrowIcon, ...sx.grayArrow }}>
          <Image src={lightArrowIcon} layout='fill' alt='' />
        </Box>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <ListItemButton sx={{ ...sx.listItem, ...sx.bigItem }} onClick={onClickFavorite}>
        <Typography sx={sx.title}>{t('favorites')}</Typography>

        <Box sx={{ ...sx.arrowIcon, ...sx.grayArrow }}>
          <Image src={lightArrowIcon} layout='fill' alt='' />
        </Box>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <ListItemButton sx={sx.bigItem} onClick={onClickSignout}>
        <Typography sx={sx.title}>{t('signOut')}</Typography>
      </ListItemButton>

      <Divider sx={sx.divider} />

      <MobileMenuContacts firstPhone={firstPhone} secondPhone={secondPhone} email={email} fb={fb} inst={inst} vk={vk} />
    </List>
  );
}
