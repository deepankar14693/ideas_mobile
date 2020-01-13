
import combineSectionReducers from 'combine-section-reducers';
import organizationMasterData from '../reducers/organizationMasterData';
import masterData from '../reducers/masterData';
import permissionMasterData from '../reducers/permissionMasterData';
import MobileDashboardReducer from '../reducers/mobileDashboard';
import MobileIdeaReducer from '../reducers/mobileIdea';
import DashboardCheckListReducer from '../reducers/mobileDashboardCheckList';
import notify from '../reducers/notify';
import performanceLog from '../reducers/performanceLog';
import executiveDashboardReducer from '../reducers/executiveDashboardReducer';

const allReducers = combineSectionReducers({
    organizationMasterData: organizationMasterData,
    masterData: masterData,
    permissions: permissionMasterData,
    mobileDashboardData: MobileDashboardReducer,
    dashboardCheckList: DashboardCheckListReducer,
    ideaData: MobileIdeaReducer,
    notify: notify,
    performanceLog: performanceLog,
    executiveDashboardData: executiveDashboardReducer
})

export default allReducers;