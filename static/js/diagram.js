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

let orgUnitsFormatted = [];
let orgUnitsChildren = [];

// Round 1: Format parents
for (let i = 0; i < organizationUnitsAPIResponse.length; i++) {
    const orgUnitObj = organizationUnitsAPIResponse[i];
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
                        let done = this.checkChildren(_obj[i].children[j], _childObj);
                        if (done) {
                            return true;
                        }
                    }
                }
            }
        }
    }
}

// Inserting parent node
document.getElementById('diagram-content').innerHTML = '' +
    '<a><div class="node-title">Root Node</div></a>' +
    '<ul id="root-nodes"></ul>';

// Inserting children nodes
for (let i = 0, len = orgUnitsFormatted.length; i < len; i++) {
    insertChildren(orgUnitsFormatted[i], true);
}

function insertChildren(node, firstRound) {
    let elementId = node.parentId;
    let childrenHtml = '<ul id=' + node.id + '></ul>';

    if (firstRound) {
        elementId = 'root-nodes';
    }

    if (node.children.length < 1) {
        childrenHtml = '';
    }

    document.getElementById(elementId).innerHTML += '' +
        '<li>' +
            '<div class="dropdown">' +
                '<a class="dropbtn">' +
                    '<div class="node-title">' + node.name + '</div>' +
                    '<div class="node-sub-title">' + node.id + '</div>' +
                '</a>' +
                '<div class="dropdown-content">' +
                    '<a href="#" class="margin-bot margin-top">Export Policies</a>' +
                    '<a href="#" class="margin-bot">Edit Policies</a>' +
                '</div>' +
            '</div>' +
            childrenHtml +
        '</li>';

    for (let i = 0, len = node.children.length; i < len; i++) {
        insertChildren(node.children[i], false);
    }
}
