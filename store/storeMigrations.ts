import { MigrationManifest, PersistedState } from 'redux-persist/es/types';

export const storeMigrations: MigrationManifest = {
  0: state =>
    ({
      ...state,
      order: {
        products: {},
      },
    } as PersistedState),
};
