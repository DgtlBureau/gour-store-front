import React from 'react';
import s from './Header.module.scss';

export type HeaderProps = {
    isMobile: boolean;
    phone: string;
    selectedCity: string;
    cities: {
        title: string;
        value: string;
    }[];
    selectedLanguage: 'ru'|'en';
    basketProductCount: number;
    basketProductSum: number;
    basketProductCurrency: 'rub'|'usd'|'eur';
    onChangeCity(value: string): void;
    onClickFavorite(): void;
    onClickPersonalArea(): void;
    onClickLanguage(): void;
    onClickBasket(): void;
};

export function Header(props: HeaderProps) {
    return <div>Header</div>
}
