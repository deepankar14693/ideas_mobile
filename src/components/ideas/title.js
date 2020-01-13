import React, { PureComponent } from 'react';
import { getImplementationStatusLabel } from '../../common/constants';
import { isEmpty2, translateKey } from '../../common/utils';
import Tooltip from '../common/rcTooltip';

class Title extends PureComponent {

    getGroupDescription(value) {
        if (value === null || value === '') {
            return ('');
        }
        else {
            return (value);
        }
    }

    ideaStatus(value) {
        return 'idea-number-inner idea-status-' + (value ? value : '1');
    }

    onLabelClick(e) {
        e.preventDefault();
        e.stopPropagation();
        this.props.toggleReportModal('businessCaseReport');
    }

    implementationStatus(value) {
        return 'idea-number-inner ' + (value ? ('imp-idea-status-' + value) : 'idea-status-1');
    }

    toolTipText(isImplementationPhase) {
        const effectiveImplementationStatus = (this.props.implementationStatusOverride ? this.props.implementationStatusOverride : this.props.implementationStatus);
        if (isImplementationPhase) {
            return (<div>
                <span>{translateKey('ImplementationStatus')}: {getImplementationStatusLabel(effectiveImplementationStatus, true)}</span>
                {this.props.implementationStatusOverride &&
                    <span> ({translateKey('Overridden')})</span>
                }
                <br />
                {this.props.implementationStatusOverride &&
                    <span>{translateKey('SubElementsStatus')}: {getImplementationStatusLabel(this.props.implementationStatus, true)}</span>
                }
                {this.props.implementationStatusOverride &&
                    <br />
                }
                {translateKey('ClickToLaunchTrackingReport')}
            </div>)
        }
        else {
            return (translateKey('LaunchBusinessCaseReport'))
        }
    }

    render() {
        return (
            <div>
                <div className="col-padding-title" style={{ display: 'table', width: '100%', height: '68px', paddingRight: '0' }}>
                    <div style={{ display: 'table-cell', width: (this.props.isImplementationPhase ? '83%' : '100%'), verticalAlign: 'middle' }}>
                        <div className="left pdL2">
                            <div className={this.props.isImplementationPhase ?
                                this.implementationStatus(this.props.implementationStatusOverride ? this.props.implementationStatusOverride : this.props.implementationStatus) :
                                this.ideaStatus(this.props.value)} style={{ verticalAlign: 'top', }}>
                                {((this.props.view === 1 || this.props.view === 7 || this.props.view === 8) && !this.props.businessCaseReport) &&
                                    <Tooltip id={'tooltip_' + this.props.ideaGroupId + this.props.label}
                                        text={this.toolTipText(this.props.isImplementationPhase)}>
                                        <span className='idea-number-span' onClick={this.onLabelClick.bind(this)}>
                                            <center>{this.props.label}</center>
                                        </span>
                                    </Tooltip>
                                }
                                {!this.props.businessCaseReport && !(this.props.view === 1 || this.props.view === 7 || this.props.view === 8) &&
                                    <span className='idea-number-span' onClick={this.onLabelClick.bind(this)}>
                                        <center>{this.props.label}</center>
                                    </span>
                                }
                                {this.props.businessCaseReport &&
                                    <span className='idea-number-span'>
                                        <center>{this.props.label}</center>
                                    </span>
                                }
                            </div>

                        </div>
                        <div className="pdL45 lh16">
                            <span className={"idea-title-text" + (isEmpty2(this.props.title) ? ' pdR0' : '')}  style={{ wordBreak: 'break-word'}}>{this.props.title}</span> {/*Note: Space after </span> is required!!!*/}
                            <span className={"idea-desc-text"}  style={{ wordBreak: 'break-word'}}>{this.getGroupDescription(this.props.description)}</span>
                        </div>
                    </div>
                    {this.props.isImplementationPhase && !isEmpty2(this.props.ideaLeadersName) &&
                        <Tooltip id={'tooltip_' + this.props.ideaGroupId + this.props.ideaLeadersName}
                            text={this.props.ideaLeadersName}>
                            <div className="idea-grid-primary-text ideaLeaderWrap"
                                style={{ display: (!this.props.ideaLeadersName ? 'table-cell' : (this.props.ideaLeadersName.length > 30 ? '-webkit-box' : 'table-cell')) }}>
                                {this.props.ideaLeadersName}
                            </div>
                        </Tooltip>
                    }
                    {this.props.isImplementationPhase && isEmpty2(this.props.ideaLeadersName) &&
                        <div className="idea-grid-primary-text ideaLeaderWrap"
                            style={{ display: (!this.props.ideaLeadersName ? 'table-cell' : (this.props.ideaLeadersName.length > 30 ? '-webkit-box' : 'table-cell')) }}>
                            {this.props.ideaLeadersName}
                        </div>
                    }
                </div>
            </div>
        );
    }
}

export default Title;
