import update from 'immutability-helper';

const performanceLog = (state = [], action) => {
    switch (action.type) {
        case 'APPEND_LOG':
            let newState = state;
            if(newState.length === 10) newState.pop();
            newState.unshift(action.payload);
            return update(state, { $set: newState });
            //return update(state, { $push: [action.payload] });
            default: return state;
    }
}

export default performanceLog;
