import update from 'immutability-helper';
import _ from 'lodash';

export const updateDashboardIdeaData = (state, data) => {
    let stateObj = Object.assign([], state);
    let newState = _.unionBy(stateObj, data, 'IdeaId');
    return update(state, { $set: newState });
};  