import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Col, Row, Table, TableWrapper, Cell } from 'react-native-table-component';

export default class ExampleTwo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: props.tableHeader,// ['FY 2018', 'FY 2019', 'FY 2020', 'FY 2021', 'FY 2022', 'FY 2023'],
            tableTitle: ['Low', 'Medium', 'SUBTOTAL', 'High'],
            tableData: props.tableData,
            // tableData: [
            //     ['5000', '5000', '5000', '5000', '5000', '5000',],
            //     ['5000', '5000', '5000', '5000', '5000', '5000',],
            //     ['5000', '5000', '5000', '5000', '5000', '5000',],
            //     ['5000', '5000', '5000', '5000', '5000', '5000',]
            // ],
            tableData: props.tableData,
            widthArr: props.widthArr// [120, 120, 120, 120, 120, 120]
        }
    }

    render() {
        const state = this.state;

        // const tableData = [];
        // for (let i = 0; i < 8; i += 1) {
        //     const rowData = [];
        //     for (let j = 0; j < 9; j += 1) {
        //         rowData.push(`${i}${j}`);
        //     }
        //     tableData.push(rowData);
        // }

        return (
            <View style={styles.container}>
                <View style={styles.inputContainer}>
                    <View style={[styles.rowBlock]}>
                        <View style={[{ width: "24%" }]}>
                            <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                <Row data={['RISK']} flexArr={[1]} style={styles.header} textStyle={[styles.headerText, styles.textAlignLeft]} />
                                {
                                    state.tableTitle.map((rowData, index) => (
                                        <TableWrapper key={index} style={styles.row}>
                                            {
                                                <Cell key={index} data={rowData} style={styles.title} textStyle={[styles.text, styles.textAlignLeft, index === 2 && { fontWeight: '700' }]} />
                                            }
                                        </TableWrapper>
                                    ))
                                }
                                {/* <TableWrapper style={styles.wrapper}>
                                    <Col data={state.tableTitle} style={styles.title} heightArr={[35, 35, 35, 35]} textStyle={[styles.headerText, styles.textAlignLeft, { fontWeight: '100' }]} />
                                </TableWrapper> */}
                            </Table>
                        </View>
                        <View style={[{ width: "76%" }]}>
                            <ScrollView horizontal={true}>
                                <View>
                                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                        <Row data={state.tableHead} widthArr={state.widthArr} style={styles.header} textStyle={[styles.headerText, styles.textAlignRight]} />
                                    </Table>

                                    <ScrollView style={styles.dataWrapper}>
                                        <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                                            {
                                                state.tableData.map((rowData, index) => (
                                                    <Row
                                                        key={index}
                                                        data={rowData}
                                                        widthArr={state.widthArr}
                                                        style={[styles.row]}
                                                        textStyle={[styles.text, index === 2 && { fontWeight: '700' }, index !== 2 && { fontWeight: '100' }]}
                                                    />
                                                ))
                                            }
                                        </Table>
                                    </ScrollView>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    inputContainer: {
        flex: 1,
        width: "100%",
        height: "90%",
    },
    container: {
        flex: 1,
        width: "96%",
        margin: "2%",
    },
    header: { height: 40, backgroundColor: '#e7f0fe' },
    textAlignLeft: { textAlign: "left", paddingLeft: 10, },
    textAlignRight: { textAlign: "right", paddingRight: 10, },

    headerText: { color: '#2E58D6', fontWeight: '700' },
    wrapper: { flexDirection: 'row' },
    title: { flex: 1, backgroundColor: '#f6f8fa' },
    row: { height: 35 },
    text: { textAlign: 'right', paddingRight: 10, color: '#2E58D6' },
    dataWrapper: { marginTop: -1 },

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