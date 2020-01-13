import React, { Component } from 'react';
import { formatAmount, getImplementationDateColor, getUTCTimingLabel, translateKey } from '../../common/utils';
import Tooltip from '../common/rcTooltip';

class PlanValue extends Component {
    getColorValues(type) {
        if (type === 1) {
            return {
                //backgroundColor: 'rgba(227, 232, 238, 0.6)',
                //border: 'solid 1px transparent',
                borderRadius: '4px',
                textValue: this.props.planValue ? formatAmount(this.props.planValue, true, true) : '$0',
                graphLeg: 1,
                dots: 1,
                opacity: 1,
                color: '#1D3F77'
            }
        } else if (type === 2) {
            return {
                //backgroundColor: 'trasnparent',
                //border: 'solid 1px rgba(176, 188, 208, 0.5)',
                borderRadius: '4px',
                textValue: '',
                graphLeg: 2,
                dots: 2,
                opacity: 1,
                color: '#1D3F77'
            }
        }
    }

    toolTipText() {
        return (<div>
            <span>{translateKey('NextLineItemDate')}: {getUTCTimingLabel(this.props.nextLineItemDate, 'YYYY MMM')}</span>
            <br />
            <span>{translateKey('LatestLineItemDate')}: {getUTCTimingLabel(this.props.planTiming, 'YYYY MMM')}</span>
        </div>)
    }

    getPlanTime() {
        const planTiming = this.props.nextLineItemDate ? this.props.nextLineItemDate : this.props.planTiming;

        return <div>
            {this.props.businessCaseReport &&
                <div className="left lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                    {getUTCTimingLabel(planTiming, 'YYYY MMM')}
                </div>
            }
            {this.props.businessCaseReport &&
                <div className="right lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                    {formatAmount(this.props.targetValue, true, true)}
                </div>
            }

            {!this.props.businessCaseReport &&
                <Tooltip id={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_PlanTiming2_' + this.props.ideaGroupId}
                    text={this.toolTipText()} >
                    <div className="left lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                        <span className={getImplementationDateColor(this.props.nextLineItemDate, this.props.effectiveImplementationStatusLineItems, 'months')}>
                            {getUTCTimingLabel(planTiming, 'YYYY MMM')}
                        </span>
                    </div>
                </Tooltip>
            }
            {!this.props.businessCaseReport &&
                <Tooltip id={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_targetValue2_' + this.props.ideaGroupId}
                    text={translateKey('TargetValue')}>
                    <div className="right lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                        {formatAmount(this.props.targetValue, true, true)}
                    </div>
                </Tooltip>
            }
        </div>
    }


    render() {
        const styles1 = this.getColorValues(1);
        const boxClassName = this.props.effectiveImplementationStatusLineItems ?
            ('imp-idea-status-' + this.props.effectiveImplementationStatusLineItems) : (this.props.isHidden ? 'imp-idea-status-empty' : 'imp-idea-status-none');
        return (

            <div className="ht68">
                <div className="left plan-metrics" style={this.props.isHidden ? { padding: '0px 0px 0px 0px' } : { opacity: 1 }}>
                    {this.props.businessCaseReport &&
                        <div className={'ht26 ' + boxClassName} style={{ backgroundColor: styles1.backgroundColor, border: styles1.border, borderRadius: styles1.borderRadius }}>
                            <div className="idea-grid-primary-text text-align-center lh24 pdR6" style={{ opacity: styles1.opacity, color: styles1.color, position: 'relative', textAlign: 'right' }}>
                                {translateKey(styles1.textValue)}
                            </div>
                        </div>
                    }
                    {!this.props.businessCaseReport &&
                        <Tooltip id={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_planValue_' + this.props.ideaGroupId}
                            text={translateKey('PlanValue')}>
                            <div className={'ht26 ' + boxClassName} style={{ backgroundColor: styles1.backgroundColor, border: styles1.border, borderRadius: styles1.borderRadius }}>
                                <div className="idea-grid-primary-text text-align-center lh24 pdR6" style={{ opacity: styles1.opacity, color: styles1.color, position: 'relative', textAlign: 'right' }}>
                                    {translateKey(styles1.textValue)}
                                </div>
                            </div>
                        </Tooltip>
                    }
                    <div className='ht16'>
                        <div>
                            {this.getPlanTime()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}


export default PlanValue;
