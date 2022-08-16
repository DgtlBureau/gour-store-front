import russiaImg from '../assets/images/countries/russia.png';
import spainImg from '../assets/images/countries/spain.png';
import italyImg from '../assets/images/countries/italy.png';
import franceImg from '../assets/images/countries/france.png';
import hollandImg from '../assets/images/countries/holland.png';
import britainImg from '../assets/images/countries/britain.png';

export const getCountryImage = (country: string): string => {
  switch (country) {
    case 'Russia':
      return russiaImg;
    case 'Spain':
      return spainImg;
    case 'Italy':
      return italyImg;
    case 'France':
      return franceImg;
    case 'Holland':
      return hollandImg;
    case 'GreatBritain':
      return britainImg;
    default:
      return '';
  }
};
