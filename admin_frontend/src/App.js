import React, { Component } from 'react';
import {Provider} from 'react-redux';
import { Router, Route, Switch, Redirect } from 'react-router-dom';
import ApolloClient from 'apollo-boost';
import {ApolloProvider} from 'react-apollo';
 
import configureStore from './store';
import history from './utils/history';
import IntroPage from './components/IntroPage';
import PrivateRoute from './components/PrivateRoute';
import GroupsPage from './components/GroupsPage';
import GroupByIdPage from './components/GroupByIdPage';

const store = configureStore();


const client = new ApolloClient({
  uri: process.env.GRAPHQL_ENDPOINT || 'http://localhost:8001/graphql'
});


class App extends Component {
	render() {
		return (
      <Provider store={store}>
        <ApolloProvider client={client}> 
          <Router history={history}>
            <Switch>
              <Route exact path="/" component={IntroPage} />
              <Route exact path="/groups" component={GroupsPage} />
              <PrivateRoute exact path="/groups/:groupId?" component={GroupByIdPage} /> 
              <Redirect to="/" />
            </Switch>
          </Router>
        </ApolloProvider>
      </Provider>
		);
	}
}

export default App;
