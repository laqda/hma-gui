// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Menu.css';
// import MenuItem from './MenuItem';

class Menu extends Component {
  render() {
    const location = this.context.router.route.location.pathname;
    const links = [
      { to: '/connect', text: 'Connect', key: 1 },
      { to: '/list', text: 'Servers', key: 2 },
      { to: '/settings', text: 'Settings', key: 3 },
    ];
    const linksDisplay = links.map((item, i) => {
      if (location == item.to || (location == '/' && item.to == '/connect')) {
        return (<li key={i}><Link to={item.to}><div className={styles.active}>{item.text}</div></Link></li>);
      }
      return (<li key={i}><Link to={item.to}>{item.text}</Link></li>);
    }
    );
    return (
      <div className={styles.menu} >
        <ul className={styles.menu_ul}>
          {linksDisplay}
        </ul>
      </div>
    );
  }
}

Menu.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Menu;
