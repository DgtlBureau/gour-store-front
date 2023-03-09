import { OrderType } from 'types/entities/IProduct';
import { ITranslatableString } from 'types/entities/ITranslatableString';

export type OrderTypeOption = {
  title: Omit<ITranslatableString, 'id' | 'createdAt' | 'updatedAt' | 'deleted'>;
  type: OrderType;
};

export const orderTypeOptions: OrderTypeOption[] = [
  // {
  //   title: {
  //     ru: 'По умолчанию',
  //     en: 'By default',
  //   },
  //   type: 'default',
  // },
  {
    title: {
      ru: 'Сначала дешевле',
      en: 'Cheaper at first',
    },
    type: 'price',
  },
  {
    title: {
      ru: 'Сначала дороже',
      en: 'More expensive at first',
    },
    type: 'price-reverse',
  },
  {
    title: {
      ru: 'По размеру скидки',
      en: 'By the size of the discount',
    },
    type: 'discount',
  },
  {
    title: {
      ru: 'Высокий рейтинг',
      en: 'High rating',
    },
    type: 'rate',
  },
];
