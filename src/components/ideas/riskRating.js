import { Text } from 'native-base';
import React from 'react';
import { Dimensions, View, TouchableOpacity } from 'react-native';
import { Icon, Tooltip } from 'react-native-elements';
import { getRiskName, translateKey } from '../../common/utils';
import { ideaListRVDStyles } from '../../css/ideaListViews';
import Dot from '../common/dot';

function RiskRating(props) {

    const renderDots = (dotsArray) => {
        return dotsArray.map(function (dot) {
            if (dot.isWhite) {
                return (<div key={'dot_' + dot.key} className='dot-unselected-withbgColor'></div>)
            } else {
                return (<div key={'dot_' + dot.key} className='dot-unselected-withoutbgColor'></div>)
            }
        });
    }

    const renderSelectedDots = (dotsArray) => {
        const roughRisk = props.roughRisk;
        const glRisk = props.glRisk;
        const riskStatus = props.riskStatus;
        const isCurrentGroup = props.isCurrentGroup;
        const glRiskRatingId = props.glRiskRatingId;
        return dotsArray.map(function (dot) {
            if (isCurrentGroup) {
                if ((dot.key === 0 && riskStatus > 1 && (roughRisk === 0 || roughRisk === null || roughRisk === " " || roughRisk === ""))
                    || (dot.key === 1 && riskStatus > 1 && (!glRiskRatingId))
                    || (dot.key === 1 && riskStatus > 1 && (glRiskRatingId && (glRisk === 0 || glRisk === null || glRisk === " " || glRisk === "")))
                ) {
                    if (dot.isWhite) {
                        return (<div key={'dot_' + dot.key} className='left cross-selected-withbgColor'><i className='close' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
                    } else {
                        return (<div key={'dot_' + dot.key} className='left cross-unselected-withbgColor'><i className='close' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
                    }
                }
                else {
                    if (dot.isWhite) {
                        return (<div key={'dot_' + dot.key} className='dot-selected-withbgColor'></div>)
                    } else {
                        return (<div key={'dot_' + dot.key} className='dot-selected-withoutbgColor'></div>)
                    }
                }

            } else {
                if (dot.key === 0 || dot.key === 2 || dot.key === 3) {
                    return (<div key={'dot_' + dot.key} className='left cross-selected-withbgColor'><i className='close' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
                } else {
                    if ((glRiskRatingId && (glRisk === 0 || glRisk === null || glRisk === " " || glRisk === "")) || !glRiskRatingId) {
                        return (<div key={'dot_' + dot.key} className='dot-selected-withoutbgColor'></div>)
                    } else {
                        return (<div key={'dot_' + dot.key} className='dot-selected-withbgColor'></div>)
                    }
                }
            }
        });
    }

    const returnDotsArray = (noOfDots, stage) => {
        var dotsArray = [];
        for (var i = 0; i < noOfDots; i++) {
            if (stage !== 0 && i < stage) {
                dotsArray.push({ key: i, isWhite: true });
            } else {
                dotsArray.push({ key: i, isWhite: false });
            }
        }
        return dotsArray;
    }

    const getIdeaToolTip = (riskArray, selectedRisk, noOfDots) => {
        return riskArray.sort().map(function (risk) {
            return (
                <div key={risk.text}>
                    {risk.stage === selectedRisk &&
                        <div>
                            <div className="left wd60 tooltip-selected" style={{ fontSize: '10px', position: 'relative' }}>
                                <i className='ion-arrow-right-c tooltip-arrow' style={{ position: 'absolute', left: -15, top: -2 }}></i>
                                {translateKey(risk.text)}
                            </div>
                            <div className="left wd40 tooltip-selected" style={{ fontSize: '11px', paddingTop: '3px' }}>
                                {renderSelectedDots(returnDotsArray(noOfDots, risk.stage))}
                            </div>
                        </div>}
                    {risk.stage !== selectedRisk &&
                        <div>
                            <div className="left wd60" style={{ fontSize: '10px', color: '#B0BCD0' }}>
                                {translateKey(risk.text)}
                            </div>
                            <div className="left wd40" style={{ fontSize: '11px', paddingTop: '3px', color: '#B0BCD0' }}>
                                {renderDots(returnDotsArray(noOfDots, risk.stage))}
                            </div>
                        </div>}

                </div>
            )
        });
    }

    const getColorValues = (riskRating) => {
        if (riskRating === 1) {
            return {
                boxStyle: ideaListRVDStyles.low,
                textValue: getRiskName(riskRating)
            }
        } else if (riskRating === 2) {
            return {
                boxStyle: ideaListRVDStyles.medium,
                textValue: getRiskName(riskRating)
            }
        } else if (riskRating === 3) {
            return {
                boxStyle: ideaListRVDStyles.high,
                textValue: getRiskName(riskRating)
            }
        }
        return {
            boxStyle: ideaListRVDStyles.default,
            textValue: ''
        }
    }

    const getDots = (riskStatus) => {
        const roughRisk = props.roughRisk;
        const glRisk = props.glRisk;
        const glRiskRatingId = props.glRiskRatingId;
        if (riskStatus === 1) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {translateKey('RiskRoughStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {(roughRisk === 0 || roughRisk === null || roughRisk === " " || roughRisk === "") &&
                            <Dot type={3} />
                        }
                        {!(roughRisk === 0 || roughRisk === null || roughRisk === " " || roughRisk === "") &&
                            <Dot type={2} />
                        }
                        <Dot type={1} />
                        <Dot type={1} />
                        <Dot type={1} />
                    </View>
                </View>
            )
        } else if (riskStatus === 2) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {translateKey('RiskGLStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {(roughRisk === 0 || roughRisk === null || roughRisk === " " || roughRisk === "") &&
                            <Dot type={3} />
                        }
                        {!(roughRisk === 0 || roughRisk === null || roughRisk === " " || roughRisk === "") &&
                            <Dot type={2} />
                        }
                        {!glRiskRatingId &&
                            <Dot type={3} />
                        }
                        {(glRiskRatingId && (glRisk === 0 || glRisk === null || glRisk === " " || glRisk === "")) &&
                            <Dot type={3} />
                        }
                        {(glRiskRatingId && !(glRisk === 0 || glRisk === null || glRisk === " " || glRisk === "")) &&
                            <Dot type={2} />
                        }
                        <Dot type={1} />
                        <Dot type={1} />
                    </View>
                </View>
            )
        }
        else if (riskStatus === 3) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {translateKey('RiskAllRatersStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {(roughRisk === 0 || roughRisk === null || roughRisk === " " || roughRisk === "") &&
                            <Dot type={3} />
                        }
                        {!(roughRisk === 0 || roughRisk === null || roughRisk === " " || roughRisk === "") &&
                            <Dot type={2} />
                        }
                        {!glRiskRatingId &&
                            <Dot type={3} />
                        }
                        {(glRiskRatingId && (glRisk === 0 || glRisk === null || glRisk === " " || glRisk === "")) &&
                            <Dot type={3} />
                        }
                        {(glRiskRatingId && !(glRisk === 0 || glRisk === null || glRisk === " " || glRisk === "")) &&
                            <Dot type={2} />
                        }
                        <Dot type={2} />
                        <Dot type={1} />
                    </View>
                </View>
            )
        }
        else if (riskStatus === 4) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {translateKey('RiskCompleteStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {(roughRisk === 0 || roughRisk === null || roughRisk === " " || roughRisk === "") &&
                            <Dot type={3} />
                        }
                        {!(roughRisk === 0 || roughRisk === null || roughRisk === " " || roughRisk === "") &&
                            <Dot type={2} />
                        }
                        {!glRiskRatingId &&
                            <Dot type={3} />
                        }
                        {(glRiskRatingId && (glRisk === 0 || glRisk === null || glRisk === " " || glRisk === "")) &&
                            <Dot type={3} />
                        }
                        {(glRiskRatingId && !(glRisk === 0 || glRisk === null || glRisk === " " || glRisk === "")) &&
                            <Dot type={2} />
                        }
                        <Dot type={2} />
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
                    <Dot type={1} />
                </View>
            </View>
        )
    }

    const getDotOtheGroups = (risk) => {
        return (
            <View style={ideaListRVDStyles.stageContainer}>
                <Text style={ideaListRVDStyles.stageText}>
                    {translateKey(risk ? 'RiskGLStage' : 'NotStarted')}
                </Text>
                <View style={ideaListRVDStyles.dotsContainer}>
                    <Dot type={3} />
                    {!props.glRiskRatingId && !(risk === 0 || risk === null || risk === " " || risk === "") &&
                        <Dot type={3} />
                    }
                    {(risk === 0 || risk === null || risk === " " || risk === "") &&
                        <Dot type={1} />
                    }
                    {!(risk === 0 || risk === null || risk === " " || risk === "") &&
                        <Dot type={2} />
                    }
                    <Dot type={3} />
                    <Dot type={3} />
                </View>
            </View>
        )
    }

    const renderStage = (value) => {
        if (value === null || value === 0) {
            return (0);
        }
        else {
            return (value);
        }
    }

    const renderRating = (value) => {
        if (value === 0 || value === null || value === " " || value === "") {
            return (0);
        }
        else {
            return (value);
        }
    }

    const _goToIdea = (ideaId, ideaGroupId, tabName) => {
        props.goToIdea ? props.goToIdea(ideaId, ideaGroupId, tabName) : null;
    }

    const rating = props.riskRatingType;
    const cssStyles = getColorValues(rating);
    let allCTMAgreed = (props.ctmDisagreement === 1 ? false : true);
    let glAgreed = (props.glDisagreement === 1 ? false : true);;
    let isPrimaryGroup = props.isPrimary;
    const isCurrentGroup = props.isCurrentGroup;

    return (
        <View style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
            <TouchableOpacity onPress={() => { _goToIdea(props.ideaId, props.ideaGroupId, 'Risk') }} >
                <View style={cssStyles.boxStyle}>
                    <Text style={{ color: '#1d3f77' }}>{cssStyles.textValue} </Text>
                    {(!glAgreed && allCTMAgreed && isPrimaryGroup && !props.isHidden) &&
                        <View>
                            <Tooltip withOverlay={false} popover={<Text>{translateKey('GLRiskWarningForPrimaryGroup')}</Text>}>
                                <Icon name='exclamation-triangle'
                                    type='font-awesome'
                                    size={15}
                                    color='#fe5e59' />
                            </Tooltip>
                        </View>
                    }
                    {(!glAgreed && !isPrimaryGroup && !props.isHidden) &&
                        <View>
                            <Tooltip withOverlay={false} popover={<Text>{translateKey('GLRiskWarningForLinkedGroup')}</Text>}>
                                <Icon name='exclamation-triangle'
                                    type='font-awesome'
                                    size={15}
                                    color='#fe5e59' />
                            </Tooltip>
                        </View>
                    }
                    {(glAgreed && isPrimaryGroup && !allCTMAgreed && !props.isHidden) &&
                        <View>
                            <Tooltip withOverlay={false} popover={<Text>{translateKey('CTMRiskWarningForPrimaryGroup')}</Text>}>
                                <Icon name='exclamation-triangle'
                                    type='font-awesome'
                                    size={15}
                                    color='#fe5e59' />
                            </Tooltip>
                        </View>
                    }
                    {(!glAgreed && !allCTMAgreed && isPrimaryGroup && !props.isHidden) &&
                        <View>
                            <Tooltip withOverlay={false} popover={<Text>{translateKey('GLRiskPlusCTMWarningForPrimaryGroup')}</Text>}>
                                <Icon name='exclamation-triangle'
                                    type='font-awesome'
                                    size={15}
                                    color='#fe5e59' />
                            </Tooltip>
                        </View>
                    }
                </View>
                <View>
                    {isCurrentGroup ? getDots(props.riskStatus) : getDotOtheGroups(renderRating(rating))}
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default RiskRating;
