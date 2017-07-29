import { push } from 'react-router-redux';
import { addTerminal } from './connect';

const electron = require('electron');
const path = require('path');
const fs = require('fs');

const filePath = path.join((electron.app || electron.remote.app).getPath('userData'), 'preferences.json');
let data = parseDataFile(filePath);

function get(key, actualData) {
  return actualData[key];
}

export function set(key, val) {
  data[key] = val;
  fs.writeFileSync(filePath, JSON.stringify(data));
}

function parseDataFile() {
  try {
    return JSON.parse(fs.readFileSync(filePath));
  } catch (error) {
    console.log(error);
  }
}

// -------------------------------------------------------------------------------------

export const GET_SETTINGS_DATA = 'GET_SETTINGS_DATA';
function getSettingsData() {
  return {
    type: GET_SETTINGS_DATA,
  };
}

export const FINISH_GETTING_SETTINGS_DATA = 'FINISH_GETTING_SETTINGS_DATA';
function finishGettingSettingsData() {
  return {
    type: FINISH_GETTING_SETTINGS_DATA,
  };
}

export const LOAD_DEFAULT = 'LOAD_DEFAULT';
export function loadData() {
  return dispatch => {
    dispatch(getSettingsData());
    data = parseDataFile(filePath);
    let config_protocol = get('protocol', data);
    if (config_protocol === undefined) {
      config_protocol = '';
    }
    let config_server = get('server', data);
    if (config_server === undefined) {
      config_server = '';
    }
    let config_location = get('location', data);
    if (config_location === undefined) {
      config_location = '';
    }
    let config_username = get('username', data);
    if (config_username === undefined) {
      config_username = '';
    }
    let config_password = get('password', data);
    if (config_password === undefined) {
      config_password = '';
    }
    dispatch({
      type: LOAD_DEFAULT,
      protocol: config_protocol,
      server: config_server,
      location: config_location,
      username: config_username,
      password: config_password,
    });
    dispatch(useDefaultConfiguration());
    dispatch(addTerminal('[>] Default configuration load'));
    dispatch(finishGettingSettingsData());
  };
}

export const USE_DEFAULT_CONFIGURATION = 'USE_DEFAULT_CONFIGURATION';
export function useDefaultConfiguration() {
  return dispatch => {
    dispatch({
      type: USE_DEFAULT_CONFIGURATION,
    });
  };
}

export const SAVE_AS_DEFAULT = 'SAVE_AS_DEFAULT';
export function saveAsDefault(newProtocol, newServer, newLocation) {
  return dispatch => {
    set('protocol', newProtocol);
    set('server', newServer);
    set('location', newLocation);
    dispatch({
      type: SAVE_AS_DEFAULT,
      protocol: newProtocol,
      server: newServer,
      location: newLocation,
    });
  };
}

export function writeCredentials(username, password) {
  return dispatch => {
    fs.writeFileSync('./app/credentials.txt', username.toString().concat('\n', password.toString()));
    set('username', username);
    set('password', password);
    dispatch(push('/connect'));
    dispatch(addTerminal('[>] Credentials set'));
  };
}

export const CHANGE_USERNAME = 'CHANGE_USERNAME';
export function changeUsername(username) {
  return dispatch => {
    dispatch({
      type: CHANGE_USERNAME,
      username
    });
  };
}

export const CHANGE_PASSWORD = 'CHANGE_PASSWORD';
export function changePassword(password) {
  return dispatch => {
    dispatch({
      type: CHANGE_PASSWORD,
      password
    });
  };
}

export const CLICK_CHECKBOX = 'CLICK_CHECKBOX';
export function clickCheckbox() {
  return dispatch => {
    dispatch({
      type: CLICK_CHECKBOX,
    });
  };
}
