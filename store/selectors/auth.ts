import { RootState } from '../store';

export const selectCurrentUser = (state: RootState) => state.auth.currentUser;
export const selectIsAuth = (state: RootState): boolean => state.auth.isAuthorized;
