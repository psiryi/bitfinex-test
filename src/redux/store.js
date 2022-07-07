import { createStore, applyMiddleware, compose } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import createSagaMiddleware from "@redux-saga/core";

import reducers from "./root-reducer";
import rootSaga from "./root-saga";

const persistedReducer = persistReducer(
  {
    key: "root",
    storage,
  },
  reducers
);

const sagaMiddleware = createSagaMiddleware();

const store = compose(applyMiddleware(sagaMiddleware))(createStore)(
  persistedReducer
);

const persistor = persistStore(store);

sagaMiddleware.run(rootSaga);

export { store, persistor };
