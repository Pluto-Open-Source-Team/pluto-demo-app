import googleApiService from '../services/googleApi.service.js';

export const orgUnitsStore = async () => {
    let formattedOrganizationUnits = [];
    let readyOrganizationUnits = [];

    const ouDataResponse = await googleApiService.retrievesAllOrganizationalUnits();

    // Format JSON objects
    for (let i = 0; i < ouDataResponse.length; i++) {
        const orgUnitObj = ouDataResponse[i];
        const _formattedObj = {
            id: orgUnitObj.orgUnitId,
            name: orgUnitObj.name,
            path: orgUnitObj.orgUnitPath,
            parentId: orgUnitObj.parentOrgUnitId,
            parentPath: orgUnitObj.parentOrgUnitPath,
            pathTier: orgUnitObj.orgUnitPath.split('/').length,
            children: [],
        };

        formattedOrganizationUnits.push(_formattedObj);
    }

    // Reorder children
    formattedOrganizationUnits.sort((a, b) => {
        return a.pathTier - b.pathTier;
    });

    for (let i = 0, len = formattedOrganizationUnits.length; i < len; i++) {
        if (formattedOrganizationUnits[i].pathTier === 2) {
            readyOrganizationUnits.push(formattedOrganizationUnits[i]);
        } else {
            addNode(formattedOrganizationUnits[i], readyOrganizationUnits);
        }
    }

    function addNode(currentNode, nodes) {
        let isNodeAdded = false;

        for (let i = 0, len = nodes.length; i < len; i++) {
            if (nodes[i].id === currentNode.parentId) {
                nodes[i].children.push(currentNode);
                isNodeAdded = true;
            }
        }

        if (!isNodeAdded) {
            for (let i = 0, len = nodes.length; i < len; i++) {
                addNode(currentNode, nodes[i].children);
            }
        }
    }

    return readyOrganizationUnits;
};
