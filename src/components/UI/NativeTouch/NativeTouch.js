import React from "react";
import { Platform, TouchableNativeFeedback, TouchableOpacity, View } from "react-native";

const NativeTouch = props => {
    return (
        <View>
            {Platform.OS == "android" ?
                (<TouchableNativeFeedback {...props}>
                    {props.children}
                </TouchableNativeFeedback>) :
                (<TouchableOpacity {...props}>
                    {props.children}
                </TouchableOpacity>)
            }
        </View>
    );

}

export default NativeTouch;