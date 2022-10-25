import Image from 'next/image';
import React, { useState } from 'react';

import { AppBar, Badge, Collapse, Container, Grid, SxProps, useMediaQuery } from '@mui/material';

import { Box } from 'components/UI/Box/Box';
import { IconButton } from 'components/UI/IconButton/IconButton';
import { LinkRef as Link } from 'components/UI/Link/Link';
import { Typography } from 'components/UI/Typography/Typography';

import { Currency } from 'types/entities/Currency';

import { Path } from 'constants/routes';
import { getCurrencySymbol } from 'utils/currencyUtil';

import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import LogoutIcon from '@mui/icons-material/Logout';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person';
import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import CatalogIcon from 'assets/icons/catalog.svg';
import GamepadIcon from 'assets/icons/gamepad.svg';
import Logo from 'assets/images/common-logo.svg';

import { MobileMenu } from '../Mobile/Menu/Menu';
import { CitySelect } from './CitySelect';
import headerSx from './Header.styles';

export type HeaderProps = {
  isGame?: boolean;
  firstPhone: string;
  secondPhone: string;
  email: string;
  fb: string;
  inst: string;
  vk: string;
  selectedCityId: number;
  cities: {
    id: number;
    name: string;
  }[];
  currency: Currency;
  basketProductCount: number;
  basketProductSum: number;
  moneyAmount: number;
  sx?: SxProps;
  onChangeCity(id: number): void;
  onClickReplenishment(): void;
  onClickSignout(): void;
};

export function Header({
  isGame,
  firstPhone,
  secondPhone,
  email,
  fb,
  inst,
  vk,
  selectedCityId,
  cities,
  basketProductCount,
  basketProductSum,
  currency,
  moneyAmount,
  sx,
  onChangeCity,
  onClickReplenishment,
  onClickSignout,
}: HeaderProps) {
  const [isCitiesModalOpen, setIsCitiesModalOpen] = useState<boolean>(false);
  const [isMenuDeployed, setIsMenuDeployed] = useState(false);

  const isDesktop = useMediaQuery('(min-width: 600px)');

  const currencySymbol = getCurrencySymbol(currency);

  const catalogIsHidden = moneyAmount < 1000;

  const currentCity = cities.find(it => it?.id === selectedCityId);

  const deployMenu = () => setIsMenuDeployed(!isMenuDeployed);

  const openCityModal = () => setIsCitiesModalOpen(true);

  const closeCityModal = () => setIsCitiesModalOpen(false);

  const selectCity = (id: number) => {
    onChangeCity(id);
    closeCityModal();
  };

  return (
    <>
      <AppBar sx={{ ...headerSx.container, ...sx } as SxProps}>
        <Container sx={{ height: '100%', position: 'relative' }} maxWidth='lg'>
          <Grid container direction='row' justifyContent='center' alignItems='center' sx={{ height: '100%' }}>
            <Grid item xs={2} md={4} lg={6} container direction='row' alignItems='center' justifyContent='flex-start'>
              <Box sx={headerSx.logo}>
                <Link href='/'>
                  <Image src={Logo} height='49px' width='58px' alt='' />
                </Link>
              </Box>

              {!isGame && (
                <>
                  <Link href={`tel:${firstPhone}`} variant='body1' color='inherit' sx={headerSx.phone}>
                    {firstPhone}
                  </Link>

                  <Box sx={headerSx.city} onClick={openCityModal}>
                    <PlaceOutlinedIcon />
                    <Typography sx={headerSx.cityTitle} variant='body1'>
                      {currentCity?.name}
                    </Typography>
                    <KeyboardArrowDownIcon />
                  </Box>
                </>
              )}
            </Grid>

            <Grid
              item
              xs={10}
              md={8}
              lg={6}
              container
              direction='row'
              alignItems='center'
              justifyContent='flex-end'
              sx={{ gap: '20px' }}
            >
              <Box
                sx={{
                  ...headerSx.money,
                  display: {
                    xs: isGame ? 'flex' : 'none',
                    sm: 'flex',
                  },
                }}
              >
                <Typography variant='body2' sx={headerSx.moneyAmount}>
                  {moneyAmount}
                  &nbsp;
                  {currencySymbol}
                </Typography>

                <IconButton onClick={onClickReplenishment} color='inherit' sx={headerSx.replenishment}>
                  <AddIcon color='primary' />
                </IconButton>
              </Box>

              {isGame ? (
                <Link
                  href='/'
                  color='inherit'
                  sx={{
                    ...headerSx.icon,
                    display: {
                      xs: 'flex',
                      sm: catalogIsHidden ? 'none' : 'flex',
                    },
                  }}
                >
                  <Image src={CatalogIcon} height={24} width={24} alt='' />
                </Link>
              ) : (
                <Link href={Path.GAME} color='inherit' sx={headerSx.icon}>
                  <Image src={GamepadIcon} height={24} width={24} alt='' />
                </Link>
              )}

              {!isGame && (
                <>
                  <Link href={Path.FAVORITES} color='inherit' sx={headerSx.icon}>
                    <FavoriteBorderIcon />
                  </Link>

                  <Link href={Path.PERSONAL_AREA} color='inherit' sx={headerSx.icon}>
                    <PersonIcon />
                  </Link>

                  <Link href={Path.BASKET} sx={headerSx.cart}>
                    <Badge sx={headerSx.cartBadge} badgeContent={basketProductCount} color='primary'>
                      <ShoppingCartOutlinedIcon color='primary' />
                    </Badge>
                    {basketProductSum}
                    &nbsp;
                    {currencySymbol}
                  </Link>

                  <IconButton onClick={onClickSignout} color='inherit' sx={headerSx.icon}>
                    <LogoutIcon />
                  </IconButton>
                </>
              )}

              {!isGame && !isDesktop && (
                <IconButton sx={headerSx.menuBtn} color='inherit' onClick={deployMenu}>
                  {!isMenuDeployed ? <MenuIcon sx={headerSx.menuIcon} /> : <CloseIcon sx={headerSx.menuIcon} />}
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Container>

        <Collapse in={isMenuDeployed && !isDesktop} timeout='auto' unmountOnExit>
          <MobileMenu
            selectedCityId={selectedCityId}
            cities={cities}
            firstPhone={firstPhone}
            secondPhone={secondPhone}
            email={email}
            fb={fb}
            inst={inst}
            vk={vk}
            moneyAmount={moneyAmount}
            currency={currency}
            onChangeCity={onChangeCity}
            onClickSignout={onClickSignout}
            onClickReplenishment={onClickReplenishment}
          />
        </Collapse>
      </AppBar>

      <CitySelect
        isOpen={isCitiesModalOpen}
        selected={selectedCityId}
        cities={cities}
        onSelect={selectCity}
        onClose={closeCityModal}
      />
    </>
  );
}
