import {
  View,
  Text,
  ViewStyle,
  TouchableOpacity,
  GestureResponderEvent,
} from 'react-native';
import React from 'react';
import {styles} from '../theme/appTheme';

type Props = {
  children?: string;
  backgroundColor?: string;
  style?: ViewStyle;
  onPress?: ((event: GestureResponderEvent) => void) | undefined;
};

const ButtonCalc = ({
  children,
  backgroundColor = '#333',
  style,
  onPress,
}: Props) => {
  return (
    <TouchableOpacity style={{...style}} onPress={onPress}>
      <View style={{...styles.boton, backgroundColor}}>
        <Text
          style={[
            styles.botonTexto,
            {color: backgroundColor === '#9B9B9B' ? 'black' : 'white'},
          ]}>
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default ButtonCalc;
