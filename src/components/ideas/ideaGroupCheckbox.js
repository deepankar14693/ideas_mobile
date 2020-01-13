import Checkbox from '../../components/common/checkbox';
import React, { PureComponent } from 'react';

class IdeaGroupCheckbox extends PureComponent {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(evt) {
        this.props.toggleCheckBoxIdeaGroup(this.props.ideaGroupId, evt.target.checked, this.props.bitCodeForViews);
    }

    render() {
        const disabled = { isDisabled: false };
        if (this.props.view === 4 || this.props.view === 5 || this.props.view === 6 || this.props.view === 10 || this.props.view === 11 || this.props.isSingleIdeaView) {
            disabled.isDisabled = this.props.ideaView === 'CompanyView' ? true : false;
        }
        return (
            <div style={{ lineHeight: 1 }}>
                <Checkbox disabled={disabled.isDisabled}
                    checked={this.props.isChecked} onChange={this.handleChange} />
            </div>
        );
    }
}


export default IdeaGroupCheckbox;
