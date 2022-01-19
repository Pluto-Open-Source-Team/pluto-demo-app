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
                    '<div class="node-sub-title">' + node.id + '</div>' + // TODO: Hide this ID from users
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
};

const Diagram = {
    /**
     * Render the component content.
     */
    render: async () => {
        return `
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
