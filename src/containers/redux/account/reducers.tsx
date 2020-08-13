import {handleActions} from 'redux-actions';
import {setAccountAction} from './actions';
import IActionState from './state';

export default handleActions<IActionState, any>(
  {
    [setAccountAction.toString()]: (state, {payload}) => ({
      ...state,
      data: payload,
    }),
  },
  {
    data: null,
  },
);
