import _ from 'lodash';
import { Text } from 'native-base';
import React from 'react';
import { View } from 'react-native';
import { decisionTooltipArray, riskTooltipArray, valueTooltipArray } from '../../../common/constants';
import { formatAmount, translateKey, isEmpty } from '../../../common/utils';
import Decision from '../../../components/ideas/decision';
import DollarImpact from '../../../components/ideas/dollarImpact';
import RiskRating from '../../../components/ideas/riskRating';
import ButtonWithIcon from '../../../components/UI/CustomButtons/ButtonWithIcon';
import NoteButton from '../../../components/common/noteButton';
import { buttonStyle } from '../../../css/button';
import { ideaListItem, ideaListRVDStyles } from '../../../css/ideaListViews';
import ColorHeadBox from '../screenComponents/colorHeadBox';

export default function ManageAcceptedGroup(props) {
    return (
        <ColorHeadBox colorStyle="#c7dbfe">
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginTop: 8 }}>
                <View>
                    <Text style={{ color: "#566f99", fontWeight: "bold" }}>
                        {props.groupData.Name + props.groupTagName}
                    </Text>
                    <Text
                        style={{
                            fontSize: 12, color: 'rgba(107,115,127,1)',
                            justifyContent: "center", lineHeight: 13
                        }}>{translateKey(props.groupData.GroupTypeLabel)}</Text>
                </View>
                <View style={{ flexDirection: "row", marginLeft: 5 }}>
                    <NoteButton buttonType={isEmpty(props.groupData.Notes) ? 2 : 1} />
                    <ButtonWithIcon buttonStyle={buttonStyle.btnNeutralSolidStyle}
                        noText={true}
                        textStyle={buttonStyle.textButtonStyle}
                        iconName="trash" iconStyle={buttonStyle.iconStyle} ></ButtonWithIcon>
                </View>
            </View>
            <View style={ideaListItem.boxContainer}>
                <RiskRating
                    ideaGroupId={(props.groupData.IdeaGroupId)}
                    ideaId={(props.groupData.IdeaId)}
                    riskRatingType={(props.groupData.RiskRatingType)}
                    riskStatus={(props.groupData.RiskStatus)}
                    riskCounts={(props.groupData.Idea.RiskCounts ? props.groupData.Idea.RiskCounts : [0, 0, 0, 0])}
                    riskTooltipArray={riskTooltipArray}
                    isPrimary={props.groupData.IsPrimary}
                    isCurrentGroup={props.groupData.IsPrimary}
                    ctmDisagreement={(props.groupData.CTMDisagreement)}
                    glDisagreement={(props.groupData.GLDisagreement)}
                    riskDisagreement={(props.groupData.RiskDisagreement)}
                    glRiskRatingId={(props.groupData.GLRiskRatingId)}
                    roughRisk={(props.groupData.Idea.RoughRiskRatingType)}
                    glRisk={(props.groupData.GLRiskRatingType)}
                />
                <View style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
                    <View style={ideaListRVDStyles.default}>
                        <Text style={{ color: '#1d3f77' }}>
                            {formatAmount(_.subtract(props.groupData.TotalBenefit, props.groupData.TotalCost), true, true)}
                        </Text>
                    </View>
                </View>
                <DollarImpact
                    ideaGroupId={props.groupData.IdeaGroupId}
                    ideaId={props.groupData.IdeaId}
                    itValueStatus={props.groupData.Idea.ITValueStatus}
                    roughValue={props.groupData.RoughValue}
                    itRoughValue={props.groupData.Idea.ITRoughValue}
                    value={props.groupData.Value}
                    valueStatus={props.groupData.ValueStatus ? props.groupData.ValueStatus : 0}
                    valueTooltipArray={valueTooltipArray}
                    isValidationNotRequired={props.groupData.IsValidationNotRequired}
                    isCurrentSelectedGroupIsIT={false}
                />
                <Decision
                    ideaGroupId={props.groupData.IdeaGroupId}
                    ideaId={props.groupData.IdeaId}
                    glRecommendation={props.groupData.GLRecommendationType}
                    scmReview={props.groupData.IsReviewed}
                    scmReviewNotRequired={props.groupData.SCMReviewNotRequired}
                    scDecision={props.groupData.SCDecisionType}
                    decisionStatus={props.groupData.DecisionStatus}
                    decisionTooltipArray={decisionTooltipArray}
                    glsDisagreeOnRecommendation={props.groupData.GLsDisagreeOnRecommendation}
                    isPrimary={props.groupData.IsPrimary}
                    isCurrentSelectedGroupIsIT={false}
                />
            </View>
        </ColorHeadBox>
    )

}
