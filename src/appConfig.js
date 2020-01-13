import { Platform } from 'react-native';

// const getBaseUrl = () => {
//     var _baseUrl = 'https://qa.vicicentral.com/apiv5201/'; //'/';
//     var _isProdution = false ;// document.location.host.indexOf('vicicentral.com') !== -1;
//     if (_isProdution) {
//         _baseUrl = '/' + window.location.href.split('/')[3] + '/';
//     }
//     return _baseUrl;
// };

// const getAppBaseUrl = () => {
//     var _baseUrl = '/';
//     var _isProdution = false ;//document.location.host.indexOf('vicicentral.com') !== -1;
//     if (_isProdution) {
//         _baseUrl = '/' + window.location.href.split('/')[3] + '/';
//     } else {
//         //_baseUrl = window.location.protocol + '//' + window.location.host

//         _baseUrl = 'https://qa.vicicentral.com/apiv5201/';
//     }
//     return _baseUrl;
// };

const AppConfig = {
    appMode: 'mobileTest',//['pac', 'pac2', 'demo'].includes(window.location.host.replace('.vicicentral.com', '')) ? 'prod' : 'dev', // local or dev
    env: function (config) {
        if (this.appMode === 'prod') {
            return this.prod[config];
        }
        else if (this.appMode === 'dev') {
            return this.dev[config];
        }else if (this.appMode === 'mobileTest') {
            return this.mobileTest[config];
        } else {
            return this.local[config];
        }
    },
    defaultDashboardPhase: 1,
    refreshDataWaitingTime: 60000,
    renderWaitingTime: 1500,
    dashboardDebounceTime: 1500,
    textAutoSaveDelay: 4000, //in miliseconds
    callGroupWiseData: true,
    modifiedOnDateFormat: 'LLL',
    showRecentEdit: false,
    // baseUrl: getBaseUrl(),
    // appBaseUrl: getAppBaseUrl(),
    pdfServiceUrl: '',//window.location.host.indexOf('localhost') >= 0 ? 'http://localhost:55132/' : 'https://pdfqa.vicicentral.com/v12/',
    attachmentMaxSize: 20971520,//(in bytes = 20 MB)
    reduxLogger: false,
    axiosLogger: false,
    performanceLogger: true, //((window.parent && window.parent.IsSnapshotInstance) || (window.location.host.indexOf('localhost') >= 0)) ? false : true,
    slowNetworkWarning: false ,//window.location.host.indexOf('localhost') >= 0 ? false : true,
    slowDownloadThreshold: 200,//(window.parent && window.parent.slowDownloadThreshold) || 200, //Bytes per milliseconds
    slowNetworkThreshold: 1000, //(window.parent && window.parent.slowNetworkThreshold) || 1000, // milliseconds
    pageLoadTimeLogger: false, //((window.parent && window.parent.IsSnapshotInstance) || (window.location.host.indexOf('localhost') >= 0)) ? false : true,
    defaultGroupNumber: 100,
    defaultGroupNumberDifference: 1,
    enableDropDownKeyUpDown: false,
    auth0TokenId: 0,//(window.parent && typeof window.parent.getAuth0TokenId === 'function') ? window.parent.getAuth0TokenId() : '',
    isiOS: Platform.OS === "ios",
    local: {
        deviceType: 'desktop', // 'desktop', 'mobile'
        url: '',//(window.parent && window.parent.apiUrl) ? window.parent.apiUrl : 'http://localhost:59435/',
        //auth0Url: 'https://auth0mgmt.vicicentral.com/',
        auth0Url: 'http://localhost:3001/',
        organizationId: 'AD663F6D-2BD6-C538-AA56-ED3F4E9E915E', //QA => 'AD663F6D-2BD6-C538-AA56-ED3F4E9E915E', Demo => '088615BD-5FB6-46EA-B072-3A9FD7CF690A'   
        groupId: '',
        userId: 'cf1388b4-fe3f-46eb-8d7b-9c86133e597d',
        connectionId: '20A8ED79-831F-4E3A-954C-B6D2601C6122',
        showTabOpenEditMassage: true
    },
    dev: {
        deviceType: 'desktop',
        url: 'https://qa.vicicentral.com/apiv5201/',
        auth0Url: 'https://auth0mgmt.vicicentral.com/',
        organizationId: '',
        groupId: '',
        userId: '',
        connectionId: '',
        showTabOpenEditMassage: true
    },
    prod: {
        deviceType: 'desktop',
        url: '', //window.parent.apiUrl,
        auth0Url: 'https://auth0mgmt.vicicentral.com/',
        organizationId: '',
        groupId: '',
        userId: '',
        connectionId: '',
        showTabOpenEditMassage: true
    },
    mobileTest: {
        deviceType: 'mobile',
        url: '',//'https://qa.vicicentral.com/apiv5220/',
        organizationId: '',
        groupId: '',
        userId:'',
        projectId:'',
        connectionId: '',
        showTabOpenEditMassage: true

    }
}

export default AppConfig;
