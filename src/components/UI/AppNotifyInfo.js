import React from "react";
import { View, StyleSheet, Platform, Modal } from "react-native";
import { Text } from 'native-base';
import ButtonWithBackground from "./CustomButtons/ButtonWithBackground";
import { Linking } from 'react-native';;

const AppNotifyInfo = props => {

    const isAndroid = Platform.OS == "android";
    const updateAppUrl = isAndroid ? 'https://play.google.com/store/apps/details?id=com.vicicentral.ideas' : 'https://apps.apple.com/in/app/vici-project/id1484917544';

    return (
        <Modal
            animationType={'fade'}
            transparent
            hardwareAccelerated
            visible={props.visible}
            onRequestClose={props.onPressSkip}
            supportedOrientations={['portrait', 'landscape']}>
            {/*All views of Modal*/}
            <View style={styles.backgroundOverlay}>
                <View style={styles.modal}>
                    <Text style={styles.textButtonStyle}>
                       {props.notifyText}
                    </Text>
                    <View style={{ flexDirection: "row", justifyContent: "center" }}>
                        {props.updateInfo ? (<>
                            <ButtonWithBackground
                                buttonStyle={styles.buttonStyle}
                                textStyle={styles.textButtonStyle}
                                onPress={props.onPressSkip}
                            >Skip</ButtonWithBackground>
                            <ButtonWithBackground
                                buttonStyle={styles.buttonStyle}
                                textStyle={styles.textButtonStyle}
                                onPress={() => { props.onPressSkip(); Linking.openURL(updateAppUrl) }}
                            >Update</ButtonWithBackground>
                        </>) :
                            (<ButtonWithBackground
                                buttonStyle={styles.buttonStyle}
                                textStyle={styles.textButtonStyle}
                                onPress={() => props.navigation.navigate('Login')}
                            >Retry</ButtonWithBackground>)
                        }
                    </View>
                </View>

            </View>
        </Modal>
    );
}

export default AppNotifyInfo;



const styles = StyleSheet.create({
    backgroundOverlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    },
    buttonStyle: {
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
    container: {
        flex: 1,

        backgroundColor: '#ecf0f1',
    },
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#1b3f77",
        height: 180,
        width: '80%',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#fff',
        marginTop: 40,
        marginLeft: 18,
        padding: 50

    },
    text: {
        color: '#3f2949',
        marginTop: 10
    }
})