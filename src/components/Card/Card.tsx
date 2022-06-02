import React from 'react';
import {
  GestureResponderEvent,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import OptionsIcon from '@pngs/options.png';
import CloseIcon from '@pngs/close.png';

interface CardProps {
  mainText: string;
  isActive?: boolean;
  onCardOptionsPress: (event: GestureResponderEvent) => void;
}

const Card: React.FC<CardProps> = ({
  mainText,
  isActive = false,
  onCardOptionsPress,
}) => (
  <View style={style.container}>
    <Text style={style.text}>{mainText}</Text>
    <TouchableOpacity onPress={onCardOptionsPress}>
      <Image source={isActive ? CloseIcon : OptionsIcon} />
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  container: {
    borderRadius: 6,
    backgroundColor: '#fff',
    paddingVertical: 14,
    paddingLeft: 18,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    // fontFamily: 'ProximaNovaAlt-Bold',
    marginRight: 15,
  },
});

export default Card;
