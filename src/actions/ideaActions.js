import { getAxios } from "./axiosActions";
import * as actionTypes from "./actionTypes";
import { getMomentTimeStamp } from '../common/utils';

// import axios from './axiosActions';
// import axios from 'axios'

export const getIdeaData = (groupId) => {
    let params = { callTime: new Date(), groupId: groupId };
    let url = 'Mobile/GetIdeaData/' + groupId;
    const request = getAxios(url, { params: params });
    return {
        type: actionTypes.GET_IDEA_DATA,
        payload: request
    }
};

export const getIdeaDetailData = (ideaId, ideaGroupId, tabName) => {
    let params = { callTime: new Date() };
    const url = 'Mobile/GetIdeaDetailData/' + ideaId + '-' + getMomentTimeStamp();
    const request = getAxios(url, { params: params });
    return [{
        type: actionTypes.OPEN_IDEA,
        openedIdeaGroupId: ideaGroupId,
        openedTab: tabName
    }, {
        type: actionTypes.GET_IDEA_DETAIL_DATA,
        payload: request
    }
    ]
};
