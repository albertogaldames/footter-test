import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import promise from 'redux-promise';
import '../css/App.css';

import reducers from '../reducers';
import UserList from '../containers/users_index';
import User from '../containers/users_show';

// Se crea el Store con un middleware para capturar las promesas de las peticiones ajax
const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

const App = () => (
  <div className="App">
    <Provider store={createStoreWithMiddleware(reducers)}>
      <Router>
        <div>
          <Route exact path="/" component={UserList} />
          <Route path="/user/:id" component={User} />
        </div>
      </Router>
    </Provider>
  </div>
);

export default App;
