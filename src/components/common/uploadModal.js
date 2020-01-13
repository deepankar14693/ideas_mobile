import React, { Component } from 'react';
import AppConfig from '../../appConfig';
import PropTypes from 'prop-types';
import {
    StyleSheet,
    Modal,
    Platform,
    TouchableHighlight,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    View,
    Dimensions,
    TouchableOpacity,
    Image
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { Text } from 'native-base';
import colors from '../../components/common/pickerDialog/colors';
import { material } from 'react-native-typography';

const { height } = Dimensions.get('window');

const ActionButton = ({ testID, onPress, colorAccent, label }) => (
    <TouchableHighlight
        testID={testID}
        style={styles.actionContainer}
        underlayColor={colors.androidPressedUnderlay}
        onPress={onPress}
    >
        <Text style={[material.button, { color: colorAccent }]}>{label}</Text>
    </TouchableHighlight>
);

export default class UploadModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploadModal: false,
            selectedFile: '',
        }
        //this.onDrop = this.onDrop.bind(this);
    }

    async uploadFile() {
        //Opening Document Picker for selection of one file
        try {
            const res = await DocumentPicker.pick({
                type: [DocumentPicker.types.allFiles],
                //There can me more options as well
                // DocumentPicker.types.allFiles
                // DocumentPicker.types.images
                // DocumentPicker.types.plainText
                // DocumentPicker.types.audio
                // DocumentPicker.types.pdf
            });
            //Printing the log realted to the file
            console.log('res : ' + JSON.stringify(res));
            //Setting the state to show single file attributes
            this.setState({ selectedFile: res });
        } catch (err) {
            this.setState({ selectedFile: '' });
            //Handling any exception (If any)
            if (DocumentPicker.isCancel(err)) {
                //If user canceled the document selection
            } else {
                //For Unknown Error
            }
        }
    }

    render() {
        const isITCosting = this.props.isITCosting;
        const headerLabel = isITCosting ? 'IT Costing' : 'General Documents';

        const visible = this.props.visible;
        const scrolled = this.props.scrolled;

        const title = this.props.title;
        const titleColor = this.props.titleColor;
        const colorAccent = this.props.colorAccent;
        const backgroundColor = this.props.backgroundColor;
        const addPadding = this.props.addPadding;
        const onOk = this.props.onOk;
        const onCancel = this.props.onCancel;
        const okLabel = this.props.okLabel;
        const cancelLabel = this.props.cancelLabel;

        return (
            <Modal
                animationType={'fade'}
                transparent
                hardwareAccelerated
                visible={visible}
                onRequestClose={onCancel}
                supportedOrientations={['portrait', 'landscape']}
            >
                {/* onPress={onCancel} */}
                <View style={styles.backgroundOverlay}>
                    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : null}>
                        <View
                            style={[
                                styles.modalContainer,
                                (title != null || (addPadding && title == null)) && styles.modalContainerPadding,
                                { backgroundColor },
                            ]}
                        >
                            <TouchableWithoutFeedback>
                                <View>
                                    {title != null ? (
                                        <View style={scrolled ? styles.titleContainerScrolled : styles.titleContainer}>
                                            <Text style={[material.title, { color: titleColor }]}>{title}</Text>
                                        </View>
                                    ) : null}
                                    <View
                                        style={
                                            scrolled
                                                ? [
                                                    styles.contentContainerScrolled,
                                                    addPadding && styles.contentContainerScrolledPadding,
                                                ]
                                                : [styles.contentContainer, addPadding && styles.contentContainerPadding]
                                        }
                                    >
                                        {/*To show single file attribute*/}
                                        <TouchableOpacity
                                            activeOpacity={0.5}
                                            style={styles.buttonStyle}
                                            onPress={this.uploadFile.bind(this)}>
                                            {/*Single file selection button*/}
                                            <Image
                                                source={{
                                                    uri: 'https://img.icons8.com/offices/40/000000/attach.png',
                                                }}
                                                style={styles.imageIconStyle}
                                            />
                                            <Text style={{ marginLeft: 10, fontSize: 12 }}>
                                                click to select a file to upload
                                            </Text>
                                        </TouchableOpacity>
                                        {/*Showing the data of selected Single file*/}
                                        <Text style={{ fontSize: 12 }}>
                                            Selected File:{' '}
                                            {this.state.selectedFile.name ? this.state.selectedFile.name : ''}
                                        </Text>
                                    </View>
                                    {onOk != null && onCancel != null ? (
                                        <View
                                            style={scrolled ? styles.actionsContainerScrolled : styles.actionsContainer}
                                        >
                                            <ActionButton
                                                testID="dialog-cancel-button"
                                                colorAccent={colorAccent}
                                                onPress={onCancel}
                                                label={cancelLabel}
                                            />
                                            <ActionButton
                                                testID="dialog-ok-button"
                                                colorAccent={colorAccent}
                                                onPress={onOk}
                                                label={okLabel}
                                            />
                                        </View>
                                    ) : null}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                    </KeyboardAvoidingView>
                </View>
            </Modal>
        )
    }
}


