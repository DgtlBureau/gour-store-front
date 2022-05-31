import russiaIcon from '../assets/icons/countries/russia.svg';
import ukIcon from '../assets/icons/countries/great-britain.svg';
import italyIcon from '../assets/icons/countries/italy.svg';
import netherlandsIcon from '../assets/icons/countries/netherlands.svg';
import spainIcon from '../assets/icons/countries/spain.svg';
import franceIcon from '../assets/icons/countries/france.svg';

export const getCountryFlag = (country: string) => {
    switch (country) {
        case 'Russia':
        case 'RU':
        case 'RUS':
            return russiaIcon
        case 'GreatBritain':
        case 'GB':
        case 'UK':
        case 'GBR':
            return ukIcon
        case 'Italy':
        case 'IT':
        case 'ITA':
            return italyIcon
        case 'Netherlands':
        case 'NL':
        case 'NLD':
            return netherlandsIcon
        case 'Spain':
        case 'ES':
        case 'ESP':
            return spainIcon
        case 'France':
        case 'FR':
        case 'FRA':
            return franceIcon
        default:
            return ''
    }
}
