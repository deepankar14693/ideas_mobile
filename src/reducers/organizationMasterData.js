import update from 'immutability-helper';
import { GET_ORGANIZATION_MASTERDATA, CHANGE_ORGANIZATION } from '../actions/actionTypes';
import { prepareObjectFromArray } from '../common/utils';
import { organizationMasterData } from '../store/configureStoreData';

const organizationMasterDataReducer = (state = [], action) => {
    try {
        switch (action.type) {
            case CHANGE_ORGANIZATION:
                return organizationMasterData;

            case GET_ORGANIZATION_MASTERDATA:
                if (!action.payload) return state;

                let payloadData = action.payload.data;
                const projects = prepareObjectFromArray(payloadData.ProjectList.List, ["ProjectId"]);
                const configList = prepareObjectFromArray(payloadData.ConfigList.List, ["Key"]);
                const projectConfigList = prepareObjectFromArray(payloadData.ProjectConfigList.List, ["ProjectId", "Key"]);
                const tmpProjectPermissions = payloadData.ProjectPermissions;

                let projectPermissions = { rolePermissions: {}, userPermissions: {}, UserGroups: [], UserProjects: [] };
                //let projectPermissions = { rolePermissions: {}, userPermissions: {}, UserGroups: [], UserProjects: [], CompanyPermission: {}, CompanyPermissionType: {} };
                projectPermissions.UserGroups = tmpProjectPermissions.UserGroups;
                projectPermissions.UserProjects = tmpProjectPermissions.UserProjects;
                // projectPermissions.CompanyPermission = tmpProjectPermissions.CompanyPermission;
                // projectPermissions.CompanyPermissionType = tmpProjectPermissions.CompanyPermissionType;
                if (action.payload.data && action.payload.data.ProjectPermissions.RolePermissions) {
                    action.payload.data.ProjectPermissions.RolePermissions.map((p) => {
                        projectPermissions.rolePermissions[p.RoleId] = (p.PermissionIds.length > 0 ? ',' + p.PermissionIds + ',' : '');
                    });
                }
                if (action.payload.data && action.payload.data.ProjectPermissions.UserPermissions) {
                    action.payload.data.ProjectPermissions.UserPermissions.map((p) => {
                        projectPermissions.userPermissions[p.EntityId] = p.RoleId;
                    });
                }
                return update(state, {
                    showProject: { $set: payloadData.ShowProject },
                    projects: { $set: projects },
                    config: { $set: configList },
                    projectConfig: { $set: projectConfigList },
                    projectPermissions: { $set: projectPermissions },
                    isLoading: { $set: false },
                });
            default:
                return state;
        }
    }
    catch (err) { }
};

export default organizationMasterDataReducer;
