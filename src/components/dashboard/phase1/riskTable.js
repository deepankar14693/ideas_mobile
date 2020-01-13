import React, { Component } from "react";
import _ from 'lodash';
import { View, StyleSheet } from "react-native";
import { Text } from 'native-base';
import RowTab from './RowTab';
import * as utils from '../../../common/utils';

class Tables extends Component {
    
    renderRiskSummary(riskSummary) {
        if (!riskSummary || riskSummary.Value.length <= 0) { return <View></View>; }

        return (
            <View style={styles.inputContainer}>
                <View style={styles.innerBlock}>
                    <View style={[styles.riskText, styles.borderBottomHighlight]}><Text style={styles.boldText}>RISK</Text></View>
                    <View style={[styles.valueText, styles.borderBottomHighlight]}><Text style={styles.boldText}>$ VALUE</Text></View>
                    <View style={[styles.valueText, styles.borderBottomHighlight]}><Text style={styles.boldText}># IDEAS</Text></View>
                </View>
                <View>
                    <RowTab style={styles.normalText} head={"Low"} borderStyle={styles.borderBottom}
                        value={utils.formatAmount2(riskSummary.Value[1], true, false)}
                        idea={utils.formatCount(riskSummary.Count[1])} />

                    <RowTab style={styles.normalText} head={"Medium"} borderStyle={styles.borderBottomHighlight}
                        value={utils.formatAmount2(riskSummary.Value[2], true, false)}
                        idea={utils.formatCount(riskSummary.Count[2])} />

                    <RowTab style={[styles.boldText]} head={"SUBTOTAL"}
                        value={utils.formatAmount2(riskSummary.Value[1] + riskSummary.Value[2], true, false)}
                        idea={utils.formatCount(riskSummary.Count[1] + riskSummary.Count[2])} />

                    <RowTab style={styles.normalText} head={"High"} borderStyle={styles.borderBottom}
                        value={utils.formatAmount2(riskSummary.Value[3], true, false)}
                        idea={utils.formatCount(riskSummary.Count[3])} />

                    <RowTab style={styles.normalText} head={"Unrated"} borderStyle={styles.borderBottomHighlight}
                        value={utils.formatAmount2(riskSummary.Value[0], true, false)}
                        idea={utils.formatCount(riskSummary.Count[0])} />

                    <RowTab style={[styles.boldText]} head={"TOTAL"}
                        value={utils.formatAmount2(_.sum(riskSummary.Value), true, false)}
                        idea={utils.formatCount(_.sum(riskSummary.Count))} />

                </View>
            </View>
        )
    }

    render() {
        const riskSummary = this.props.riskSummary;

        return (
            this.renderRiskSummary(riskSummary)
        );
    }

}



const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: "96%",
        margin: "2%",
    },
    inputContainer: {
        flex: 1,
        width: "100%",
        height: "90%",
        padding: 20
    },
    riskText: {
        textAlign: "left",
        alignItems: "flex-start",
        width: "35%",
        paddingBottom: 5
    },
    valueText: {
        width: "30%",
        alignItems: "flex-end",
        textTransform: 'uppercase',
        paddingBottom: 5,

    },
    innerBlock: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 5,
        justifyContent: "space-between",
    },
    colorItem: {
        color: "#2e58d6",
        fontSize: 15,
        //  textAlign :"right"
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 15,
        color: "#2e58d6"
    },
    borderBottom: {
        borderBottomWidth: 1,
        borderBottomColor: "#bbb"
    },
    borderBottomHighlight: {
        borderBottomWidth: 3,
        borderBottomColor: "#bbb"
    },

    normalText: {
        fontSize: 15,
        color: "#2e58d6"
    },
});

export default Tables;