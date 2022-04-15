import React, { useState } from 'react';
import { Collapse, Button } from '@mui/material';
import Image from 'next/image';

import { Box } from '../../UI/Box/Box';
import { MobileMenu } from '../Menu/Menu';

import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';
import Logo from '../../../assets/images/common-logo.svg';

import sx from './Header.styles';

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
        <Image src={Logo} height={41} width={35} alt="" />
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
