import AsyncStorage from '@react-native-community/async-storage';

var orgKeyName = '';
var userData = { jwtToken: '', userId: '', userName: '', userEmail: '' };
var orgData = {};

var setAsyncStorage = function (keyName, obj) {
    (async () => {
        try {await AsyncStorage.setItem(keyName, JSON.stringify(obj));} catch (err) { console.log(err); }
    })();    
};

exports.loadUserData = async () => {
    try {
        const userInfo = await AsyncStorage.getItem('userData');
        if (userInfo) {
            userData = JSON.parse(userInfo);
            return userData.jwtToken || null;
        }
        return null;
    } catch (err) { }
};

exports.setUserData = function (jwt, userId, userName, userEmail) {
    userData = { jwtToken: jwt, userId: userId, userName: userName, userEmail: userEmail };    
    setAsyncStorage('userData', userData);
};

exports.clear = function () {
    userData = { jwtToken: '', userId: '', userName: '', userEmail: '' };
    setAsyncStorage('userData', userData);
};

exports.initializeOrgData = function(organizationId, organizationCode, apiUrl) {
    orgKeyName = `orgData-${organizationId.toLowerCase()}`;
    orgData[orgKeyName] = { organizationId: organizationId, organizationCode: organizationCode, apiUrl: apiUrl, projectId: '', groupId: '', connectionId: '' };
    (async () => {
        try {
            const oData = await AsyncStorage.getItem(orgKeyName);
            if (oData) {
                let parsedData = JSON.parse(oData);
                orgData[orgKeyName].projectId = parsedData[orgKeyName].projectId;
                orgData[orgKeyName].groupId = parsedData[orgKeyName].groupId;
                console.log('projectId & groupId loaded from memoryStore');
            }
            setAsyncStorage(orgKeyName, orgData);

        } catch (err) { console.log('memoryStore.initializeOrgData err:', err); }
    })();
};

/**
 * case sensitive key name
 */
exports.setItem = function (key, value) {
    if (userData.hasOwnProperty(key)) {
        userData[key] = value;
        setAsyncStorage('userData', userData);
    }
    else if (orgKeyName !== '') {
        orgData[orgKeyName][key] = value;
        setAsyncStorage(orgKeyName, orgData);
    }
};

/**
 * case sensitive key name
 */
exports.getItem = function (key) {
    if (orgKeyName !== ''){
        return userData[key] || orgData[orgKeyName][key] || null;
    }
    return userData[key] || null;
};
