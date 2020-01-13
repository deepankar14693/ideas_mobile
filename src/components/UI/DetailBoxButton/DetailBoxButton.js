import React, { Component } from "react";
import { View, StyleSheet } from "react-native";
import { Text } from 'native-base';
import NativeTouch from '../NativeTouch/NativeTouch';
import Translation from '../../common/translation';

class DetailBoxButton extends Component {
    render() {
        const title = this.props.title ? this.props.title : '';
        return (
            <View style={styles.outer} >
                <NativeTouch onPress={this.props.onClick ? this.props.onClick(title) : this.props.onPress}>
                    <View style={[styles.boxStyle, this.props.style]}>
                        <Text style={styles.textStyle}><Translation id={this.props.detailButtonTxt} /></Text>
                    </View>
                </NativeTouch>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    outer: {
        width: "100%",
        alignItems: "center",
        justifyContent: "center"
    },
    boxStyle: {
        justifyContent: "center"
    },
    textStyle: {
        fontSize: 16,
        textAlign: 'center',
        color: '#566f99'
    }
})

export default DetailBoxButton;
