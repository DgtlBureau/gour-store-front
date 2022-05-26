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
import MenuIcon from '@mui/icons-material/Menu';
import RusFlagIcon from './../../assets/icons/flags/rus.svg';
import UKFlagIcon from './../../assets/icons/flags/uk.svg';
import Logo from '../../assets/images/common-logo.svg';

import { Box } from '../UI/Box/Box';
import { Typography } from '../UI/Typography/Typography';
import { Button } from '../UI/Button/Button';
import { Link as CustomLink } from '../UI/Link/Link';
import { IconButton } from '../UI/IconButton/IconButton';
import { getCurrencySymbol } from '../../helpers/currencyHelper';
import { defaultTheme as theme } from '../../themes';
import {
  useLocalTranslation,
  LocalConfig,
} from '../../hooks/useLocalTranslation';
import translations from './Header.i18n.json';
import { Currency } from '../../@types/entities/Currency';

import sx from './Header.styles';

export type HeaderProps = {
  isMobile: boolean;
  phone: string;
  selectedCity: string;
  cities: {
    id: number;
    name: string;
  }[];
  selectedLanguage: 'ru' | 'en';
  basketProductCount: number;
  basketProductSum: number;
  currency: Currency;
  onChangeCity(id: number): void;
  onClickFavorite(): void;
  onClickPersonalArea(): void;
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
  currency,
  onChangeCity,
  onClickFavorite,
  onClickPersonalArea,
  onClickBasket,
  onOpenMobileMenu,
}: HeaderProps) {
  const { t } = useLocalTranslation(translations);

  const router = useRouter();

  const locale: keyof LocalConfig =
    (router?.locale as keyof LocalConfig) || 'ru';

  const [isCitiesModalOpen, setIsCitiesModalOpen] = useState<boolean>(false);

  const openCityModal = () => {
    setIsCitiesModalOpen(true);
  };

  const closeCityModal = () => {
    setIsCitiesModalOpen(false);
  };

  const selectCity = (id: number) => {
    onChangeCity(id);
    closeCityModal();
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
              <Box sx={{ cursor: 'pointer' }}>
                <NextLink href="/" passHref>
                  <>
                  <Image src={Logo} height={52} width={58} alt="" />
                  </>
                </NextLink>
              </Box>

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
                onClick={openCityModal}
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
                {t('account')}
              </Button>
              <Box sx={sx.flag}>
                <NextLink
                  href={router.asPath}
                  locale={locale === 'ru' ? 'en' : 'ru'}
                  passHref
                >
                  <>
                  <Image
                    src={locale === 'ru' ? RusFlagIcon : UKFlagIcon}
                    objectFit="cover"
                    height={24}
                    width={34}
                    alt=""
                  />
                  </>
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
                {basketProductSum} {getCurrencySymbol(currency)}
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

      <Dialog
        open={isCitiesModalOpen}
        onClose={closeCityModal}
        PaperProps={{ sx: sx.paper }}
      >
        <DialogTitle>{t('cities')}</DialogTitle>
        <DialogContent sx={{ width: 500 }}>
          <Grid container spacing={2}>
            {cities.map(city => (
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
            ))}
          </Grid>
        </DialogContent>
      </Dialog>
    </>
  );
}
