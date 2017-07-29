// @flow
import React, { Component } from 'react';
import styles from './Settings.css';
import Menu from './Menu';

export default class Settings extends Component {
  handleClickSave = () => {
    console.log('click');
    this.props.writeCredentials(this.props.username, this.props.password);
  }
  handleChangeUsername = (e) => {
    this.props.changeUsername(e.target.value);
  }
  handleChangePassword = (e) => {
    this.props.changePassword(e.target.value);
  }
  handleSaveAsDefault = () => {
    this.props.saveAsDefault(this.props.actual_configuration_protocol, this.props.actual_configuration_server, this.props.actual_configuration_location);
  }
  render() {
    function getStyle(working) {
      if (working) {
        return styles.btn_refreshing;
      }
      return styles.btn_refresh;
    }
    return (
      <div>
        <div className={styles.container} data-tid="container">
          <Menu />
          <div className={styles.top_panel}>
            <img src="./refresh.png" className={getStyle(this.props.is_working)} onClick={this.props.loadData} />
            <h3>Actual and saved configuration</h3>
          </div>
          <div className={styles.box}>
            <span className={styles.title}>Actual configuration</span><br />
            <span className={styles.to_right}>
              <span className={styles.settings_titles}><b>Protocol : </b>{this.props.actual_configuration_protocol}</span><br />
              <span className={styles.settings_titles}><b>Server's name : </b>{this.props.actual_configuration_server}</span><br />
              <span className={styles.settings_titles}><b>Location : </b>{this.props.actual_configuration_location}</span>
            </span>
            <button onClick={this.handleSaveAsDefault} className={styles.btn_green}>Save as default</button>
          </div>
          <div className={styles.box}>
            <span className={styles.title}>Default configuration</span><br />
            <span className={styles.to_right}>
              <span className={styles.settings_titles}><b>Protocol : </b>{this.props.default_configuration_protocol}</span><br />
              <span className={styles.settings_titles}><b>Server's name : </b>{this.props.default_configuration_server}</span><br />
              <span className={styles.settings_titles}><b>Location : </b>{this.props.default_configuration_location}</span>
            </span>
            <button onClick={this.props.useDefaultConfiguration} className={styles.btn_green}>Use default configuration</button>
          </div>
          <div className={styles.box}>
            <span className={styles.title}>Credentials</span>
            <div className={styles.credentials}><b>Username : </b><input onChange={this.handleChangeUsername} value={this.props.username} className={styles.input_text_username} type="text" /></div>
            <div className={styles.credentials}><b>Password : </b><input onChange={this.handleChangePassword} value={this.props.password} className={styles.input_text_password} type={this.props.see_password ? 'text' : 'password'} /><input onClick={this.props.clickCheckbox} title="Show / hide password" className={styles.checkbox} type="checkbox" /></div>
            <button onClick={this.handleClickSave} className={styles.btn_save}>Save</button>
          </div>
          <span className={styles.author} >Made by Quentin MICHEL : <a className={styles.link} href="https://github.com/quentm74">https://github.com/quentm74</a></span>
        </div>
      </div>
    );
  }
}
