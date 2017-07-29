// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Connect.css';
import Menu from './Menu';
import Terminal from './Terminal';

export default class Connect extends Component {

  componentDidMount() {
    if (!this.props.initialized) {
      this.props.initialisation();
    }
  }

  handleClickUpdateIp = () => {
    this.props.fetchIpApi();
  }
  ipData = (isFetching) => {
    const btn = (<img src="./refresh.png" className={styles.btn_refresh} onClick={this.handleClickUpdateIp} />)
    if (isFetching) {
      return (<div className={styles.ip_data}><span className={styles.ip_text} >IP : loading</span><img src="./refresh.png" className={styles.btn_refreshing} onClick={this.handleClickUpdateIp} /></div>);
    } if (this.props.ip === '') {
      return (<div className={styles.ip_data}><span className={styles.ip_text} >IP : need to refresh</span>{btn}</div>);
    } if (this.props.ip === 'error') {
      return (<div className={styles.ip_data}><span className={styles.ip_text} >IP :</span><span className={styles.ip_not_connected}> ERROR</span>{btn}</div>);
    }
    if (this.props.connected) {
      return (<div className={styles.ip_data}><span className={styles.ip_text} >IP :</span><span className={styles.ip_connected}> {this.props.ip}</span> {this.props.ip_data_city}, {this.props.ip_data_country}{btn}</div>);
    }
    return (<div className={styles.ip_data}><span className={styles.ip_text} >IP :</span><span className={styles.ip_not_connected}> {this.props.ip}</span> {this.props.ip_data_city}, {this.props.ip_data_country}{btn}</div>);
  }
  handleChangePassword = (e) => {
    this.props.changePassword(e.target.value);
  }
  handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      return this.props.onClickConnect(this.props.connected, this.props.connecting, this.props.connection_data_protocol, this.props.connection_data_server, this.props.root_password);
    }
  }
  getStyle = () => {
    if (this.props.connecting) {
      return styles.btn_connecting;
    }
    if (this.props.connected) {
      return styles.btn_connected;
    }
    return styles.btn_not_connected;
  }
  getValue = () => {
    if (this.props.connecting) {
      return 'Connecting...';
    }
    if (this.props.connected) {
      return 'Disconnect';
    }
    return 'Connect';
  }
  render() {
    const { is_fetching, connection_data_protocol, connection_data_server,connection_data_location, terminal, connected, connecting, changeActualProtocol, root_password } = this.props;
    function onClickProtocol() {
      changeActualProtocol();
    }
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Menu />
          {this.ipData(is_fetching)}
          <div className={styles.connect_panel}>
            <h4>Use your actual configuration to connect (or restore your default configuration <span className={styles.link}><Link to="/settings">here</Link></span>)</h4>
            <div className={styles.div_infos}>
              <button onClick={onClickProtocol} className={connection_data_protocol === 'UDP' ? styles.actual_protocol : styles.not_actual_protocol}>UDP</button>
              <button onClick={onClickProtocol} className={connection_data_protocol === 'TCP' ? styles.actual_protocol : styles.not_actual_protocol}>TCP</button>
              <span className={styles.info_connect_server}><b>Server : </b>{connection_data_server}</span>
            </div>
            <div className={styles.div_infos_before_button}>
              <span className={styles.info_connect_location}><b>Location : </b>{connection_data_location}</span>
            </div>
            <div className={styles.div_infos}>
              <b>Root password : </b>
              <input onKeyDown={this.handleKeyDown} onChange={this.handleChangePassword} className={styles.input_root_password} value={root_password} type="password" />
              <button onClick={() => this.props.onClickConnect(connected, connecting, connection_data_protocol, connection_data_server, root_password)} className={this.getStyle()}>{this.getValue()}</button>
            </div>
          </div>
          <div className={styles.terminal}>
            <Terminal terminal={terminal} />
          </div>
        </div>
      </div>
    );
  }
}
