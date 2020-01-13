import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { FlatList, Image, ImageBackground, SafeAreaView, StyleSheet, View, Dimensions, StatusBar } from 'react-native';
import { Text } from 'native-base';
import Auth0 from 'react-native-auth0';
import signalr from 'react-native-signalr';
import credentials from '../../src/auth0-credentials';
import { getUserDetails, changeOrganization, getOrganizationMasterData } from "../actions/masterDataActions";
import AppConfig from '../appConfig';
import LogButton from '../components/UI/CustomButtons/LogButton';
import TypeBox from '../components/UI/TypeBox/TypeBox';
var memoryStore = require('../common/memoryStore');
import { NetworkContext } from './NetworkProvider';
import VersionCheck from 'react-native-version-check';
import AppNotifyInfo from './UI/AppNotifyInfo';
import { hasFullAccess } from '../../src/common/utils2';

const auth0 = new Auth0(credentials);
const screenWidth = Math.round(Dimensions.get('window').width);
const screenHeight = Math.round(Dimensions.get('window').height);
export var connection;
class LoginScreen extends Component {

    constructor(props) {
        super(props);
        this.state = {
            JWToken: null,
            UserEmail: '',
            UserId: '',
            UserName: '',
            UserOrganizations: null,
            loginEnable: false,
            isupdateAvailable: false,
        };
    }

    static contextType = NetworkContext;

    setStateToInitial = () => {
        this.setState({
            JWToken: null,
            UserEmail: '',
            UserId: '',
            UserName: '',
            UserOrganizations: null,
        })
    }

    async componentDidMount() {
        const jwToken = await memoryStore.loadUserData();
        if (!jwToken) {
            this.setState({ loginEnable: true })
            return null;
        }
        const userData = await getUserDetails(jwToken);
        this.setCredentials(jwToken, userData);

        VersionCheck.getLatestVersion()    // Automatically choose profer provider using `Platform.select` by device platform.
            .then(latestVersion => {
                this.setState({ isupdateAvailable: (VersionCheck.getCurrentVersion() !== latestVersion) });    // Automatically choose profer provider using `Platform.select` by device platform.
            });
    }

    _onLogin = () => {
        setTimeout(() => {
            this.setState({ loginEnable: false });
        }, 10);

        auth0.webAuth
            .authorize({
                scope: 'openid profile offline_access email',
                audience: 'https://' + credentials.domain + '/userinfo',
                prompt: "login"
            })
            .then(credentials => {

                (async () => {
                    const userData = await getUserDetails(credentials.idToken.toString());
                    this.setCredentials(credentials.idToken.toString(), userData);
                })();

            })
            .catch(error => {
                this.setState({ loginEnable: true });
            });

    };

    setCredentials = (jwtToken, userData) => {
        const { UserEmail, UserId, UserName } = userData.data.UserDetails;
        memoryStore.setUserData(jwtToken, UserId, UserName, UserEmail);

        this.setState({
            JWToken: jwtToken,
            UserEmail: UserEmail,
            UserId: UserId,
            UserName: UserName,
            UserOrganizations: userData.data.UserOrganizations,
            loginEnable: true,
        });
    }

    _onLogout = async () => {
        auth0.webAuth
            .clearSession({})
            .then(success => {
                memoryStore.clear();
                this.setStateToInitial();
            })
            .catch(err => { console.log("Log out catch err: ", err); });
    };

    navigateToMainScreen = (organizationId, organizationCode, apiUrl) => {
        apiUrl = 'https://qa.vicicentral.com/apiv5230//'; //temporary
        if (!(connection && connection.host && connection.host.includes(organizationCode))) {
            AppConfig.mobileTest.url = apiUrl;
            memoryStore.initializeOrgData(organizationId, organizationCode, apiUrl);
            this.connectToWebSocket(apiUrl);
        }
        this.props.getOrganizationMasterData(organizationId);
        this.props.changeOrganization();
        (async () => { this.props.navigation.navigate('Drawer', { isFullView: hasFullAccess() }) })();
    }


    connectToWebSocket = (apiUrl) => {
        const hubUrl = `${apiUrl}signalr/hubs`;
        connection = signalr.hubConnection(hubUrl);
        connection.logging = true;
        (connection.state !== 1) && connection.start()
            .done(() => { memoryStore.setItem("connectionId", connection.id); console.log('connectionId: ' + connection.id); })
            .fail((err) => console.log('failed', err));
    }

