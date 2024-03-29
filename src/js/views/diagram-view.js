import { showAlert } from '../components/alerts.js';
import { showLoader } from '../components/pageLoader.js';
import { ERR, POLICIES_NAMESPACES } from '../config.js';
import { orgUnitsStore } from '../stores/orgUnits.store.js';
import { resolvedPoliciesStore } from '../stores/resolvedPolicies.store.js';
import EditPolicies from './edit-policies-view.js';

const insertChildren = (node, firstRound) => {
    let elementId = node.parentId;
    let childrenHtml = '<ul id=' + node.id + '></ul>';

    if (firstRound) {
        elementId = 'root-nodes';
    }

    if (node.children.length < 1) {
        childrenHtml = '';
    }

    function wrapNodeName(name) {
        const MAX_LENGTH = 20;
        const MAX_LINES = 3;

        function wrapString(s, width) {
            s = s.trim();

            if (s.length <= width) {
                return s;
            }

            let lastSpaceIndex = s.lastIndexOf(' ', width);
            if (lastSpaceIndex === -1) {
                lastSpaceIndex = width;
            }

            const head = s.substring(0, lastSpaceIndex).trimStart();
            const rest = s.substring(lastSpaceIndex).trimEnd();

            return head + '\n' + wrapString(rest, width);
        }

        const resultString = wrapString(name, MAX_LENGTH);
        const resultArray = resultString.split('\n');
        return resultArray.length > MAX_LINES
            ? resultArray.slice(0, MAX_LINES).join('<br />') + '...'
            : resultArray.join('<br />');
    }

    document.getElementById(elementId).innerHTML +=
        '' +
        '<li>' +
        '<div class="dropdown">' +
        '<a class="dropbtn">' +
        '<div class="node-title" id="nodeNamesId">' +
        wrapNodeName(node.name) +
        '</div>' +
        '</a>' +
        '<div class="dropdown-content">' +
        '<a href="#" class="margin-bot margin-top export-policies-button" data-node-id="' +
        node.id +
        '">Download Policies</a>' +
        '<a href="#" class="margin-bot edit-policies-button" data-node-id="' +
        node.id +
        '" data-node-path="' +
        node.path +
        '">Edit Policies</a>' +
        '<a href="#" class="margin-bot upload-policies-button" data-node-id="' +
        node.id +
        '" data-node-path="' +
        node.path +
        '">Upload Policies</a>' +
        '<input type="file" id="policiesFile" name="policiesFile" accept=".json" style="display: none;">' +
        '</div>' +
        '</div>' +
        childrenHtml +
        '</li>';

    for (let i = 0, len = node.children.length; i < len; i++) {
        insertChildren(node.children[i], false);
    }
};

const renderEditPoliciesPage = async (elem, currentPolicies, newPolicies, ouPathName, ouId) => {
    elem.innerHTML = await EditPolicies.render(newPolicies, ouPathName, currentPolicies);
    await EditPolicies.post_render(ouPathName, ouId);
};

