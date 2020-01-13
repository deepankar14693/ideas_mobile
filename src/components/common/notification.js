import React, { Component } from 'react';
import { View } from 'react-native';
import { Text } from 'native-base';
import notifyCss from "../../css/notify";

class Notification extends Component {
    render() {
        return (
            <View style={[notifyCss.notifyMsgbox, notifyCss.notification, { width: this.props.width }]}>
                <Text style={notifyCss.notificationLabel}>
                    {this.props.message}
                </Text>
            </View>
        )
    }
}

export default Notification;