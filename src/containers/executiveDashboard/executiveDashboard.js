import React, { Component } from 'react'
import { Text, View } from 'react-native'
import ExecutiveDashboardSummary from '../../components/executiveDashboard/execDashboardSummary'
import ExecutiveDashboardTable from '../../components/executiveDashboard/execDashboardTable';

export default class ExecutiveDashboard extends Component {
  render() {
    const { executiveDashboardData, scrType } = this.props;
    return (
      <>
        <ExecutiveDashboardSummary executiveData={executiveDashboardData} scrType={scrType} />
        <ExecutiveDashboardTable executiveData={executiveDashboardData} scrType={scrType} />
      </>
    )
  }
}
