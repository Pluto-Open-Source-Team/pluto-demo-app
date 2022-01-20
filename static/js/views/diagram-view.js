import { orgUnitsStore } from "../stores/orgUnits.store.js";

const insertChildren = (node, firstRound) => {
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
                '</a>' +
                '<div class="dropdown-content">' +
                    '<a href="#" class="margin-bot margin-top diagram-export-button" data-node-id="' + node.id + '">Export Policies</a>' +
                    '<a href="#" class="margin-bot diagram-edit-button" data-node-id="' + node.id + '">Edit Policies</a>' +
                '</div>' +
            '</div>' +
            childrenHtml +
        '</li>';

    for (let i = 0, len = node.children.length; i < len; i++) {
        insertChildren(node.children[i], false);
    }
};

const Diagram = {
    /**
     * Render the component content.
     */
    render: async () => {
        return `
            <div class="info-note">
                <p>
                    <strong>Important Information!</strong>&nbsp;&nbsp;It is recommended to export settings before editing.
                    <br>
                    <br>
                    These namespaces are the one available in this version:<br>
                    + <strong>chrome.users.*</strong>
                    <br>
                    + <strong>chrome.devices.*</strong>
                </p>
            </div>
            <div class="tree">
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

        // Inserting parent node
        diagramContent.innerHTML = '' +
            '<a><div class="node-title">Root Node</div></a>' +
            '<ul id="root-nodes"></ul>';

        // Get OUs data
        let orgUnitsData = await orgUnitsStore();

        // Inserting children nodes
        for (let i = 0, len = orgUnitsData.length; i < len; i++) {
            insertChildren(orgUnitsData[i], true);
        }
    }
};

export default Diagram;
