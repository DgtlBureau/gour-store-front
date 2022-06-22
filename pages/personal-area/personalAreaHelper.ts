import { IOrderProfile } from '../../@types/entities/IOrderProfile';

export const getFormattedAddressesList = (
  addressList: IOrderProfile[],
  language: 'en' | 'ru'
) => {
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
