import React, { Component } from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchUser } from '../actions';

class UserList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDataFetched: false,
    };
  }

  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchUser(id)
      .then(() => (
        this.setState({
          isDataFetched: true,
        })
      ));
  }

  /**
   * Vuelve a la ruta anterior aunque esto puede llevar a confusión si se accede
   * directamente a la ruta (aún así es lo que se pide en el PDF)
   */
  goBack() {
    this.props.history.goBack();
  }

  /**
   *  Crea un badget por cada tag de la variable 'bs'
   */
  renderTags() {
    const { user: { company: { bs } } } = this.props;
    const arrayBs = bs.split(' ');
    return _.map(arrayBs, bs => (
      <span className="badget">{bs}</span>
    ));
  }

  /**
   * Muestra y da forma a la información del usuario
   */
  renderUserInfo() {
    const {
      user: {
        name,
        username,
        email,
        address,
        phone,
        website,
        company,
      },
    } = this.props;
    return (
      <div>
        <div className="row">
          <div className="col-s12">
            <h2 style={{ marginBottom: '0px' }}>{name}</h2>
            <a href={website}>{website}</a>
          </div>
        </div>
        <div className="row">
          <div className="col-s6">
            <div title="username" className="inline-middle marginb--10">
              <i className="material-icons">face</i>
              <span>{username}</span>
            </div>
          </div>
          <div className="col-s6">
            <div title="city" className="inline-middle marginb--10">
              <i className="material-icons">business</i>
              <span>{address.city}</span>
            </div>
          </div>
          <div className="col-s6">
            <div title="street" className="inline-middle marginb--10">
              <i className="material-icons">room</i>
              <span>{address.street}</span>
            </div>
          </div>
          <div className="col-s6">
            <div title="email" className="inline-middle marginb--10">
              <i className="material-icons">email</i>
              <span>{email}</span>
            </div>
          </div>
          <div className="col-s6">
            <div title="phone" className="inline-middle marginb--10">
              <i className="material-icons">phone</i>
              <span>{phone}</span>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-s12">
            <div className="quote">
              <h4>{company.name}</h4>
              <div className="em">{company.catchPhrase}</div>
              <div>{this.renderTags()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { isDataFetched } = this.state;
    const userInfo = isDataFetched
      ? (this.renderUserInfo()) : (
        <div>Cargando...</div>
      );
    return (
      <div>
        <div className="row">
          <div className="col-s12">
            <button className="material-button" onClick={() => this.goBack()}>Volver</button>
          </div>
        </div>
        <div className="card">
          <div className="card-body">
            {userInfo}
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps({ users }) {
  return { user: users };
}

export default connect(mapStateToProps, { fetchUser })(UserList);
