import update from 'immutability-helper';

const NotifyReducer = (state = [], action) => {
    switch (action.type) {

        case 'SHOW_NOTIFICATION':
            return update(state, {
                showNotification: { $set: true }, alertType: { $set: 1 }
            });

        case 'HIDE_NOTIFICATION':
            return update(state, {
                showNotification: { $set: false }, alertType: { $set: 1 }
            });

        default:
            return state;
    }
}

export default NotifyReducer;
