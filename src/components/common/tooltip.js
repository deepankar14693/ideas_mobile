//import { Text } from 'native-base';
import React, { useState } from 'react';
import { Text, TouchableHighlight, View } from 'react-native';
import Tooltip from 'react-native-walkthrough-tooltip';
import { isEmpty2, translateKey } from '../../common/utils';

function RNTooltip(props) {
    const [isShowingTooltip, toggleTooltip] = useState(false);
    const tooltipText = props.hideTooltip ? '' : (props.params ? translateKey(props.text, props.params) : (props.isTranslate ? translateKey(props.text) : props.text));
    if (isEmpty2(tooltipText)) {
        return (
            <Text>
                {props.children}
            </Text>
        )
    } else {
        return (
            <Tooltip placement={props.place ? props.place : 'bottom'}
                isVisible={isShowingTooltip}
                onClose={() => { toggleTooltip(!isShowingTooltip) }}
                content={
                    <Text>
                        {tooltipText}
                    </Text>
                }>
                <TouchableHighlight onPressIn={() => { toggleTooltip(!isShowingTooltip) }}>
                    <View><Text>{props.children}</Text></View>
                </TouchableHighlight>
            </Tooltip>
        )
    }
}

export default RNTooltip;
