import AppConfig from '../appConfig';
import { getMomentTimeStamp } from '../common/utils';
import * as actionTypes from './actionTypes';
import { getAxios, getAxios2, postAxios2 } from './axiosActions';
var memoryStore = require('../common/memoryStore');


export const getOrganizationMasterData = (organizationId) => {
    let timeStamp = getMomentTimeStamp();
    let params = { callTime: new Date() };
    const url = 'CachedData/OrganizationMasterData/' + organizationId + '-' + timeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_ORGANIZATION_MASTERDATA,
        payload: request
    }
};

export const getUserProjects = () => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetUserProjects';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_USER_PROJECTS,
        payload: request
    },
    (dispatch, getState) => {
        dispatch(getTimeStamps());
    }]
};

export const getTimeStamps = () => {
    let params = { callTime: new Date() };
    const url = 'CachedData/GetCachedTimeStamp';
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.GET_TIMESTAMPS,
        payload: request
    },
    (dispatch, getState) => {
        var timeStamps = getState().timeStamps;
        const projectId = memoryStore.getItem('projectId');

        dispatch(getMasterData(timeStamps, projectId));
        dispatch(getPermissionsMasterData(projectId));
    }]
};

export const getMasterData = () => {
    const projectId = AppConfig.env('projectId');
    let masterTimeStamp = getMomentTimeStamp(new Date()); //getMomentTimeStamp(timeStamps.Master);
    let params = { callTime: new Date() };
    const url = 'CachedData/MasterData/' + projectId + '-' + masterTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_MASTERDATA,
        payload: request
    }
};

export const getPermissionsMasterData = (projectId) => {
    let permissionMasterTimeStamp = getMomentTimeStamp();
    let params = { callTime: new Date() };

    const url = 'CachedData/PermissionMasterData/' + projectId + '-' + permissionMasterTimeStamp;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_PERMISSION_MASTER_DATA,
        payload: request
    }
};

export const onProjectChange = (projectId) => {
    return [{
        type: actionTypes.PROJECT_CHANGE,
        payload: projectId
    }, (dispatch) => {
        dispatch(getTimeStamps());
    }]
};

export const getUserDetails = (jwToken) => {
    const url = 'https://vicicentral.com/Client/GetUserOrganizations'
    const response = postAxios2(url, jwToken);
    return response;
}

export const setProjectDeatils = (organizationCode) => {
    let url = `https://appcenter.vicicentral.com/API/ViciProjectApiVersion/${organizationCode}`;
    const response = getAxios2(url);
    return response;
}


export const changeOrganization = () => {
    return {
        type: actionTypes.CHANGE_ORGANIZATION
    }
}
