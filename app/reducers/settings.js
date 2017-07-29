// @flow
import { USE_DEFAULT_CONFIGURATION, SAVE_AS_DEFAULT, CHANGE_USERNAME, CHANGE_PASSWORD, CLICK_CHECKBOX, GET_SETTINGS_DATA, FINISH_GETTING_SETTINGS_DATA, LOAD_DEFAULT } from '../actions/settings';
import { SET_ACTUAL, SET_DEFAULT } from '../actions/list';
import { CHANGE_ACTUAL_PROTOCOL } from '../actions/connect';

const initialState = {
  protocol: 'UDP',
  server: '',
  location: '',
  default_protocol: 'UDP',
  default_server: 'fr.rocks.hma',
  default_location: 'Paris, France',
  username: '',
  password: '',
  see_password: false,
  is_working: false,
};

export default function connect(state = initialState, action) {
  switch (action.type) {
    case SET_ACTUAL:
      return {
        ...state,
        server: action.new_server,
        location: action.new_location,
      };
    case SET_DEFAULT:
      return {
        ...state,
        default_server: action.new_server,
        default_location: action.new_location,
      };
    case CHANGE_ACTUAL_PROTOCOL:
      let newProtocol = '';
      if (state.protocol === 'UDP') {
        newProtocol = 'TCP';
      } else {
        newProtocol = 'UDP';
      }
      return {
        ...state,
        protocol: newProtocol,
      };
    case USE_DEFAULT_CONFIGURATION:
      return {
        ...state,
        protocol: state.default_protocol,
        server: state.default_server,
        location: state.default_location,
      };
    case SAVE_AS_DEFAULT:
      return {
        ...state,
        default_protocol: action.protocol,
        default_server: action.server,
        default_location: action.location,
      };
    case CHANGE_USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case CHANGE_PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case CLICK_CHECKBOX:
      return {
        ...state,
        see_password: !state.see_password,
      };
    case GET_SETTINGS_DATA:
      return {
        ...state,
        is_working: true,
      };
    case FINISH_GETTING_SETTINGS_DATA:
      return {
        ...state,
        is_working: false,
      };
    case LOAD_DEFAULT:
      return {
        ...state,
        default_protocol: action.protocol,
        default_server: action.server,
        default_location: action.location,
        username: action.username,
        password: action.password,
      };
    default:
      return state;
  }
}
