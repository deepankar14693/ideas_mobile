import React, { PureComponent } from 'react';
import { Left, Body, ListItem, Radio, View, Text, Right } from 'native-base';
import { valueTypeCss } from "../../../css/dashboard";

class ValueTypes extends PureComponent {

    constructor(props) {
        super(props);

        this.state = {
            valueType: 0
        }
    }

    render() {
        const valueType = this.state.valueType;
        return (
            <>
                <View style={valueTypeCss.container}>
                    <Text style={{ alignItems: "center" }}>Value</Text>
                    <View style={valueTypeCss.innerContainer}>
                        <View style={valueTypeCss.radioContainer}>
                            <Radio
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={(valueType === 0)}
                            />
                            <Text> ALL</Text>

                        </View>
                        <View style={valueTypeCss.radioContainer}>
                            <Radio
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={valueType === 1}
                            />
                            <Text> Rough</Text>
                        </View>
                        <View style={valueTypeCss.radioContainer}>
                            <Radio
                                color={"#f0ad4e"}
                                selectedColor={"#5cb85c"}
                                selected={valueType === 2}
                            />
                            <Text> Detailed</Text>
                        </View>
                    </View>
                </View>


            </>
        )
    }
}

export default ValueTypes;

