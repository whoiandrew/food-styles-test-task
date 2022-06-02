import React, { useEffect, useState } from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  GestureResponderEvent,
  Alert,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CardWithActionsModal, Card, NewCardButton, Header } from '@components';
import {
  getCardsQuery,
  createCardMutation,
  duplicateCardMutation,
  deleteCardMutation,
  shareCardMutation,
} from '@apollo';
import { useMutation, useQuery } from '@apollo/client';
import { Card as CardType } from '@types';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { cardsActions } from '@store';
import { cardsLayoutProps } from './Cards.layoutProps';

const Cards: React.FC = () => {
  const [activeCard, setActiveCard] = useState<CardType | null>(null);
  const [topOffset, setTopOffset] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();
  const { cards } = useAppSelector((store) => store.cards);

  const { loading, data } = useQuery<{ cards: CardType[] }>(getCardsQuery);

  const [createNewCardAction, { data: createCardResponse }] =
    useMutation(createCardMutation);
  const [shareCardAction, { data: shareCardResponse }] =
    useMutation(shareCardMutation);
  const [deleteCardAction] = useMutation(deleteCardMutation);
  const [duplicateCardAction, { data: duplicateCardResponse }] = useMutation(
    duplicateCardMutation
  );

  const isDataFetched = !loading && cards;

  const handleDeleteCard = (cardId: string | undefined) => () => {
    const { headingText, mainText, cancelButtonText, submitButtonText } =
      cardsLayoutProps.alert;

    Alert.alert(headingText, mainText, [
      {
        text: cancelButtonText,
        style: 'cancel',
      },
      {
        text: submitButtonText,
        onPress: () => {
          deleteCardAction({ variables: { id: cardId } });
          dispatch(cardsActions.deleteCard({ id: cardId }));
          setIsModalOpen(false);
        },
        style: 'destructive',
      },
    ]);
  };

  const handleShareCard = (cardId: string | undefined) => () => {
    shareCardAction({ variables: { id: cardId } });
    setIsModalOpen(false);
  };

  const handleDuplicateCard = (cardId: string | undefined) => () => {
    duplicateCardAction({ variables: { id: cardId } });
    setIsModalOpen(false);
  };

  const handleCreateNewCard = () => {
    createNewCardAction();
  };

  const handleCardOptionButtonPress =
    (selectedCard: CardType) => (event: GestureResponderEvent) => {
      setActiveCard(selectedCard);
      setTopOffset(event.nativeEvent.pageY - event.nativeEvent.locationY - 14);
    };

  const handleCardCloseOptionButtonPress = () => {
    setIsModalOpen(false);
  };

  const handleShare = async (sharedUri: string) => {
    try {
      await Share.share({
        url: sharedUri,
        message: 'Vegan for me',
      });
    } catch (e) {}
  };

  useEffect(() => {
    if (activeCard) {
      setIsModalOpen(true);
    }
  }, [activeCard]);

  useEffect(() => {
    if (!isModalOpen) {
      setActiveCard(null);
    }
  }, [isModalOpen]);

  useEffect(() => {
    if (createCardResponse?.createCard) {
      dispatch(
        cardsActions.createCard({ card: createCardResponse?.createCard })
      );
    }
  }, [createCardResponse, dispatch]);

  useEffect(() => {
    const duplicatedCard = duplicateCardResponse?.duplicateCard;

    if (duplicatedCard) {
      dispatch(cardsActions.createCard({ card: duplicatedCard }));
    }
  }, [duplicateCardResponse, dispatch]);

  useEffect(() => {
    const sharedCardNumber = shareCardResponse?.shareCard;
    if (sharedCardNumber) {
      handleShare(`https://cards.foodstyles.com/${sharedCardNumber}`);
    }
  }, [shareCardResponse, dispatch]);

  useEffect(() => {
    if (data?.cards) {
      dispatch(cardsActions.initCards({ cards: data?.cards }));
    }
  }, [data?.cards, dispatch]);

  const renderFlatListItem = ({ item }: { item: CardType }) => (
    <View style={style.cardContainer}>
      <Card
        mainText={item.name}
        onCardOptionsPress={handleCardOptionButtonPress(item)}
      />
    </View>
  );

  return (
    <SafeAreaView style={style.container}>
      <Header />
      {!!isDataFetched && (
        <FlatList
          style={style.flatList}
          contentContainerStyle={style.flatListContentContainer}
          keyExtractor={({ id }) => id}
          data={cards}
          renderItem={renderFlatListItem}
        />
      )}
      <View style={style.newCardButtonContainer}>
        <NewCardButton onButtonPress={handleCreateNewCard} />
      </View>
      <CardWithActionsModal
        isModalOpen={isModalOpen}
        mainText={activeCard?.name}
        onCardOptionsPress={handleCardCloseOptionButtonPress}
        itemTopOffest={topOffset}
        onDuplicateButtonPress={handleDuplicateCard(activeCard?.id)}
        onDeleteButtonPress={handleDeleteCard(activeCard?.id)}
        onShareButtonPress={handleShareCard(activeCard?.id)}
      />
    </SafeAreaView>
  );
};

const style = StyleSheet.create({
  flatList: {
    top: -79,
  },
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  cardContainer: {
    marginVertical: 3,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  flatListContentContainer: {
    marginHorizontal: 18,
  },
  newCardButtonContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
  },
});

export default Cards;
