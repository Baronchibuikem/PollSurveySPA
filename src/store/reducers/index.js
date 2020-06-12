import { combineReducers } from "redux";
import userAuth from "./userAuthenticationReducer";
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'


const persistConfig = {
	key: 'root',
	storage,
	whiteList: ["userAuth"]
}

const rootReducer = combineReducers({
	userAuth
})

export default persistReducer(persistConfig, rootReducer)

