import React from 'react';
import { Provider } from 'react-redux';
import { Cards } from './src/screens';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/apollo';
import { store } from './src/store';

const App: React.FC = () => (
  <Provider store={store}>
    <ApolloProvider client={client}>
      <Cards />
    </ApolloProvider>
  </Provider>
);

export default App;
