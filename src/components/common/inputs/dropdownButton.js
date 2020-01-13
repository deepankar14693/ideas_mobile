import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { Text } from 'native-base';
import Ionicons from 'react-native-vector-icons/Ionicons'

const DropdownButton = (props) => {
  return (
    <View style={props.dropdownViewStyle}>
      <TouchableOpacity onPress={props.onPress} disabled={props.disabled}>
        <View style={props.dropdownStyle}>
          <Text style={props.dropdownTextStyle}>{props.dropdownText}</Text>
          <Ionicons name="md-arrow-dropdown" style={props.dropdownIconStyle} />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export default DropdownButton
