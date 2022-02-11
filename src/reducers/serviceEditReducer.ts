import { AnyAction } from 'redux';
import {
  SET_SERVICE_LOADING_STATUS,
  SET_SERVICE_SAVING_STATUS,
  UPDATE_EDIT_SERVICE_PROP,
  EDIT_SERVICE,
} from '../actions/actionTypes';
import { AsyncOperationStatus } from '../types';
import { ServiceFull } from '../models';

export interface ServiceEditState {
  service: ServiceFull;
  loadingStatus: AsyncOperationStatus;
  savingStatus: AsyncOperationStatus;
}

const initialState = {
  service: { id: 0, name: '', price: 0, content: '' } as ServiceFull,
  loadingStatus: 'idle',
  savingStatus: 'idle',
} as ServiceEditState;

export default function serviceEditReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case SET_SERVICE_LOADING_STATUS:
      return { ...state, loadingStatus: action.payload };
    case SET_SERVICE_SAVING_STATUS:
      return { ...state, savingStatus: action.payload };
    case UPDATE_EDIT_SERVICE_PROP:
      const { name, value } = action.payload;
      return { ...state, service: { ...state.service, [name]: value } };
    case EDIT_SERVICE:
      return { ...state, service: action.payload };
    default:
      return state;
  }
}
