import { useRouter } from 'next/router';
import get from 'lodash.get';
import en from '../i18n/en.json';
import ru from '../i18n/ru.json';

export const useTranslation = () => {
  const router = useRouter();
  const locale = router?.locale || 'ru';
  const config = locale === 'ru' ? ru : en;
  return {
    t: (str: string) => get(config, str),
  };
};
