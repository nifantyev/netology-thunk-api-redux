import { createStore, combineReducers, Store } from 'redux';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import serviceListReducer, {
  ServiceListState,
} from '../reducers/serviceListReducer';
import serviceEditReducer, {
  ServiceEditState,
} from '../reducers/serviceEditReducer';

interface AppState {
  serviceList: ServiceListState;
  serviceEdit: ServiceEditState;
}

const rootReducer = combineReducers({
  serviceList: serviceListReducer,
  serviceEdit: serviceEditReducer,
});

const store: Store<AppState> = createStore(rootReducer);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;
