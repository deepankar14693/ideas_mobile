import React from "react";
import { View, StyleSheet } from "react-native";
import { Text } from 'native-base';
import NativeTouch from '../NativeTouch/NativeTouch';

const buttonWithBackground = props => {
    const content = (
        <View style={[styles.button, { backgroundColor: props.color }, props.disabled ? styles.disabled : null, props.buttonStyle]}>
            <Text style={[styles.textStyle, props.disabled ? styles.disableText : null, props.textStyle]}>{props.children}</Text>
        </View>
    );

    if (props.disabled) {
        return content;
    } 

    return (
        <NativeTouch onPress={props.onPress}>
            {content}
        </NativeTouch>
    );
}

export default buttonWithBackground;

const styles = StyleSheet.create({
    button: {
        padding: 10,
        margin: 5,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: "black",
    },
    disabled: {
        backgroundColor: "#eee",
        borderColor: "#aaa"
    },
    disableText: {
        color: "#aaa"
    },
    textStyle: {
        textAlign: "center",
    }
})