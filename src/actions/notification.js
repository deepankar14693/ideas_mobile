export const showNotification = (message) => {
    return {
        type: 'SHOW_NOTIFICATION',
        message: message
    }
};

export const hideNotification = (message) => {
    return {
        type: 'HIDE_NOTIFICATION',
        message: message
    }
};
