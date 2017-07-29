import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Connect from '../components/Connect';
import * as ConnectActions from '../actions/connect';

function mapStateToProps(state) {
  return {
    ip_data_city: state.connect.ip_data_city,
    ip_data_country: state.connect.ip_data_country,
    is_fetching: state.connect.is_fetching,
    ip: state.connect.ip,
    terminal: state.connect.terminal,
    connected: state.connect.connected,
    connecting: state.connect.connecting,
    initialized: state.connect.initialized,
    root_password: state.connect.root_password,
    connection_data_protocol: state.settings.protocol,
    connection_data_server: state.settings.server,
    connection_data_location: state.settings.location,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ConnectActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Connect);
