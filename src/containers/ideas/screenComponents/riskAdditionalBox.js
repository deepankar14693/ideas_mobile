import React from "react";
import { View, StyleSheet, } from "react-native";
import {  Card, Text, Icon } from 'native-base';
import MaterialCommunityIconsIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const riskAdditionalBox = props => {

   const dotsVertical= (
    <MaterialCommunityIconsIcon
    name="dots-vertical"
    style={{ color: 'rgba(103,126,164,1)', fontSize: 22,  }}
  /> );
  
   return(
    <Card style={styles.cardboxStyle}>
        <Text style={[props.titleStyle, {fontSize: 20}]}>{props.headText}</Text>
        <View style={{flexDirection:"row", justifyContent: "space-between",  padding: 10,}}>
            <View style={[styles.innerBoxStyle, {borderWidth: 2, borderColor: "#5789fa", backgroundColor: '#e7f0fe'}]}>
                {dotsVertical}
                {/* <Icon name={"create"} size={18}></Icon> */}
                <Text style={[styles.innerTextStyle, { color: "#26477c"}]}>{props.boxText1}</Text>
            </View>

            <View style={[styles.innerBoxStyle, {borderWidth: 1.5, borderColor: "#b0bbd0", backgroundColor: '#ffffff'}]}>
                {dotsVertical}
                <Text style={[styles.innerTextStyle, {color: "#788dae"}]}>{props.boxText2}</Text>
            </View>
           
        </View>
       
    </Card>
   )}

export default riskAdditionalBox;

const styles = StyleSheet.create({
    cardboxStyle: {
        padding: 10,
        borderRadius: 6,
        backgroundColor: "#f6f7f7"
       
    },
    headText:{
        fontSize: 16,
        fontWeight: "bold"
    },
    innerBoxStyle:{
        borderWidth: 2, 
        borderColor: "#5789fa", 
        alignItems: "center", 
       // justifyContent: "center", 
        width: '42%', 
        padding: 5, 
        borderRadius:5, 
        backgroundColor: '#e7f0fe'  
    },
    innerTextStyle:{
        textAlign: "center", 
        paddingTop: 5, 
        fontWeight: "bold",
    }
})