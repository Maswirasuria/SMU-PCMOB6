import { combineReducers } from 'redux';
import blogAuthReducer from '.ducks/blogAuth'

const Reducer = combineReducers({
  auth: blogAuthReducer
})

const store = createStore(overallReducer);

export default store;
