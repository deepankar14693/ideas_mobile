import { Icon, Text } from 'native-base';
import React from "react";
import { View } from "react-native";
import { buttonStyle } from '../../../css/button';
import NativeTouch from '../NativeTouch/NativeTouch';

export default ButtonWithIcon = props => {
    const content = (
        <View style={[buttonStyle.defaultButton, props.disabled ? buttonStyle.btnDisabledStyle : props.buttonStyle]}>
            {!props.noIcon &&
                <Icon type="Ionicons" name={props.iconName} size={16} style={props.disabled ? buttonStyle.disabledIconStyle : props.iconStyle} />
            }
            {!props.noText &&
                <Text style={[props.disabled ? buttonStyle.disabledTextButtonStyle : props.textStyle]}>{props.children}</Text>
            }
        </View>
    );

    if (props.disabled) {
        return content;
    }

    return (
        <NativeTouch onPress={props.onPress}>
            {content}
        </NativeTouch>
    );

}