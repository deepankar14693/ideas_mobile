import React from "react";
import { Text } from 'native-base';

const Title = props => (
    <Text style={props.style}>{props.children}</Text>
);

export default Title;
