import { useRouter } from 'next/router';
import get from 'lodash.get';

type LocalConfig = {
  en: Record<string, string>;
  ru: Record<string, string>;
}

export const useLocalTranslation = (config: LocalConfig) => {
  const router = useRouter();
  const locale: keyof LocalConfig= router?.locale as keyof LocalConfig || 'ru';
  return {
    t: (str: string) => get(config[locale], str)
  };
};
