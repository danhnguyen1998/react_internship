import {createActions} from 'redux-actions';

const actions = createActions({
  SET_ACCOUNT_ACTION: (userInfor) => userInfor,
});

export const {setAccountAction} = actions;
