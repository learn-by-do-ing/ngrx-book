import { createFeature, createReducer, on } from '@ngrx/store';
import { UiActions } from './ui.actions';

export const initialState = {
  sidePanelOpened: false
}

export const UIFeature = createFeature({
  name: 'ui',
  reducer: createReducer(
    initialState,
    on(UiActions.openSidePanel, (state) => ({
      ...state,
      sidePanelOpened: true
    })),
    on(UiActions.closeSidePanel, (state) => ({
      ...state,
      sidePanelOpened: false
    })),
    on(UiActions.toggleSidePanel, (state) => ({
      ...state,
      sidePanelOpened: !state.sidePanelOpened
    }))
  ),
});

export const {
  selectSidePanelOpened,
} = UIFeature;
