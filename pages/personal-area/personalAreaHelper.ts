import { Currency } from '../../@types/entities/Currency';
import { IOrder } from '../../@types/entities/IOrder';
import { IOrderProfile } from '../../@types/entities/IOrderProfile';

export const getFormattedAddressesList = (addressList: IOrderProfile[], language: 'en' | 'ru') => {
  return addressList.map(it => {
    const address = [
      it.city.name[language],
      it.street,
      it.house,
      it.apartment && `${language === 'ru' ? 'кв.' : 'apt.'}. ${it.apartment}`,
    ]
      .filter(it => !!it)
      .join(', ');

    return { title: it.title, address };
  });
};

export const getFormattedOrdersList = (orderList: IOrder[], currency: Currency) => {
  return orderList.map(it => ({
    id: it.crmInfo?.id || '####',
    date: new Date(it.createdAt),
    status: it.crmInfo?.status.name,
    sum: it.totalSum,
    currency,
  }));
};
