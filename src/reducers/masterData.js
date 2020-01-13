import update from 'immutability-helper';
import _ from 'lodash';
import moment from 'moment';
import * as actionTypes from '../actions/actionTypes';
import * as loghelper from '../common/loghelper';
import { getLastProjectId, prepareObjectFromArray } from '../common/utils';
import { masterData } from '../store/configureStoreData';

let monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
let monthShortNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

const getFiscalYear = (fiscalYearStartingMonth, dt) => {
    var fiscalYear = 0;
    switch (fiscalYearStartingMonth) {
        case 10:
            if (dt.getMonth() >= fiscalYearStartingMonth) {
                fiscalYear = dt.getFullYear() + 1;
            }
            else {
                fiscalYear = new Date(moment(dt).add(3, 'months')).getFullYear();
            }
            break;
        default:
            if ((dt.getMonth() + 1) < fiscalYearStartingMonth) {
                fiscalYear = dt.getFullYear() - 1;
            }
            else {
                fiscalYear = dt.getFullYear();
            }
            break;
    }

    return fiscalYear;
};

const getFiscalMonth = (fiscalYearStartingMonth, dt) => {
    var fiscalMonth = 0;
    switch (fiscalYearStartingMonth) {
        case 10:
            if (dt.getMonth() > 9) {
                fiscalMonth = dt.getMonth() - 9;
            }
            else {
                fiscalMonth = dt.getMonth() + 3;
            }
            break;
        case 4:
            if ((dt.getMonth() + 1) < fiscalYearStartingMonth) {
                fiscalMonth = dt.getMonth() + 9;
            }
            else {
                fiscalMonth = dt.getMonth() - 3;
            }
            break;
        default:
            fiscalMonth = dt.getMonth();
            break;
    }

    return fiscalMonth;
};

const getFiscalYearMonthBetweenDates = (configList, projectConfigList) => {
    const from = 'January 2016';
    //var to = 'December 2017';
    let arr = [];

    let implementationTimingDuration = parseInt(projectConfigList['ClientSetting_ImplementationTimingDuration'] ? projectConfigList['ClientSetting_ImplementationTimingDuration'].Value : 28);

    let fiscalYearStartingMonth = configList['ClientSetting_FiscalYearStartingMonth'] ? configList['ClientSetting_FiscalYearStartingMonth'].Value : 1;
    fiscalYearStartingMonth = parseInt(fiscalYearStartingMonth) > 0 ? parseInt(fiscalYearStartingMonth) : 1;

    const startDate = projectConfigList['ClientSetting_ImplementationStartDate'] ? new Date(projectConfigList['ClientSetting_ImplementationStartDate'].Value) : new Date('1 ' + from);
    const implementationEndDate = new Date(moment(startDate).add(parseInt(implementationTimingDuration), 'months'));

    let fiscalMonth = 0;
    let fiscalYear = 0;
    for (let i = implementationTimingDuration; i >= 1; i--) {
        const _date = new Date(moment(implementationEndDate).add(-i, 'months'));
        fiscalMonth = getFiscalMonth(fiscalYearStartingMonth, _date);
        fiscalYear = getFiscalYear(fiscalYearStartingMonth, _date);
        const fiscaldate = new Date(fiscalYear, fiscalMonth, 1);
        arr.push(
            {
                year: fiscalYear, label: fiscalYear + " " + monthNames[fiscalMonth],
                value: moment(fiscaldate).format('YYYYMM'), date: moment(fiscaldate).format('L')
            }
        );
    }
    return arr;
};

