import { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { useRouter } from 'next/router';

import {
  selectedProductCount,
  selectedProductSum,
} from '../../store/slices/orderSlice';
import { useGetCityListQuery } from 'store/api/cityApi';
import { useGetCurrentUserQuery } from 'store/api/authApi';
import { Box } from '../../components/UI/Box/Box';
import { Header } from '../../components/Header/Header';
import { Footer } from '../../components/Footer/Footer';
import { Currency } from '../../@types/entities/Currency';
import { Language } from '../../@types/entities/Language';

import sx from './Shop.styles';

export interface ShopLayoutProps {
  currency: Currency;
  language: Language;
  children?: ReactNode;
}

export function ShopLayout({ currency, language, children }: ShopLayoutProps) {
  const router = useRouter();

  const { data: cities } = useGetCityListQuery();
  const { data: currentUser } = useGetCurrentUserQuery();

  const convertedCities =
    cities?.map(city => ({
      id: city.id,
      name: city.name[language],
    })) || [];

  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);

  const selectedCity =
    cities?.find(city => city.id === currentUser?.cityId) || cities?.[0];

  const goToFavorites = () => router.push('/favorites');
  const goToBasket = () => router.push('/basket');
  const goToPersonalArea = () => router.push('/personal-area');

  // TO DO
  const changeCity = (id: number) => ({});

  return (
    <Box sx={sx.shopLayout}>
      <Header
        isMobile={false}
        phone="+7 812 602-52-61"
        selectedCity={selectedCity?.name[language] || ''}
        cities={convertedCities}
        currency={currency}
        language={language}
        basketProductCount={count}
        basketProductSum={sum}
        onChangeCity={changeCity}
        onClickFavorite={goToFavorites}
        onClickPersonalArea={goToPersonalArea}
        onClickBasket={goToBasket}
        onOpenMobileMenu={() => {}}
      />

      <Box sx={sx.content}>
        {children}
        <Footer
          sx={sx.footer}
          firstPhone="+7 812 602-52-61"
          secondPhone="+372 880-45-21"
          email="rk@gour-food.com"
          fb="https://www.facebook.com/gourfood.spb/"
          inst="https://www.instagram.com/gourfood_/"
          vk="https://vk.com/gour_food"
          copyright=""
          rules=""
          privacy=""
          cookie=""
          terms=""
        />
      </Box>
    </Box>
  );
}
