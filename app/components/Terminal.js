// @flow
import React, { Component } from 'react';
import styles from './Terminal.css';

export default class Terminal extends Component {
  render() {
    // const {  } = this.props;
    return (
      <div>
        <textarea className={styles.terminal} wrap="off" disabled="true" value={this.props.terminal} />
      </div>
    );
  }
}