const Diagram = {
    /**
     * Render the component content.
     */
    render: async () => {
        return `
            <div class="info-note">
                <p>
                    <strong>Important Information!</strong>&nbsp;&nbsp;It is recommended to download settings before editing.
                    <br>
                    <br>
                    These namespaces are the one available in this version:<br>
                    + ${POLICIES_NAMESPACES.map((namespace) => {
                        return '<strong>' + namespace + '</strong> | ';
                    }).join(' ')}
                </p>
            </div>
            <div id="alert-message"></div>
            <div class="tree" id="diagramDivId">
                <ul>
                    <li id="diagramContent"></li>
                </ul>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async () => {
        let diagramContent = document.getElementById('diagramContent');
        let contentElement = document.getElementById('content');
        let diagramDivId = document.getElementById('diagramDivId');

        // Start page loader
        showLoader(diagramContent, true, '');

        // Get OUs data
        let orgUnitsData = await orgUnitsStore();

        if (orgUnitsData.length > 0) {
            // Inserting parent node
            diagramContent.innerHTML =
                '' +
                '<a><div id="rootDiagramNode" class="node-title">Root Org Unit</div></a>' +
                '<ul id="root-nodes"></ul>';

            // Inserting children nodes
            for (let i = 0, len = orgUnitsData.length; i < len; i++) {
                insertChildren(orgUnitsData[i], true);
            }

            // Scroll diagram to center
            let nodeRootElement = document.getElementById('rootDiagramNode');
            // console.log(nodeRootElement.getBoundingClientRect());
            diagramDivId.scrollLeft = nodeRootElement.getBoundingClientRect().left / 2;
            //diagramDivId.scrollBy(nodeRootPositionX,0);
        } else {
            // TODO: handle diagram content not loaded
        }

        diagramContent.addEventListener('click', async (event) => {
            // Edit policies button
            if (
                event.target &&
                event.target.getAttribute('class') &&
                event.target.getAttribute('class').includes('edit-policies-button')
            ) {
                let nodeId = event.target.getAttribute('data-node-id');
                let nodePath = event.target.getAttribute('data-node-path');

                // Start page loader
                showLoader(contentElement, true, 'Preparing to fetch policies...');

                let alertMessageElement = document.getElementById('loaderSubText');

                // Render edit page and process data
                let policies = await resolvedPoliciesStore(
                    nodeId.substr(nodeId.indexOf(':') + 1),
                    POLICIES_NAMESPACES,
                    alertMessageElement
                );

                if (policies) {
                    showLoader(contentElement, false);
                    await renderEditPoliciesPage(contentElement, null, policies, nodePath, nodeId);
                } else {
                    // TODO: call diagram back -- maybe use Events
                }
            }

            // Download policies button
            if (
                event.target &&
                event.target.getAttribute('class') &&
                event.target.getAttribute('class').includes('export-policies-button')
            ) {
                let nodeId = event.target.getAttribute('data-node-id');

                // Start page loader
                showLoader(contentElement, true, 'Preparing to fetch policies...');
                let alertMessageElement = document.getElementById('loaderSubText');

                // Render edit page and process data
                let policies = await resolvedPoliciesStore(
                    nodeId.substr(nodeId.indexOf(':') + 1),
                    POLICIES_NAMESPACES,
                    alertMessageElement
                );

                if (policies) {
                    showLoader(contentElement, false);
                    downloadObjectAsJson(policies, 'Policies', event.target);
                    window.location.reload();
                } else {
                    // TODO: call diagram back -- maybe use Events
                }
            }

            // Upload policies button
            if (
                event.target &&
                event.target.getAttribute('class') &&
                event.target.getAttribute('class').includes('upload-policies-button')
            ) {
                const uploadFileInput = document.getElementById('policiesFile');
                let nodePath = event.target.getAttribute('data-node-path');
                let nodeId = event.target.getAttribute('data-node-id');

                uploadFileInput.click();
                uploadFileInput.addEventListener('change', (event) => {
                    let reader = new FileReader();

                    reader.onload = async (_event) => {
                        try {
                            let newParsedPolicies = JSON.parse(_event.target.result);

                            if (Object.keys(newParsedPolicies)[0] && newParsedPolicies[Object.keys(newParsedPolicies)[0]][0].policiesAdditionalTargetKeys) {
                                // Start page loader
                                showLoader(contentElement, true, 'Preparing to fetch policies...');

                                // Download current policies
                                const cPolicies = await resolvedPoliciesStore(
                                  nodeId.substr(nodeId.indexOf(':') + 1),
                                  Object.keys(newParsedPolicies),
                                  null
                                );


                                showLoader(contentElement, false);
                                await renderEditPoliciesPage(contentElement, cPolicies, newParsedPolicies, nodePath, nodeId);
                            } else {
                                showAlert('alert-message', ERR.WRONG_POLICIES_FILE.message, ERR.WRONG_POLICIES_FILE.color);
                            }
                        } catch (e) {
                            console.log(e);
                            showAlert('alert-message', ERR.POLICIES_FILE.message, ERR.POLICIES_FILE.color);
                        }
                    };

                    reader.readAsText(event.target.files[0]);
                });
            }
        });
    },
};

function downloadObjectAsJson(exportObj, exportName, element) {
    let dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(exportObj));
    element.setAttribute('href', dataStr);
    element.setAttribute('download', exportName + '.json');
    element.click();
}

export default Diagram;
