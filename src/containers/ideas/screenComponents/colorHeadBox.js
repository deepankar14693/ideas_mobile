import React from 'react';
import ColorHead from '../../../components/UI/ColorHead/ColorHead';
import { View, StyleSheet, } from 'react-native';

const ColorHeadBox = (props) => (
    <View style={styles.containers}>
        <View style={styles.innerContainers}>
            <ColorHead colorStyle={{ backgroundColor: props.colorStyle }}></ColorHead>
            <View style={{ marginLeft: 10, marginRight: 5, marginBottom: 5 }}>
                {props.children}
            </View>
        </View>
    </View>

)

export default ColorHeadBox;

const styles = StyleSheet.create({
    containers: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 5,
        marginTop: 10,
    },
    innerContainers: {
        width: "100%",
        borderRadius: 6,
        borderWidth: 0,
        borderColor: "#e3e8ee",
        backgroundColor: "#fff",
        //box shadow IOS
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        //box shadow Android
        elevation: 6,
    }
});