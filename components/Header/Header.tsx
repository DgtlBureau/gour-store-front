import {
  Box,
  Button,
  Chip,
  Container,
  Grid,
  Link,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';

import PlaceIcon from '@mui/icons-material/Place';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

import s from './Header.module.scss';
import { IconButton } from '../UI/IconButton/IconButton';

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
};

export function Header(props: HeaderProps) {
  const [isCitiesListModalOpen, setIsCitiesListModalOpen] =
    useState<boolean>(false);

  return (
    <Box sx={{ width: '100vw', backgroundColor: '#c3c3c3', height: '72px' }}>
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
            xs={6}
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-start"
            spacing={2}
          >
            <Grid item>
              <Typography variant="subtitle1">Logo</Typography>
            </Grid>
            <Grid item>
              <Link href="tel:" variant="body1" color="inherit">
                +7 812 602-52-61
              </Link>
            </Grid>
            <Grid
              item
              xs={4}
              container
              direction="row"
              alignItems="center"
              justifyContent="flex-start"
              onClick={() => setIsCitiesListModalOpen(!isCitiesListModalOpen)}
            >
              <PlaceIcon />
              <Typography variant="body1">Санкт-Петербург</Typography>
              <KeyboardArrowDownIcon />
            </Grid>
            {/* <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              
            </Box> */}
          </Grid>

          <Grid
            item
            xs={6}
            container
            direction="row"
            alignItems="center"
            justifyContent="flex-end"
          >
            <div className={s.city}></div>
            <IconButton component={'span'}>
              <FavoriteBorderIcon />
            </IconButton>
            <Link
              href="tel:"
              variant="body2"
              color="inherit"
              sx={{
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <PersonIcon />
              Личный кабинет
            </Link>
            <Button>
              <ShoppingCartIcon />
              <Chip size="small" label="1" />
              12 550 ₽
            </Button>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
