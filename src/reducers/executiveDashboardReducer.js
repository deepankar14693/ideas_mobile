import update from 'immutability-helper';
import * as actionTypes from '../actions/actionTypes';


const executiveDashboardReducer = (state = [], action) => {
  switch (action.type) {

    case actionTypes.GET_EXECUTIVE_DASHBOARD_DATA:
      if (action.payload) {
        return update(state, {
          executiveData: { $set: action.payload.data },
          isLoading: { $set: false }
        })
      }

    default:
      return state
  }
}

export default executiveDashboardReducer;
