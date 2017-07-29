import { push } from 'react-router-redux';
import { set } from './settings';

const child_process = require('child_process');

export const WRONG_PASSWORD = 'WRONG_PASSWORD';

export function getList(root_password) {
  const bashFile = child_process.spawn('bash', ['./app/vpn.sh', 'list', root_password]);
  return dispatch => {
    dispatch(recoverList());
    bashFile.stdout.on('data', (data) => {
      const string = new TextDecoder('utf-8').decode(data);
      if (!string.startsWith('Obtaining') && !string.startsWith('268') && !string.startsWith(' ')) {
        dispatch(addToList(string));
      }
      bashFile.kill();
    });
    bashFile.stderr.on('data', (data) => {
      if (data.toString().startsWith('[sudo] password for quentin: \nsudo: 1 incorrect password')) {
        dispatch({
          type: WRONG_PASSWORD,
        });
      }
      console.log(`stderr: ${data}`);
    });
    bashFile.on('close', () => {
      dispatch(finishRecoverList());
    });
  };
}

export const FINISH_RECOVER_LIST = 'FINISH_RECOVER_LIST';
function finishRecoverList() {
  return {
    type: FINISH_RECOVER_LIST,
  };
}

export const RECOVER_LIST = 'RECOVER_LIST';
function recoverList() {
  return {
    type: RECOVER_LIST,
  };
}

export const ADD_TO_LIST = 'ADD_TO_LIST';
function addToList(data) {
  const new_data = [];
  for (const line of data.split('\n')) {
    const itemToAdd = {};
    const listLineElements = line.split(' ');
    itemToAdd.name = listLineElements[0];
    itemToAdd.country_id = listLineElements[5];
    itemToAdd.location = listLineElements[7];
    for (let i = 8; i < listLineElements.length - 1; i++) {
      itemToAdd.location += ' '.concat(listLineElements[i]);
    }
    if (itemToAdd.name !== '') {
      itemToAdd.location = itemToAdd.location.replace('\t', '');
      new_data.push(itemToAdd);
    }
  }
  return {
    type: ADD_TO_LIST,
    data: new_data,
  };
}

function addTerminal(text) {
  const newText = text.concat('\n');
  return {
    type: 'ADD_TERMINAL',
    text: newText,
  };
}

export const SET_DEFAULT = 'SET_DEFAULT';
function setDefault(newServer, newLocation) {
  return {
    type: SET_DEFAULT,
    new_server: newServer,
    new_location: newLocation,
  };
}

export function setDefaultBtn(newServer, newLocation) {
  return dispatch => {
    set('server', newServer);
    set('location', newLocation);
    dispatch(setDefault(newServer, newLocation));
    dispatch(addTerminal('[>] Set default server : '.concat(newServer, ' - ', newLocation)));
  };
}

export const SET_ACTUAL = 'SET_ACTUAL';
function setActual(newServer, newLocation) {
  return {
    type: SET_ACTUAL,
    new_server: newServer,
    new_location: newLocation,
  };
}

export function setActualBtn(newServer, newLocation) {
  return dispatch => {
    dispatch(setActual(newServer, newLocation));
    dispatch(addTerminal('[>] Set actual server : '.concat(newServer, ' - ', newLocation)));
    dispatch(push('/connect'));
  };
}

export function changePassword(new_password) {
  return dispatch => {
    dispatch({
      type: 'CHANGE_ROOT_PASSWORD',
      password: new_password,
    });
  };
}
