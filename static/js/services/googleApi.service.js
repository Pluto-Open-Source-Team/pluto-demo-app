let organizationUnitsAPIResponse = [
    {
        "kind": "admin#directory#orgUnit",
        "etag": "\"vFAtQLRJ8eua8wM9zK5Ax1tjB1UzIeykpdxcOTZoOTw/Hyi_4orwZE31DhkPwvccb-RbH28\"",
        "name": "Chromebook",
        "description": "Without federation for Chromebook",
        "orgUnitPath": "/User/Office 365/Chromebook",
        "orgUnitId": "id:03ph8a2z1fju3b2",
        "parentOrgUnitPath": "/User/Office 365",
        "parentOrgUnitId": "id:03ph8a2z3igyslm"
    },
    {
        "kind": "admin#directory#orgUnit",
        "etag": "\"vFAtQLRJ8eua8wM9zK5Ax1tjB1UzIeykpdxcOTZoOTw/5Zz4dyquVmSwquHX8aeCTrYHM1U\"",
        "name": "Google Workspace",
        "description": "Google Workspace",
        "orgUnitPath": "/User/Google Workspace",
        "orgUnitId": "id:03ph8a2z13iejgx",
        "parentOrgUnitPath": "/User",
        "parentOrgUnitId": "id:03ph8a2z2v4swbn"
    },
    {
        "kind": "admin#directory#orgUnit",
        "etag": "\"vFAtQLRJ8eua8wM9zK5Ax1tjB1UzIeykpdxcOTZoOTw/IXZCTFCsVOHd8phIsCRuWipy-wg\"",
        "name": "Office 365",
        "description": "",
        "orgUnitPath": "/User/Office 365",
        "orgUnitId": "id:03ph8a2z3igyslm",
        "parentOrgUnitPath": "/User",
        "parentOrgUnitId": "id:03ph8a2z2v4swbn"
    },
    {
        "kind": "admin#directory#orgUnit",
        "etag": "\"vFAtQLRJ8eua8wM9zK5Ax1tjB1UzIeykpdxcOTZoOTw/rf-XzR5mSjc-SaGhW1YVfeejmdM\"",
        "name": "Device",
        "description": "",
        "orgUnitPath": "/Device",
        "orgUnitId": "id:03ph8a2z2rot47i",
        "parentOrgUnitPath": "/",
        "parentOrgUnitId": "id:03ph8a2z0pyg21q"
    },
    {
        "kind": "admin#directory#orgUnit",
        "etag": "\"vFAtQLRJ8eua8wM9zK5Ax1tjB1UzIeykpdxcOTZoOTw/S8bNeSPl9WRbhUgznts5oU0ImZY\"",
        "name": "Chromebook",
        "description": "",
        "orgUnitPath": "/Device/Chromebook",
        "orgUnitId": "id:03ph8a2z1kutfm6",
        "parentOrgUnitPath": "/Device",
        "parentOrgUnitId": "id:03ph8a2z2rot47i"
    },
    {
        "kind": "admin#directory#orgUnit",
        "etag": "\"vFAtQLRJ8eua8wM9zK5Ax1tjB1UzIeykpdxcOTZoOTw/2dgBEqqzBKFd2gHbMJXyLTFiD0g\"",
        "name": "Admin",
        "description": "",
        "orgUnitPath": "/Admin",
        "orgUnitId": "id:03ph8a2z0tunq45",
        "parentOrgUnitPath": "/",
        "parentOrgUnitId": "id:03ph8a2z0pyg21q"
    },
    {
        "kind": "admin#directory#orgUnit",
        "etag": "\"vFAtQLRJ8eua8wM9zK5Ax1tjB1UzIeykpdxcOTZoOTw/2XAYcbbf2U31tSoHINaBWg6xxVw\"",
        "name": "User",
        "description": "",
        "orgUnitPath": "/User",
        "orgUnitId": "id:03ph8a2z2v4swbn",
        "parentOrgUnitPath": "/",
        "parentOrgUnitId": "id:03ph8a2z0pyg21q"
    },
    {
        "kind": "admin#directory#orgUnit",
        "etag": "\"vFAtQLRJ8eua8wM9zK5Ax1tjB1UzIeykpdxcOTZoOTw/NuagJlMly72jhrPbyOCaaPGwe7I\"",
        "name": "Chromebook",
        "description": "Without federation for Chromebook",
        "orgUnitPath": "/User/Google Workspace/Chromebook",
        "orgUnitId": "id:03ph8a2z4d0vczk",
        "parentOrgUnitPath": "/User/Google Workspace",
        "parentOrgUnitId": "id:03ph8a2z13iejgx"
    }
];

class GoogleApiService {

    retrievesAllOrganizationalUnits = (accessToken) => new Promise((resolve, reject) => {
        resolve(organizationUnitsAPIResponse);
    });
}

const googleApiService = new GoogleApiService();

export default googleApiService;
