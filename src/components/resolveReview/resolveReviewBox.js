import { Icon } from 'native-base';
import React, { Component } from 'react';
import { View } from 'react-native';
import { formatAmount } from '../../common/utils';
import { buttonStyle } from "../../css/button";
import boxStyle from "../../css/checkListBox";
import commonCSS from "../../css/commonCSS";
import Title from '../common/title';
import Translation from '../common/translation';
import ColorHead from '../UI/ColorHead/ColorHead';
import DetailBoxButton from '../UI/DetailBoxButton/DetailBoxButton';
import BadgeBox from './Badge/resolveReviewBoxBadge';

class Card extends Component {

    render() {
        const type = this.props.type;
        const count = this.props.count;
        const secondTitle = this.props.secondTitle ? this.props.secondTitle : 'Active Ideas';
        const buttonTitle = this.props.buttonTitle ? this.props.buttonTitle : 'View Ideas';
        const showLinkButton = this.props.showLinkButton === false ? false : true;
        return (
            <View style={boxStyle.container}>
                <View style={boxStyle.innerContainer}>
                    <ColorHead colorStyle={this.props.colorStyle}></ColorHead>
                    <BadgeBox statusStyle={(type === 1 ? commonCSS.badgeDanger : commonCSS.badgeWarning)} value={formatAmount(this.props.value, true)} count={count} ></BadgeBox>
                    <Title style={boxStyle.headTxt}><Translation id={this.props.title} /></Title>

                    {count === 0 &&
                        <Icon ios='ios-checkmark-circle' android='md-checkmark-circle' style={boxStyle.noIdeaIconStyle} name="md-checkbox-outline" />
                    }
                    {count > 0 &&
                        <>
                            <Title style={boxStyle.numTxt}>{count}</Title>

                            <Title style={boxStyle.headTxtSmall}>{secondTitle}</Title>

                            {showLinkButton &&
                                <DetailBoxButton style={buttonStyle.detailButtonTxtStyle} detailButtonTxt={buttonTitle} onPress={this.props.onDetailsClick} ></DetailBoxButton>
                            }
                        </>
                    }
                </View>
            </View >
        )
    }


}


export default Card;