import { Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { isEmpty, translateKey } from '../../../common/utils';
import AmountEditor from '../../../components/common/amountEditor';
import NoteButton from '../../../components/common/noteButton';
import ButtonWithIcon from '../../../components/UI/CustomButtons/ButtonWithIcon';
import { buttonStyle } from '../../../css/button';
import ColorHeadBox from '../screenComponents/colorHeadBox';

export default function ManageUnacceptedGroup(props) {
    return (
        <ColorHeadBox colorStyle="#c7dbfe">
            <View style={{ flexDirection: "row", alignItems: 'center', justifyContent: "space-between", marginTop: 8 }}>
                <View>
                    <Text style={{ color: "#566f99", fontWeight: "bold" }}>
                        {props.groupData.Name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12, color: 'rgba(107,115,127,1)',
                            justifyContent: "center", lineHeight: 13
                        }}>{translateKey(props.groupData.GroupTypeLabel)}</Text>
                </View>
            </View>
            <View style={{ flexDirection: "row", alignItems: 'center', marginVertical: 8 }}>
                <View style={{ width: "28%" }}>
                    <AmountEditor
                        placeholder={translateKey('RoughValue')}
                        entityId={props.groupData.IdeaGroupId}
                        value={props.groupData.RoughValue}
                    />
                </View>

                <ButtonWithIcon buttonStyle={buttonStyle.btnNeutralSolidStyle}
                    noText={true}
                    textStyle={buttonStyle.textButtonStyle}
                    iconName="md-apps" iconStyle={buttonStyle.iconStyle} >
                </ButtonWithIcon>
                <NoteButton buttonType={isEmpty(props.groupData.Notes) ? 2 : 1} />


                <ButtonWithIcon
                    noIcon={true}
                    buttonStyle={buttonStyle.btnNeutralSolidStyle}
                    textStyle={buttonStyle.textButtonStyle}
                    iconStyle={buttonStyle.iconStyle} >Send To Group
                        </ButtonWithIcon>

                <ButtonWithIcon buttonStyle={buttonStyle.btnNeutralSolidStyle}
                    noText={true}
                    textStyle={buttonStyle.textButtonStyle}
                    iconName="trash" iconStyle={buttonStyle.iconStyle} >
                </ButtonWithIcon>
            </View>
        </ColorHeadBox>
    )

}
