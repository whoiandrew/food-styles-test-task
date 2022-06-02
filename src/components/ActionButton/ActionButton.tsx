import React from 'react';
import {
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';

interface ActionButtonProps {
  onButtonPress: () => void;
  icon: ImageSourcePropType;
  title: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
  onButtonPress,
  icon,
  title,
}) => (
  <TouchableOpacity style={style.container} onPress={onButtonPress}>
    <Text style={style.text}>{title}</Text>
    <Image style={style.image} source={icon} />
  </TouchableOpacity>
);

const style = StyleSheet.create({
  image: {},
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-end',
  },
  text: {
    textTransform: 'capitalize',
    marginRight: 8,
    color: '#11b777',
  },
});

export default ActionButton;
