import { ApolloClient, InMemoryCache } from '@apollo/client';

const client = new ApolloClient({
  uri: 'https://api-dev.foodstyles.com/graphql',
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      'Bearer eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MzM3LCJ0eXBlIjoiQUNDRVNTIiwiaWF0IjoxNjU0MTczMjUxLCJleHAiOjE2NTQ3NzgwNTF9.XRq_ZEaVf5lG1jvzF6Br-Kp-qQ_s40AawoM33BTul1XAZ3vtXSMkxw0X_pyqHlBLY8j5pGaVCxyljKgakLjxXH19qSlS5IHBJ6-H9mjcQz3hY1G43QnSqVpkwjCR_M3x3jbclqNMWPM6rNhMvzIB_RUEk89HFEYBYV09lAsBQ5uSGD_7rRX0znHlEt5Os9-WcPUqnhfN2p-SatejT-wGN99uj5XkbPn3KeSxkQCASkqCa6inEcnEoJh_QM_b8QMYXqsETsdTV-UBpLKdf3W5iITJc8GUoi4qremyWQNZSt40dIQmYb2npNFVQ_M7EsxfeX_v9b6QkUjN0_nE1QqV5w',
  },
});

export { client };
