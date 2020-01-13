import React, { PureComponent } from 'react';
import { ActivityIndicator, Modal, View } from 'react-native';
import { connect } from 'react-redux';
import notifyCss from "../../css/notify";

class Notifications extends PureComponent {
    render() {
        return (
            <Modal
                transparent={true}
                animationType={'none'}
                visible={this.props.notify.showNotification}
                onRequestClose={() => { console.log('close modal') }}
            >
                <View style={notifyCss.modalBackground}>
                    <View style={notifyCss.activityIndicatorWrapper}>
                        <ActivityIndicator size='large' />
                    </View>
                </View>
            </Modal>
        )
    }
}

const mapStateToProps = (state) => ({
    notify: state.notify
});

export default connect(mapStateToProps, null)(Notifications);