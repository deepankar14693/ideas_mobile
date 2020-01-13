import React from 'react'
import { View, TextInput } from 'react-native'
import { Text } from 'native-base';

const InputWithLabel = (props) => {
  return (
    <View style={props.containerStyle}>
      <View style={props.labelViewStyle ? props.labelViewStyle : null}>
        <Text style={props.labelStyle}>{props.label}</Text>
      </View>
      <View style={props.inputViewStyle ? props.inputViewStyle : null}>
        <TextInput
          style={props.inputStyle}
          onChangeText={(text) => props.onChangeText(text)}
          value={props.value}
          placeholder={props.placeholder ? props.placeholder : ''}
          keyboardType={props.keyboardType}
          multiline={props.multiline}
          textAlignVertical={props.textAlignVertical}
        />
      </View>
    </View>
  )
}

export default InputWithLabel
