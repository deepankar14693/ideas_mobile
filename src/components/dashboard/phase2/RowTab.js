import React, { Component } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from 'native-base';

class RowTab extends Component {
    render() {
        return (
            <View style={[styles.rowBlock]}>
                <View style={[styles.leftItem, this.props.borderStyle, { width: "24%" }]}><Text style={[styles.textStyle, this.props.style]}>{this.props.head}</Text></View>
                <View style={[styles.rightItem, this.props.borderStyle, { width: "24%" }]}><Text style={[styles.textStyle, this.props.style]}>{this.props.value}</Text></View>
                <View style={[styles.rightItem, this.props.borderStyle, { width: "24%" }]}><Text style={[styles.textStyle, this.props.style]}>{this.props.baselinePct}</Text></View>
                <View style={[styles.rightItem, this.props.borderStyle, { width: "24%" }]}><Text style={[styles.textStyle, this.props.style]}>{this.props.idea}</Text></View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    rowBlock: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
    },
    leftItem: {
        textAlign: "left",
        alignItems: "flex-start",
        color: 'blue',
        justifyContent: "space-between",
    },
    rightItem: {
        textAlign: "right",
        alignItems: "flex-end",
        color: 'blue',
        justifyContent: "space-between",
    },
    textStyle: {
        paddingTop: 5,
        paddingBottom: 5,
    }
});

export default RowTab;