import get from 'lodash.get';

import { useAppNavigation } from 'components/Navigation';
import en from '../i18n/en.json';
import ru from '../i18n/ru.json';

export const useTranslation = () => {
  const { language } = useAppNavigation();
  const config = language === 'ru' ? ru : en;

  return {
    t: (str: string) => get(config, str),
  };
};
