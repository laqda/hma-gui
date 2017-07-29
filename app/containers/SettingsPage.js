import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Settings from '../components/Settings';
import * as SettingsActions from '../actions/settings';

function mapStateToProps(state) {
  return {
    actual_configuration_protocol: state.settings.protocol,
    actual_configuration_server: state.settings.server,
    actual_configuration_location: state.settings.location,
    default_configuration_protocol: state.settings.default_protocol,
    default_configuration_server: state.settings.default_server,
    default_configuration_location: state.settings.default_location,
    username: state.settings.username,
    password: state.settings.password,
    see_password: state.settings.see_password,
    is_working: state.settings.is_working,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(SettingsActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
