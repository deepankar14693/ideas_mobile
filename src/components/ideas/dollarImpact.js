import { Text } from 'native-base';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { formatAmount, translateKey } from '../../common/utils';
import { ideaListRVDStyles } from '../../css/ideaListViews';
import Dot from '../common/dot';

function DollarImpact(props) {

    const renderDots = (dotsArray, isITPermission) => {
        return dotsArray.map(function (dot) {
            if (dot.key === 3 && isITPermission) {
                return (<div key={'dot_' + dot.key} className='left cross-unselected-withbgColor'><i className='ion-close-round' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
            } else {
                if (dot.isWhite) {
                    return (<div key={'dot_' + dot.key} className='dot-unselected-withbgColor'></div>)
                } else {
                    return (<div key={'dot_' + dot.key} className='dot-unselected-withoutbgColor'></div>)
                }
            }
        });
    }

    const renderSelectedDots = (dotsArray, roughValue, valueStatus, isITPermission) => {
        return dotsArray.map(function (dot) {
            if ((dot.key === 0 && valueStatus > 1 && (roughValue === null || roughValue === '' || roughValue === '$0'))) {
                if (dot.isWhite) {
                    return (<div key={'dot_' + dot.key} className='left cross-selected-withbgColor'><i className='ion-close-round' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
                } else {
                    return (<div key={'dot_' + dot.key} className='left cross-unselected-withbgColor'><i className='ion-close-round' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
                }
            } else if ((dot.key === 3 && ((valueStatus > 3 && (props.isValidationNotRequired)) || (isITPermission)))) {
                return (<div key={'dot_' + dot.key} className='left cross-selected-withbgColor'><i className='ion-close-round' style={{ fontSize: 6, position: 'absolute' }}></i></div>)
            }
            else {
                if (dot.isWhite) {
                    return (<div key={'dot_' + dot.key} className='dot-selected-withbgColor'></div>)
                } else {
                    return (<div key={'dot_' + dot.key} className='dot-selected-withoutbgColor'></div>)
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

    const getIdeaToolTip = (valueArray, valueStatus, noOfDots, roughValue, isITPermission) => {
        if (valueStatus === null) { valueStatus = 0 }
        return valueArray.sort().map(function (value) {
            return (
                <div key={value.text}>
                    {value.stage === valueStatus &&
                        <div>
                            <div className="left wd65 tooltip-selected" style={{ fontSize: '10px', position: 'relative' }}>
                                <i className='ion-arrow-right-c tooltip-arrow' style={{ position: 'absolute', left: -15, top: -2 }}></i>
                                {(isITPermission) ? <span>{translateKey('IT')}<span>&nbsp;</span></span> : ''}
                                {translateKey(value.text)}
                            </div>
                            <div className="left wd40 tooltip-selected" style={{ fontSize: '11px', paddingTop: '3px' }}>
                                {renderSelectedDots(returnDotsArray(noOfDots, value.stage), roughValue, valueStatus, isITPermission)}
                            </div>
                        </div>}
                    {value.stage !== valueStatus &&
                        <div>
                            <div className="left wd65" style={{ fontSize: '10px', color: '#B0BCD0' }}>
                                {(isITPermission) ? <span>{(translateKey('IT'))}<span>&nbsp;</span></span> : ''}
                                {translateKey(value.text)}
                            </div>
                            <div className="left wd40" style={{ fontSize: '11px', paddingTop: '3px', color: '#B0BCD0' }}>
                                {renderDots(returnDotsArray(noOfDots, value.stage), isITPermission)}
                            </div>
                        </div>
                    }
                </div>
            )
        });
    }

    const getDots = (valueStatus, roughValue, isITPermission) => {
        if (valueStatus === 1) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {(isITPermission) ? <span>{translateKey('IT')}<span>&nbsp;</span></span> : ''}
                        {translateKey('ValueRoughStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {(roughValue === null || roughValue === '' || roughValue === '$0') &&
                            <Dot type={3} />
                        }
                        {!(roughValue === null || roughValue === '' || roughValue === '$0') &&
                            <Dot type={2} />
                        }
                        <Dot type={1} />
                        <Dot type={1} />
                        {(props.isValidationNotRequired || isITPermission) &&
                            <Dot type={3} />
                        }
                        {(!props.isValidationNotRequired && !isITPermission) &&
                            <Dot type={1} />
                        }
                    </View>
                </View>
            )
        } else if (valueStatus === 2) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {(isITPermission) ? <span>{translateKey('IT')}<span>&nbsp;</span></span> : ''}
                        {translateKey('ValueDetailedStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {(roughValue === null || roughValue === '' || roughValue === '$0') &&
                            <Dot type={3} />
                        }
                        {!(roughValue === null || roughValue === '' || roughValue === '$0') &&
                            <Dot type={2} />
                        }
                        <Dot type={2} />
                        <Dot type={1} />
                        {(props.isValidationNotRequired || isITPermission) &&
                            <Dot type={3} />
                        }
                        {(!props.isValidationNotRequired && !isITPermission) &&
                            <Dot type={1} />
                        }
                    </View>
                </View>
            )
        } else if (valueStatus === 3) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {(isITPermission) ? <span>{translateKey('IT')}<span>&nbsp;</span></span> : ''}
                        {translateKey('ValueCompleteStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {(roughValue === null || roughValue === '' || roughValue === '$0') &&
                            <Dot type={3} />
                        }
                        {!(roughValue === null || roughValue === '' || roughValue === '$0') &&
                            <Dot type={2} />
                        }
                        <Dot type={2} />
                        <Dot type={2} />
                        {(props.isValidationNotRequired || isITPermission) &&
                            <Dot type={3} />
                        }
                        {(!props.isValidationNotRequired && !isITPermission) &&
                            <Dot type={1} />
                        }
                    </View>
                </View>
            )
        } else if (valueStatus === 4) {
            return (
                <View style={ideaListRVDStyles.stageContainer}>
                    <Text style={ideaListRVDStyles.stageText}>
                        {(isITPermission) ? <span>{translateKey('IT')}<span>&nbsp;</span></span> : ''}
                        {translateKey('ValueValidatedStage')}
                    </Text>
                    <View style={ideaListRVDStyles.dotsContainer}>
                        {(roughValue === null || roughValue === '' || roughValue === '$0') &&
                            <Dot type={3} />
                        }
                        {!(roughValue === null || roughValue === '' || roughValue === '$0') &&
                            <Dot type={2} />
                        }
                        <Dot type={2} />
                        <Dot type={2} />
                        {(props.isValidationNotRequired || isITPermission) &&
                            <Dot type={3} />
                        }
                        {(!props.isValidationNotRequired && !isITPermission) &&
                            <Dot type={2} />
                        }
                    </View>
                </View>
            )
        }
        return (
            <View style={ideaListRVDStyles.stageContainer}>
                <Text style={ideaListRVDStyles.stageText}>
                    {(isITPermission) ? <span>{translateKey('IT')}<span>&nbsp;</span></span> : ''}
                    {translateKey('NotStarted')}
                </Text>
                <View style={ideaListRVDStyles.dotsContainer}>
                    <Dot type={1} />
                    <Dot type={1} />
                    <Dot type={1} />
                    {(isITPermission) &&
                        <Dot type={3} />
                    }
                    {(!isITPermission) &&
                        <Dot type={1} />
                    }
                </View>
            </View>
        )
    }

    const _goToIdea = (ideaId, ideaGroupId, tabName) => {
        props.goToIdea ? props.goToIdea(ideaId, ideaGroupId, tabName) : null;
    }

    const isCurrentSelectedGroupIsIT = props.isCurrentSelectedGroupIsIT;
    const ideaGroupData = { RoughValue: props.roughValue, ValueStatus: props.valueStatus, Value: props.value };
    if (isCurrentSelectedGroupIsIT) {
        ideaGroupData.ValueStatus = props.itValueStatus;
        ideaGroupData.RoughValue = props.itRoughValue;
    }

    return (
        <View style={{ display: 'flex', flex: 1, alignItems: 'stretch' }}>
            <TouchableOpacity onPress={() => { _goToIdea(props.ideaId, props.ideaGroupId, 'Value') }} >
                <View style={ideaListRVDStyles.default}>
                    <Text style={{ color: '#1d3f77' }}>{formatAmount(ideaGroupData.Value, true, ideaGroupData.ValueStatus > 0 ? true : false)}</Text>
                </View>
                <View>
                    {getDots(ideaGroupData.ValueStatus, ideaGroupData.RoughValue, isCurrentSelectedGroupIsIT)}
                </View>
            </TouchableOpacity>
        </View>
    );
}

export default DollarImpact;