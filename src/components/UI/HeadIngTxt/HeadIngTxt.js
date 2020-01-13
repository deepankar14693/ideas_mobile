import { Text } from 'native-base';
import React from "react";

const HeadingTxt = props => (
    <Text style={props.style}>{props.children}</Text>
);

export default HeadingTxt;
