import { ProductCountry } from '../types/entities/IProduct';

import russiaImg from '../assets/images/countries/russia.png';
import spainImg from '../assets/images/countries/spain.png';
import italyImg from '../assets/images/countries/italy.png';
import franceImg from '../assets/images/countries/france.png';
import hollandImg from '../assets/images/countries/holland.png';
import britainImg from '../assets/images/countries/britain.png';

const imageByCountry: Record<ProductCountry, string> = {
  Russia: russiaImg,
  Spain: spainImg,
  Italy: italyImg,
  France: franceImg,
  Holland: hollandImg,
  GreatBritain: britainImg,
};

export const getCountryImage = (country?: ProductCountry) => country && imageByCountry[country];
