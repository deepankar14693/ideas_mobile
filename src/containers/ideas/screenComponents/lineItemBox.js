import React from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Text } from 'native-base';

const HEIGHT = Dimensions.get('window').height;

const LineItemBox = (props) => {
  return (
    <View style={[styles.boxStyle, props.additionalStyle]}>
      <Text style={{ fontSize: HEIGHT * 0.017 }}>{props.title}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  boxStyle: {
    backgroundColor: 'rgba(249,253,198,1)',
    height: HEIGHT * 0.03,
    width: 'auto',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0.5,
    borderColor: '#566f99',
    borderRadius: 3,
    padding: 7
  }
})

export default LineItemBox;
