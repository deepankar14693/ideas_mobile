import React from 'react';
import GroupScreen from './group';
import FocusAreaScreen from './focusArea';
import DetailsScreen from './details';
import RiskScreen from './risk';
import ValueScreen from './value';
import DecisionScreen from './decision';

export const Group = (props) => <GroupScreen {...props} name="Group" />;
export const FocusArea = (props) => <FocusAreaScreen {...props} name="FocusArea" />;
export const Details = (props) => <DetailsScreen {...props} name="Details" />;
export const Risk = (props) => <RiskScreen {...props} name="Risk" />;
export const Value = (props) => <ValueScreen {...props} name="Value" />;
export const Decision = (props) => <DecisionScreen {...props} name="Decision" />;
