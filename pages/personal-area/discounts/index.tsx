import React from 'react';

import { useGetCategoryListWithDiscountQuery } from 'store/api/categoryApi';
import { PALayout } from 'layouts/PA/PA';
import { useAppNavigation } from 'components/Navigation';
import { DiscountsGroup } from 'components/Discounts/Group/Group';
import { DiscountsInfoBar } from 'components/Discounts/InfoBar/InfoBar';
import { Typography } from 'components/UI/Typography/Typography';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';

export function Discounts() {
  const { language } = useAppNavigation();
  const { data: categories = [], isLoading, isError } = useGetCategoryListWithDiscountQuery();

  return (
    <PALayout>
      {isLoading && <ProgressLinear sx={{ marginBottom: '20px' }} />}
      <DiscountsInfoBar>
        <Typography variant='body1'>
          Здесь Вы можете отследить прогресс своей скидки на покупку товаров по различным категориям. Чем больше
          покупок, тем больше скидка!
          <br />
          Шаг для получения скидки - 100 000 ₽. Максимальная скидка - 10 %.
          <br />
          При покупке товара, попадающего под несколько критериев, его стоимость пойдёт в зачёт по всем критериям.
        </Typography>
      </DiscountsInfoBar>

      {isError && (
        <Typography variant='body2' color='error'>
          Server error.
        </Typography>
      )}

      {categories.map(category => (
        <DiscountsGroup
          key={category.id}
          title={category.title[language]}
          subCategories={category.subCategories}
          language={language}
        />
      ))}
    </PALayout>
  );
}

export default Discounts;
