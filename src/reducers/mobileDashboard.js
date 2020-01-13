import update from 'immutability-helper';
import _ from 'lodash';
import * as actionTypes from '../actions/actionTypes';

const MobileDashboardReducer = (state = [], action) => {
    let parsedData;

    switch (action.type) {
        case actionTypes.PROJECT_CHANGE:
            return update(state, { $set: [] });

        case actionTypes.GET_MOBILE_DASHBOARD_DATA:
            if (!action || !action.payload || !action.payload.data) return state;
            parsedData = action.payload.data;
            
            switch (parsedData.SCRType) {
                case 3:
                    return update(state, {
                        isLoading: { $set: false },
                        scr3Data: { $set: parsedData.SCR3Data },
                        scr2Data: { Resolve: { $set: parsedData.SCR2Data.Resolve }, Review: { $set: parsedData.SCR2Data.Review } },
                        scr1Data: { Resolve: { $set: parsedData.SCR1Data.Resolve }, Review: { $set: parsedData.SCR1Data.Review } }
                    });
                case 2:
                    return update(state, {
                        isLoading: { $set: false },
                        scr2Data: { $set: parsedData.SCR2Data },
                        scr1Data: { Resolve: { $set: parsedData.SCR1Data.Resolve }, Review: { $set: parsedData.SCR1Data.Review } }
                    });
                default:
                    return update(state, {
                        isLoading: { $set: false },
                        scr1Data: { $set: parsedData.SCR1Data }
                    });
            };          

        default: return state;
    }
}

export default MobileDashboardReducer;