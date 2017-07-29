// @flow
import React, { Component } from 'react';
import styles from './ServerListItem.css';

export default class ServerListItem extends Component {
  render() {
    return (
      <div className={styles.container}>
        <img className={styles.flag} src={"./re/flags/".concat(this.props.server_country_id, '.png')} />
        <div className={styles.infos}>
          <span className={styles.server_name}>{this.props.server_name}</span><br />
          <span className={styles.server_location}>{this.props.server_location}</span>
        </div>
        <div className={styles.div_btn}>
          <button className={styles.default_btn} onClick={this.props.set_default}>default</button>
          <button className={styles.select_btn} onClick={this.props.set_actual}>select</button>
        </div>
      </div>
    );
  }
}
