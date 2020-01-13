import React from 'react';
import { StyleSheet, View } from 'react-native';
import {Badge, Text} from 'native-base';
import ColorHeadBox from '../screenComponents/colorHeadBox';


const RiskRatersBox = (props) => {      
        return (
            /* <View style={styles.containers}>
                <View style={styles.innerContainers}>
                     */
                    <ColorHeadBox colorStyle = {props.colorHeadColor} >
                    {/* <ColorHead colorStyle={{ backgroundColor: props.colorHeadColor  }}></ColorHead> */}
                    <View style={{margin: 10}}>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <Badge style={[styles.badgeStyle ]}><Text style={[styles.badgeTextStyle, ]}>{props.badgeText}</Text></Badge>
                        {props.buttonComponent}
                    </View>
                    <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
                        <View>
                           {props.userText && <Text style={styles.titleStyle}>{props.userText}</Text>}
                           {props.typeGroup && <Text style={styles.textStyle2}>{props.typeGroup}</Text>}
                           {props.postText && <Text style={styles.textStyle2}>{props.postText}</Text>}
                           {props.contactMail && <Text style={styles.textStyle2}>{props.contactMail}</Text>}
                        </View>
                        <View style={{paddingTop: 15}}>
                            <Text style={styles.titleStyle}>Risk Rating</Text>
                            <View><Text>Picker</Text></View>
                        </View>
                        
                    </View>
                    </View>

                    </ColorHeadBox>
        )
}

const styles = StyleSheet.create({
    containers: {
       // flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 10,

    },
    innerContainers: {
        paddingBottom: 20,
        width: "100%",
        borderRadius: 6,
        //   minHeight: 294,
        borderWidth: 0,
        borderColor: "#e3e8ee",
        backgroundColor: "#fff",
        //box shadow IOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        //box shadow Android
        elevation: 6
        // flexDirection: "column"

    },

    badgeStyle: {
        backgroundColor: '#eaebeb',
      // width: 50
      },
      badgeTextStyle: {
        color: '#263d88',
        padding: 4
      },

      iconStyle:{
        color: "red",
        fontSize: 18,
        color: "#566f99",
    },
    buttonStyle:{
        width: 75,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
      
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#566f99"
    },
    textStyle2:{
        color: '#7086aa',
    }


})

export default RiskRatersBox;