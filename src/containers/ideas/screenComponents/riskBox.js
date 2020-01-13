import React from "react";
import { StyleSheet, } from "react-native";
import {Card, } from 'native-base';

const RiskBox = props => (

    <Card style={[styles.cardboxStyle, props.boxcardStyle]}>  
        {props.children}       
    </Card>
);

export default RiskBox;

const styles = StyleSheet.create({
    cardboxStyle: {
        padding: 10,
        borderRadius: 6,
    }
})