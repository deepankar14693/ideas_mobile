import React, { Component } from 'react';
import { View, StyleSheet, Platform, Dimensions, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Badge, Text } from 'native-base';
import UploadModal from '../../../components/common/uploadModal';

//const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const isAndroid = (Platform.OS === "android");

export default class Documents extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showUploadModal: false
        }
        this.toggleUploadModal = this.toggleUploadModal.bind(this);
        this.onUploadDocument = this.onUploadDocument.bind(this);
    }

    onUploadDocument() {
        this.toggleUploadModal();
    }

    toggleUploadModal() {
        this.setState({ showUploadModal: !this.state.showUploadModal });
    }

    render() {
        const isITCosting = this.props.isITCosting;
        const headerLabel = isITCosting ? 'IT Costing' : 'General Documents';
        return (
            <View style={styles.dropdownViews}>
                <View style={styles.dropdownLabel}>
                    <Text style={styles.dropdownLabelText}>{headerLabel}</Text>
                </View>
                <View style={styles.dropdownBox}>
                    <TouchableOpacity onPress={this.toggleUploadModal}>
                        <View style={[styles.dropdownViews, { backgroundColor: 'rgba(223,228,236,1)' }]}>
                            <MaterialIcons name="add" style={{ flex: 0.2, fontSize: HEIGHT * 0.04, color: 'rgba(140,174,251,1)' }} />
                            <Text style={{ flex: 0.8, color: 'rgba(118,138,172,1)', fontSize: HEIGHT * 0.016, fontWeight: 'bold' }}>Upload new document</Text>
                        </View>
                    </TouchableOpacity>
                </View>
                <UploadModal visible={this.state.showUploadModal} title={'Upload Documents'} onOk={this.onUploadDocument} onCancel={this.toggleUploadModal} okLabel={'UPLOAD'} />
            </View>
        )
    }
}

const styles = StyleSheet.create({
    boxStyle: {
        width: "100%",
        flexDirection: "row",
        minHeight: 5,
        paddingBottom: 5,
        paddingTop: 5,
    },
    titleStyle: {
        fontSize: 14,
        fontWeight: "bold",
    },
    badgeStyle: {
        height: 18,
        width: 40
    },
    badgeTextStyle: {
        color: 'white', fontSize: 10, lineHeight: isAndroid ? 18 : 12,
    },
    dropdownLabel: {
        flex: 0.5
    },
    dropdownLabelText: {
        color: 'rgba(118,138,172,1)',
        fontSize: HEIGHT * 0.018,
        fontWeight: 'bold'
    },
    dropdownViews: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    dropdownBox: {
        flex: 0.5
    },

})