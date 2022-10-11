import React from 'react';

import { useGetCategoryListWithDiscountQuery } from 'store/api/categoryApi';

import { PALayout } from 'layouts/PA/PA';


import { CartEmpty } from 'components/Cart/Empty/Empty';
import { DiscountsGroup } from 'components/Discounts/Group/Group';
import { DiscountsInfoBar } from 'components/Discounts/InfoBar/InfoBar';
import { useAppNavigation } from 'components/Navigation';
import { ProgressLinear } from 'components/UI/ProgressLinear/ProgressLinear';
import { Typography } from 'components/UI/Typography/Typography';

export function Discounts() {
  const { language, goToHome } = useAppNavigation();
  const { data: categories = [], isLoading, isError, isSuccess } = useGetCategoryListWithDiscountQuery();

  return (
    <PALayout>
      {isLoading && <ProgressLinear variant='buffer' />}

      {isError && <Typography variant='h5'>Произошла ошибка</Typography>}

      {isSuccess && (
        <>
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

          {!categories.length && (
            <CartEmpty
              title='Вы ещё ничего не купили'
              css
              btn={{
                label: 'Вернуться к покупкам',
                onClick: goToHome,
              }}
            />
          )}

          {categories.map(category => (
            <DiscountsGroup
              key={category.id}
              title={category.title[language]}
              subCategories={category.subCategories}
              language={language}
            />
          ))}
        </>
      )}
    </PALayout>
  );
}

export default Discounts;
