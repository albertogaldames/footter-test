import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchUsers } from '../actions';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataFetched: false,
    };
  }

  componentDidMount() {
    /** Realiza la llamada al action y captura la promesa modificando el estado isDataFetched
     * para saber que ha terminado la busqueda
     */
    this.props.fetchUsers()
      .then(() => (
        this.setState({
          isDataFetched: true,
        })
      ));
  }

  /**
   * Redirige a la vista del Usuario dado por el id
   * @param {*} id
   */
  handleRowClick(id) {
    this.props.history.push(`/user/${id}`);
  }

  renderBodyTable() {
    const { users } = this.props;
    console.log(users);
    // Recorre los usuarios y muestra una fila por cada uno
    return _.map(users, user => (
      <tr key={user.id} onClick={() => this.handleRowClick(user.id)}>
        <td>{user.name}</td>
        <td>{user.email}</td>
        <td>{user.phone}</td>
      </tr>
    ));
  }

  render() {
    const { isDataFetched } = this.state;
    // Comprueba si se han obtenido los datos
    const bodyTable = isDataFetched
      ? (this.renderBodyTable()) : (
        <tr>
          <td colSpan="3">Cargando...</td>
        </tr>
      );
    return (
      <div className="card">
        <table className="material-table">
          <thead>
            <tr>
              <th>Nombre y Apellidos</th>
              <th>Email</th>
              <th>Teléfono</th>
            </tr>
          </thead>
          <tbody>
            {bodyTable}
          </tbody>
        </table>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { users: state.users };
}

export default connect(mapStateToProps, { fetchUsers })(UserList);
