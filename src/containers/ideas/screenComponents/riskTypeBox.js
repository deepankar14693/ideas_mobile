import React from "react";
import { View, StyleSheet, } from "react-native";
import { Text, } from 'native-base';
//import PickerRisk from '../screenComponents/pickerRisk';
import GroupDropdown from "../../../components/GroupDropdown";
import GroupPicker from "../screenComponents/GroupPicker";

const dropdownOptions = [{ OrganizationId: "ad663f6d-2bd6-c538-aa56-ed3f4e9e915e", ProjectId: "3f3bfed1-aa59-40a5-83c7-720707742df6", GroupId: "6e0a28d5-edfc-6e8c-018a-d86afa197313", GroupNumber: 102, Name: "DirSls" },
{ OrganizationId: "ad663f6d-2bd6-c538-aa56-ed3f4e9e915e", ProjectId: "3f3bfed1-aa59-40a5-83c7-720707742df6", GroupId: "d7fedc8a-ba7f-8c92-1b47-2f3cc5081ddc", GroupNumber: 101, Name: "G&A" },
{ OrganizationId: "ad663f6d-2bd6-c538-aa56-ed3f4e9e915e", ProjectId: "3f3bfed1-aa59-40a5-83c7-720707742df6", GroupId: "b03d977d-ae17-d19c-ef7f-73f223f5983a", GroupNumber: 103, Name: "IndSls" },
{ OrganizationId: "ad663f6d-2bd6-c538-aa56-ed3f4e9e915e", ProjectId: "3f3bfed1-aa59-40a5-83c7-720707742df6", GroupId: "9291435b-0440-1457-128b-e7c972b7b88c", GroupNumber: 106, Name: "ITCost" },
{ OrganizationId: "ad663f6d-2bd6-c538-aa56-ed3f4e9e915e", ProjectId: "3f3bfed1-aa59-40a5-83c7-720707742df6", GroupId: "e8122b51-98d7-f6c6-6325-20599e159f53", GroupNumber: 104, Name: "Prcrmt" }];

const RiskTypeBox = props => (

    <View style={[styles.boxStyle]}>
        <View style={{ width: '33%' }}><Text style={[styles.titleStyle, props.style]}>{props.riskText}</Text></View>
        <View style={{ width: '34 %' }}>
            {/* <Text style={[styles.titleStyle]}>{"Picker ^"}</Text> */}
            <View style={{
                margin: 0,
                borderRadius: 4,
                borderColor: "#b0bbd0",
                borderWidth: 1,
                backgroundColor: "#ffffff",
                width: "90%",
            }}>
                <GroupPicker />
                {/* <GroupDropdown dropdownOptions={dropdownOptions} selectedGroup={"6e0a28d5-edfc-6e8c-018a-d86afa197313"} /> */}
            </View>
        </View>
        <View style={{ width: '33%' }}>
            {props.buttonComponent}
        </View>
    </View>

);

export default RiskTypeBox;

const styles = StyleSheet.create({
    boxStyle: {
        width: "90%",
        flexDirection: "row",
        minHeight: 10,
        paddingBottom: 5,
        paddingTop: 5,
        //  backgroundColor: 'red',
    },
    titleStyle: {
        fontSize: 14,
        lineHeight: 30,
        color: '#566f99'
    },
    badgeStyle: {
        height: 18,
        width: 40
    },
    badgeTextStyle: {
        color: 'white', fontSize: 10, lineHeight: 18
    },
    buttonStyle: {
        width: 75,
        padding: 5,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 0,
        borderRadius: 4,
        borderColor: "#b0bbd0",
        // borderColor: "blue",

        // minHeight: 30,
    },
    textStyle: {
        color: "#566f99",
        fontWeight: "bold",
        fontSize: 14
    },
    iconStyle: {
        color: "#566f99",
        fontSize: 18
    },
    textStyle2: {
        fontWeight: "bold",
        color: "blue",
        fontSize: 14
    }


})