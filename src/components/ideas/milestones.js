import React, { Component } from 'react';
import { getImplementationDateColor, getUTCTimingLabel, translateKey } from '../../common/utils';
import Tooltip from '../common/rcTooltip';

class Milestones extends Component {
    getColorValues() {
        return {
            //backgroundColor: 'trasnparent',
            //border: 'solid 1px rgba(176, 188, 208, 0.5)',
            borderRadius: '4px',
            graphLeg: 2,
            dots: 2,
            opacity: 1,
            color: '#1D3F77'
        }
    }

    toolTipText() {
        return (<div>
            <span>{translateKey('NextMilestoneDate')}: {getUTCTimingLabel(this.props.nextMilestoneDate, 'L')}</span>
            <br />
            <span>{translateKey('LatestMilestoneDate')}: {getUTCTimingLabel(this.props.planTiming, 'L')}</span>
        </div>)
    }

    getPlanTime() {
        const tooltipId = (this.props.sourceId ? this.props.sourceId : '') + (this.props.view === 7 ? 'toolTip_PlanTiming_Milestones' : 'toolTip_ActualTiming_Milestones') + this.props.ideaGroupId;
        const milestoneTiming = this.props.nextMilestoneDate ? this.props.nextMilestoneDate : this.props.planTiming;

        return <div>
            {this.props.businessCaseReport &&
                <div className="left lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                    {getUTCTimingLabel(milestoneTiming, 'L')}
                </div>
            }
            {!this.props.businessCaseReport &&
                <Tooltip id={tooltipId}
                    text={this.toolTipText()} >
                    <div className="left lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                        <span className={getImplementationDateColor(this.props.nextMilestoneDate, this.props.effectiveImplementationStatusMilestones)}>
                            {getUTCTimingLabel(milestoneTiming, 'L')}
                        </span>
                    </div>
                </Tooltip>
            }
        </div>
    }

    render() {
        const styles1 = this.getColorValues(2);
        const boxClassName = this.props.effectiveImplementationStatusMilestones ?
            ('imp-idea-status-' + this.props.effectiveImplementationStatusMilestones) : (this.props.isHidden ? 'imp-idea-status-empty' : 'imp-idea-status-none');
        return (

            <div className="ht68">
                <div className="left plan-metrics" style={this.props.isHidden ? { padding: '0px 0px 0px 0px' } : { opacity: 1 }}>
                    <div className={'ht26 ' + boxClassName}
                        style={{ backgroundColor: styles1.backgroundColor, border: styles1.border, borderRadius: styles1.borderRadius }}>
                        <div className="idea-grid-primary-text text-align-center lh24 pdR6" style={{ opacity: styles1.opacity, color: styles1.color, position: 'relative', textAlign: 'right' }}>
                            {this.props.milestoneCount > 0 ? this.props.milestoneCount : ''}
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


export default Milestones;
