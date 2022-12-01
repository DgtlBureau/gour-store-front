import React, { useState } from 'react';

import { ComponentMeta, ComponentStory } from '@storybook/react';

import { CartCard } from './Card';

export default {
  title: 'Cart/Card',
  component: CartCard,
} as ComponentMeta<typeof CartCard>;

const ONE_GRAMM_OF_CHEESE = 4.1;
const DISCOUNT = 0.25;
const WEIGHING_VALUE = 100;

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
        id={1}
        title='Chevrano XO Козий Элитный Сыр'
        amount={amount}
        price={price}
        gram={150}
        moyskladId={null}
        discount={DISCOUNT}
        productImg='https://www.gastronom.ru/binfiles/images/20190731/b05fb007.jpg'
        onDelete={() => ({})}
        onAdd={() => edit('increase')}
        onSubtract={() => edit('increase')}
      />
    </div>
  );
};

export const DefaultState = Template.bind({});
