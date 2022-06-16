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
import NextLink from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

import PlaceOutlinedIcon from '@mui/icons-material/PlaceOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AddIcon from '@mui/icons-material/Add';

import translations from './Header.i18n.json';
import { useLocalTranslation } from '../../hooks/useLocalTranslation';
import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';
import { Link as CustomLink } from '../UI/Link/Link';
import { IconButton } from '../UI/IconButton/IconButton';
import { getCurrencySymbol } from '../../helpers/currencyHelper';
import { Currency } from '../../@types/entities/Currency';
import { Language } from '../../@types/entities/Language';
import { defaultTheme as theme } from '../../themes';
import { Path } from '../../constants/routes';

import RusFlagIcon from './../../assets/icons/flags/rus.svg';
import UKFlagIcon from './../../assets/icons/flags/uk.svg';
import Logo from '../../assets/images/common-logo.svg';
import GamepadIcon from '../../assets/icons/gamepad.svg';
import CatalogIcon from '../../assets/icons/catalog.svg';

import sx from './Header.styles';

export type HeaderProps = {
  isMobile?: boolean;
  isGame?: boolean;
  phone: string;
  selectedCity: string;
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
  onOpenMobileMenu(): void;
};

export function Header({
  isMobile, // TODO
  isGame,
  phone,
  selectedCity,
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
  onOpenMobileMenu,
}: HeaderProps) {
  const { t } = useLocalTranslation(translations);

  const router = useRouter();

  const [isCitiesModalOpen, setIsCitiesModalOpen] = useState<boolean>(false);

  const currencySymbol = getCurrencySymbol(currency);

  const catalogIsHidden = moneyAmount < 1000;

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
              <Box sx={{ cursor: 'pointer', display: 'flex', alignItems: 'center' }}>
                <NextLink href="/" passHref>
                  <Image src={Logo} height={49} width={58} alt="" />
                </NextLink>
              </Box>
              {
                !isGame && (
                  <>
                    <CustomLink
                      path="tel:"
                      variant="body1"
                      color="inherit"
                      sx={{
                        margin: '0 20px',
                        display: { xs: 'none', sm: 'none', md: 'inline' },
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
                      onClick={openCityModal}
                    >
                      <PlaceOutlinedIcon />
                      <Typography sx={{ margin: '0 5px' }} variant="body1">
                        {selectedCity}
                      </Typography>
                      <KeyboardArrowDownIcon />
                    </Box>
                  </>
                )
              }
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
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ marginRight: '10px' }}>
                  {moneyAmount}
                  {currencySymbol}
                </Typography>
                
                <IconButton
                  component={'span'}
                  onClick={onClickReplenishment}
                  color="inherit"
                  sx={{ 
                    display: { xs: 'none', sm: 'flex' },
                    padding: '4px 16px',
                    backgroundColor: 'common.white',
                    borderRadius: '50px',
                    '&:hover' : {
                      backgroundColor: 'secondary.main',
                    }
                  }}
                >
                  <AddIcon color="primary" />
                </IconButton>
              </Box>
              {
                isGame ? (
                  <IconButton
                    component={'span'}
                    onClick={goToCatalog}
                    color="inherit"
                    sx={{
                      display: {
                        xs: 'none',
                        sm: catalogIsHidden ? 'none' : 'flex',
                      },
                      ...sx.icon,
                    }}
                  >
                    <Image src={CatalogIcon} height={24} width={24} alt="" />
                  </IconButton>
                ) : (
                  <IconButton
                    component={'span'}
                    onClick={goToGame}
                    color="inherit"
                    sx={{ display: { xs: 'none', sm: 'flex' }, ...sx.icon }}
                  >
                    <Image src={GamepadIcon} height={24} width={24} alt="" />
                  </IconButton>
                )
              }
              {
                !isGame && (
                  <>
                    <IconButton
                      component={'span'}
                      onClick={onClickFavorite}
                      color="inherit"
                      sx={{ display: { xs: 'none', sm: 'flex' }, ...sx.icon }}
                    >
                      <FavoriteBorderIcon />
                    </IconButton>

                    <IconButton
                      component={'span'}
                      onClick={onClickPersonalArea}
                      color="inherit"
                      sx={{ display: { xs: 'none', sm: 'flex' }, ...sx.icon }}
                    >
                      <PersonIcon />
                    </IconButton>

                    <Box sx={sx.flag}>
                      <NextLink
                        href={router?.asPath || ''}
                        locale={language === 'ru' ? 'en' : 'ru'}
                        passHref
                      >
                        <Image
                          src={language === 'ru' ? RusFlagIcon : UKFlagIcon}
                          objectFit="cover"
                          height={24}
                          width={34}
                          alt=""
                        />
                      </NextLink>
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
                        color="primary"
                      >
                        <ShoppingCartOutlinedIcon color="primary" />
                      </Badge>
                      {basketProductSum}
                      {currencySymbol}
                    </Button>
                  </>
                )
              }
            </Grid>
          </Grid>
        </Container>
      </AppBar>

      <Dialog
        open={isCitiesModalOpen}
        onClose={closeCityModal}
        PaperProps={{ sx: sx.paper }}
      >
        <DialogTitle>{t('cities')}</DialogTitle>

        <DialogContent sx={{ width: 500 }}>
          <Grid container spacing={2}>
            {
              cities.map(city => (
                <Grid
                  item
                  xs={12}
                  md={4}
                  onClick={() => selectCity(city.id)}
                  key={city.id}
                >
                  <Typography
                    sx={{ cursor: 'pointer' }}
                    variant="body1"
                    color={
                      city.name === selectedCity
                        ? theme.palette.accent.main
                        : 'inherit'
                    }
                  >
                    {city.name}
                  </Typography>
                </Grid>
              ))
            }
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
