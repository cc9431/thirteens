import { createSelector } from 'reselect';
import { initialState } from './reducer';

const selectPlayerPageDomain = state => state.appStore || initialState;

const makeSelectApp = () =>
  createSelector(
    selectPlayerPageDomain,
    substate => substate,
  );

export default makeSelectApp;
