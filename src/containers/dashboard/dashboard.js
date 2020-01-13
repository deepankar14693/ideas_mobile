import { Content } from 'native-base';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import DashboardSummary from './dashboardSummary';

class Dashboard extends PureComponent {

  render() {
    const props = this.props.screenProps;
    return (
      <Content>
        <View style={{ flex: 1 }}>
          {(props.scrType < 4 && props.mobileDashboardData) &&
            <View>
              <DashboardSummary
                isLoading={props.isLoading}
                filteredGroupId={props.groupId}
                isCompanyView={props.screenProps.isCompanyView}
                scrType={props.scrType}
                fiscalTimings={props.masterData.fiscalTimings}
                groups={props.masterData.groups}
                mobileDashboardData={props.mobileDashboardData}
                dashboardCheckList={props.dashboardCheckList}
              />
            </View>
          }
        </View>
      </Content>
    )
  }
}

export default Dashboard;
