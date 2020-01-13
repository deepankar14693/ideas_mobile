import React from "react";
import { StyleSheet } from "react-native";
import { Text } from 'native-base';

const HeadingText = props => (
    <Text {...props} style ={styles.textHeading}>{props.children}</Text>
);

export default HeadingText;

const styles = StyleSheet.create({
    textHeading:{
        fontSize : 28,
        fontWeight : "bold",
    }
})