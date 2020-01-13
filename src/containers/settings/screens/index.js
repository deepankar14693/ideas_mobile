import React from 'react';
import PerformanceLogScreen from './performanceLog';
import SettingsScreen from './settings';


export const PerformanceLog = (props) => <PerformanceLogScreen {...props} name="Logs" />;
export const Settings = (props) => <SettingsScreen {...props} name="Settings" />;