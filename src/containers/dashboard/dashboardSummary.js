import _ from 'lodash';
import React, { PureComponent } from 'react';
import { StyleSheet, View } from 'react-native';
import Summary from '../../components/dashboard/dashboardSummary';

class DashboardSummary extends PureComponent {

    render() {
        const scrType = this.props.scrType;

        const mobileDashboardData = this.props.mobileDashboardData;
        const dashboardCheckList = this.props.dashboardCheckList;

        return (
            <View style={styles.Container}>
                <View>
                    {mobileDashboardData &&
                        <View>
                            <Summary mobileDashboardData={mobileDashboardData} scrType={scrType} isLoading={this.props.isLoading}
                                isCompanyView={this.props.isCompanyView} fiscalTimings={this.props.fiscalTimings}
                                dashboardCheckList={dashboardCheckList}
                            />
                        </View>
                    }
                </View>
            </View>
        )
    }
}

export default DashboardSummary;

const styles = StyleSheet.create({
    Container: {
        flex: 1,
        width: "100%",
        marginTop: "2%",
        // padding: "1%",
        fontSize: 12,

    },
})
