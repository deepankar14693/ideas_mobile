import * as actionTypes from './actionTypes';
import { getAxios } from './axiosActions';

export const getExecutiveDashboardData = (projectId) => {
  let params = { callTime: new Date() };
  const url = 'Mobile/GetExcecutiveDashboardData/' + projectId;
  const request = getAxios(url, { params: params });
  return {
    type: actionTypes.GET_EXECUTIVE_DASHBOARD_DATA,
    payload: request
  }
};
