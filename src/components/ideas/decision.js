import _ from 'lodash';
import { Text } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';
import { translateKey } from '../../common/utils';
import { ideaListRVDStyles } from '../../css/ideaListViews';
import Dot from '../common/dot';


function Decision(props) {

    const renderDots = (dotsArray) => {
        return dotsArray.map(function (dot) {
            if (dot.isCrossed) {
                return (<div key={'dot_' + dot.key} className='left cross-unselected-withbgColor mgR1' style={{ marginTop: '-1px' }}><i className='ion-close-round' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
            } else {
                if (dot.isWhite) {
                    return (<div key={'dot_' + dot.key} className='dot-unselected-withbgColor'></div>)
                } else {
                    return (<div key={'dot_' + dot.key} className='dot-unselected-withoutbgColor'></div>)
                }
            }
        });
    }

    const renderSelectedDots = (dotsArray) => {
        return dotsArray.map(function (dot) {
            if (dot.isCrossed) {
                if (dot.isWhite) {
                    return (<div key={'dot_' + dot.key} className='left cross-selected-withbgColor mgR1' style={{ marginTop: '-1px' }}><i className='ion-close-round' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
                } else {
                    return (<div key={'dot_' + dot.key} className='left cross-unselected-withbgColor mgR1' style={{ marginTop: '-1px' }}><i className='ion-close-round' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
                }
            } else {
                if (dot.isWhite) {
                    return (<div key={'dot_' + dot.key} className='dot-selected-withbgColor'></div>)
                } else {
                    return (<div key={'dot_' + dot.key} className='dot-selected-withoutbgColor'></div>)
                }
            }
        });
    }

    const returnDotsArray = (noOfDots, stage, glRecommendation, scmReview, decisionStatus) => {
        var dotsArray = [];
        for (var i = 0; i < noOfDots; i++) {
            if (stage !== 0 && i < stage) {
                switch (stage) {
                    case 2:
                        if (i === 0 && decisionStatus === 2 && (glRecommendation === null || glRecommendation === '' || glRecommendation === ' ' || glRecommendation === 0)) {
                            dotsArray.push({ key: i, isWhite: true, isCrossed: true });
                        } else if (i === 1 && (props.scmReviewNotRequired)) {
                            dotsArray.push({ key: i, isWhite: true, isCrossed: true });
                        } else {
                            dotsArray.push({ key: i, isWhite: true, isCrossed: false });
                        }
                        break;
                    case 3:
                        if (i === 0 && decisionStatus > 2 && (glRecommendation === null || glRecommendation === '' || glRecommendation === ' ' || glRecommendation === 0)) {
                            dotsArray.push({ key: i, isWhite: true, isCrossed: true });
                        } else if (i === 1 && decisionStatus > 2 && (props.scmReviewNotRequired || !scmReview)) {
                            dotsArray.push({ key: i, isWhite: true, isCrossed: true });
                        } else {
                            dotsArray.push({ key: i, isWhite: true, isCrossed: false });
                        }
                        break;
                    default: dotsArray.push({ key: i, isWhite: true, isCrossed: false }); break;
                }
            } else {
                dotsArray.push({ key: i, isWhite: false, isCrossed: false });
            }
        }
        return dotsArray;
    }

    const getIdeaToolTip = (valueArray, decisionStatus, noOfDots, glRecommendation, scmReview) => {
        return valueArray.sort().map(function (value) {
            return (
                <div key={value.text}>
                    {value.stage === decisionStatus &&
                        <div>
                            <div className="left wd75 tooltip-selected size-10 position-relative">
                                <i className='ion-arrow-right-c tooltip-arrow position-absolute' style={{ left: -15, top: -2 }}></i>
                                {translateKey(value.text)}
                            </div>

                            <div className="left wd25 tooltip-selected size-11 pdT3">
                                {renderSelectedDots(returnDotsArray(noOfDots, value.stage, glRecommendation, scmReview, decisionStatus))}
                            </div>

                        </div>}
                    {value.stage !== decisionStatus &&
                        <div>
                            <div className="left wd75 size-10" style={{ color: '#B0BCD0' }}>
                                {translateKey(value.text)}
                            </div>
                            <div className="left wd25 size-11 pdT3" style={{ color: '#B0BCD0' }}>
                                {renderDots(returnDotsArray(noOfDots, value.stage, glRecommendation, scmReview, decisionStatus))}
                            </div>
                        </div>}

                </div>
            )
        });
    }

    const getDots = (decisionStatus, glRecommendation, scmReview) => {
        if (decisionStatus === 1) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {translateKey('DecisionGLRecStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        <Dot type={2} />
                        <Dot type={1} />
                        <Dot type={1} />
                    </View>
                </View>
            )
        } else if (decisionStatus === 2) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {translateKey('DecisionSCReviewStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {!(glRecommendation === null || glRecommendation === '' || glRecommendation === ' ' || glRecommendation === 0) &&
                            <Dot type={2} />
                        }
                        {(glRecommendation === null || glRecommendation === '' || glRecommendation === ' ' || glRecommendation === 0) &&
                            <Dot type={3} />
                        }
                        {!props.scmReviewNotRequired &&
                            <Dot type={2} />
                        }
                        {props.scmReviewNotRequired &&
                            <Dot type={3} />
                        }
                        <Dot type={1} />
                    </View>
                </View>
            )
        }
        else if (decisionStatus === 3) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {translateKey('DecisionSCDecisionStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {!(glRecommendation === null || glRecommendation === '' || glRecommendation === ' ' || glRecommendation === 0) &&
                            <Dot type={2} />
                        }
                        {(glRecommendation === null || glRecommendation === '' || glRecommendation === ' ' || glRecommendation === 0) &&
                            <Dot type={3} />
                        }
                        {!(props.scmReviewNotRequired || !scmReview) &&
                            <Dot type={2} />
                        }
                        {(props.scmReviewNotRequired || !scmReview) &&
                            <Dot type={3} />
                        }
                        <Dot type={2} />
                    </View>
                </View>
            )
        }
        return (
            <View style={ideaListRVDStyles.stageContainer}>
                <Text style={ideaListRVDStyles.stageText}>
                    {translateKey('NotStarted')}
                </Text>
                <View style={ideaListRVDStyles.dotsContainer}>
                    <Dot type={1} />
                    <Dot type={1} />
                    <Dot type={1} />
                </View>
            </View>
        )
    }

    const renderDecision = (value) => {
        if (value === null || value === '') {
            return ('--');
        }
        else {
            return (value);
        }
    }

    const renderProgress = (value, allGLAgreed, isPrimaryGroup) => {
        const warningTooltipText = isPrimaryGroup ? 'GLRecWarningForPrimaryGroup' : 'GLRecWarningForLinkedGroup';
        switch (value) {
            case 0:
            case null:
            case '':
                return (
                    <View style={ideaListRVDStyles.default}>
                        <Text style={{ color: '#1d3f77' }}>{''}</Text>
                    </View>
                )
            case 1: return (
                <View style={ideaListRVDStyles.low}>
                    <Text style={{ color: '#1d3f77' }}>{translateKey('Go')} </Text>
                    {!allGLAgreed &&
                        <View>
                            <Tooltip withOverlay={false} popover={<Text>{translateKey(warningTooltipText)}</Text>}>
                                <Icon name='exclamation-triangle'
                                    type='font-awesome'
                                    size={15}
                                    color='#fe5e59' />
                            </Tooltip>
                        </View>
                    }
                </View>)
            case 2:
                return (
                    <View style={ideaListRVDStyles.high}>
                        <Text style={{ color: '#1d3f77' }}>{translateKey('NoGo')} </Text>
                        {!allGLAgreed &&
                            <View>
                                <Tooltip withOverlay={false} popover={<Text>{translateKey(warningTooltipText)}</Text>}>
                                    <Icon name='exclamation-triangle'
                                        type='font-awesome'
                                        size={15}
                                        color='#fe5e59' />
                                </Tooltip>
                            </View>
                        }
                    </View>
                )
            default:
                return (
                    <View style={ideaListRVDStyles.default}>
                        <Text style={{ color: '#1d3f77' }}>{translateKey('NotEntered')} </Text>
                        {!allGLAgreed &&
                            <View>
                                <Tooltip withOverlay={false} popover={<Text>{translateKey(warningTooltipText)}</Text>}>
                                    <Icon name='exclamation-triangle'
                                        type='font-awesome'
                                        size={15}
                                        color='#fe5e59' />
                                </Tooltip>
                            </View>
                        }
                    </View>
                )
        }
    }

    const renderStage = (value) => {
        if (value === null || value === 0) {
            return (0);
        }
        else {
            return (value);
        }
    }

    const getIdeaGroupRecommendation = (ideaId, groupId) => {
        return _.filter(props.ideaRecommendations, { 'IdeaId': ideaId, 'GroupId': groupId, 'RoleType': 1 })[0];
    }

    const getAllGLRecommendation = (ideaId) => {
        return _.filter(props.ideaRecommendations, { 'IdeaId': ideaId });
    }

    const getIdeaGroupSCMReview = (ideaId, groupId) => {
        return _.filter(props.ideaSCMReviews, { 'IdeaId': ideaId, 'GroupId': groupId })[0];
    }

    const getIdeaSCMDecision = (ideaId) => {
        return _.filter(props.SCDecisions, { 'IdeaId': ideaId })[0];
    }

    const getIFAllGLAgreed = (glRecommendations, primaryIdeaGroup, groupId) => {
        var filterRecommendation = [];
        if (groupId !== primaryIdeaGroup.GroupId) {
            filterRecommendation = glRecommendations.filter((item) => {
                return (item.GroupId.toLowerCase() === groupId || item.GroupId.toLowerCase() === primaryIdeaGroup.GroupId.toLowerCase() && item.RecommendationType > 0)
            });

        } else {
            filterRecommendation = glRecommendations;
        }
        var uniqueRecommendations = _.assign([], _.uniq(_.map(filterRecommendation, 'RecommendationType')));
        var filteredRecommendations = uniqueRecommendations.filter((i) => i)
        return filteredRecommendations.length > 1 ? false : true;
    }

    const getDecisionStatus = (glRecommendation, scmReview, scDecision, scmReviewNotRequired) => {
        if (scDecision && scDecision > 0) {
            return 3;
        } else {
            if (scmReview || scmReviewNotRequired) {
                return 2;
            } else {
                if (glRecommendation) {
                    if (glRecommendation && glRecommendation > 0) {
                        return 1;
                    } else {
                        return 0;
                    }
                }
                else {
                    return 0;
                }
            }
        }
    }

    const _goToIdea = (ideaId, ideaGroupId, tabName) => {
        props.goToIdea ? props.goToIdea(ideaId, ideaGroupId, tabName) : null;
    }

    const allGLAgreed = (props.glsDisagreeOnRecommendation === 1) ? false : true;
    const isPrimaryGroup = props.isPrimary;
    const glRecommendation = props.glRecommendation;
    const scmReview = props.scmReview;
    const scDecision = props.scDecision;
    const decisionStatus = getDecisionStatus(glRecommendation, scmReview, scDecision, props.scmReviewNotRequired);
    const decisionType = props.scDecision ? props.scDecision : (props.glRecommendation ? props.glRecommendation : null);
    return (

        <View style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
            <TouchableOpacity onPress={() => { _goToIdea(props.ideaId, props.ideaGroupId, 'Decision') }} >
                {renderProgress(decisionType, allGLAgreed, isPrimaryGroup)}
                <View>
                    {getDots(decisionStatus, glRecommendation, scmReview)}
                </View>
            </TouchableOpacity>
        </View>
    );

}

export default Decision;
