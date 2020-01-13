import React, { Component } from 'react';
import { getUTCTimingLabel, translateKey } from '../../common/utils';
import Tooltip from '../common/rcTooltip';


class Metrics extends Component {

    getColorValues() {
        return {
            //backgroundColor: 'rgba(227, 232, 238, 0.6)',
            //border: 'solid 1px transparent',
            borderRadius: '4px',
            graphLeg: 2,
            dots: 2,
            opacity: 1,
            color: '#1D3F77'
        }
    }

    toolTipText() {
        return (<div>
            <span>{translateKey('LatestMetricDate')}: {getUTCTimingLabel(this.props.planTiming, 'L')}</span>
        </div>)
    }

    getPlanTime() {
        const tooltipId = (this.props.sourceId ? this.props.sourceId : '') + (this.props.view === 7 ? 'toolTip_PlanTiming_Metrics' : 'toolTip_ActualTiming_Metrics') + this.props.ideaGroupId;
        return <div>
            {this.props.businessCaseReport &&
                <div className="left lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                    {getUTCTimingLabel(this.props.planTiming, 'L')}
                </div>
            }
            {!this.props.businessCaseReport &&
                <Tooltip id={tooltipId} text={this.toolTipText()}>
                    <div className="left lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                        {getUTCTimingLabel(this.props.planTiming, 'L')}
                    </div>
                </Tooltip>
            }
        </div>
    }

    render() {
        const styles1 = this.getColorValues(2);
        const boxClassName = this.props.isHidden ? 'imp-idea-status-empty' : 'imp-idea-status-none';

        return (

            <div className="ht68">
                <div className="left plan-metrics" style={this.props.isHidden ? { padding: '0px 0px 0px 0px' } : { opacity: 1 }}>
                    <div className={'ht26 ' + boxClassName} style={{ backgroundColor: styles1.backgroundColor, border: styles1.border, borderRadius: styles1.borderRadius }}>
                        <div className="idea-grid-primary-text text-align-center lh24 pdR6" style={{ opacity: styles1.opacity, color: styles1.color, position: 'relative', textAlign: 'right' }}>
                            {this.props.metricCount > 0 ? this.props.metricCount : ''}
                        </div>
                    </div>
                    <div className='ht16'>
                        {this.getPlanTime()}
                    </div>
                </div>
            </div>
        );
    }
}


export default Metrics;
