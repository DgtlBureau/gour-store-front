import React from 'react';
import s from './OrderForm.module.scss';

type OrderFormContacts = {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
}

type OrderFormAddress = {
    city: string;
    street: string;
    homeNumber: number;
    apartmentNumber: number;
    entrance: number;
    floor: number;
}

export type OrderFormProps = {
    productCount: number;
    discount: number;
    deliveryCost: number;
    onSubmit(form: {
        contacts: OrderFormContacts;
        address: OrderFormAddress;
        comment: string;
        promoCode: string;
    }): void;
};

export function OrderForm(props: OrderFormProps) {
    return <div>OrderForm</div>
}