const getYearMonthBetweenDates = (configList, projectConfigList) => {
    const from = 'January 2016';
    //var to = 'December 2017';
    var arr = [];
    const implementationTimingDuration = parseInt(projectConfigList['ClientSetting_ImplementationTimingDuration'] ? projectConfigList['ClientSetting_ImplementationTimingDuration'].Value : 28);

    const startDate = projectConfigList['ClientSetting_ImplementationStartDate'] ? new Date(projectConfigList['ClientSetting_ImplementationStartDate'].Value) : new Date('1 ' + from);
    const implementationEndDate = new Date(moment(startDate).add(parseInt(implementationTimingDuration), 'months'));
    const implementationStartDate = startDate;

    let fiscalYearStartingMonth = configList['ClientSetting_FiscalYearStartingMonth'] ? configList['ClientSetting_FiscalYearStartingMonth'].Value : 1;
    fiscalYearStartingMonth = parseInt(fiscalYearStartingMonth) > 0 ? parseInt(fiscalYearStartingMonth) : 1;


    const fromYear = implementationStartDate.getFullYear();
    const toYear = implementationEndDate.getFullYear();
    const diffYear = (12 * (toYear - fromYear)) + implementationEndDate.getMonth();
    let fiscalYear = 0;

    for (let i = implementationStartDate.getMonth(); i < diffYear; i++) {
        const _date = new Date(Math.floor(fromYear + (i / 12)), i % 12, 1);
        fiscalYear = getFiscalYear(fiscalYearStartingMonth, _date);

        arr.push({ fiscalYear: fiscalYear, year: Math.floor(fromYear + (i / 12)), label: Math.floor(fromYear + (i / 12)) + " " + monthNames[i % 12], shortName: Math.floor(fromYear + (i / 12)) + " " + monthShortNames[i % 12], value: moment(new Date(Math.floor(fromYear + (i / 12)), i % 12, 1)).format('YYYYMM'), date: moment(new Date(Math.floor(fromYear + (i / 12)), i % 12, 1)).format('L') });//moment(new Date(Math.floor(fromYear + (i / 12)), i % 12, 1)).format('L')});
    }
    return arr;
};


const getEntityPayload = (payload, entityType) => {
    var arrayList = [];
    var arrayListDeleted = [];
    var arr = [];
    if (payload.length > 0) {
        payload.map((p) => {
            if (p.EntityType === entityType) {
                if (p.IsDelete) {
                    arrayListDeleted.push(p.EntityId);
                } else {
                    arrayList.push(p.SnapshotData);
                }
            }
        });
    } else {
        if (payload.EntityType === entityType) {
            if (payload.IsDelete) {
                arrayListDeleted.push(payload.EntityId);
            } else {
                arrayList.push(payload.SnapshotData);
            }
        }
    }
    arr.push(arrayList);
    arr.push(arrayListDeleted);
    return arr;
};

const updateEntitiesList = (state, payloadData, entireState) => {
    let newStateObject = Object.assign([], state);
    let newData = [];
    let newState = [];

    if (payloadData.length > 0) {
        let isPushRelevantChange = false;
        const relevantEntityTypes = ['FocusArea', 'Group', 'SalaryRange', 'FunctionalTitle'];
        _.forEach(payloadData, (payloadDataItem) => {
            const relevantPushData = _.filter(payloadDataItem.Data, function (o) { return relevantEntityTypes.indexOf(o.EntityType) > -1; });
            _.forEach(relevantPushData, (item) => {
                const entityType = item ? item.EntityType : '';
                const pushedGroupId = item ? item.EntityId : '';
                newData = getEntityPayload(item, entityType);
                switch (entityType) {
                    case 'FocusArea':
                        newState = Object.assign([], updateFocusAreaEntities(newStateObject, newData, pushedGroupId));
                        newStateObject = Object.assign([], newState);
                        isPushRelevantChange = true;
                        break;
                    case 'Group':
                        newState = Object.assign([], updateGroupEntities(newStateObject, newData));
                        newStateObject = Object.assign([], newState);
                        isPushRelevantChange = true;
                        break;
                    case 'SalaryRange':
                        newState = Object.assign({}, updateSalaryRangeEntities(newStateObject, newData));
                        newStateObject = Object.assign({}, newState);
                        isPushRelevantChange = true;
                        break;
                    case 'FunctionalTitle':
                        newStateObject = Object.assign([], updateFunctionalTitle(newStateObject, newData));
                        isPushRelevantChange = true;
                        break;
                }
            });
        });
        // _.forEach(payloadData, (item) => {
        //     const entityType = item.Data && item.Data.length > 0 ? item.Data[0].EntityType : '';
        //     const pushedGroupId = item.Data && item.Data.length > 0 ? item.Data[0].EntityId : '';

        //     newData = getEntityPayload(item.Data, entityType);
        //     switch (entityType) {
        //         case 'FocusArea':
        //             newState = Object.assign([], updateFocusAreaEntities(newStateObject, newData, pushedGroupId));
        //             newStateObject = Object.assign([], newState);
        //             isPushRelevantChange = true;
        //             break;
        //         case 'Group':
        //             newState = Object.assign([], updateGroupEntities(newStateObject, newData));
        //             newStateObject = Object.assign([], newState);
        //             isPushRelevantChange = true;
        //             break;
        //         case 'SalaryRange':
        //             newState = Object.assign({}, updateSalaryRangeEntities(newStateObject, newData));
        //             newStateObject = Object.assign({}, newState);
        //             isPushRelevantChange = true;
        //             break;
        //         case 'FunctionalTitle':
        //             newState = Object.assign([], updateFunctionalTitle(newStateObject, newData));
        //             newStateObject = Object.assign([], newState);
        //             isPushRelevantChange = true;
        //             break;
        //     }
        // });
        if (isPushRelevantChange) {
            return { ...newStateObject, newState };
        } else {
            return state;
        }
    } else {
        return state;
    }
};

