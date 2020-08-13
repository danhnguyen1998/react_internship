import accountReducer from 'containers/redux/account/reducers';
import {combineReducers} from 'redux';

export default combineReducers({
  accountReducer: accountReducer,
});
