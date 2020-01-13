import React from "react";
import { View, StyleSheet, Platform } from "react-native";
import {  Badge, Text } from 'native-base';

const isAndroid = (Platform.OS === "android") ;

const RiskTitle = props => (

    <View style={[styles.boxStyle]}>
        <View style={{ marginRight: 5 }}><Text style={[props.titleStyle]}>{props.titleText}</Text></View>
        <Badge style={[styles.badgeStyle, props.badgeStyle]}><Text style={[styles.badgeTextStyle, props.badgeTextStyle]}>{props.badgeText}</Text></Badge>
    </View>

);

export default RiskTitle;

const styles = StyleSheet.create({
    boxStyle: {
        width: "100%",
        flexDirection: "row",
        minHeight: 5,
        paddingBottom: 5,
        paddingTop: 5,
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    badgeStyle: {
        height: 18,
        width: 40
    },
    badgeTextStyle:{
        color: 'white', fontSize: 10, lineHeight: isAndroid? 18 : 12,
    }

})