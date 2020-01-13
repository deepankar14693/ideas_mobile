import React, { Component } from 'react';
import { View } from 'react-native';
import { buttonStyle } from "../../../css/button";
import BoxStyle from "../../../css/checkListBox";
import Title from '../../common/title';
import Translation from '../../common/translation';
import ColorHead from '../../UI/ColorHead/ColorHead';
import DetailBoxButton from '../../UI/DetailBoxButton/DetailBoxButton';

class Box extends Component {

    render() {
        const count = this.props.count;
        const buttonTitle = this.props.buttonTitle ? this.props.buttonTitle : 'View Ideas';
        const title = this.props.title ? this.props.title : '';

        return (
            <View style={BoxStyle.container}>
                <View style={BoxStyle.innerContainer}>
                    <ColorHead colorStyle={this.props.colorStyle}></ColorHead>

                    <Title style={[BoxStyle.headTxt, { paddingTop: 30 }]}><Translation id={title} /></Title>

                    <Title style={BoxStyle.numTxt}>{count}</Title>
                    <DetailBoxButton style={[buttonStyle.detailButtonTxtStyle, { marginTop: 50 }]} detailButtonTxt={buttonTitle} title={title} onClick={this.props.onDetailsClick}></DetailBoxButton>
                </View>
            </View>
        )
    }
}


export default Box;