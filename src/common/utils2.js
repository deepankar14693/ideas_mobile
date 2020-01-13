import _ from 'lodash';
var memoryStore = require('./memoryStore');


/**
 * Method to check string/object is null or undefined
 * @return {bool} true/false
 */
export const isEmpty2 = function (value, allowEmptyString) {
    return (value === ' ') || (value === null) || (value === undefined) || (!allowEmptyString ? value === '' : false) || (isArray(value) && value.length === 0);
};
/**
* Method to check object is array or not
* @return {bool} true/false
*/
export const isArray = ('isArray' in Array) ? Array.isArray : function (value) {
    return toString.call(value) === '[object Array]';
};


export const getDefaultProjectId = (projects, selectedProjectId) => {
    let projectId = selectedProjectId ? selectedProjectId : memoryStore.getItem('projectId');
    if ((isEmpty2(projectId) || !projects[projectId] || (projects[projectId] && !projects[projectId].Permission)) && Object.keys(projects).length > 0) {
        const projectIds = Object.keys(projects);
        projectId = projects[projectIds[0]].ProjectId;
        memoryStore.setItem('projectId', projectId);
    }
    return (Object.keys(projects).length > 0 && projects[projectId] ? projectId : '');
};

const userGroupsDefaultGroupId = (userGroups) => {
    const groupIds = Object.keys(userGroups);
    memoryStore.setItem('groupId', groupIds[0]);
    return groupIds[0];
};

export const getDefaultGroupId = (userGroups, projectId, filteredGroupId) => {
    let groupId = filteredGroupId ? filteredGroupId : memoryStore.getItem('groupId');
    if (!groupId) {
        groupId = userGroupsDefaultGroupId(userGroups);
    }

    if (_.indexOf(Object.keys(userGroups), groupId) < 0 && groupId !== projectId) {
        groupId = userGroupsDefaultGroupId(userGroups);
    }
    return groupId;
};

export const hasFullAccess = () => {
    let userEmail = memoryStore.getItem('userEmail');
    return (userEmail.includes('@insightresults.com') || userEmail.includes('spujan@vicipartners.com'))
    // return (userEmail.includes('spujan@vicipartners.com'))
};
