import React, { Component } from 'react';
import { ScrollView, View } from 'react-native';
import { Cell, Row, Table, TableWrapper } from 'react-native-table-component';
import { tableStyles } from '../../../css/proforma';

export default class ProformaSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableHead: props.tableHeader,
            tableTitle: ['Low', 'Medium', 'SUBTOTAL', 'High'],
            tableData: props.tableData,
            widthArr: props.widthArr,
            tableDataFTE: props.tableDataFTE
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.tableData !== state.tableData) {
            return { tableData: props.tableData }; // <- this is setState equivalent
        }
        if (props.tableDataFTE !== state.tableDataFTE) {
            return { tableDataFTE: props.tableDataFTE }; // <- this is setState equivalent
        }
        return null;
    }

    render() {
        const state = this.state;

        return (
            <View style={tableStyles.container}>
                <View style={tableStyles.innerContainer}>
                    <View style={[tableStyles.rowBlock]}>
                        <View style={[{ width: "24%", paddingTop: 5 }]}>
                            <Table borderStyle={{ borderWidth: 5, borderColor: '#fff' }}>
                                <Row data={['RISK']} style={tableStyles.riskHeader} textStyle={[tableStyles.headerText, tableStyles.textAlignLeft, tableStyles.borderBottomHighlight]} />
                                {
                                    state.tableTitle.map((rowData, index) => (
                                        <TableWrapper key={index} style={[tableStyles.row]}>
                                            {
                                                <Cell key={index} data={rowData} style={[tableStyles.title]}
                                                    textStyle={[
                                                        tableStyles.text, tableStyles.textAlignLeft,
                                                        index === 1 && tableStyles.borderBottomHighlight,
                                                        index === 2 && { fontWeight: '700' },
                                                        index !== 2 && { fontWeight: '100' },
                                                        index === 0 && tableStyles.borderBottom,
                                                    ]
                                                    } />
                                            }
                                        </TableWrapper>
                                    ))
                                }

                            </Table>
                        </View>
                        <View style={[{ width: "50%" }]}>
                            <ScrollView horizontal={true}>
                                <View>
                                    <Table borderStyle={{ borderWidth: 5, borderColor: '#fff' }}>
                                        <Row data={state.tableHead} widthArr={state.widthArr} style={tableStyles.header}
                                            textStyle={[tableStyles.headerText, tableStyles.textAlignRight, tableStyles.borderBottomHighlight, tableStyles.mR5]} />
                                    </Table>

                                    <ScrollView >
                                        <Table borderStyle={{ borderWidth: 5, borderColor: '#fff' }}>
                                            {
                                                state.tableData.map((rowData, index) => (
                                                    <Row
                                                        key={index}
                                                        data={rowData}
                                                        widthArr={state.widthArr}
                                                        style={[tableStyles.row]}
                                                        textStyle={[tableStyles.text,
                                                        index === 1 && tableStyles.borderBottomHighlight, tableStyles.mR5,
                                                        index === 2 && { fontWeight: '700', },
                                                        index !== 2 && { fontWeight: '100' },
                                                        index === 0 && tableStyles.borderBottom, tableStyles.mR5]}
                                                    />
                                                ))
                                            }
                                        </Table>
                                    </ScrollView>
                                </View>
                            </ScrollView>
                        </View>

                        <View style={[{ width: "26%" }]}>
                            <ScrollView horizontal={true}>
                                <View>
                                    <Table borderStyle={{ borderWidth: 5, borderColor: '#fff' }}>
                                        <Row data={['Net FTE']} widthArr={[80]} style={tableStyles.header}
                                            textStyle={[tableStyles.headerText, tableStyles.textAlignRight, tableStyles.borderBottomHighlight, tableStyles.mR5]} />
                                    </Table>

                                    <ScrollView >
                                        <Table borderStyle={{ borderWidth: 5, borderColor: '#fff' }}>
                                            {
                                                state.tableDataFTE.map((rowData, index) => (
                                                    <Row
                                                        key={index}
                                                        data={rowData}
                                                        widthArr={[80]}
                                                        style={[tableStyles.row]}
                                                        textStyle={[tableStyles.text,
                                                        index === 1 && tableStyles.borderBottomHighlight, tableStyles.mR5,
                                                        index === 2 && { fontWeight: '700', },
                                                        index !== 2 && { fontWeight: '100' },
                                                        index === 0 && tableStyles.borderBottom, tableStyles.mR5]}
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
