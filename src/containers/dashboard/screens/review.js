import _ from 'lodash';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Content, Text } from 'native-base';
import ResolveReviewBox from "../../../components/resolveReview/resolveReviewBox";
import commonCSS from "../../../css/commonCSS";
import { resolveReviewCss } from "../../../css/dashboard";
import DashboardCheckList from '../../../components/dashboard/dashboardCheckList';

class Review extends PureComponent {

    renderList(list) {
        const resolveNames = list.Name;
        let count;
        return _.map(resolveNames, (item, index) => {
            if (item) {
                count = list.Count[index];
                return (
                    <ResolveReviewBox key={item}
                        colorStyle={(count > 0 ? commonCSS.warning : commonCSS.success)}
                        title={item} value={list.Value[index]}
                        count={count} type={2}
                    />
                )
            }
        })
    }

    render() {
        const props = this.props.screenProps;
        if (!props.mobileDashboardData) return <></>;

        const scrType = props.scrType;
        let scr2ReviewList = [];
        let scr3ReviewList = [];
        const scr1ReviewList = props.mobileDashboardData.scr1Data && props.mobileDashboardData.scr1Data.Review ? props.mobileDashboardData.scr1Data.Review : [];
        if (scrType > 1) {
            scr2ReviewList = props.mobileDashboardData.scr2Data && props.mobileDashboardData.scr2Data.Review ? props.mobileDashboardData.scr2Data.Review : [];
        }
        if (scrType === 3) {
            scr3ReviewList = props.mobileDashboardData.scr3Data && props.mobileDashboardData.scr3Data.Review ? props.mobileDashboardData.scr3Data.Review : [];
        }

        const isCompanyView = props.screenProps.isCompanyView;
        return (
            <Content>
                <View style={[scrType === 1 && { paddingTop: 20, }, { paddingBottom: 20 }]}>
                    {(scrType === 3) &&
                        <View style={resolveReviewCss.hrLine}>
                            <Text style={resolveReviewCss.headTxt}>{'SCR 3'}</Text>
                            {this.renderList(scr3ReviewList)}
                        </View>
                    }
                    {(scrType > 1) &&
                        <View style={resolveReviewCss.hrLine}>
                            <Text style={resolveReviewCss.headTxt}>{'SCR 2'}</Text>
                            {this.renderList(scr2ReviewList)}
                        </View>
                    }
                    {
                        (scrType === 1 || scrType > 1) &&
                        <View>
                            {scrType > 1 && <Text style={resolveReviewCss.headTxt}>{'SCR 1'}</Text>}
                            {this.renderList(scr1ReviewList)}
                        </View>
                    }

                    {!props.dashboardCheckList.isLoading &&
                        <DashboardCheckList dashboardCheckList={props.dashboardCheckList.CheckList} scrType={scrType} isCompanyView={isCompanyView} rrViewType={2} rrView={true} />
                    }
                </View >
            </Content>
        )
    }
}

export default Review;