    componentDidUpdate() {
        if (typeof (this.props.navigation.state.params) !== "undefined" && this.props.navigation.state.params.isLogoutClicked) {
            this.props.navigation.state.params.isLogoutClicked = false;
            this._onLogout();
        }
    }

    onUpdateAppSkip = () => {
        this.setState({ isupdateAvailable: false })
    }

    render() {

        const isConnected = this.context.isConnected;
        let loggedIn = isConnected && (memoryStore.getItem('jwtToken') === null ? false : true);
        let loginEnable = isConnected && (loggedIn || this.state.loginEnable);
        const UserOrganizations = this.state.UserOrganizations;
        const isupdateAvailable = this.state.isupdateAvailable;




        return (
            <ImageBackground source={{ uri: 'https://static.vicicentral.com/images/ViciPattern.png' }} style={styles.container}
                imageStyle={{ resizeMode: 'repeat', backfaceVisibility: 'visible', transform: [{ scale: 1.5 }] }}>
                <StatusBar backgroundColor="#1b3f77" />
                <SafeAreaView style={styles.innerContainer}>
                    <View style={styles.userBlock}>
                        <Text numberOfLines={1} style={styles.usernameStyle}>{this.state.UserName}</Text>
                        {loginEnable &&
                            <View style={styles.ButtonStyle}>
                                <LogButton logText={loggedIn ? "LOG OUT" : "LOG IN"} onPress={loggedIn ? this._onLogout : this._onLogin}></LogButton>
                            </View>
                        }
                    </View>
                    <Image source={{ uri: 'https://static.vicicentral.com/images/ViciCentralLogo.png' }} style={styles.viciLogoImg}></Image>
                    {loggedIn &&
                        <View>
                            <Text style={styles.clientBlock}>CLIENTS</Text>
                            <View style={styles.horizentalLine}></View>
                            <View style={styles.horizentalLine}></View>
                            <View style={styles.typeBoxView}>
                                <FlatList
                                    data={UserOrganizations}
                                    renderItem={({ item }) =>
                                        <TypeBox title={item.ProjectName} subTitle={item.ProjectSecondaryName}
                                            onPress={() => this.navigateToMainScreen(item.OrganizationId, item.OrganizationCode, item.ApiUrl)}></TypeBox>}
                                    keyExtractor={item => item.OrganizationId}
                                />
                            </View>
                        </View>
                    }
                    {!isConnected &&
                        <AppNotifyInfo
                            visible={!isConnected}
                            updateInfo={false}
                            navigation={this.props.navigation}
                            notifyText={"You are offline.\nPlease check you internet connection."}
                        />}
                    {isupdateAvailable && isConnected &&
                        <AppNotifyInfo
                            visible={isupdateAvailable}
                            updateInfo={true}
                            notifyText={"Update is available."}
                            onPressSkip={this.onUpdateAppSkip}
                        />
                    }
                </SafeAreaView>
            </ImageBackground>
        )
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({ changeOrganization, getOrganizationMasterData }, dispatch);
}

export default connect(null, mapDispatchToProps)(LoginScreen);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#1b3f77",
        width: screenWidth,//"100%",
        height: screenHeight//"100%",
    },
    innerContainer: {
        height: "94%",
        width: "94%",
        marginLeft: "3%",
        marginRight: "3%",
        flex: 1,
    },
    userBlock: {
        height: "27%",
        flexDirection: "row",
        justifyContent: "flex-end",
        // paddingTop: "5%",
        marginTop: 30,
    },
    usernameStyle: {
        marginLeft: 5,
        marginRight: 8,
        fontSize: 18,
        color: "#fff",
        flexWrap: 'wrap'

    },
    ButtonStyle: {
        marginLeft: 5,
        marginRight: 5,
    },
    viciLogoImg: {
        width: "100%",
        height: "9%",
        marginBottom: 48,
        resizeMode: 'contain',
    },
    clientBlock: {
        fontSize: 24,
        color: "#fff",
        fontWeight: "100",
    },
    horizentalLine: {
        height: 1,
        width: "100%",
        borderBottomWidth: 1,
        // padding: 2,
        paddingBottom: 4,
        borderColor: "#fff",
    },
    typeBoxView: {
        marginTop: 20,
    },
    buttonStyle: {
        //   width: 75,
        padding: 5,
        paddingLeft: 15,
        paddingRight: 15,
        margin: 15,
        borderRadius: 4,
        borderColor: "#ffffff",
        backgroundColor: "transparent",
        alignSelf: "center"
    },
    textButtonStyle: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 16,
        textAlign: "center",
    },

});
