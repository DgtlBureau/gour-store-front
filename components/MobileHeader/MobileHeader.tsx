import React, { useState } from 'react';
import { Collapse, Button } from '@mui/material';

import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { MobileMenu } from '../MobileMenu/MobileMenu';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

const sx = {
  headerWrapper: {
    position: 'relative',
    maxWidth: '375px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#25262D',
    color: 'white',
  },
  logo: {
    fontSize: '18px',
    fontWeight: 700,
  },
  iconBtn: {
    display: 'flex',
    justifyContent: 'center',
    minWidth: '34px',
    height: '34px',
    width: '34px',
    padding: 0,
    borderRadius: '6px',
    backgroundColor: 'white',
    '&:hover': {
      backgroundColor: 'white',
    },
  },
  menuIcon: {
    width: '18px',
    color: 'black',
  },
};

export type MobileHeaderProps = {
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
}

export function MobileHeader({
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
}: MobileHeaderProps) {
  const [isDeployed, setIsDeployed] = useState(false);

  const deploy = () => setIsDeployed(!isDeployed);

  return (
    <Box sx={sx.headerWrapper}>
      <Box sx={sx.header}>
        <Typography sx={sx.logo}>
          Logo
        </Typography>
        <Button
          sx={sx.iconBtn}
          color="inherit"
          onClick={deploy} 
        >
          {!isDeployed ? <MenuIcon sx={sx.menuIcon} /> : <CloseIcon sx={sx.menuIcon} />} 
        </Button>
      </Box>

      <Collapse in={isDeployed} timeout="auto" unmountOnExit>
        <MobileMenu
          selectedCity={selectedCity}
          cities={cities}
          selectedLanguage={selectedLanguage}
          firstPhone={firstPhone}
          secondPhone={secondPhone}
          email={email}
          fb={fb}
          inst={inst}
          vk={vk}
          onChangeCity={onChangeCity}
          onChangeLanguage={onChangeLanguage}
          onClickFavorite={onClickFavorite}
          onClickPersonalArea={onClickPersonalArea}
          onClickSignout={onClickSignout}
        />
      </Collapse>
    </Box>
  );
}
