import React, { Component } from 'react';
import { ScrollView, View, Text, Dimensions } from 'react-native';
import { Cell, Row, Table, TableWrapper, Cols } from 'react-native-table-component';
import { tableStyles } from '../../../css/proforma';
import _ from 'lodash';
import Translation from '../../common/translation';

const WIDTH = (Dimensions.get('window').width) * .56;

export default class ProformaSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tableData: props.tableData,
            // tableData: [
            //     ['CATEGORY', 'BASELINE $', '# IDEAS'],
            //     ['1', '2', '3'],
            //     ['a', 'b', 'c'],
            //     ['1', '2', '3'],
            //     ['a', 'b', 'c']
            // ],
            widthArr: props.widthArr,
            cellWidth: (props.cellWidth ? props.cellWidth - 5 : WIDTH / 3)
        }
    }

    static getDerivedStateFromProps(props, state) {
        if (props.tableData !== state.tableData) {
            return { tableData: props.tableData }; // <- this is setState equivalent
        }
        return null;
    }

    render() {
        const tableData = this.state.tableData;
        const lastIndex = tableData ? tableData.length - 1 : 0;

        const cellElement = (data, index, cellIndex, noData) => (
            <View style={[
                //{ width: state.cellWidth },
                index !== lastIndex && tableStyles.borderBottom, noData && { backgroundColor: '#ff5e5940' }]}>
                <Text style={[
                    tableStyles.text,
                    cellIndex === 0 && { textAlign: 'left' },
                    (index === 0 || index === lastIndex) && { fontWeight: '700' },
                    (index !== 0 && index !== lastIndex) && { fontWeight: '400' },
                    (index === 0 || index === (lastIndex - 1)) && tableStyles.borderBottomHighlight,
                    cellIndex === 0 && { width: (WIDTH / 3) * 2 },
                    cellIndex !== 0 && { width: (WIDTH / 3) },

                ]}>{data}</Text>
            </View>
        );

        return (
            <View style={tableStyles.container}>
                <Translation styles={{ color: '#566f99', fontStyle: 'italic', fontWeight: '300', paddingLeft: 2, paddingBottom: 5 }} id={'CategoriesWithNoIdeasMessage'} />
                <View style={tableStyles.innerContainer}>
                    <View style={[tableStyles.rowBlock]}>
                        <View>
                            <ScrollView horizontal={true}>
                                <View>
                                    <Table borderStyle={{ borderWidth: 5, borderColor: '#fff' }}>
                                        {
                                            tableData.map((rowData, index) => (
                                                <TableWrapper key={index} style={[tableStyles.row]}>
                                                    {
                                                        rowData.map((cellData, cellIndex) => (
                                                            <Cell key={cellIndex} data={cellElement(cellData, index, cellIndex, rowData[2] === '-' ? true : false)} />
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
