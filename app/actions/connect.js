import fetch from 'isomorphic-fetch';
import { loadData, useDefaultConfiguration } from './settings';

const kill = require('tree-kill');
const child_process = require('child_process');

export const MAKE_INITIALIZED = 'MAKE_INITIALIZED';
export function initialisation() {
  return dispatch => {
    dispatch(addTerminal('[*] Initialisation...'));
    dispatch({
      type: MAKE_INITIALIZED
    });
    dispatch(useDefaultConfiguration());
    dispatch(addTerminal('Chrome version '.concat(process.versions.chrome)));
    dispatch(addTerminal('Electron version '.concat(process.versions.electron)));
    dispatch(loadData());
    dispatch(fetchIpApi());
    dispatch(addTerminal('[*] Initialisation done.'));
  };
}

// -------------------------------------------------------------------------------------

export const REQUEST_IP_DATA = 'REQUEST_IP_DATA';
function requestIpApi() {
  return {
    type: REQUEST_IP_DATA,
  };
}

export const RECEIVE_IP_DATA = 'RECEIVE_IP_DATA';
function receiveIpApi(json) {
  return {
    type: RECEIVE_IP_DATA,
    ip: json.query,
    city: json.city,
    country: json.country,
  };
}

export const ERROR_FETCHING = 'ERROR_FETCHING';
function errorFetching() {
  return {
    type: ERROR_FETCHING,
  };
}

export function fetchIpApi() {
  return dispatch => {
    dispatch(addTerminal('[>] refresh ip : fetch http://ip-api.com/json'));
    dispatch(requestIpApi());
    return fetch('http://ip-api.com/json/')
      .then(response => response.json())
      .then(json => dispatch(receiveIpApi(json)))
      .catch(err => dispatch(errorFetching()));
  };
}

// -------------------------------------------------------------------------------------

export const ADD_TERMINAL = 'ADD_TERMINAL';
export function addTerminal(text) {
  const newText = text.concat('\n');
  return {
    type: ADD_TERMINAL,
    text: newText,
  };
}

// -------------------------------------------------------------------------------------

/*

export function addResultToTerminal() {
  const bashFile = child_process.spawn('bash', ['app/list.sh']);
  return dispatch => {
    bashFile.stdout.on('data', (data) => {
      const string = new TextDecoder('utf-8').decode(data);
      dispatch(addTerminal(string.replace(/(\r\n|\n|\r)/gm, '')));
      bashFile.kill();
    });
    bashFile.stderr.on('data', (data) => {
      console.log(`stderr: ${data}`);
    });
    bashFile.on('close', (code) => {
      console.log(`child process exited with code ${code}`);
    });
  };
}

*/

export const CHANGE_ACTUAL_PROTOCOL = 'CHANGE_ACTUAL_PROTOCOL';
export function changeActualProtocol() {
  return dispatch => {
    dispatch({
      type: CHANGE_ACTUAL_PROTOCOL,
    });
  };
}

export const CLICK_CONNECT = 'CLICK_CONNECT';
export const CONNECTING = 'CONNECTING';
export const END_CONNECTING = 'END_CONNECTING';
export function onClickConnect(connected, connecting, protocol, server, root_password) {
  if (connecting) {
    return dispatch => {
      child_process.spawn('bash', ['./app/vpn.sh', 'disconnect', root_password]);
      dispatch(addTerminal('[-] Disconnected'));
      dispatch({
        type: END_CONNECTING,
      });
    };
  }
  if (connected) {
    return dispatch => {
      child_process.spawn('bash', ['./app/vpn.sh', 'disconnect', root_password]);
      dispatch(addTerminal('[-] Disconnected'));
      dispatch({
        type: CLICK_CONNECT,
      });
      dispatch({
        type: END_CONNECTING,
      });
      dispatch(fetchIpApi());
    };
  }
  const vpnScript = child_process.spawn('bash', ['./app/vpn.sh', 'connect', protocol.toString().toLowerCase(), server.toString(), root_password]);
  return dispatch => {
    dispatch({
      type: CONNECTING,
    });
    dispatch(addTerminal('[+] Connecting...'));
    vpnScript.stdout.on('data', (data) => {
      dispatch(addTerminal(data.toString().replace(/(\r\n|\n|\r)/gm, '')));
      if (data.toString().startsWith('Connected to ')) {
        dispatch({
          type: CLICK_CONNECT,
        });
        dispatch({
          type: END_CONNECTING,
        });
        dispatch(fetchIpApi());
      }
    });
    vpnScript.stderr.on('data', (data) => {
      dispatch({
        type: END_CONNECTING,
      });
      if (data.toString().startsWith('[sudo] password for quentin: \nsudo: 1 incorrect password')) {
        dispatch(addTerminal('[!] ERROR : wrong root password'));
      }
      console.log(`stderr: ${data}`);
    });
    vpnScript.on('close', () => {
      dispatch({
        type: END_CONNECTING,
      });
      console.log('close');
    });
  };
}

export const CHANGE_ROOT_PASSWORD = 'CHANGE_ROOT_PASSWORD';
export function changePassword(new_password) {
  return dispatch => {
    dispatch({
      type: CHANGE_ROOT_PASSWORD,
      password: new_password,
    });
  };
}
