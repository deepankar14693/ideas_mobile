import React, { PureComponent } from 'react';
import DashboardCheckList from './dashboardCheckList';
import Phase1RiskSummary from './phase1/index';
import Phase2RiskSummary from './phase2/index';

class Index extends PureComponent {

    render() {
        if (!this.props.mobileDashboardData) return <></>;

        const scrType = this.props.scrType;
        const isCompanyView = this.props.isCompanyView;

        let scrData;
        if (scrType === 1) {
            scrData = this.props.mobileDashboardData.scr1Data;
        } else if (scrType === 2) {
            scrData = this.props.mobileDashboardData.scr2Data;
        } else if (scrType === 3) {
            scrData = this.props.mobileDashboardData.scr3Data;
        }
        const dashboardCheckList = this.props.dashboardCheckList;

        return (
            <>
                {scrType === 1 &&
                    <Phase1RiskSummary scrData={scrData} isCompanyView={isCompanyView} />
                }
                {(scrType === 2 || scrType === 3) &&
                    <Phase2RiskSummary scrData={scrData} scrType={scrType} isCompanyView={isCompanyView}
                        fiscalTimings={this.props.fiscalTimings}
                    />
                }
                {!dashboardCheckList.isLoading &&
                    <DashboardCheckList dashboardCheckList={dashboardCheckList.CheckList} scrType={scrType} isCompanyView={isCompanyView} />
                }
            </>
        )
    }
}

export default Index;
