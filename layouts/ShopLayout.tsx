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
  children: ReactElement;
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
        onClickBasket={() => router.push('/order/basket')}
        onOpenMobileMenu={() => {}}
      />
      <div className={s.content}>
        {props.children}
        <div className={s.footer}>
          <Footer
            firstPhone={'firstPhone'}
            secondPhone={'secondPhone'}
            email={'email'}
            fb={'fb'}
            inst={'inst'}
            vk={'vk'}
            copyright={'copyright'}
            rules={'rules'}
            privacy={'privacy'}
            cookie={'cookie'}
            terms={'terms'}
          />
        </div>
      </div>
    </div>
  );
}
