import googleApiService from "../services/googleApi.service.js";

export const orgUnitsStore = async (accessToken) => {
    let orgUnitsFormatted = [];
    let orgUnitsChildren = [];

    const ouDataResponse = await googleApiService.retrievesAllOrganizationalUnits(accessToken);

    // Round 1: Format parents
    for (let i = 0; i < ouDataResponse.length; i++) {
        const orgUnitObj = ouDataResponse[i];
        const _formattedObj = {
            id: orgUnitObj.orgUnitId,
            name: orgUnitObj.name,
            path: orgUnitObj.orgUnitPath,
            parentId: orgUnitObj.parentOrgUnitId,
            parentPath: orgUnitObj.parentOrgUnitPath,
            children: [],
        };

        if (_formattedObj.parentPath === '/') {
            orgUnitsFormatted.push(_formattedObj);
        } else {
            orgUnitsChildren.push(_formattedObj);
        }
    }

    // Round 2: Format children
    while (orgUnitsChildren.length) {
        let currentNode = orgUnitsChildren.shift();

        if (currentNode) {
            let isAdded = false;
            for (let i = 0; i < orgUnitsFormatted.length; i++) {
                if (currentNode.parentId === orgUnitsFormatted[i].id) {
                    orgUnitsFormatted[i].children.push(currentNode);
                    isAdded = true;
                }
            }
            if (!isAdded) {
                let doneChecking = checkChildren(orgUnitsFormatted, currentNode);

                if (!doneChecking) {
                    orgUnitsChildren.push(currentNode);
                }
            }
        }
    }

    function checkChildren(_obj, _childObj) {
        if (_obj.id === _childObj.parentId) {
            _obj.children.push(_childObj);
            return true;
        } else {
            for (let i = 0, len = _obj.length; i < len; i++) {
                if (typeof _obj[i] === 'object') {
                    if (_obj[i].children.length > 0) {
                        for (let j = 0, lenJ = _obj[i].children.length; j < lenJ; j++) {
                            let done = checkChildren(_obj[i].children[j], _childObj);
                            if (done) {
                                return true;
                            }
                        }
                    }
                }
            }
        }
    }

    return orgUnitsFormatted;
};
