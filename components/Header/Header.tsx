import { AppBar, Badge, Container, Collapse, Grid } from '@mui/material';
import React, { useState } from 'react';
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import MenuIcon from '@mui/icons-material/Menu';

import { CitySelect } from './CitySelect';
import { MobileMenu } from '../Mobile/Menu/Menu';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';
import { Link as CustomLink } from '../UI/Link/Link';
import { IconButton } from '../UI/IconButton/IconButton';
import { getCurrencySymbol } from '../../helpers/currencyHelper';
import { Currency } from '../../@types/entities/Currency';
import { Language } from '../../@types/entities/Language';
import { Path } from '../../constants/routes';

import RusFlagIcon from './../../assets/icons/flags/rus.svg';
import UKFlagIcon from './../../assets/icons/flags/uk.svg';
import Logo from '../../assets/images/common-logo.svg';
import GamepadIcon from '../../assets/icons/gamepad.svg';
import CatalogIcon from '../../assets/icons/catalog.svg';

import sx from './Header.styles';

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
  language: Language;
  basketProductCount: number;
  basketProductSum: number;
  moneyAmount: number;
  onChangeCity(id: number): void;
  onClickFavorite(): void;
  onClickPersonalArea(): void;
  onClickBasket(): void;
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
  language,
  currency,
  moneyAmount,
  onChangeCity,
  onClickFavorite,
  onClickPersonalArea,
  onClickBasket,
  onClickReplenishment,
  onClickSignout,
}: HeaderProps) {
  const router = useRouter();

  const [isCitiesModalOpen, setIsCitiesModalOpen] = useState<boolean>(false);
  const [isMenuDeployed, setIsMenuDeployed] = useState(false);

  const currencySymbol = getCurrencySymbol(currency);

  const catalogIsHidden = moneyAmount < 1000;

  const currentCity = cities.find(it => it.id === selectedCityId);

  const deployMenu = () => setIsMenuDeployed(!isMenuDeployed);

  const openCityModal = () => setIsCitiesModalOpen(true);

  const closeCityModal = () => setIsCitiesModalOpen(false);

  const selectCity = (id: number) => {
    onChangeCity(id);
    closeCityModal();
  };

  const goToGame = () => router.push(Path.GAME);
  const goToCatalog = () => router.push(Path.HOME);

  return (
    <>
      <AppBar sx={sx.header}>
        <Container sx={{ height: '100%', position: 'relative' }} maxWidth="lg">
          <Grid container direction="row" justifyContent="center" alignItems="center" sx={{ height: '100%' }}>
            <Grid item xs={2} md={4} lg={6} container direction="row" alignItems="center" justifyContent="flex-start">
              <Box sx={sx.logo}>
                <NextLink href="/" passHref>
                  <Image src={Logo} height={49} width={58} alt="" />
                </NextLink>
              </Box>

              {!isGame && (
                <>
                  <CustomLink path={`tel:${firstPhone}`} variant="body1" color="inherit" sx={sx.phone}>
                    {firstPhone}
                  </CustomLink>

                  <Box sx={sx.city} onClick={openCityModal}>
                    <PlaceOutlinedIcon />
                    <Typography sx={sx.cityTitle} variant="body1">
                      {currentCity?.name}
                    </Typography>
                    <KeyboardArrowDownIcon />
                  </Box>
                </>
              )}
            </Grid>

            <Grid item xs={10} md={8} lg={6} container direction="row" alignItems="center" justifyContent="flex-end">
              <Box
                sx={{
                  ...sx.money,
                  display: {
                    xs: isGame ? 'flex' : 'none',
                    sm: 'flex',
                  },
                }}
              >
                <Typography variant="body2" sx={sx.moneyAmount}>
                  {moneyAmount}
                  {currencySymbol}
                </Typography>

                <IconButton onClick={onClickReplenishment} color="inherit" sx={sx.replenishment}>
                  <AddIcon color="primary" />
                </IconButton>
              </Box>

              {isGame ? (
                <IconButton
                  onClick={goToCatalog}
                  color="inherit"
                  sx={{
                    ...sx.icon,
                    display: {
                      xs: isGame ? 'flex' : 'none',
                      sm: catalogIsHidden ? 'none' : 'flex',
                    },
                  }}
                >
                  <Image src={CatalogIcon} height={24} width={24} alt="" />
                </IconButton>
              ) : (
                <IconButton onClick={goToGame} color="inherit" sx={sx.icon}>
                  <Image src={GamepadIcon} height={24} width={24} alt="" />
                </IconButton>
              )}

              {!isGame && (
                <>
                  <IconButton onClick={onClickFavorite} color="inherit" sx={sx.icon}>
                    <FavoriteBorderIcon />
                  </IconButton>

                  <IconButton onClick={onClickPersonalArea} color="inherit" sx={sx.icon}>
                    <PersonIcon />
                  </IconButton>

                  <Box sx={sx.flag}>
                    <NextLink href={router?.asPath || ''} locale={language === 'ru' ? 'en' : 'ru'} passHref>
                      <Image
                        src={language === 'ru' ? RusFlagIcon : UKFlagIcon}
                        objectFit="cover"
                        height={24}
                        width={34}
                        alt=""
                      />
                    </NextLink>
                  </Box>

                  <Button sx={sx.cart} onClick={onClickBasket}>
                    <Badge sx={sx.cartBadge} badgeContent={basketProductCount} color="primary">
                      <ShoppingCartOutlinedIcon color="primary" />
                    </Badge>
                    {basketProductSum}
                    {currencySymbol}
                  </Button>
                </>
              )}
              {!isGame && (
                <IconButton sx={sx.menuBtn} color="inherit" onClick={deployMenu}>
                  {!isMenuDeployed ? <MenuIcon sx={sx.menuIcon} /> : <CloseIcon sx={sx.menuIcon} />}
                </IconButton>
              )}
            </Grid>
          </Grid>
        </Container>

        <Collapse in={isMenuDeployed} timeout="auto" unmountOnExit>
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
            onClickFavorite={onClickFavorite}
            onClickPersonalArea={onClickPersonalArea}
            onClickSignout={onClickSignout}
            onClickReplenishment={onClickReplenishment}
            onClickGame={goToGame}
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
