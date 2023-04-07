import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { IProduct } from 'types/entities/IProduct';

import { CartCard } from './Card';

export default {
  title: 'Cart/Card',
  component: CartCard,
} as ComponentMeta<typeof CartCard>;

const ONE_GRAMM_OF_CHEESE = 4.1;
const DISCOUNT = 0.25;
const WEIGHING_VALUE = 100;

const NEW_DATE = new Date().toISOString();
const TRANSLATABLE_TEXT = {
  id: 12,
  ru: 'description',
  en: 'description',
  createdAt: NEW_DATE,
  updatedAt: NEW_DATE,
};

const mockProduct: IProduct = {
  id: 1,
  commentsCount: 1,
  description: TRANSLATABLE_TEXT,
  discount: 10,
  grade: 123,
  images: [],
  gradesCount: 1,
  meta: {
    isIndexed: true,
    metaDescription: TRANSLATABLE_TEXT,
    metaKeywords: TRANSLATABLE_TEXT,
    metaTitle: TRANSLATABLE_TEXT,
  },
  moyskladCode: 1,
  moyskladId: '1',
  pieces: [],
  price: {
    id: 1,
    cheeseCoin: 1,
    individual: 1,
    company: 1,
    companyByCash: 1,
    createdAt: NEW_DATE,
    updatedAt: NEW_DATE,
  },
  productGrades: [],
  roleDiscounts: [],
  similarProducts: [],
  title: TRANSLATABLE_TEXT,
  totalCost: 8,
  weight: 1,
  createdAt: NEW_DATE,
  updatedAt: NEW_DATE,
};

const Template: ComponentStory<typeof CartCard> = () => {
  const [amount, setAmount] = useState(100);
  const price = Math.round(amount * ONE_GRAMM_OF_CHEESE);

  const edit = (action: 'increase' | 'decrease') => {
    if (action === 'increase') {
      setAmount(amount + WEIGHING_VALUE);
      return;
    }
    setAmount(amount - WEIGHING_VALUE);
  };

  return (
    <div>
      <CartCard
        product={mockProduct}
        amount={amount}
        price={price}
        gram={150}
        productImg='https://www.gastronom.ru/binfiles/images/20190731/b05fb007.jpg'
        onDelete={() => ({})}
        onAdd={() => edit('increase')}
        onSubtract={() => edit('increase')}
      />
    </div>
  );
};

export const DefaultState = Template.bind({});
