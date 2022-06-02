import { gql } from '@apollo/client';

const getCardsQuery = gql`
  query {
    cards {
      id
      name
    }
  }
`;

export { getCardsQuery };
