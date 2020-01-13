import update from 'immutability-helper';
import _ from 'lodash';
import { createSelector } from 'reselect';

const prepareFilteredIdeaGroups = (state, filteredGroupId, isShowInactiveIdea, permissionsObj, singleRowForMultigroupIdea, isImplementation, showCompletedImplementationIdeas) => {
    let stateObj = state;
    const groupId = filteredGroupId;
    if (_.size(stateObj) === 0) { return update(state, { $set: [] }); }
    if (groupId === null) {
        return update(state, { $set: [] });;
    } else {
        const userPermissions = _.keys(permissionsObj.userPermissions);
        stateObj = _.filter(stateObj, (el) => {
            return el.Idea && (el.Idea.Status !== 3 && (el.Idea.Status !== 2 || !el.Idea.IsArchivePending) && !el.Idea.IsAcceptancePending)
                && ((isShowInactiveIdea || isImplementation) ? true : el.Idea.Status === 1) && (isImplementation ? (el.Idea.DecisionType === 1) : (1 === 1))
        });

        if (groupId === '00000000-0000-0000-0000-000000000000') {
            if (singleRowForMultigroupIdea) {
                stateObj = _.filter(stateObj, { 'LinkedGroupStatus': 3, 'IsPrimary': true });
                if (!showCompletedImplementationIdeas) {
                    stateObj = _.filter(stateObj, (idea) => { return (idea.Idea.ImplementationStatusOverride ? idea.Idea.ImplementationStatusOverride : idea.Idea.ImplementationStatus) <= 910 });

                }
            } else {
                stateObj = _.filter(stateObj, { 'LinkedGroupStatus': 3 });
                if (!showCompletedImplementationIdeas) {
                    stateObj = _.filter(stateObj, (idea) => { return (idea.ImplementationStatusOverride ? idea.ImplementationStatusOverride : idea.ImplementationStatus) <= 910 });

                }
            }
            stateObj = _.filter(stateObj, (ideaGroup) => {
                const focusAreaId = (ideaGroup.FocusAreaId === '00000000-0000-0000-0000-000000000000' || ideaGroup.FocusAreaId == null ? '' : ideaGroup.FocusAreaId);
                return (userPermissions.indexOf(ideaGroup.IdeaGroupId) > -1 || (focusAreaId !== '' && userPermissions.indexOf(focusAreaId) > -1) ||
                    (userPermissions.indexOf(ideaGroup.GroupId) > -1));
            });



            return update(state, { $set: stateObj.length > 0 ? stateObj : null });
        } else {
            stateObj = _.filter(stateObj, { 'LinkedGroupStatus': 3, 'GroupId': groupId });
            if (!showCompletedImplementationIdeas) {
                stateObj = _.filter(stateObj, (idea) => { return (idea.ImplementationStatusOverride ? idea.ImplementationStatusOverride : idea.ImplementationStatus) <= 910 });

            }
            //Implemented permission for groups not having any role.
            if (userPermissions.indexOf(groupId) === -1) {
                stateObj = _.filter(stateObj, (ideaGroup) => {
                    const focusAreaId = (ideaGroup.FocusAreaId === '00000000-0000-0000-0000-000000000000' || ideaGroup.FocusAreaId == null ? '' : ideaGroup.FocusAreaId);
                    return (userPermissions.indexOf(ideaGroup.IdeaGroupId) > -1 || (focusAreaId !== '' && userPermissions.indexOf(focusAreaId) > -1));
                });
                return update(state, { $set: stateObj.length > 0 ? stateObj : null });
            } else {
                return update(state, { $set: stateObj.length > 0 ? stateObj : null });
            }
        }
    }
};

const getGroupType = (groupType) => {
    switch (groupType) {
        case 1:
            return 'Savings';
        case 2:
            return 'Cost';
        case 3:
            return 'Both';
        default:
            return '--';
    }
}

const filterFocusArea = (focusAreasData, groupId) => {
    let focusAreas = _.filter(_.values(focusAreasData), (el) => {
        return el.GroupId === groupId
    }
    )
    return focusAreas;
}

const prepareFilteredGroupsDataForIdea = (ideaGroups, groupData, focusAreasData, ideaGroupId, currentGroupId) => {
    const currentIdeaGroup = ideaGroups.filter(
        function (el) {
            return el.IdeaGroupId === ideaGroupId;
        }
    );

    const filteredGroupsDataForIdea = {
        currentIdeaGroup: null, linkedGroups: [], acceptedGroups: [], unAcceptedGroups: [], addLinkedGroupAllowed: false
    }

    if (currentIdeaGroup.length > 0) {
        const ideaGroupsArray = ideaGroups.filter(
            function (el) {
                return el.IdeaId === currentIdeaGroup[0].IdeaId;
            }
        );

        filteredGroupsDataForIdea.currentIdeaGroup = currentIdeaGroup[0];

        _.map(ideaGroupsArray, (item) => {
            const groupInfo = groupData[item.GroupId];
            const obj = item;
            const isCurrentGroup = item.GroupId === currentGroupId ? 1 : 0;
            obj["IsCurrentGroup"] = isCurrentGroup;
            obj["GroupTypeLabel"] = groupInfo ? getGroupType(groupInfo.GroupType) : 0;
            obj["Name"] = groupInfo ? groupInfo.Name : '';
            obj["Description"] = groupInfo ? groupInfo.Description : '';
            obj["IsITCosting"] = groupInfo ? groupInfo.IsITCosting : false;
            obj["AllFocusArea"] = filterFocusArea(focusAreasData, obj.GroupId);
            if (!obj.IsITCosting) {
                obj['AllowGroupDeleted'] = (obj.RiskStatus >= 4 || obj.ValueStatus >= 3) ? false : true;
                filteredGroupsDataForIdea.linkedGroups.push(obj);
                if ((obj.RiskStatus >= 4 || obj.ValueStatus >= 3) && obj.IsPrimary) {
                    filteredGroupsDataForIdea.addLinkedGroupAllowed = true;
                }
                if (obj.LinkedGroupStatus === 3) {
                    filteredGroupsDataForIdea.acceptedGroups.push(obj);
                } else {
                    obj["GroupNumber"] = groupData[obj.GroupId] ? groupData[obj.GroupId].GroupNumber : 0;
                    filteredGroupsDataForIdea.unAcceptedGroups.push(obj);
                }
            }
        })
    }

    return filteredGroupsDataForIdea;
}

const cachedPrimaryIdeaGroup = (ideaGroups, ideaId) => {
    if (ideaGroups.length > 0 && ideaId) {
        const primaryIdeaGroup = _.filter(ideaGroups, { IdeaId: ideaId, IsPrimary: true });
        if (primaryIdeaGroup.length > 0) {
            return primaryIdeaGroup[0];
        }
        else {
            return null;
        }
    }
    else {
        return null;
    }
};

export const getFilteredGroupsDataForIdea = () => createSelector(
    prepareFilteredGroupsDataForIdea,
    (filteredGroupData) => ({
        filteredGroupData
    })
);

export const getFilteredIdeaGroups = () => createSelector(
    prepareFilteredIdeaGroups,
    (filteredIdeaGroups) => ({
        filteredIdeaGroups
    })
);

export const getPrimaryIdeaGroup = () => createSelector(
    cachedPrimaryIdeaGroup,
    (chachedState) => ({
        chachedState
    })
);