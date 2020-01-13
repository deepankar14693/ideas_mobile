import React from 'react'
import { View } from 'react-native';
import { Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons';
import DropdownButton from './dropdownButton';

const DropdownWithLabel = (props) => {
  return (
    <View style={props.containerStyle}>
      <View style={props.labelViewStyle}>
        <Text style={props.labelStyle}>{props.label}</Text>
      </View>
      <DropdownButton {...props} />
    </View>
  )
}

export default DropdownWithLabel;
