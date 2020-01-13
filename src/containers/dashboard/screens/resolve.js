import _ from 'lodash';
import React, { PureComponent } from 'react';
import { View } from 'react-native';
import { Content, Text } from 'native-base';
import ResolveReviewBox from "../../../components/resolveReview/resolveReviewBox";
import commonCSS from "../../../css/commonCSS";
import { resolveReviewCss } from "../../../css/dashboard";
import { Divider } from 'react-native-elements';
import DashboardCheckList from '../../../components/dashboard/dashboardCheckList';

class Resolve extends PureComponent {

    getCount = (isCompanyView, resolveReviewData) => {
        if (isCompanyView && resolveReviewData) {
            return resolveReviewData.length > 0 ? _.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title === "Total" })[0].IdeaCount : 0;
        }
        else {
            return _.sumBy(_.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title === "Total" }), 'IdeaCount');
        }
    }

    renderPositionWithoutFT(positionsWithoutFunctionalTitles) {
        const title = 'PositionsWithoutFunctionalTitles';
        const count = this.getCount(false, positionsWithoutFunctionalTitles);
        return (
            <ResolveReviewBox key={title}
                colorStyle={(count > 0 ? commonCSS.danger : commonCSS.success)}
                title={title} secondTitle='Positions' value={0}
                count={count} type={1} showLinkButton={false}
            />
        )
    }

    renderResolveList(resoleList) {
        const resolveNames = resoleList.Name;
        let count;
        return _.map(resolveNames, (item, index) => {
            if (item) {
                count = resoleList.Count[index];
                return (
                    <ResolveReviewBox key={item}
                        colorStyle={(count > 0 ? commonCSS.danger : commonCSS.success)}
                        title={item} value={resoleList.Value[index]}
                        count={count} type={1}
                    />
                )
            }
        })
    }

    render() {
        const props = this.props.screenProps;
        if (!props.mobileDashboardData) return <></>;

        const scrType = props.scrType;
        let scr2ResolveList = [];
        let scr3ResolveList = [];
        const scr1ResolveList = props.mobileDashboardData.scr1Data && props.mobileDashboardData.scr1Data.Resolve ? props.mobileDashboardData.scr1Data.Resolve : [];
        if (scrType > 1) {
            scr2ResolveList = props.mobileDashboardData.scr2Data && props.mobileDashboardData.scr2Data.Resolve ? props.mobileDashboardData.scr2Data.Resolve : [];
        }
        if (scrType === 3) {
            scr3ResolveList = props.mobileDashboardData.scr3Data && props.mobileDashboardData.scr3Data.Resolve ? props.mobileDashboardData.scr3Data.Resolve : [];
        }

        const positionsWithoutFunctionalTitles = props.dashboardCheckList ? props.dashboardCheckList.CheckList.PositionsWithoutFunctionalTitles : [];
        const isCompanyView = props.screenProps.isCompanyView;

        return (
            <Content>
                <View style={[scrType === 1 && { paddingTop: 20, }, { paddingBottom: 20 }]}>
                    {(scrType === 3) &&
                        <View>
                            <Text style={resolveReviewCss.headTxt}>{'SCR 3'}</Text>
                            {this.renderResolveList(scr3ResolveList)}
                        </View>
                    }
                    {(scrType > 1) &&
                        <View >
                            {scrType > 2 &&
                                <Divider style={resolveReviewCss.divider} />
                            }
                            <Text style={resolveReviewCss.headTxt}>{'SCR 2'}</Text>
                            {this.renderResolveList(scr2ResolveList)}
                        </View>
                    }
                    {
                        (scrType === 1 || scrType > 1) &&
                        <View>
                            {scrType > 1 &&
                                <>
                                    <Divider style={resolveReviewCss.divider} />
                                    <Text style={resolveReviewCss.headTxt}>{'SCR 1'}</Text>
                                </>
                            }
                            {(positionsWithoutFunctionalTitles && positionsWithoutFunctionalTitles.length > 0) && this.renderPositionWithoutFT(positionsWithoutFunctionalTitles)}
                            {this.renderResolveList(scr1ResolveList)}
                        </View>
                    }

                    {!props.dashboardCheckList.isLoading &&
                        <DashboardCheckList dashboardCheckList={props.dashboardCheckList.CheckList} scrType={scrType} isCompanyView={isCompanyView} rrViewType={1} rrView={true} />
                    }
                </View>
            </Content>
        )
    }
}

export default Resolve;