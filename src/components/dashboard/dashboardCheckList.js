import React, { PureComponent } from 'react';
import Phase1CheckList from "./phase1/otherCheckList";
import Phase2CheckList from "./phase2/otherCheckList";

class Index extends PureComponent {
    render() {

        const dashboardCheckList = this.props.dashboardCheckList;
        const scrType = this.props.scrType;
        return (
            <>
                {scrType === 1 &&
                    <>
                        <Phase1CheckList dashboardCheckList={dashboardCheckList} isCompanyView={this.props.isCompanyView} {...this.props} />
                    </>
                }
                {(scrType === 2 || scrType === 3) &&
                    <>
                        <Phase2CheckList scrType={scrType} dashboardCheckList={dashboardCheckList} isCompanyView={this.props.isCompanyView} />
                    </>
                }
            </>
        )
    }
}

export default Index;