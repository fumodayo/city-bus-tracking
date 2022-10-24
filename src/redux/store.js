import { legacy_createStore as createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import rootReducer from './reducer'

const composedEnhancers = composeWithDevTools()

const store = createStore(rootReducer, composedEnhancers)

export default store
