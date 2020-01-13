import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getChachedState } from '../../store/ideas2/selectors/ideaGroup';
import Group from './group';


class IdeaListGroup extends PureComponent {

   
    render() {
        //const groupId = (this.props.ideaView === 'CompanyView' ? this.props.groupIdIdeaGroup : this.props.groupIdIdea)
        return (
            <Group 
            masterDataGroups={this.props.masterDataGroups}
            ideaView={this.props.ideaView}
            groups={this.props.groups}
            groupIdIdeaGroup={this.props.groupIdIdeaGroup}
            groupIdIdea={this.props.groupIdIdea}
            ideaGroupId={this.props.ideaGroupId}
            ITStatus={this.props.ITStatus}
            
            />
        );
    }
}

const mapStateToProps = (state, props) => {
    const getChacedData = getChachedState();
    return {
        masterDataGroups: getChacedData(state.masterData.groups).chachedState,
    }
};

export default connect(mapStateToProps, null)(IdeaListGroup);
