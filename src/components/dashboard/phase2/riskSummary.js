import React, { PureComponent } from 'react';
import { View } from 'react-native';
import commonCSS from "../../../css/commonCSS";
import { summaryCss } from "../../../css/dashboard";
import ColorHead from '../../UI/ColorHead/ColorHead';
import HeadingTxt from '../../UI/HeadIngTxt/HeadIngTxt';
import Tables from './riskTable';

class RiskSummary extends PureComponent {

    render() {
        if (!this.props.riskSummary || this.props.riskSummary.length === 0) return <></>;
        
        return (
            <View style={summaryCss.container}>
                <View style={summaryCss.innerContainer}>
                    <ColorHead colorStyle={commonCSS.confirm}></ColorHead>
                    <HeadingTxt style={summaryCss.headTxt}>{'Impact'}</HeadingTxt>
                    <Tables {...this.props} totalBaseline={this.props.totalBaseline} />
                    {/* <DetailBoxButton style={summaryCss.detailButtonTxtStyle} detailButtonTxt={'Details'}></DetailBoxButton> */}
                </View>
            </View>

        )
    }
}

export default RiskSummary;