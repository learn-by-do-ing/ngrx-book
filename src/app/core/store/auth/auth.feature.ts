import { createFeature, createReducer, createSelector, on } from '@ngrx/store';
import { AuthActions } from './auth.actions';

export interface AuthState {
  token: string | null;
  displayName: string | null;
}

export const initialState: AuthState = {
  token: null,
  displayName: null,
}
export const authFeature = createFeature({
  name: 'auth',
  reducer: createReducer(
    initialState,
    on(AuthActions.initialize, (state, action) => {
      return ({ ...state, token: action.token, displayName: action.displayName })
    }),
    on(AuthActions.login, (state, action) => {
      return ({ ...state, token: null })
    }),
    on(AuthActions.loginSuccess, (state, action) => {
      return ({ ...state, token: action.token })
    }),
    on(AuthActions.logout, (state, action) => {
      return ({ ...state, token: null, displayName: null })
    }),
    on(AuthActions.getProfileSuccess, (state, action) => {
      return ({ ...state, displayName: action.displayName })
    })
  ),
  extraSelectors: ({ selectToken }) => ({
    selectIsLogged: createSelector(
      selectToken,
      token => !!token
    )
  })
});

export const {
  selectToken,
  selectDisplayName,
  selectIsLogged,
} = authFeature;
