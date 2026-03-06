import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { thunk } from 'redux-thunk';
import {
	userReducer,
	usersReducer,
	productReducer,
	productsReducer,
	appReducer,
} from './reducers';

const reducer = combineReducers({
	user: userReducer,
	users: usersReducer,
	product: productReducer,
	products: productsReducer,
	app: appReducer,
});

const composeEnhanqers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const reduxStore = createStore(reducer, composeEnhanqers(applyMiddleware(thunk)));
