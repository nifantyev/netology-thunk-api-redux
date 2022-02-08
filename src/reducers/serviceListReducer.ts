import { AnyAction } from 'redux';
import {
  PUT_SERVICE_LIST,
  SET_SERVICE_DELETING_STATUS,
  SET_SERVICE_LIST_LOADING_STATUS,
} from '../actions/actionTypes';

import { AsyncOperationStatus, Service } from '../types';

export interface ServiceListState {
  loadingStatus: AsyncOperationStatus;
  services: Service[];
  deletingStatuses: AsyncOperationStatus[];
}

const initialState = {
  loadingStatus: 'idle',
  services: [],
  deletingStatuses: [],
} as ServiceListState;

export default function serviceListReducer(
  state = initialState,
  action: AnyAction
) {
  switch (action.type) {
    case PUT_SERVICE_LIST:
      const services = action.payload;
      const deletingStatuses = services.map((o: any) => 'idle');
      return { ...state, services, deletingStatuses };
    case SET_SERVICE_LIST_LOADING_STATUS:
      return { ...state, loadingStatus: action.payload };
    case SET_SERVICE_DELETING_STATUS:
      const { id, status } = action.payload;
      const idx = state.services.findIndex((o) => o.id === id);
      if (idx === -1) {
        return state;
      }
      return {
        ...state,
        deletingStatuses: state.deletingStatuses.map((o, i) =>
          i === idx ? status : o
        ),
      };
    default:
      return state;
  }
}
