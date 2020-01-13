import React from 'react';
import { Text, View } from 'react-native';
import { decisionTooltipArray, riskTooltipArray, valueTooltipArray } from '../common/constants';
import Decision from '../components/ideas/decision';
import DollarImpact from '../components/ideas/dollarImpact';
// import FocusArea from '../components/ideas/focusArea';
// import IdeaGroupCheckbox from '../components/ideas/ideaGroupCheckbox';
import Group from '../components/ideas/group';
// import IsFavourite from '../components/ideas/isFavourite';
import RiskRating from '../components/ideas/riskRating';
// import Title from '../components/ideas/title';
import { ideaListGroupStyles, ideaListItem } from '../css/ideaListViews';

function IdeaCard(props) {

    const ideaGroup = props.ideaGroup;
    const idea = props.ideaGroup.Idea;
    const primaryIdeaGroup = props.primaryIdeaGroup;
    const isPrimary = (idea.GroupId === ideaGroup.GroupId) ? true : false;
    const isCurrentGroupIT = props.currentGroupDetails ? props.currentGroupDetails.IsITCosting : false;
    const isCompanyView = props.ideaView === 'CompanyView' ? true : false;
    return (
        <View style={{ marginBottom: 10 }}>
            <View style={ideaListItem.card}>
                <View style={ideaListGroupStyles.ideaNumberEllipse}>
                    <Text style={ideaListGroupStyles.ideaNumberEllipseText}>{idea.IdeaNumber}</Text>
                </View>
                <View style={{ flex: 1, }}>
                    <Group
                        ideaGroupId={ideaGroup.IdeaGroupId}
                        ideaId={ideaGroup.IdeaId}
                        goToIdea={props.goToIdea}
                        focusAreaName={ideaGroup.FocusAreaName}
                        groupIdIdeaGroup={ideaGroup.GroupId}
                        groupIdIdea={idea.GroupId}
                        groups={idea.Groups}
                        ITStatus={idea.ITStatus}
                        ideaView={props.ideaView}
                        ideaTitle={idea.Title}
                        ideaDescription={idea.Description}
                        masterDataGroups={props.masterDataGroups}
                    />
                    <View style={ideaListItem.boxContainer}>
                        <RiskRating
                            ideaGroupId={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.IdeaGroupId : null) : (ideaGroup.IdeaGroupId)}
                            ideaId={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.IdeaId : null) : (ideaGroup.IdeaId)}
                            riskRatingType={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.RiskRatingType : null) : (ideaGroup.RiskRatingType)}
                            riskStatus={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.RiskStatus : null) : (ideaGroup.RiskStatus)}
                            riskCounts={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.Idea.RiskCounts ? idea.RiskCounts : [0, 0, 0, 0] : [0, 0, 0, 0]) : (idea.RiskCounts ? idea.RiskCounts : [0, 0, 0, 0])}
                            riskTooltipArray={riskTooltipArray}
                            isPrimary={isPrimary}
                            goToIdea={props.goToIdea}
                            ctmDisagreement={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.CTMDisagreement : null) : (ideaGroup.CTMDisagreement)}
                            glDisagreement={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.GLDisagreement : null) : (ideaGroup.GLDisagreement)}
                            isCurrentGroup={isCurrentGroupIT ? true : isPrimary}
                            riskDisagreement={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.RiskDisagreement : null) : (ideaGroup.RiskDisagreement)}
                            glRiskRatingId={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.GLRiskRatingId : null) : (ideaGroup.GLRiskRatingId)}
                            roughRisk={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.Idea.RoughRiskRatingType : null) : (ideaGroup.Idea.RoughRiskRatingType)}
                            glRisk={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.GLRiskRatingType : null) : (ideaGroup.GLRiskRatingType)}
                        />
                        <DollarImpact
                            ideaGroupId={ideaGroup.IdeaGroupId}
                            ideaId={ideaGroup.IdeaId}
                            itValueStatus={idea.ITValueStatus}
                            roughValue={ideaGroup.RoughValue}
                            itRoughValue={idea.ITRoughValue}
                            goToIdea={props.goToIdea}
                            value={isCurrentGroupIT ? (primaryIdeaGroup ? ((isCompanyView && singleRowForMultigroupIdea)
                                ? primaryIdeaGroup.Idea.Value : primaryIdeaGroup.Value) : 0) :
                                ((isCompanyView && singleRowForMultigroupIdea)
                                    ? idea.Value : ideaGroup.Value)}
                            valueStatus={ideaGroup.ValueStatus ? ideaGroup.ValueStatus : 0}
                            valueTooltipArray={valueTooltipArray}
                            isValidationNotRequired={ideaGroup.IsValidationNotRequired}
                            isCurrentSelectedGroupIsIT={isCurrentGroupIT}
                        />
                        <Decision
                            goToIdea={props.goToIdea}
                            ideaGroupId={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.IdeaGroupId : null) : ideaGroup.IdeaGroupId}
                            ideaId={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.IdeaId : null) : ideaGroup.IdeaId}
                            glRecommendation={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.GLRecommendationType : null) : ideaGroup.GLRecommendationType}
                            scmReview={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.IsReviewed : null) : ideaGroup.IsReviewed}
                            scmReviewNotRequired={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.SCMReviewNotRequired : null) : ideaGroup.SCMReviewNotRequired}
                            scDecision={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.SCDecisionType : null) : ideaGroup.SCDecisionType}
                            decisionStatus={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.DecisionStatus : null) : ideaGroup.DecisionStatus}
                            decisionTooltipArray={decisionTooltipArray}
                            glsDisagreeOnRecommendation={isCurrentGroupIT ? (primaryIdeaGroup ? primaryIdeaGroup.GLsDisagreeOnRecommendation : null) : ideaGroup.GLsDisagreeOnRecommendation}
                            isPrimary={isPrimary}
                            isCurrentSelectedGroupIsIT={isCurrentGroupIT}
                        />
                    </View>

                </View>
            </View>
        </View>

    )
}

export default IdeaCard;

