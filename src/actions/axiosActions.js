import axios from 'axios';
import { setupCache } from 'axios-cache-adapter';
import uuid from 'uuid';
import AppConfig from '../appConfig';
import moment from 'moment';
var memoryStore = require('../common/memoryStore');

const cache = setupCache({
    maxAge: 15 * 60 * 60 * 1000,
    exclude: {
        paths: [/CachedData\/GetCachedTimeStamp$/,
            /UserAdmin\/GetOrganizationUsers$/,
            /UserAdmin\/GetAdminUsers$/,
            /EventStore\/GetBaselineDataUploadHistory$/,
            /Auth0\/CreateVpUser$/,
            /UserAdmin\/CreateUser$/,
            /ViciAdmin\/ManageOrganizationUsers$/,
            /UserAdmin\/GetPermissionAllData$/,
            /Ideas\/GetArchivedIdeaData$/,
            /UserNotes\/TimeStamp$/,
            /Admin\/GetProjectValueReport$/,
            /Mobile\/GetDashboardData$/
        ]
        ///Admin\/GetBaselineData$/
    }
});

const api = axios.create({
    adapter: cache.adapter
});

api.interceptors.request.use(request => {
    return request;
});

api.interceptors.response.use(response => {
    if (/api\/performancelog$/.test(response.config.url)) return response;
    if (/Client\/GetUserOrganizations$/.test(response.config.url)) return response;

    let receivedTime = new Date().getTime() - new Date(response.config.callTime).getTime();
    if (response.config.headers.JsMessageId !== response.headers.jsmessageid) {
        response.headers.elapsedtime = 0;
    }
    let transferTime = receivedTime - parseFloat(response.headers.elapsedtime);

    

    if (AppConfig.performanceLogger) {
        if(response.config.headers.Url){
            let urlParts = response.config.headers.Url.split('/');
            var urlAction = '';
            if (urlParts.length >= 2) {
                if (urlParts[1].indexOf('?') === -1) {
                    urlAction = [urlParts[0], urlParts[1]].join('/');
                } else {
                    urlAction = [urlParts[0], urlParts[1].substring(0, urlParts[1].indexOf('?'))].join('/');
                }
            }
        }
        
        let params = {
            LogDateTime: moment(response.config.callTime).utc(),
            LogType: 101, 
            UserId: memoryStore.getItem('userId'),
            OrganizationId: memoryStore.getItem('organizationId'),
            OrganizationName: memoryStore.getItem('organizationCode'),
            //LoginSessionId: getCookie('BrowserSessionId'),
            ConnectionId: memoryStore.getItem('connectionId'),
            MessageId: response.config.headers.JsMessageId,
            RawUrl: response.config.url,
            GroupId: memoryStore.getItem('GroupId') || '',
            Action: urlAction,
            Time1: transferTime, 
            Time2: parseFloat(response.headers.elapsedtime), 
            ProjectId: memoryStore.getItem('projectId') || ''
        };
        response.config.headers.performanceData = {Action: urlAction,Time1: transferTime, Time2: parseFloat(response.headers.elapsedtime)};
        //performanceQueue.push({Action: urlAction,Time1: transferTime, Time2: parseFloat(response.headers.elapsedtime)});
        postAxiosPerformanceLog('https://appcenter.vicicentral.com/api/performancelog', { params: params });
    }
    return response;
});

export const getAxios = (url, axiosRequestConfig) => {

    axiosRequestConfig.headers = {
        organizationId: memoryStore.getItem('organizationId'),
        userId: memoryStore.getItem('userId'),
        //tokenId: AppConfig.env('tokenId'),
        'Content-Type': 'application/json',
        projectId: memoryStore.getItem('projectId'),
        Authorization: `Bearer ${memoryStore.getItem('jwtToken')}`,
        // BrowserSessionId: getCookie('BrowserSessionId'),
        'JsMessageId': uuid.v4(),
        'TimeStart': getUtcDate().getTime(),
        'Url': url,
        'Step': 'DataCall',
        'IsWebService': '0',
        'elapsedTime': 0
    };
    url = AppConfig.env('url') + url;
    var resp = api({
        method: 'get',
        url: url,
        headers: axiosRequestConfig.headers,
        callTime: axiosRequestConfig.params.callTime,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            if (response.response && response.response.status) {
                switch (response.response.status) {
                    case 400:
                        window.location.reload();
                        break;
                    case 401:
                        window.parent.redirectUnauthorized();
                        break;
                    case 403: break;
                }
            }
            console.log(response);
        });
    return resp;
};

export const postAxios = (url, axiosRequestConfig) => {
    axiosRequestConfig.headers = {
        organizationId: memoryStore.getItem('organizationId'),
        userId: memoryStore.getItem('userId'),
        'Content-Type': 'application/json',
        projectId: memoryStore.getItem('projectId') || '',
        Authorization: `Bearer ${memoryStore.getItem('jwtToken')}`,
        'JsMessageId': uuid.v4(),
        'TimeStart': getUtcDate().getTime(),
        'Url': url,
        'Step': 'DataCall',
        'IsWebService': '0',
        'elapsedTime': 0
    };
    url = AppConfig.env('url') + url;
    if (!axiosRequestConfig.params.callTime) {
        axiosRequestConfig.params = { ...axiosRequestConfig.params, callTime: new Date() }
    }
    var resp = api({
        method: 'post',
        url: url,
        data: axiosRequestConfig.params,
        headers: axiosRequestConfig.headers,
        callTime: axiosRequestConfig.params.callTime,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};

var getUtcDate = function () {
    var dt = new Date();
    return new Date(dt.getUTCFullYear(), dt.getUTCMonth(), dt.getUTCDate(), dt.getUTCHours(), dt.getUTCMinutes(), dt.getUTCSeconds(), dt.getUTCMilliseconds());
};

export const postAxios2 = (url, auth0TokenId) => {

    const axiosRequestConfig = {};
    axiosRequestConfig.headers = {
        'Authorization': "Bearer " + auth0TokenId,
    };

    var resp = api({
        method: 'post',
        url: url,
        headers: axiosRequestConfig.headers,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
    //   }
};

/**
 * To be used for anonymous method only
 */
export const getAxios2 = (url) => {
    var resp = axios({
        method: 'get',
        url: url,
    })
        .then(function (response) {
            return response;
        })
        .catch(function (response) {
            console.log(response);
        });
    return resp;
};

export const postAxiosPerformanceLog = (url, requestConfig) => {
    if (AppConfig.performanceLogger) {
        axios({
            method: 'post',
            url: url,
            data: requestConfig.params,
        }).catch(function (response) { console.log('postAxiosPerformanceLog err: ', response); });
    }
}
