import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { onStarIdea, onUnStarIdea } from '../../actions/index';
import { translateKey } from '../../common/utils';
import Tooltip from '../common/rcTooltip';


class isFavourite extends PureComponent {

    onToggleIsFavourite() {
        if (!this.props.isIdeaReadOnly) {
            if (this.props.isFavourite) {
                this.props.onUnStarIdea(this.props.ideaId);
            } else {
                this.props.onStarIdea(this.props.ideaId);
            }
        }
    }

    render() {
        return (
            <div className={'idea-number'} style={this.props.isIdeaReadOnly ? { cursor: 'auto' } : { cursor: 'pointer' }}>
                {!(!this.props.isFavourite && !this.props.isIdeaReadOnly) &&
                    <div className="left v-idea-star" data-tip data-for={'toolTip_starIdea' + this.props.ideaGroupId} onClick={this.onToggleIsFavourite.bind(this)} >
                        <i className={this.props.isFavourite ? "ion-android-star" : "ion-android-star-outline"} style={this.props.isFavourite ? { color: "#FFAC35" } : { color: "" }}>
                        </i>
                    </div>
                }
                {!this.props.isFavourite && !this.props.isIdeaReadOnly &&
                    <Tooltip id={'toolTip_starIdea' + this.props.ideaGroupId} text={translateKey('StarIdea')}>
                        <div className="left v-idea-star" onClick={this.onToggleIsFavourite.bind(this)} >
                            <i className={this.props.isFavourite ? "ion-android-star" : "ion-android-star-outline"} style={this.props.isFavourite ? { color: "#FFAC35" } : { color: "" }}>
                            </i>
                        </div>
                    </Tooltip>
                }
            </div>
        );
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ onStarIdea, onUnStarIdea }, dispatch)
}

export default connect(null, mapDispatchToProps)(isFavourite);
