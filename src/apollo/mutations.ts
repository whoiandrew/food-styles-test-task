import { gql } from '@apollo/client';

const createCardMutation = gql`
  mutation {
    createCard(
      data: {
        name: "My Food Style"
        minPrice: null
        maxPrice: null
        locationTypeIds: []
        locationCuisineTypeIds: []
        dishTypeIds: []
        courseTypeIds: []
        dietIds: []
        excludedIngredientIds: []
      }
    ) {
      id
      name
    }
  }
`;

const shareCardMutation = gql`
  mutation ShareCard($id: ID!) {
    shareCard(id: $id)
  }
`;

const duplicateCardMutation = gql`
  mutation DuplicateCard($id: ID!) {
    duplicateCard(id: $id) {
      id
      name
    }
  }
`;

const deleteCardMutation = gql`
  mutation DeleteCard($id: ID!) {
    deleteCard(id: $id)
  }
`;

export {
  createCardMutation,
  shareCardMutation,
  duplicateCardMutation,
  deleteCardMutation,
};
