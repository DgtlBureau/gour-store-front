import React from 'react';
import s from './MobileMenu.module.scss';

export type MobileMenuProps = {
    selectedCity: string;
    cities: {
        title: string;
        value: string;
    }[];
    selectedLanguage: 'ru'|'en';
    firstPhone: string;
    secondPhone: string;
    email: string;
    fb: string;
    instagram: string;
    vk: string;
    onChangeCity(value: string): void;
    onClickFavorite(): void;
    onClickPersonalArea(): void;
    onClickLanguage(): void;
    onClickBasket(): void;
    onClickSignout(): void;
    onClose(): void;
};

export function MobileMenu(props: MobileMenuProps) {
    return <div>MobileMenu</div>
}
