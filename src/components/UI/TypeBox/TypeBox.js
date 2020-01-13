import React, { Component } from 'react';
import { Text } from 'native-base';
import { View, StyleSheet, Image } from 'react-native';
import NativeTouch from '../NativeTouch/NativeTouch';

const blankLogo = 'https://static.vicicentral.com/images/blank-vicicentral-logo.png';

export default TypeBox = (props) => {
    return (
        <NativeTouch onPress={props.onPress}>
            <View style={styles.container}>
                <Image source={{ uri: blankLogo }} style={styles.imgStyle}></Image>
                <View style={styles.typeText}>
                    <Text numberOfLines={1} style={styles.titleText}>{props.title}</Text>
                    <Text numberOfLines={1} style={styles.subtitleText}>{props.subTitle}</Text>
                </View>
            </View>
        </NativeTouch>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        // height: "10%",
        flexDirection: "row",
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: 'rgba(255, 255, 255, 0.3)',
        //  opacity: 0.2,
        borderRadius: 4,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft: "5%",
        paddingRight: "5%"
    },
    imgStyle: {
        height: 40,
        width: 80,
        resizeMode: "contain",
        margin: 5,

    },
    typeText: {
        marginLeft: 8,
        justifyContent: "center",
        alignItems: "flex-start",
        marginTop: -13,
        flex: 1
    },
    titleText: {
        color: "#fff",
        fontSize: 18,
        fontWeight: 'bold',
        flexWrap: 'wrap'


    },
    subtitleText: {
        color: "#fff",
        fontSize: 13,
        marginTop: -4,
        fontStyle: "italic",
        flexWrap: 'wrap'
    }
});