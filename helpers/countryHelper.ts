import russiaImg from '../assets/images/countries/russia.png';
import spainImg from '../assets/images/countries/spain.png';
import italyImg from '../assets/images/countries/italy.png';
import franceImg from '../assets/images/countries/france.png';
import hollandImg from '../assets/images/countries/holland.png';
import britainImg from '../assets/images/countries/britain.png';
import { ICategory } from 'types/entities/ICategory';

export const imageByCountry: Record<string, string> = {
  Russia: russiaImg,
  Spain: spainImg,
  Italy: italyImg,
  France: franceImg,
  Holland: hollandImg,
  GreatBritain: britainImg,

  Россия: russiaImg,
  Испания: spainImg,
  Италия: italyImg,
  Франция: franceImg,
  Голландия: hollandImg,
  Великобритания: britainImg,
};

export const getCountryImage = (categories?: ICategory[]) =>
  categories?.reduce<string | undefined>(
    (countryImg, category) => countryImg || imageByCountry[category.title.ru] || imageByCountry[category.title.en],
    undefined,
  );