const styles = StyleSheet.create({
    backgroundOverlay: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: colors.backgroundOverlay,
    },
    modalContainer: {
        marginHorizontal: 16,
        marginVertical: 106,
        minWidth: 280,
        borderRadius: 2,
        elevation: 24,
        overflow: 'hidden',
    },
    modalContainerPadding: {
        paddingTop: 24,
    },
    titleContainer: {
        paddingHorizontal: 24,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    titleContainerScrolled: {
        paddingHorizontal: 24,
        paddingBottom: 20,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderColor: colors.androidBorderColor,
    },
    contentContainer: {
        flex: -1,
    },
    contentContainerPadding: {
        paddingHorizontal: 24,
        paddingBottom: 24,
    },
    contentContainerScrolled: {
        flex: -1,
        maxHeight: height - 264, // (106px vertical margin * 2) + 52px
    },
    contentContainerScrolledPadding: {
        paddingHorizontal: 24,
    },
    actionsContainer: {
        height: 52,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 8,
    },
    actionsContainerScrolled: {
        height: 52,
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingLeft: 8,
        borderTopWidth: StyleSheet.hairlineWidth,
        borderColor: colors.androidBorderColor,
    },
    actionContainer: {
        marginRight: 8,
        paddingHorizontal: 8,
        paddingVertical: 8,
        minWidth: 64,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerStyle: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    textStyle: {
        backgroundColor: '#fff',
        fontSize: 15,
        marginTop: 16,
        color: 'black',
    },
    buttonStyle: {
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#DDDDDD',
        padding: 5,
    },
    imageIconStyle: {
        height: 20,
        width: 20,
        resizeMode: 'stretch',
    },
});

UploadModal.propTypes = {
    visible: PropTypes.bool.isRequired,
    onCancel: PropTypes.func.isRequired,
    onOk: PropTypes.func,
    cancelLabel: PropTypes.string,
    okLabel: PropTypes.string,
    title: PropTypes.string,
    titleColor: PropTypes.string,
    backgroundColor: PropTypes.string,
    colorAccent: PropTypes.string,
    scrolled: PropTypes.bool,
    addPadding: PropTypes.bool,
};

UploadModal.defaultProps = {
    okLabel: 'OK',
    cancelLabel: 'CANCEL',
    title: undefined,
    titleColor: colors.androidPrimaryTextColor,
    backgroundColor: colors.background,
    colorAccent: colors.androidColorAccent,
    scrolled: false,
    addPadding: true,
    onOk: undefined,
    onCancel: undefined,
};

ActionButton.propTypes = {
    testID: PropTypes.string.isRequired,
    colorAccent: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    onPress: PropTypes.func.isRequired,
};
