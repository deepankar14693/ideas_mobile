import update from 'immutability-helper';
import * as actionTypes from '../actions/actionTypes';

const DashboardCheckListReducer = (state = [], action) => {
    switch (action.type) {
        case actionTypes.PROJECT_CHANGE:
            return update(state, {
                isLoading: { $set: false },
                CheckList: { $set: [] }
            });

        case actionTypes.GET_DASHBOARD_CHECKLIST:
            if (!action || !action.payload || !action.payload.data) return state;

            return update(state, {
                isLoading: { $set: false },
                CheckList: { $set: action.payload.data }
            });

        default: return state;
    }
}

export default DashboardCheckListReducer;