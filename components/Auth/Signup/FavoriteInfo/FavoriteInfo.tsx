import React, { useState } from 'react';
import { Paper, Grid } from '@mui/material';

import translations from './FavoriteInfo.i18n.json';
import { useLocalTranslation } from '../../../../hooks/useLocalTranslation';
import { AuthCard } from '../../Card/Card';
import { Button } from '../../../UI/Button/Button';
import { Typography } from '../../../UI/Typography/Typography';
import sx from './FavoriteInfo.styles';
import { Box } from '../../../UI/Box/Box';
import { Stepper } from '../../../UI/Stepper/Stepper';

export type FavoriteInfo = {
  countries: number[];
  products: number[];
};

export type SignupFavoriteInfoProps = {
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
  onSubmit(info: FavoriteInfo): void;
};

export function SignupFavoriteInfo({
  countries,
  products,
  onBack,
  onSubmit,
}: SignupFavoriteInfoProps) {
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
    <AuthCard>
      <Grid container spacing={2}>
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

        <Grid item xs={12} container spacing={2}>
          {countries.map(country => (
            <Grid item xs={3} sm={2} key={country.id}>
              <div
                style={{
                  ...sx.circle,
                  ...(userCountries.includes(country.id) && sx.selected),
                  backgroundImage: `url(${country.image})`,
                }}
                onClick={() => handleClickCountry(country.id)}
              >
                <Typography variant="body2">{country.title}</Typography>
              </div>
            </Grid>
          ))}
        </Grid>

        <Grid item xs={12}>
          <Typography variant="subtitle1">{t('likedTitle')}</Typography>
        </Grid>

        <Grid item xs={12} container spacing={2}>
          {products.map(product => (
            <Grid item xs={3} sm={2} key={product.id}>
              <div
                style={{
                  ...sx.circle,
                  ...(userProducts.includes(product.id) && sx.selected),
                  backgroundImage: `url(${product.image})`,
                }}
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
    </AuthCard>
  );
}
