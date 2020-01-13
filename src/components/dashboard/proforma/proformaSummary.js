import React, { Component } from 'react';
import { ScrollView, View, Text } from 'react-native';
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
            cellWidth: (props.cellWidth ? props.cellWidth - 5 : 100)
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.tableData !== state.tableData) {
            return { tableData: props.tableData }; // <- this is setState equivalent
        }
        return null;
    }

    render() {
        const state = this.state;

        const riskCellElement = (data, index) => (
            <View style={[
                index === 1 && tableStyles.borderBottomHighlight,
                index === 0 && tableStyles.borderBottom]}>
                <Text style={[
                    tableStyles.text, tableStyles.textAlignLeft,
                    index === 2 && { fontWeight: '700' },
                    index !== 2 && { fontWeight: '400' }
                ]}>{data}</Text>
            </View>
        );

        const cellElement = (data, index) => (
            <View style={[
                { width: state.cellWidth },
                index === 1 && tableStyles.borderBottomHighlight,
                index === 0 && tableStyles.borderBottom]}>
                <Text style={[
                    tableStyles.text,
                    index === 2 && { fontWeight: '700' },
                    index !== 2 && { fontWeight: '400' }
                ]}>{data}</Text>
            </View>
        );

        return (
            <View style={tableStyles.container}>
                <View style={tableStyles.innerContainer}>
                    <View style={[tableStyles.rowBlock]}>
                        <View style={[{ width: "26%" }]}>
                            <Table borderStyle={{ borderWidth: 5, borderColor: '#fff' }}>
                                <Row data={['RISK']} style={tableStyles.riskHeader} textStyle={[tableStyles.headerText, tableStyles.textAlignLeft, tableStyles.borderBottomHighlight]} />
                                {
                                    state.tableTitle.map((rowData, index) => (
                                        <TableWrapper key={index} style={[tableStyles.riskRow]}>
                                            {
                                                <Cell key={index} data={riskCellElement(rowData, index)} />
                                            }
                                        </TableWrapper>
                                    ))
                                }
                            </Table>
                        </View>
                        <View style={[{ width: "74%" }]}>
                            <ScrollView horizontal={true}>
                                <View>
                                    <Table borderStyle={{ borderWidth: 5, borderColor: '#fff' }}>
                                        <Row data={state.tableHead} style={tableStyles.header} widthArr={state.widthArr}
                                            textStyle={[tableStyles.headerText, tableStyles.textAlignRight, tableStyles.borderBottomHighlight]} />
                                        {
                                            state.tableData.map((rowData, index) => (
                                                <TableWrapper key={index} style={[tableStyles.row]}>
                                                    {
                                                        rowData.map((cellData, cellIndex) => (
                                                            <Cell key={cellIndex} data={cellElement(cellData, index)} />
                                                        ))
                                                    }
                                                </TableWrapper>
                                            ))
                                        }
                                    </Table>
                                </View>
                            </ScrollView>
                        </View>
                    </View>
                </View>
            </View>
        )
    }
}
