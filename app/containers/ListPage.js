import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import List from '../components/List';
import * as ListActions from '../actions/list';

function mapStateToProps(state) {
  return {
    list_server: state.list.list_server,
    is_working: state.list.is_working,
    wrong_password: state.list.wrong_password,
    root_password: state.connect.root_password,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ListActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(List);
