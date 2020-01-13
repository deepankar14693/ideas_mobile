import React, { PureComponent } from 'react';
import RiskSummary from './riskSummary';
import ProformaRiskSummary from '../proforma/index';
import _ from 'lodash';

class Index extends PureComponent {

    render() {
        if (!this.props.scrData) return <></>;

        const totalBaseline = this.props.scrData.TotalBaseline ? this.props.scrData.TotalBaseline : 0;
        const riskSummary = this.props.scrData.Summary;
        const proformaRiskSummary = this.props.scrData.ProformaRiskSummary;
        const oneTimeRiskSummary = this.props.scrData.OneTimeRiskSummary;
        const fteRiskSummary = this.props.scrData.FTERiskSummary;
        const fiscalYears = _.uniqBy(_.map(this.props.fiscalTimings, 'year'));

        return (
            <>
                <RiskSummary
                    riskSummary={riskSummary}
                    scrType={this.props.scrType}
                    isCompanyView={this.props.isCompanyView}
                    totalBaseline={totalBaseline}
                    selectedRadioForPAndL={this.props.selectedRadioForPAndL}
                    onRadioChangeForPAndL={this.props.onRadioChangeForPAndL}
                />
                <ProformaRiskSummary proformaRiskSummary={proformaRiskSummary} oneTimeRiskSummary={oneTimeRiskSummary} fteRiskSummary={fteRiskSummary} fiscalYears={fiscalYears} />
            </>
        )
    }
}

export default Index;