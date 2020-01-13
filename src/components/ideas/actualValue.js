import React, { Component } from 'react';
import { formatAmount, getImplementationDateColor, getUTCTimingLabel, translateKey } from '../../common/utils';
import Tooltip from '../common/rcTooltip';

class ActualValue extends Component {
    getColorValues() {
        return {
            //backgroundColor: 'rgba(227, 232, 238, 0.6)',
            //border: 'solid 1px transparent',
            borderRadius: '4px',
            textValue: this.props.actualValue ? formatAmount(this.props.actualValue, true, true) : '$0',
            graphLeg: 1,
            dots: 1,
            opacity: 1,
            color: '#1D3F77'
        }
    }

    toolTipText() {
        return (<div>
            <span>{translateKey('NextLineItemDate')}: {getUTCTimingLabel(this.props.nextLineItemDate, 'L')}</span>
            <br />
            <span>{translateKey('LatestLineItemDate')}: {getUTCTimingLabel(this.props.actualTiming, 'L')}</span>
        </div>)
    }

    getActualTime() {
        const actualTiming = this.props.nextLineItemDate ? this.props.nextLineItemDate : this.props.actualTiming;
        return <div>
            {this.props.businessCaseReport &&
                <div data-tip data-for={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_ActualTiming2_' + this.props.ideaGroupId} className="left lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                    {getUTCTimingLabel(actualTiming, 'L')}
                </div>
            }
            {this.props.businessCaseReport &&
                <div data-tip data-for={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_planValue2_' + this.props.ideaGroupId} className="right lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                    {formatAmount(this.props.planValue, true, true)}
                </div>
            }

            {!this.props.businessCaseReport &&
                <Tooltip id={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_ActualTiming2_' + this.props.ideaGroupId}
                    text={this.toolTipText()}>
                    <div data-tip data-for={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_ActualTiming2_' + this.props.ideaGroupId} className="left lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                        <span className={getImplementationDateColor(this.props.nextLineItemDate, this.props.effectiveImplementationStatusLineItems)}>
                            {getUTCTimingLabel(actualTiming, 'L')}
                        </span>
                    </div>
                </Tooltip>
            }
            {!this.props.businessCaseReport &&
                <Tooltip id={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_planValue2_' + this.props.ideaGroupId}
                    text={translateKey('PlanValue')}>
                    <div data-tip data-for={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_planValue2_' + this.props.ideaGroupId} className="right lh16" style={{ fontSize: '10px', fontWeight: 600, color: '#768aad' }}>
                        {formatAmount(this.props.planValue, true, true)}
                    </div>
                </Tooltip>
            }

        </div>
    }

    render() {
        const styles1 = this.getColorValues();
        const boxClassName = this.props.effectiveImplementationStatusLineItems ?
            ('imp-idea-status-' + this.props.effectiveImplementationStatusLineItems) : (this.props.isHidden ? 'imp-idea-status-empty' : 'imp-idea-status-none');
        return (

            <div className="ht68">
                <div className="left plan-metrics" style={this.props.isHidden ? { padding: '0px 0px 0px 0px' } : { opacity: 1 }}>
                    {this.props.businessCaseReport &&
                        <div className={'ht26 ' + boxClassName} data-tip data-for={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_actualValue_' + this.props.ideaGroupId} style={{ backgroundColor: styles1.backgroundColor, border: styles1.border, borderRadius: styles1.borderRadius }}>
                            <div className="idea-grid-primary-text text-align-center lh24 pdR6" style={{ opacity: styles1.opacity, color: styles1.color, position: 'relative', textAlign: 'right' }}>
                                {translateKey(styles1.textValue)}
                            </div>
                        </div>
                    }
                    {!this.props.businessCaseReport &&
                        <Tooltip id={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_actualValue_' + this.props.ideaGroupId}
                            text={translateKey('Est/ActualValue')} >
                            <div className={'ht26 ' + boxClassName} data-tip data-for={(this.props.sourceId ? this.props.sourceId : '') + 'toolTip_actualValue_' + this.props.ideaGroupId} style={{ backgroundColor: styles1.backgroundColor, border: styles1.border, borderRadius: styles1.borderRadius }}>
                                <div className="idea-grid-primary-text text-align-center lh24 pdR6" style={{ opacity: styles1.opacity, color: styles1.color, position: 'relative', textAlign: 'right' }}>
                                    {translateKey(styles1.textValue)}
                                </div>
                            </div>
                        </Tooltip>
                    }
                    <div className='ht16'>
                        {this.getActualTime()}
                    </div>
                </div>
            </div>
        );
    }
}


export default ActualValue;
