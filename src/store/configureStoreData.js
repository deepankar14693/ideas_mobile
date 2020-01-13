import AppConfig from '../appConfig';

export const organizationMasterData = {
    isLoading: true, showProject: false, projectConfig: [], config: [], projects: [], projectPermissions: []
};

export const masterData = {
    isLoading: true, groups: [], teams: [], focusAreas: [], crossGroupTopics: [], users: [], salaryRange: [], projectConfig: [], config: [], category: [], timings: [], customFields: [], functionalTitles: [],
    leaderShip: [], leaderShipArray: [], roles: [], sessions: [], userNoteTimestamp: null, snapshotTime: null, IsSnapshotInstance: false, focusAreaUsageCount: 0, isLoadingFocusAreaUsageCount: false
};

const scrData = { Summary: [], Resolve: [], Review: [] };

export const mobileDashboardData = {
    isLoading: true, scr1Data: scrData, scr2Data: scrData, scr3Data: scrData
}

export const dashboardCheckList = {
    isLoading: true, CheckList: []
}

export const permissionsData = () => {
    return {
        isLoading: true, rolePermissions: {}, userPermissions: {}, userGroups: {}, userProjects: {}, isCompanyPermission: false, companyPermissionType: 0
    }
};

export const dashboardFilter = () => {
    return {
        currentFilter: { filterArray: [], ideas: [], ideaIds: [] }, phase: AppConfig.defaultDashboardPhase, currentTaskWeekNumber: null,
        valueType: '1', recommendationType: '1', decisionType: '1'
    }
};

export const dahboardData = {
    data: [], details: [], details2: [], baselineData: [], proformaDetails: [], valueComponentDetails: [],
    multiGroupIdeasDetails: [], fteDetails: [], ideasWithVarianceData: []
};

export const ideaData = {
    crossGroupTopics: [],
    ideas: [],
    openIdeas: [],
    ideaGroups: [],
    ideaTeams: [],
    ideaCrossGroupTopics: [],
    ideaNonPersonnelLineItems: [],
    ideaPersonnelLineItems: [],
    ideaRevenueLineItems: [],
    ideaRiskRatings: [],
    ideaRecommendations: [],
    ideaSCDecisions: [],
    ideaSCMReviews: [],
    ideaCustomFields: [],
    teams: [],
    tranferredIdeas: [],
    milestones: [],
    metrics: [],
    isLoading: true,
    isDashboardLoading: true,
    isImplementationDataLoading: true,
    openedIdeaGroup: { ideaGroupId: null, tab: '' }
};

export const notify = {
    showNotification: true, alertType: 1
};

export const executiveDashboardData = {
    executiveData: {},
    isLoading: true
}
