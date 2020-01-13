import React, { PureComponent } from 'react';
import Phase1RiskSummary from './riskSummary';

class Index extends PureComponent {

    render() {
        if (!this.props.scrData) return <></>;

        const riskSummary = this.props.scrData ? this.props.scrData.Summary : null;

        return (
            <>
                <Phase1RiskSummary riskSummary={riskSummary} isCompanyView={this.props.isCompanyView} />

            </>
        )
    }
}

export default Index;