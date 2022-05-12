import { useRouter } from 'next/router';
import get from 'lodash.get';

type LocalConfig = {
  en: Record<string, string | object>;
  ru: Record<string, string | object>;
}

export const useLocalTranslation = (config: LocalConfig) => {
  const router = useRouter();
  const locale: keyof LocalConfig= router?.locale as keyof LocalConfig || 'ru';
  return {
    t: (str: string) => get(config[locale], str) as string
  };
};
