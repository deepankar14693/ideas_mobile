import React, { PureComponent } from 'react';
import CheckListBox from "../boxes/checkListBox";
import RiskRaterCheckListBox from "../boxes/riskRaterCheckListBox";
import _ from 'lodash';
import commonCSS from "../../../css/commonCSS";

class Index extends PureComponent {

    getCount = (isCompanyView, resolveReviewData, isPendingSharesTransfers) => {
        if (isCompanyView && !isPendingSharesTransfers && resolveReviewData) {
            return resolveReviewData.length > 0 ? _.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title === "Total" })[0].IdeaCount : 0;
        }
        else {
            if (isPendingSharesTransfers) {
                return _.sumBy(_.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title === "Total" }), 'IdeaCount');
            }
            return _.filter(resolveReviewData, function (resolveReview) { return resolveReview.Title != "Total" && resolveReview.Title !== 'Unassigned' && resolveReview.IdeaCount === 0 }).length;
        }
    }


    checkListBoxRiskRater(title, riskRaters) {
        const count = riskRaters ? riskRaters.NoOfIncompleteRiskRaters : 0;
        const unassignedRatings = riskRaters ? riskRaters.NoOfUnassignedRatings : 0;
        const affectedIdeasWithNoRatings = (riskRaters && riskRaters.AffectedIdeasWithNoRatings) ? riskRaters.AffectedIdeasWithNoRatings.length : 0;
        return (
            <RiskRaterCheckListBox key={title}
                colorStyle={commonCSS.confirm}
                title={title} subTitle={'RatersWithIncompleteRatings'} count={count} type={1} showRiskRaterDetail={true}
                unassignedRatings={unassignedRatings}
                affectedIdeasWithNoRatings={affectedIdeasWithNoRatings}
                buttonTitle={'Details'}
            />
        )
    }

    checkListBox(title, multiGroupIdeasCheckList, scrType) {
        const count = multiGroupIdeasCheckList;
        return (
            <RiskRaterCheckListBox key={title}
                colorStyle={commonCSS.confirm}
                title={title} subTitle={scrType === 3 ? 'MultiGroupIdeasBoxSubTitle' : 'PendingActions'}
                count={count} type={1} showRiskRaterDetail={false}
                unassignedRatings={0}
                affectedIdeasWithNoRatings={0}
                buttonTitle={'Details'}
            />
        )
    }

    render() {
        if (!this.props.dashboardCheckList) return <></>;
        const dashboardCheckList = this.props.dashboardCheckList;
        const scrType = this.props.scrType;
        const emptyRiskRaters = { NoOfIncompleteRiskRaters: 0, NoOfUnassignedRatings: 0, AffectedIdeasWithNoRatings: [] };
        const riskRaters = dashboardCheckList ? dashboardCheckList.RatersWithIncompleteRatings : emptyRiskRaters;
        let multiGroupIdeasCheckList = 0;
        if (scrType === 3) {
            multiGroupIdeasCheckList = dashboardCheckList && dashboardCheckList.MultiGroupIdeas ? dashboardCheckList.MultiGroupIdeas : 0;
        } else {
            multiGroupIdeasCheckList = dashboardCheckList && dashboardCheckList.PendingMultiGroupAction ? dashboardCheckList.PendingMultiGroupAction : 0;
        }
        return (
            <>
                {this.checkListBoxRiskRater('RiskRaters', riskRaters)}
                {this.checkListBox('MultiGroupIdeas', multiGroupIdeasCheckList, scrType)}
            </>
        )
    }
}

export default Index;