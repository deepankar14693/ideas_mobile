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
        const showRiskRaterDetail = this.props.showRiskRaterDetail;

        return (
            <View style={BoxStyle.container}>
                <View style={BoxStyle.innerContainer}>
                    <ColorHead colorStyle={this.props.colorStyle}></ColorHead>

                    <Title style={[BoxStyle.headTxt, { paddingTop: 30 }]}><Translation id={this.props.title} /></Title>

                    <Title style={BoxStyle.numTxt}>{count}</Title>
                    <Title style={[BoxStyle.headTxt]}><Translation id={this.props.subTitle} /></Title>
                    {showRiskRaterDetail &&
                        <>
                            <Title style={[BoxStyle.headTxt, { paddingTop: 30 }]}><Translation id={'RiskRatingsAffected'} params={{ count: this.props.unassignedRatings }} /></Title>
                            <Title style={[BoxStyle.headTxt]}><Translation id={'IdeasAffected'} params={{ count: this.props.affectedIdeasWithNoRatings }} /></Title>
                        </>
                    }
                    <DetailBoxButton style={[buttonStyle.detailButtonTxtStyle, { marginTop: 50 }]} detailButtonTxt={buttonTitle}></DetailBoxButton>
                </View>
            </View>
        )
    }
}


export default Box;