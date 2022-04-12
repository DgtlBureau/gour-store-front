import React, { useState } from 'react';
import s from './RegFavoriteInfo.module.scss';
import translations from './RegFavoriteInfo.i18n.json';
import { useLocalTranslation } from '../../../hooks/useLocalTranslation';
import { Grid } from '@mui/material';
import { Button } from './../../UI/Button/Button';
import { Typography } from './../..//UI/Typography/Typography';

export type RegFavoriteInfoProps = {
  countries: {
    image: string;
    title: string;
    id: number;
  }[];
  products: {
    image: string;
    title: string;
    id: number;
  }[];
  onBack(): void;
  onSubmit(info: { countries: number[]; products: number[] }): void;
};

export function RegFavoriteInfo({
  countries,
  products,
  onBack,
  onSubmit,
}: RegFavoriteInfoProps) {
  const { t } = useLocalTranslation(translations);

  const [userCountries, setUserCountries] = useState<number[]>([]);
  const [userProducts, setUserProducts] = useState<number[]>([]);

  const handleClickCountry = (countryId: number) => {
    const isSelected = userCountries.includes(countryId);
    if (isSelected) {
      const newList = userCountries.filter(id => id !== countryId);
      return setUserCountries(newList);
    }
    return setUserCountries(prevList => [...prevList, countryId]);
  };

  const handleClickProducts = (productId: number) => {
    const isSelected = userProducts.includes(productId);
    if (isSelected) {
      const newList = userProducts.filter(id => id !== productId);
      return setUserProducts(newList);
    }
    return setUserProducts(prevList => [...prevList, productId]);
  };

  const handleSubmit = () => {
    onSubmit({
      countries: userCountries,
      products: userProducts,
    });
  };

  return (
    <Grid container spacing={2} sx={{ maxWidth: '520px' }}>
      <Grid item xs={4}>
        <Button variant="outlined" onClick={onBack}>
          {t('backButton')}
        </Button>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{t('title')}</Typography>
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{t('countriesTitle')}</Typography>
      </Grid>
      <Grid item xs={12} container>
        {countries.map(country => (
          <Grid item xs={2} key={country.id}>
            <div
              className={`${s.circle} ${
                userCountries.includes(country.id) ? s.selected : ''
              }`}
              style={{ backgroundImage: `url(${country.image})` }}
              onClick={() => {
                handleClickCountry(country.id);
              }}
            >
              <Typography variant="body2">{country.title}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Typography variant="subtitle1">{t('likedTitle')}</Typography>
      </Grid>
      <Grid item xs={12} container>
        {products.map(product => (
          <Grid item xs={2} key={product.id}>
            <div
              className={`${s.circle} ${
                userProducts.includes(product.id) ? s.selected : ''
              }`}
              style={{ backgroundImage: `url(${product.image})` }}
              onClick={() => {
                handleClickProducts(product.id);
              }}
            >
              <Typography variant="body2">{product.title}</Typography>
            </div>
          </Grid>
        ))}
      </Grid>
      <Grid item xs={12}>
        <Button
          sx={{ width: '100%' }}
          variant="contained"
          onClick={handleSubmit}
        >
          {t('endRegistration')}
        </Button>
      </Grid>
    </Grid>
  );
}
