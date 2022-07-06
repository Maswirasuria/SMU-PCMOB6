import { combineReducers , createStore } from 'redux';
import blogAuthReducer from './ducks/blogAuth'

const Reducer = combineReducers({
  auth: blogAuthReducer
})

const store = createStore(Reducer);

export default store;