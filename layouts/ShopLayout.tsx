import {Header} from "../components/Header/Header";
import {ReactElement} from "react";
import s from './ShopLayout.module.scss';


export interface ShopLayoutProps {
    children: ReactElement
}

export function ShopLayout(props: ShopLayoutProps) {
    return <div className={s.shopLayout}>
        <Header
            isMobile={false}
            phone={''}
            selectedCity={''}
            cities={[]}
            selectedLanguage={'ru'}
            basketProductCount={0}
            basketProductSum={1000}
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
        </div>
    </div>
}