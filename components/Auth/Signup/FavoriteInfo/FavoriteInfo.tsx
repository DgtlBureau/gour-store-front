/* eslint-disable jsx-a11y/no-static-element-interactions */

/* eslint-disable jsx-a11y/click-events-have-key-events */
// FIXME: fix eslint errors
import React, { useState } from 'react';

import { Grid } from '@mui/material';

import { AuthCard } from 'components/Auth/Card/Card';
import { Button } from 'components/UI/Button/Button';
import { Typography } from 'components/UI/Typography/Typography';

import { useLocalTranslation } from 'hooks/useLocalTranslation';

import translations from './FavoriteInfo.i18n.json';
import s from './FavoriteInfo.module.scss';

import sx from './FavoriteInfo.styles';

import { CountrySvgSelector } from 'assets/icons/countries/CountrySvgSelector';
import { ProductSvgSelector } from 'assets/icons/products/ProductsSvgSelector';

export type FavoriteInfo = {
  countries: number[];
  products: number[];
};

export type SignupFavoriteInfoProps = {
  countries: {
    iconKey: string;
    title: string;
    id: number;
  }[];
  products: {
    iconKey: string;
    title: string;
    id: number;
  }[];
  onBack(): void;
  onSubmit(info: FavoriteInfo): void;
};

export function SignupFavoriteInfo({ countries, products, onBack, onSubmit }: SignupFavoriteInfoProps) {
  const { t } = useLocalTranslation(translations);

  const [userCountries, setUserCountries] = useState<number[]>([]);
  const [userProducts, setUserProducts] = useState<number[]>([]);

  const selectCountry = (countryId: number) => {
    const isSelected = userCountries.includes(countryId);
    if (isSelected) {
      const newList = userCountries.filter(id => id !== countryId);
      return setUserCountries(newList);
    }
    return setUserCountries(prevList => [...prevList, countryId]);
  };

  const selectProduct = (productId: number) => {
    const isSelected = userProducts.includes(productId);
    if (isSelected) {
      const newList = userProducts.filter(id => id !== productId);
      return setUserProducts(newList);
    }
    return setUserProducts(prevList => [...prevList, productId]);
  };

  const submit = () => onSubmit({ countries: userCountries, products: userProducts });

  return (
    <AuthCard>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Button variant='outlined' onClick={onBack}>
            {t('backButton')}
          </Button>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1'>{t('title')}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1'>{t('countriesTitle')}</Typography>
        </Grid>

        <Grid
          item
          xs={12}
          container
          sx={{
            display: 'flex',
            justifyContent: { xs: 'center', md: 'space-between' },
            gap: { md: '10px', xs: '10px 20px' },
          }}
        >
          {countries.map(country => (
            <div
              id={country.id.toString()}
              className={`${s.icon} ${userCountries.includes(country.id) ? s.selected : ''}`}
              onClick={() => selectCountry(country.id)}
            >
              {CountrySvgSelector(country.iconKey, s.outline)}
            </div>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography variant='subtitle1'>{t('likedTitle')}</Typography>
        </Grid>

        <Grid item xs={12} container spacing={2}>
          {products.map(product => (
            <Grid
              sx={{ ...sx.product, justifyContent: product.iconKey === 'jamon' ? 'flex-start' : 'center' }}
              item
              xs={6}
              sm={3}
              key={product.id}
            >
              <div
                className={`${s.icon} ${userProducts.includes(product.id) ? s.selected : ''}`}
                onClick={() => selectProduct(product.id)}
              >
                {ProductSvgSelector(product.iconKey, s.outline)}
              </div>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Button sx={{ width: '100%' }} variant='contained' onClick={submit}>
            {t('endRegistration')}
          </Button>
        </Grid>
      </Grid>
    </AuthCard>
  );
}
