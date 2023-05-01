import { createStore, applyMiddleware, compose, AnyAction } from 'redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { persistStore, persistReducer } from 'redux-persist';
import thunk, { ThunkDispatch } from 'redux-thunk';
import useModels from '../../models';
import { useDispatch } from "react-redux";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const { useReducers } = useModels();

const reducers = useReducers();
const initialState = {};
let middlewaresToApply = [thunk];

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: [],
  whitelist: [],
};

const persistReduce = persistReducer(persistConfig, reducers);

/* const networkMiddleware = createNetworkMiddleware({
        queueReleaseThrottle: 200,
        regexActionType: /^GET/,
        actionTypes: ['ACCEPT_JOB', 'ACCEPT_JOB_PENDING'],
    }) */

if (__DEV__) {
  //const createFlipperDebugger = require('redux-flipper').default;
  const reduxInmmutableStateInvariant = require('redux-immutable-state-invariant').default();
  middlewaresToApply = [
    ...middlewaresToApply,
    //createFlipperDebugger(),
    reduxInmmutableStateInvariant,
    //networkMiddleware,
  ];
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  persistReduce,
  initialState,
  composeEnhancers(applyMiddleware(...middlewaresToApply)),
);

const useStoreConfig = () => {
  const persistor = persistStore(store);

  return {
    store,
    persistor,
  };
};

// types
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;

export const useTypedDispatch = () => useDispatch<TypedDispatch>();

export default useStoreConfig;
