import update from 'immutability-helper';
import * as actionTypes from '../actions/actionTypes';
import { ideaData } from '../store/configureStoreData';
import { updateIdeaDetailData } from '../store/ideas/updaters/ideaDetailDataUpdater';
import * as ideaGroupUpdater from '../store/ideas/updaters/ideaGroupUpdater';

const MobileIdeaReducer = (state = [], action, entireState) => {
    try {
        switch (action.type) {
            case actionTypes.PROJECT_CHANGE:
                return update(state, { $set: ideaData })
            case actionTypes.GROUP_CHANGE:
                return update(state, {
                    isLoading: { $set: true },
                });
            case actionTypes.GET_IDEA_DATA:
                if (!action.payload.data) return update(state, {
                    isLoading: { $set: false }
                });
                const ideaList = (action.payload.data.IdeaList.List ? action.payload.data.IdeaList.List : []);
                const ideaGroupList = (action.payload.data.IdeaGroupList.List ? action.payload.data.IdeaGroupList.List : []);
                const ideaGroupsObj = ideaGroupUpdater.updateIdeaGroupData(state["ideaGroups"],
                    ideaGroupList, ideaList, entireState);
                return update(state, {
                    ideas: { $set: ideaList },
                    ideaGroups: {
                        $set: ideaGroupsObj
                    },
                    isLoading: { $set: false }
                });
            case actionTypes.TOGGLE_CHECKBOX_IDEAGROUP:
                const mapped1 = state.ideaGroups.map(post => ideaGroupUpdater.toggleIdeaGroupCheckUncheck(post, action.payload, action.checked, action.view));
                return update(state, {
                    ideaGroups: {
                        $set: (
                            mapped1
                        )
                    }
                });
            case actionTypes.TOGGLE_ALL_CHECKBOX_IDEAGROUP_ONEPAGE:
                const mapped2 = state.ideaGroups.map(post => ideaGroupUpdater.toggleAllIdeaGroupsCheckUncheckOnePage(post, action.ideaGroupIds, action.checked, action.view));
                return update(state, {
                    ideaGroups: {
                        $set: (
                            mapped2
                        )
                    }
                });
            case actionTypes.UNCHECK_ALL_CHECKBOX_IDEAGROUP:
                const mapped3 = state.ideaGroups.map(post => ideaGroupUpdater.allIdeaGroupsUncheck(post, action.view));
                return update(state, { ideaGroups: { $set: (mapped3) } });
            case actionTypes.GET_IDEA_DETAIL_DATA:
                if (!action.payload.data) return state;
                return update(state, {
                    ideaNonPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaNonPersonnelLineItems"], action.payload.data.NonPersonnelLineItemList.List, 'ideaNonPersonnelLineItems') },
                    ideaPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaPersonnelLineItems"], action.payload.data.PersonnelLineItemList.List, 'ideaPersonnelLineItems') },
                    ideaRevenueLineItems: { $set: updateIdeaDetailData(state["ideaRevenueLineItems"], action.payload.data.RevenueLineItemList.List, 'ideaRevenueLineItems') },
                    ideaRiskRatings: { $set: updateIdeaDetailData(state["ideaRiskRatings"], action.payload.data.RiskRatingList.List, 'ideaRiskRatings') },
                    ideaRecommendations: { $set: updateIdeaDetailData(state["ideaRecommendations"], action.payload.data.RecommendationList.List, 'ideaRecommendations') },
                    ideaSCDecisions: { $set: updateIdeaDetailData(state["ideaSCDecisions"], action.payload.data.SCDecisionList.List, 'ideaSCDecisions') },
                    ideaSCMReviews: { $set: updateIdeaDetailData(state["ideaSCMReviews"], action.payload.data.SCMReviewList.List, 'ideaSCMReviews') },
                    ideaCustomFields: { $set: updateIdeaDetailData(state["ideaCustomFields"], action.payload.data.IdeaCustomFieldList.List, 'ideaCustomFields') },
                    //tranferredIdeas: { $set:updateIdeaDetailData(state["tranferredIdeas"], action.payload.data.IdeaGroupList.List, 'tranferredIdeas')},
                    metrics: { $set: updateIdeaDetailData(state["metrics"], action.payload.data.MetricList.List, 'metrics') },
                    milestones: { $set: updateIdeaDetailData(state["milestones"], action.payload.data.MilestoneList.List, 'milestones') },
                });
            case actionTypes.OPEN_IDEA:
                return update(state, {
                    openedIdeaGroup: { $set: { ideaGroupId: action.openedIdeaGroupId, tab: action.openedTab } }
                });
            case 'GET_IMPLEMENTATION_DATA':
                if (!action.payload.data) return state;
                return update(state, {
                    ideaNonPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaNonPersonnelLineItems"], action.payload.data.NonPersonnelLineItemList.List, 'ideaNonPersonnelLineItems') },
                    ideaPersonnelLineItems: { $set: updateIdeaDetailData(state["ideaPersonnelLineItems"], action.payload.data.PersonnelLineItemList.List, 'ideaPersonnelLineItems') },
                    ideaRevenueLineItems: { $set: updateIdeaDetailData(state["ideaRevenueLineItems"], action.payload.data.RevenueLineItemList.List, 'ideaRevenueLineItems') },
                    metrics: { $set: updateIdeaDetailData(state["metrics"], action.payload.data.MetricList.List, 'metrics') },
                    milestones: { $set: updateIdeaDetailData(state["milestones"], action.payload.data.MilestoneList.List, 'milestones') },
                    isImplementationDataLoading: { $set: false },
                    openedIdeaGroup: { $set: { ideaGroupId: null, tab: '' } }
                });
            case 'STAR_UNSTAR_IDEA':
                return update(state, {
                    ideaGroups: { $set: ideaGroupUpdater.updateIdeaGroupFavourite(state["ideaGroups"], action) }
                });

            default: return state;
        }
    }
    catch (err) { }
    finally {
    }
};

export default MobileIdeaReducer;
