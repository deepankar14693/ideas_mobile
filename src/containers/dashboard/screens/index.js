import React from "react";
import DashboardScreen from '../dashboard';
import ResolveScreen from './resolve';
import ReviewScreen from './review';
import SCRFilter from '../scrFilter';

export const Summary = (props) => [<SCRFilter key="SCRFilter_0" {...props} name="SCRFilter" />, <DashboardScreen key="DashboardScreen_1" {...props} name="Summary" />];
export const Resolve = (props) => [<SCRFilter key="Resolve_SCRFilter_0" {...props} name="SCRFilter" />, <ResolveScreen key="Resolve_2" {...props} name="Resolve" />];
export const Review = (props) => [<SCRFilter key="Review_SCRFilter_0" {...props} name="SCRFilter" />, <ReviewScreen key="Review_3" {...props} name="Review" />];