const updatePushData = (state, action, entireState) => {
    if (!action.payload) return state;
    var parsedData = JSON.parse(action.payload);
    const projectId = entireState.ideaGroupFilter.projectId ? entireState.ideaGroupFilter.projectId : getLastProjectId();
    const payloadData = _.filter(parsedData, (item) => { return item.ProjectId.toLowerCase() === projectId.toLowerCase() });


    if (payloadData.length <= 0) {
        return state;
    }
    return updateEntitiesList(state, payloadData, entireState);
};

const masterDataReducer = (state = [], action, entireState) => {
    if (action.type === actionTypes.GET_MASTERDATA) {
        loghelper.consoleTime('reducer: ' + action.type, 0, 3);
    }
    try {
        switch (action.type) {
            case actionTypes.PROJECT_CHANGE:
                return update(state, { $set: masterData });

            case actionTypes.GET_MASTERDATA:
                let data = {};
                let parsedData = action.payload.data;
                let leadershiplist = _.uniqBy(_.orderBy(parsedData.LeadershipList.List, ['GroupId', 'UserId', 'LeadershipType'], ['asc', 'asc', 'asc']), (item) => [item.GroupId, item.UserId].join());

                data.groups = prepareObjectFromArray(parsedData.GroupList.List, ["GroupId"]);
                data.teams = prepareObjectFromArray(parsedData.TeamList.List, ["TeamId"]);
                data.focusAreas = prepareObjectFromArray(parsedData.FocusAreaList.List, ["FocusAreaId"]);
                data.crossGroupTopics = prepareObjectFromArray(parsedData.CrossGroupTopicList.List, ["CrossGroupTopicId"]);
                data.users = prepareObjectFromArray(parsedData.UserList.List, ["UserId"]);
                data.leaderShip = prepareObjectFromArray(leadershiplist, ["GroupId", "UserId"]);
                data.leaderShipArray = parsedData.LeadershipList.List;
                data.salaryRange = prepareObjectFromArray(parsedData.SalaryRangeList.List, ["SalaryRangeId"]);
                let projectConfigList = prepareObjectFromArray(parsedData.ProjectConfigList.List, ["Key"]);
                data.projectConfig = projectConfigList;
                let configList = prepareObjectFromArray(parsedData.ConfigList.List, ["Key"]);
                data.config = configList;
                data.timings = getYearMonthBetweenDates(configList, projectConfigList);
                data.fiscalTimings = getFiscalYearMonthBetweenDates(configList, projectConfigList);
                data.category = parsedData.CategoryList.List;
                data.customFields = parsedData.CustomFieldList.List;
                data.roles = parsedData.RoleList.List;
                data.sessions = parsedData.SessionList.List ? parsedData.SessionList.List : [];
                data.userNoteTimestamp = parsedData.UserNoteTimestamp;
                data.isLoading = false;
                data.snapshotTime = parsedData.SnapshotTimeStamp;
                data.IsSnapshotInstance = parsedData.IsSnapshotInstance;
                data.focusAreaUsageCount = 0;
                data.isLoadingFocusAreaUsageCount = false;
                data.functionalTitles = [];
                data.userDetails = [];
                return data;

            case actionTypes.PUSH_DATA:
                if (!action.payload) return state;
                return updatePushData(state, action, entireState);

       
            default:
                return state;
        }
    }
    catch (err) { }
    finally {
        if (action.type === actionTypes.GET_MASTERDATA) {
            loghelper.consoleTimeEnd('reducer: ' + action.type, 0, 3);
        }
    }
}

export default masterDataReducer;
