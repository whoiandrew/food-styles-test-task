import React, { useMemo } from 'react';
import type { CardProps } from '../Card';
import { Card, ActionButton } from '@components';
import DeleteIcon from '@pngs/delete.png';
import ShareIcon from '@pngs/share.png';
import DuplicateIcon from '@pngs/duplicate.png';
import { StyleSheet, View, Modal } from 'react-native';
import { BlurView } from '@react-native-community/blur';

interface CardWithActionsModalProps {
  onDeleteButtonPress: () => void;
  onShareButtonPress: () => void;
  onDuplicateButtonPress: () => void;
  isModalOpen: boolean;
  itemTopOffest: number;
}

const CardWithActionsModal: React.FC<CardWithActionsModalProps | CardProps> = ({
  mainText,
  onDeleteButtonPress,
  onShareButtonPress,
  itemTopOffest,
  onDuplicateButtonPress,
  isModalOpen,
  onCardOptionsPress,
}) => {
  const actionButtons = useMemo(
    () => [
      {
        title: 'Share',
        icon: ShareIcon,
        onButtonPress: onShareButtonPress,
      },
      {
        title: 'Duplicate',
        icon: DuplicateIcon,
        onButtonPress: onDuplicateButtonPress,
      },
      {
        title: 'Delete',
        icon: DeleteIcon,
        onButtonPress: onDeleteButtonPress,
      },
    ],
    [onShareButtonPress, onDuplicateButtonPress, onDeleteButtonPress]
  );

  return (
    <Modal visible={isModalOpen} animationType="fade" transparent={true}>
      <BlurView blurType="light" style={style.modalContainer}>
        <View style={{ top: itemTopOffest }}>
          <View style={style.card}>
            <Card
              mainText={mainText}
              isActive={true}
              onCardOptionsPress={onCardOptionsPress}
            />
          </View>
          <View style={style.buttonsContainer}>
            {actionButtons.map((actionButton, index) => (
              <ActionButton key={index} {...actionButton} />
            ))}
          </View>
        </View>
      </BlurView>
    </Modal>
  );
};

const style = StyleSheet.create({
  buttonsContainer: {
    marginTop: 10,
  },
  modalContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
  card: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
});

export default CardWithActionsModal;
