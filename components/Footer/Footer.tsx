import React from 'react';
import s from './Footer.module.scss';

export type FooterProps = {
    isMobile: boolean;
    firstPhone: string;
    secondPhone: string;
    email: string;
    fb: string;
    instagram: string;
    vk: string;
};

export function Footer(props: FooterProps) {
    return <div>Footer</div>
}
