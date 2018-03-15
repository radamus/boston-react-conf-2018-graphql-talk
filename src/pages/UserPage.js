import React from 'react';
import {graphql, compose} from 'react-apollo';
import gql from 'graphql-tag';
import {Link} from 'react-router-dom';
import withLoading from '../hocs/withLoading';

const UserPage = ({data: {user}}) => (
  <div>
    <header>
      <img src={user.avatarUrl} width="50" alt={`${user.login} avatar`} />
      <h1>{user.login}</h1>
      <h2>{user.name || '(name not provided)'}</h2>
    </header>

    <Link to="/users">back to users list</Link>
  </div>
);

const QUERY = gql`
  query UserQuery($login: String!) {
    user(login: $login) {
      id
      name
      login
      avatarUrl
    }
  }
`;

const withQuery = graphql(QUERY, {
  options: ({match: {params}}) => ({
    variables: {login: params.login},
  }),
});

const enhanced = compose(withQuery, withLoading);

export default enhanced(UserPage);