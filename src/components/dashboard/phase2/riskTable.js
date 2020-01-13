import React, { Component } from "react";
import _ from 'lodash';
import { View, StyleSheet } from "react-native";
import { Text } from 'native-base';
import RowTab from './RowTab';
import { getBaselinePercentageValue, formatAmount2, formatCount } from '../../../common/utils';

class Tables extends Component {

    renderRiskSummary(riskSummary, totalBaseline) {
        if (!riskSummary || riskSummary.Value.length <= 0) { return <View></View>; }

        return (
            <View style={styles.inputContainer}>
                <View style={styles.innerBlock}>
                    <View style={[styles.riskText, styles.borderBottomHighlight]}><Text style={styles.boldText}>RISK</Text></View>
                    <View style={[styles.valueText, styles.borderBottomHighlight]}><Text style={styles.boldText}>$ VALUE</Text></View>
                    <View style={[styles.valueText, styles.borderBottomHighlight]}><Text style={styles.boldText}>% OF BASELINE</Text></View>
                    <View style={[styles.valueText, styles.borderBottomHighlight]}><Text style={styles.boldText}># IDEAS</Text></View>
                </View>
                <View>
                    <RowTab style={styles.normalText} head={"Low"} borderStyle={styles.borderBottom}
                        value={formatAmount2(riskSummary.Value[1], true, false)}
                        idea={formatCount(riskSummary.Count[1])}
                        baselinePct={getBaselinePercentageValue(riskSummary.Value[1], totalBaseline, false)} />

                    <RowTab style={styles.normalText} head={"Medium"} borderStyle={styles.borderBottomHighlight}
                        value={formatAmount2(riskSummary.Value[2], true, false)}
                        idea={formatCount(riskSummary.Count[2])}
                        baselinePct={getBaselinePercentageValue(riskSummary.Value[2], totalBaseline, false)} />

                    <RowTab style={[styles.boldText]} head={"SUBTOTAL"}
                        value={formatAmount2(_.sum([riskSummary.Value[1], riskSummary.Value[2]]), true, false)}
                        idea={formatCount(_.sum([riskSummary.Count[1], riskSummary.Count[2]]))}
                        baselinePct={getBaselinePercentageValue(_.sum([riskSummary.Value[1], riskSummary.Value[2]]), totalBaseline, false)} />

                    <RowTab style={styles.normalText} head={"High"} //borderStyle={styles.borderBottom}
                        value={formatAmount2(riskSummary.Value[3], true, false)}
                        idea={formatCount(riskSummary.Count[3])}
                        baselinePct={getBaselinePercentageValue(riskSummary.Value[3], totalBaseline, false)} />

                    {/* <RowTab style={styles.normalText} head={"Unrated"} 
                        value={formatAmount2(riskSummary.Value[0], true, false)}
                        idea={formatCount(riskSummary.Count[0])}
                        baselinePct={getBaselinePercentageValue(riskSummary.Value[0], totalBaseline, false)} /> */}

                </View>
            </View>
        )
    }

    render() {
        const riskSummary = this.props.riskSummary;
        const totalBaseline = this.props.totalBaseline;

        return (
            this.renderRiskSummary(riskSummary, totalBaseline)
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
        width: "24%",
        paddingBottom: 5
    },
    valueText: {
        width: "24%",
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
        fontSize: 13,
        //  textAlign :"right"
    },
    boldText: {
        fontWeight: "bold",
        fontSize: 13,
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
        fontSize: 13,
        color: "#2e58d6"
    },
});

export default Tables;
