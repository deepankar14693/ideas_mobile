import React from "react";
import { StyleSheet } from "react-native";
import { Text } from 'native-base';

const mainText = props => (
   <Text style={styles.mainText}>{props.children}</Text>
);

export default mainText;

const styles = StyleSheet.create({
    mainText :{
        color: "black"
    }
})