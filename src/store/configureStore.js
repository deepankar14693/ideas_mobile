import { applyMiddleware, createStore } from 'redux';
import { createLogger } from 'redux-logger';
import promise from 'redux-promise';
import sequenceAction from 'redux-sequence-action';
import thunk from 'redux-thunk';
import AppConfig from '../appConfig';
import { ideaData, masterData, organizationMasterData, notify, dashboardFilter, dahboardData, mobileDashboardData, dashboardCheckList, executiveDashboardData } from './configureStoreData';
import allReducers from './reducers';

const persistedState = {
    organizationMasterData: organizationMasterData,
    ideaData: ideaData,
    masterData: masterData,
    dashboardFilter: dashboardFilter(),
    dashboardData: dahboardData,
    mobileDashboardData: mobileDashboardData,
    dashboardCheckList: dashboardCheckList,
    notify: notify,
    performanceLog: [],
    executiveDashboardData: executiveDashboardData
}

const logger = createLogger({ duration: true, timestamp: true });

const updatePerformanceData = store => next => action => {
    if (action.type !== 'APPEND_LOG' && action.payload) {
        store.dispatch({ type: 'APPEND_LOG', payload: action.payload.config.headers.performanceData })
    }
    next(action)
}

const configureStore = () => {
    var applyMiddlewareObj;
    if (AppConfig.reduxLogger) {
        applyMiddlewareObj = applyMiddleware(thunk, promise, logger, sequenceAction, updatePerformanceData);
    }
    else {
        applyMiddlewareObj = applyMiddleware(thunk, promise, sequenceAction, updatePerformanceData);
    }
    const store = createStore(allReducers, persistedState, applyMiddlewareObj);
    return store;
}
export default configureStore;
