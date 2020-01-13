import _ from 'lodash';
import { Text } from 'native-base';
import React from 'react';
import { View, TouchableOpacity } from 'react-native';
import { translateKey } from '../../common/utils';
import { ideaListGroupStyles } from '../../css/ideaListViews';

function Group(props) {

    const getGroupName = (groupId) => {
        if (props.masterDataGroups) {
            if (props.masterDataGroups[groupId]) {
                return props.masterDataGroups[groupId].Name;
            } else {
                return '';
            }
        }
    }

    const getIfGroupITCosting = (groupId) => {
        if (props.masterDataGroups[groupId]) {
            return props.masterDataGroups[groupId].IsITCosting;
        } else {
            return false;
        }
    }

    const renderGroups = (ITStatus, groupId) => {
        const ideaGroupsWithITGroup = _.filter(props.groups, { 'LinkedGroupStatus': 3 });
        var ideaGroupsData = { ideaGroups: [] };
        _.map(ideaGroupsWithITGroup, (item) => {
            const ifGroupITCosting = getIfGroupITCosting(item.GroupId);
            if (!ifGroupITCosting) {
                ideaGroupsData.ideaGroups.push(item);
            }
        })
        const groupLength = ideaGroupsData.ideaGroups.length + (ITStatus && ITStatus === 3 ? 1 : 0);
        if (groupLength <= 1) {
            return ('');
        }
        else {
            if (groupLength > 2) {
                return '+ ' + (groupLength - 1) + ' more'
            } else {
                const linkedGroupsName = { Name: '' };
                if (groupLength > 0) {
                    if (ITStatus && ITStatus === 3) {
                        return translateKey('ITCosting');
                    } else {
                        for (var i = 0; i < groupLength; i++) {
                            if (groupId !== ideaGroupsData.ideaGroups[i].GroupId) {
                                linkedGroupsName.Name = props.masterDataGroups[ideaGroupsData.ideaGroups[i].GroupId] ? props.masterDataGroups[ideaGroupsData.ideaGroups[i].GroupId].Name : '';
                            }
                        }
                        return linkedGroupsName.Name;
                    }

                } else {
                    return '';
                }

            }
        }
    }

    const _goToIdea = (ideaId, ideaGroupId, tabName) => {
        props.goToIdea ? props.goToIdea(ideaId, ideaGroupId, tabName) : null;
    }

    const getTooltipText = (ITStatus, groupId) => {
        let tooltipMultiGroupText = getGroupName(groupId);
        const ideaGroupsWithITGroup = _.filter(props.groups, { 'LinkedGroupStatus': 3 });
        var ideaGroupsData = { ideaGroups: [] };
        _.map(ideaGroupsWithITGroup, (item) => {
            const ifGroupITCosting = getIfGroupITCosting(item.GroupId);
            if (!ifGroupITCosting) {
                ideaGroupsData.ideaGroups.push(item);
            }
        })
        const groupLength = ideaGroupsData.ideaGroups.length + (ITStatus && ITStatus === 3 ? 1 : 0);
        if (groupLength > 1) {
            tooltipMultiGroupText = translateKey('PrimaryGroup') + ': ' + getGroupName(groupId);
            const ideaOtherGroups = _.join(_.map(_.filter(props.groups, (item) => { return item.LinkedGroupStatus === 3 && item.GroupId !== groupId }), 'Name'), ', ');
            tooltipMultiGroupText = <Text><Text>{tooltipMultiGroupText}</Text>{"\n"}<Text>{translateKey('SelectOtherGroups') + ': ' + ideaOtherGroups}</Text></Text>
        }
        return tooltipMultiGroupText;
    }

    const groupId = (props.ideaView === 'CompanyView' ? props.groupIdIdeaGroup : props.groupIdIdea);
    const multiGroupTooltipText = getTooltipText(props.ITStatus, props.groupIdIdea);
    return (
        <View>
            <View style={ideaListGroupStyles.focuAreaName}>
                <TouchableOpacity onPress={() => { _goToIdea(props.ideaId, props.ideaGroupId, 'Group') }} >
                    <Text>
                        <Text style={ideaListGroupStyles.ideaDescText}>{getGroupName(groupId)}{" "}</Text>
                        {(props.groups && props.groups.length > 1) &&
                            <Text style={ideaListGroupStyles.ideaMoreGroupsText}>
                                {renderGroups(props.ITStatus, groupId)}{" "}
                            </Text>
                        }
                        {!(props.groups && props.groups.length > 1) &&
                            <Text>{"            "}</Text>
                        }
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { _goToIdea(props.ideaId, props.ideaGroupId, 'FocusArea') }} >
                    <Text style={ideaListGroupStyles.ideaTitleText}>{props.focusAreaName ? props.focusAreaName : 'Focus Area Name'}</Text>
                </TouchableOpacity>
            </View>
            <View style={ideaListGroupStyles.ideaTitle}>
                <TouchableOpacity onPress={() => { _goToIdea(props.ideaId, props.ideaGroupId, 'Details') }} >
                    <Text>
                        <Text style={ideaListGroupStyles.ideaTitleText}>{props.ideaTitle}</Text>
                        <Text style={ideaListGroupStyles.ideaDescText}>{props.ideaDescription}</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

export default Group;
