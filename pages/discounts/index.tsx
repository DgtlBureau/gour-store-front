import React from 'react';

import { PALayout } from 'layouts/PA/PA';
import { DiscountsGroup } from 'components/Discounts/Group/Group';
import { DiscountsInfoBar } from 'components/Discounts/InfoBar/InfoBar';
import { Typography } from 'components/UI/Typography/Typography';
import { Stack } from '@mui/material';

const discounts = [
  {
    key: 'Milk',
    title: 'Молоко',
    categories: [
      {
        title: 'Коровье',
        summary: 923500,
      },
      {
        title: 'Козье',
        summary: 150670,
      },
      {
        title: 'Овечье',
        summary: 307780,
      },
    ],
  },
  {
    key: 'Country',
    title: 'Страна',
    categories: [
      {
        title: 'Россия',
        summary: 127900,
      },
      {
        title: 'Испания',
        summary: 406870,
      },
      {
        title: 'Франция',
        summary: 1250,
      },
    ],
  },
];

export function Discounts() {
  return (
    <PALayout>
      <Stack spacing={2}>
        <DiscountsInfoBar>
          <Typography variant="body1">
            Здесь Вы можете отследить прогресс своей скидки на покупку товаров
            по различным категориям. Чем больше покупок, тем больше скидка!
            <br />
            Шаг для получения скидки - 100 000 ₽. Максимальная скидка - 10 %.
            <br />
            При покупке товара, попадающего под несколько критериев, его
            стоимость пойдёт в зачёт по всем критериям.
          </Typography>
        </DiscountsInfoBar>
        {discounts.map(discount => (
          <DiscountsGroup
            key={discount.key}
            title={discount.title}
            categories={discount.categories}
          />
        ))}
      </Stack>
    </PALayout>
  );
}

export default Discounts;
