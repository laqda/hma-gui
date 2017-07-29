import { RECOVER_LIST, FINISH_RECOVER_LIST, ADD_TO_LIST, WRONG_PASSWORD } from '../actions/list';

const initialState = {
  list_server: [],
  is_working: false,
  wrong_password: false,
};

export default function connect(state = initialState, action) {
  switch (action.type) {
    case RECOVER_LIST:
      return {
        ...state,
        is_working: true,
        list_server: [],
      };
    case FINISH_RECOVER_LIST:
      return {
        ...state,
        is_working: false,
      };
    case ADD_TO_LIST:
      const newList = state.list_server.concat(action.data);
      return {
        ...state,
        list_server: newList,
      };
    case WRONG_PASSWORD:
      return {
        ...state,
        wrong_password: true,
      };
    default:
      return state;
  }
}
