import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import AddIcon from '@pngs/add.png';

interface NewCardButtonProps {
  onButtonPress: () => void;
}

const { width } = Dimensions.get('window');

const cardButtonTitle = 'New Food Style';

const NewCardButton: React.FC<NewCardButtonProps> = ({ onButtonPress }) => (
  <View style={style.container}>
    <View style={style.backdrop} />
    <TouchableOpacity style={style.button} onPress={onButtonPress}>
      <Image style={style.image} source={AddIcon} />
      <Text style={style.text}>{cardButtonTitle}</Text>
    </TouchableOpacity>
  </View>
);

const style = StyleSheet.create({
  container: {
    width,
  },
  backdrop: {
    height: 40,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 7,
  },
  button: {
    bottom: 10,
    alignSelf: 'center',
    width: width - 36,
    position: 'absolute',
    backgroundColor: '#fff',
    borderRadius: 6,
    paddingVertical: 10,
    paddingLeft: 10,
    paddingRight: 15,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 7,
  },
  text: {
    // fontFamily: 'ProximaNovaAlt-Bold',
  },
  image: {
    marginRight: 8,
  },
});

export default NewCardButton;
