import React, { Component } from 'react';
import { Picker, StyleSheet, Platform } from 'react-native';
import { phaseOptions } from '../../common/constants';
//import * as AppConfig from "../../appConfig";

class SCRDropdown extends Component {

    scrTypeChange = (phase) => {
        this.props.scrTypeChange(phase);
    }

    render() {
        const scrOptions = phaseOptions();
        const scrType = this.props.scrType;
        return (
            <Picker selectedValue={scrType} onValueChange={this.scrTypeChange} style={ Platform.OS === "ios" ? styles.iOSPicker: styles.androidPicker}>
                {
                    scrOptions.map((item, index) => {
                        return (
                            <Picker.Item style={{ textAlign: 'right' }} label={item.label} value={item.value} key={index} />
                        )
                    })
                }
            </Picker>
        )

    }
}

export default SCRDropdown;

const styles = StyleSheet.create({
    iOSPicker:{
        top: -92, height: 30, textAlign: 'right'
        
    },
    androidPicker:{
        height: 30, textAlign: 'right'
    }
})

