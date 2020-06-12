import { createStore, compose, applyMiddleware } from "redux";
import { persistStore } from 'redux-persist'
import thunk from "redux-thunk";
import rootReducer from "./store/reducers";

// const initialState = {};

const middleware = [thunk];

const composeEnhances = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
	rootReducer,
	// initialState,
	composeEnhances(applyMiddleware(...middleware))
);

export const persistor = persistStore(store)


// export default { store, persistor };
