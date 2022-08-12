import get from 'lodash.get';

import { useAppNavigation } from 'components/Navigation';

export type LocalConfig = {
  en: Record<string, string | object>;
  ru: Record<string, string | object>;
};

export const useLocalTranslation = (config: LocalConfig) => {
  const { language } = useAppNavigation();

  return {
    t: (str: string) => get(config[language], str) as string,
  };
};
