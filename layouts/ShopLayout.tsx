import { Header } from '../components/Header/Header';
import { ReactElement } from 'react';
import s from './ShopLayout.module.scss';
import { useSelector } from 'react-redux';
import {
  selectedProductCount,
  selectedProductSum,
  selectedProductWeight,
} from '../store/slices/orderSlice';
import { Footer } from '../components/Footer/Footer';
import { useLocation, useNavigate } from 'react-router';
import { useRouter } from 'next/router';

export interface ShopLayoutProps {
  children?: ReactElement;
}

export function ShopLayout(props: ShopLayoutProps) {
  const count = useSelector(selectedProductCount);
  const sum = useSelector(selectedProductSum);
  const router = useRouter();

  return (
    <div className={s.shopLayout}>
      <Header
        isMobile={false}
        phone={''}
        selectedCity={''}
        cities={[]}
        selectedLanguage={'ru'}
        basketProductCount={count}
        basketProductSum={sum}
        basketProductCurrency={'rub'}
        onChangeCity={() => {}}
        onClickFavorite={() => {}}
        onClickPersonalArea={() => {}}
        onClickLanguage={() => {}}
        onClickBasket={() => {}}
        onOpenMobileMenu={() => {}}
      />
      <div className={s.content}>
        {props.children}
        <div className={s.footer}>
<<<<<<< HEAD
          <Footer 
=======
          <Footer
>>>>>>> 32360e99ffd4dece4c1315e1bb989db929a6307d
            firstPhone="+7 812 602-52-61"
            secondPhone="+372 880-45-21"
            email="rk@gour-food.com"
            fb=""
            inst=""
            vk=""
            copyright=""
            rules=""
            privacy=""
            cookie=""
            terms=""
          />
        </div>
      </div>
    </div>
  );
}
