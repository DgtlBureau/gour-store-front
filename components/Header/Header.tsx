import {
  AppBar,
  Badge,
  Container,
  Dialog,
  DialogContent,
  DialogTitle,
  Grid,
} from '@mui/material';
import React, { useState } from 'react';
import Image from 'next/image';

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import MenuIcon from '@mui/icons-material/Menu';
import RusFlagIcon from './../../assets/icons/flags/rus.svg';
import Logo from '../../assets/images/common-logo.svg';

import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';
import { Link as CustomLink } from '../UI/Link/Link';
import { IconButton } from '../UI/IconButton/IconButton';
import { getCurrencySymbol } from '../../helpers/currencyHelper';
import { defaultTheme as t } from '../../themes';

import sx from './Header.styles';

export type HeaderProps = {
  isMobile: boolean;
  phone: string;
  selectedCity: string;
  cities: {
    title: string;
    value: string;
  }[];
  selectedLanguage: 'ru' | 'en';
  basketProductCount: number;
  basketProductSum: number;
  basketProductCurrency: 'rub' | 'usd' | 'eur';
  onChangeCity(value: string): void;
  onClickFavorite(): void;
  onClickPersonalArea(): void;
  onClickLanguage(): void;
  onClickBasket(): void;
  onOpenMobileMenu(): void;
};

export function Header({
  isMobile,
  phone,
  selectedCity,
  cities,
  basketProductCount,
  basketProductSum,
  basketProductCurrency,
  onChangeCity,
  onClickFavorite,
  onClickPersonalArea,
  onClickLanguage,
  onClickBasket,
  onOpenMobileMenu,
}: HeaderProps) {
  const [isCitiesModalOpen, setIsCitiesModalOpen] = useState<boolean>(false);

  const handleOpen = () => {
    setIsCitiesModalOpen(true);
  };

  const handleClose = () => {
    setIsCitiesModalOpen(false);
  };

  const handleCityCheck = (cityValue: string) => {
    onChangeCity(cityValue);
    handleClose();
  };

  return (
    <>
      <AppBar sx={{ height: '72px' }}>
        <Container sx={{ height: '100%' }} maxWidth="lg">
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
            sx={{ height: '100%' }}
          >
            <Grid
              item
              xs={2}
              md={6}
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
            >
              <Image src={Logo} height={52} width={58} alt="" />

              <CustomLink
                path="tel:"
                variant="body1"
                color="inherit"
                sx={{
                  margin: '0 20px',
                  display: { xs: 'none', md: 'inline' },
                }}
              >
                {phone}
              </CustomLink>
              <Box
                sx={{
                  margin: { xs: '0 0 0 20px', md: 'none' },
                  display: { xs: 'none', md: 'flex' },
                  alignItems: 'center',
                  cursor: 'pointer',
                }}
                onClick={handleOpen}
              >
                <PlaceOutlinedIcon />
                <Typography sx={{ margin: '0 5px' }} variant="body1">
                  {selectedCity}
                </Typography>
                <KeyboardArrowDownIcon />
              </Box>
            </Grid>

            <Grid
              item
              xs={10}
              md={6}
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-end"
            >
              <IconButton
                component={'span'}
                onClick={onClickFavorite}
                color="inherit"
                sx={{ display: { xs: 'none', sm: 'flex' } }}
              >
                <FavoriteBorderIcon />
              </IconButton>
              <Button
                sx={{
                  margin: '0 0 0 20px',
                  display: { xs: 'none', sm: 'flex' },
                  textTransform: 'none',
                }}
                variant="text"
                color="inherit"
                onClick={onClickPersonalArea}
              >
                <PersonIcon sx={{ marginRight: '8px' }} />
                Личный кабинет
              </Button>
              <Box
                sx={sx.flag}
                onClick={onClickLanguage}
              >
                <Image src={RusFlagIcon} objectFit="cover" height={24} width={34}  alt="" />
              </Box>
              <Button
                sx={sx.cart}
                type="button"
                size="large"
                onClick={onClickBasket}
              >
                <Badge
                  sx={{ margin: '0 15px 0 0' }}
                  badgeContent={basketProductCount}
                  color='primary'
                >
                  <ShoppingCartOutlinedIcon color="primary" />
                </Badge>
                {basketProductSum} {getCurrencySymbol(basketProductCurrency)}
              </Button>
              <Button
                type="button"
                size="large"
                color="inherit"
                sx={{ display: { xs: 'flex', md: 'none' } }}
                onClick={onOpenMobileMenu}
              >
                <MenuIcon />
              </Button>
            </Grid>
          </Grid>
        </Container>
      </AppBar>

      <Dialog open={isCitiesModalOpen} onClose={handleClose} PaperProps={{ sx: sx.paper }}>
        <DialogTitle>Ваш город</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <Grid container spacing={2}>
            {cities.map(city => (
              <Grid
                item
                xs={12}
                md={4}
                onClick={() => handleCityCheck(city.value)}
                key={city.value}
              >
                <Typography
                  sx={{ cursor: 'pointer' }}
                  variant="body1"
                  color={city.title === selectedCity ? t.palette.accent.main : 'inherit'}
                >
                  {city.title}
                </Typography>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
