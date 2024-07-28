import { createFeature, createReducer, on } from '@ngrx/store';
import { UiActions } from './ui.actions';

export interface UiState {
  sidePanelOpened: boolean
}

export const initialState: UiState = {
  sidePanelOpened: false
}

export const UIFeature = createFeature({
  name: 'ui',
  reducer: createReducer(
    initialState,
    on(UiActions.openSidePanel, (state): UiState => ({
      ...state,
      sidePanelOpened: true
    })),
    on(UiActions.closeSidePanel, (state): UiState => ({
      ...state,
      sidePanelOpened: false
    })),
    on(UiActions.toggleSidePanel, (state): UiState => ({
      ...state,
      sidePanelOpened: !state.sidePanelOpened
    }))
  ),
});

export const {
  selectSidePanelOpened,
} = UIFeature;
