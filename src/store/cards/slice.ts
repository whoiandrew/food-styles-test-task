import AsyncStorage from '@react-native-async-storage/async-storage';
import { createSlice } from '@reduxjs/toolkit';
import { Card } from '@types';

const initialState: { cards: Card[] } = {
  cards: [],
};

const storeName = 'cards';

const cardsSlice = createSlice({
  initialState,
  name: storeName,
  reducers: {
    initCards: (state, action) => {
      const { cards } = action.payload;
      state.cards = cards;
    },
    createCard: (state, action) => {
      const { card } = action.payload;

      state.cards.push(card);
    },
    deleteCard: (state, action) => {
      const { id } = action.payload;

      state.cards = state.cards.filter(({ id: cardId }) => cardId !== id);
    },
  },
});

const { actions: cardsActions, reducer: cardsReducer } = cardsSlice;

const cardsPersistConfig = {
  key: storeName,
  storage: AsyncStorage,
};

export { cardsActions, cardsPersistConfig, cardsReducer };
