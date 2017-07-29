// @flow
import { REQUEST_IP_DATA, RECEIVE_IP_DATA, ERROR_FETCHING, ADD_TERMINAL, MAKE_INITIALIZED, CLICK_CONNECT, CHANGE_ROOT_PASSWORD, CONNECTING, END_CONNECTING } from '../actions/connect';

const initialState = {
  is_fetching: false,
  ip_data_city: '',
  ip_data_country: '',
  ip: '',
  terminal: '',
  connected: false,
  connecting: false,
  initialized: false,
  root_password: '',
};

export default function connect(state = initialState, action) {
  switch (action.type) {
    case REQUEST_IP_DATA:
      return {
        ...state,
        is_fetching: true,
        ip_data_city: '',
        ip_data_country: '',
      };
    case RECEIVE_IP_DATA:
      return {
        ...state,
        is_fetching: false,
        ip_data_city: action.city,
        ip_data_country: action.country,
        ip: action.ip,
      };
    case ERROR_FETCHING:
      return {
        ...state,
        is_fetching: false,
        ip: 'error',
      };
    case ADD_TERMINAL:
      return {
        ...state,
        terminal: state.terminal.concat(action.text),
      };
    case MAKE_INITIALIZED:
      return {
        ...state,
        initialized: true,
      };
    case CLICK_CONNECT:
      return {
        ...state,
        connected: !state.connected,
      };
    case CONNECTING:
      return {
        ...state,
        connecting: true,
      };
    case END_CONNECTING:
      return {
        ...state,
        connecting: false,
      }
    case CHANGE_ROOT_PASSWORD:
      return {
        ...state,
        root_password: action.password,
      };
    default:
      return state;
  }
}
