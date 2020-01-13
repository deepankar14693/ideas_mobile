import _ from 'lodash';
import React, { PureComponent } from 'react';
import { Text, View, Dimensions } from 'react-native';
import { formatAmount2 } from '../../../common/utils';
import commonCSS from "../../../css/commonCSS";
import { summaryCss } from "../../../css/dashboard";
import Translation from '../../common/translation';
import ColorHead from '../../UI/ColorHead/ColorHead';
import HeadingTxt from '../../UI/HeadIngTxt/HeadIngTxt';
import ProformaSummary from './proformaSummary';

const WIDTH = (Dimensions.get('window').width) * .63;

class RiskSummary extends PureComponent {

    getTableHeader(years) {
        let tableHeader = [];
        if (years.length > 0) {
            years.sort(this.compare).map(function (year, index) {
                tableHeader.push('FY ' + year);
            });
        }
        return tableHeader;
    }

    getTableDataRow(array) {
        return array.map(function (x) {
            return formatAmount2(x, true, false);
        });
    }

    getTableData(values) {
        const subTotal = _.map(_.unzip([values[1], values[2]]), _.sum);
        let tableData = [];
        tableData.push(this.getTableDataRow(values[1]));
        tableData.push(this.getTableDataRow(values[2]));
        tableData.push(this.getTableDataRow(subTotal));
        tableData.push(this.getTableDataRow(values[3]));
        return tableData;
    }

    getTableDataOneTimeSummary(values, amrtValue) {
        let subTotalIT = [];
        let subTotalOther = [];
        if (amrtValue) {
            subTotalIT = _.sum([values.OneTimeIT[1], values.OneTimeIT[2]]);
            subTotalOther = _.sum([values.OneTime[1], values.OneTime[2]]);
        } else {
            subTotalIT = _.sum([values.OneTimeITUnamrt[1], values.OneTimeITUnamrt[2]]);
            subTotalOther = _.sum([values.OneTimeUnamrt[1], values.OneTimeUnamrt[2]]);
        }

        let tableData = [];
        if (amrtValue) {
            tableData.push(this.getTableDataRow([values.OneTimeIT[1], values.OneTime[1]]));
            tableData.push(this.getTableDataRow([values.OneTimeIT[2], values.OneTime[2]]));
            tableData.push(this.getTableDataRow([subTotalIT, subTotalOther]));
            tableData.push(this.getTableDataRow([values.OneTimeIT[3], values.OneTime[3]]));
        } else {
            tableData.push(this.getTableDataRow([values.OneTimeITUnamrt[1], values.OneTimeUnamrt[1]]));
            tableData.push(this.getTableDataRow([values.OneTimeITUnamrt[2], values.OneTimeUnamrt[2]]));
            tableData.push(this.getTableDataRow([subTotalIT, subTotalOther]));
            tableData.push(this.getTableDataRow([values.OneTimeITUnamrt[3], values.OneTimeUnamrt[3]]));
        }

        return tableData;
    }

    getFTETableDataRow(array) {
        return array.map(function (x) {
            return formatAmount2(x, false, false, true);
        });

    }

    getFTETableData(values) {
        const subTotal = _.sum([values[1], values[2]]);
        let tableData = [];
        tableData.push(this.getFTETableDataRow([values[1]]));
        tableData.push(this.getFTETableDataRow([values[2]]));
        tableData.push(this.getFTETableDataRow([subTotal]));
        tableData.push(this.getFTETableDataRow([values[3]]));
        return tableData;
    }

    getWidthArr(count) {
        return _.fill(Array(count), 100);
    }

    render() {
        if (!this.props.proformaRiskSummary) return <></>;

        const tableHeader = this.getTableHeader(this.props.fiscalYears);
        const plRiskSummary = this.getTableData(this.props.proformaRiskSummary.Values);
        const cashFlowRiskSummary = this.getTableData(this.props.proformaRiskSummary.CFValues);
        const oneTimeRiskSummary = this.getTableDataOneTimeSummary(this.props.oneTimeRiskSummary, true);
        const oneTimeUnamrtRiskSummary = this.getTableDataOneTimeSummary(this.props.oneTimeRiskSummary, false);
        const fteRiskSummary = this.getFTETableData(this.props.fteRiskSummary);
        const widthArr = this.getWidthArr(this.props.fiscalYears.length);
        return (
            [
                <View key='101' style={[summaryCss.container, { paddingTop: 10 }]}>
                    <View style={summaryCss.innerContainer}>
                        <ColorHead colorStyle={commonCSS.confirm}></ColorHead>
                        <HeadingTxt style={summaryCss.headTxt}><Translation id={'P&L'} styles={{ fontSize: 25 }} /></HeadingTxt>

                        <View style={summaryCss.titleWithHRLine}>
                            <Text><Translation id={'P&L'} /></Text>
                        </View>
                        <ProformaSummary tableHeader={tableHeader} tableData={plRiskSummary} widthArr={widthArr} cellWidth={100} />

                        <View style={[summaryCss.titleWithHRLine, { marginBottom: 5 }]}>
                            <Text><Translation id={'CashFlow'} /></Text>
                        </View>
                        <ProformaSummary tableHeader={tableHeader} tableData={cashFlowRiskSummary} widthArr={widthArr}  cellWidth={100}/>
                    </View>
                </View>,

                <View key='102' style={[summaryCss.container, { paddingTop: 10 }]}>
                    <View style={summaryCss.innerContainer}>
                        <ColorHead colorStyle={commonCSS.confirm}></ColorHead>
                        <HeadingTxt style={[summaryCss.headTxt]}><Translation id={'OneTime'} styles={{ fontSize: 25 }} /></HeadingTxt>
                        <View style={summaryCss.titleWithHRLine}>
                            <Text><Translation id={'Amortized'} /></Text>
                        </View>
                        <ProformaSummary tableHeader={['IT', 'OTHER']} tableData={oneTimeRiskSummary} widthArr={[WIDTH / 2, WIDTH / 2]}  cellWidth={WIDTH / 2}/>
                        <View style={summaryCss.titleWithHRLine}>
                            <Text><Translation id={'Unamortized'} /></Text>
                        </View>
                        <ProformaSummary tableHeader={['IT', 'OTHER']} tableData={oneTimeUnamrtRiskSummary} widthArr={[WIDTH / 2, WIDTH / 2]}  cellWidth={WIDTH / 2}/>
                    </View>
                </View>,
                <View key='103' style={[summaryCss.container, { paddingTop: 10 }]}>
                    <View style={summaryCss.innerContainer}>
                        <ColorHead colorStyle={commonCSS.confirm}></ColorHead>
                        <HeadingTxt style={summaryCss.headTxt}><Translation id={'FTE'} styles={{ fontSize: 25 }} /></HeadingTxt>
                        <ProformaSummary tableHeader={['NET FTE']} tableData={fteRiskSummary} widthArr={[WIDTH]}  cellWidth={WIDTH}/>
                    </View>
                </View>
            ]
        )
    }
}

export default RiskSummary;
