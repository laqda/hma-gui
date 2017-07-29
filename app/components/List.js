// @flow
import React, { Component } from 'react';
import styles from './List.css';
import Menu from './Menu';
import ServerListItem from './ServerListItem';

export default class List extends Component {

  handleChangePassword = (e) => {
    this.props.changePassword(e.target.value);
  }
  handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      return this.props.getList(this.props.root_password);
    }
  }
  render() {
    const listDisplay = [];
    const list_server = this.props.list_server;
    for (let i = 0; i < list_server.length; i++) {
      if (list_server[i] !== undefined) {
        const server = list_server[i];
        if (i !== 0) {
          listDisplay.push(<span><hr /><ServerListItem set_default={() => this.props.setDefaultBtn(server.name, server.location)} set_actual={() => this.props.setActualBtn(server.name, server.location)} server_name={server.name} server_name={server.name} server_location={server.location} server_country_id={server.country_id} /></span>);
        } else {
          listDisplay.push(
            <ServerListItem set_default={() => this.props.setDefaultBtn(server.name, server.location)} set_actual={() => this.props.setActualBtn(server.name, server.location)} server_name={server.name} server_location={server.location} server_country_id={server.country_id} />
          );
        }
      }
    }
    function getStyle(working) {
      if (working) {
        return styles.btn_refreshing;
      }
      return styles.btn_refresh;
    }
    function returnListDisplayOrMessage(list, wrong_password, working) {
      if (list.length !== 0) {
        return (<div className={styles.scroll}><ul className={styles.ul_scroll}>{listDisplay}</ul></div>);
      }
      if (working) {
        return (<div></div>);
      }
      if (wrong_password) {
        return (<span className={styles.message_wrong_password}>Wrong root password !</span>);
      }
      return (<span className={styles.message_password}>To see the server's list, please enter once the root password</span>);
    }
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Menu />
          <div className={styles.top_panel}>
            <img src="./refresh.png" className={getStyle(this.props.is_working)} onClick={() => this.props.getList(this.props.root_password)} />
            <h3>List of the online servers</h3>
          </div>
          <div className={styles.root_password}>
            <b>Root password : </b>
            <input onKeyDown={this.handleKeyDown} onChange={this.handleChangePassword} className={styles.input_root_password} value={this.props.root_password} type="password" />
          </div>
          {returnListDisplayOrMessage(this.props.list_server, this.props.wrong_password, this.props.is_working)}
        </div>
      </div>
    );
  }
}
