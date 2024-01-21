import {
	applyMiddleware,
	combineReducers,
	compose,
	legacy_createStore as createStore,
} from 'redux'
import thunk from 'redux-thunk'
import { questionReducer } from './'

const reducer = combineReducers({
	question: questionReducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = createStore(
	reducer,
	composeEnhancers(applyMiddleware(thunk))
)
