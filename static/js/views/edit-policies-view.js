import {
    textInput,
    switchInput,
    colorInput
} from "../components/inputs.js";

const EditPolicies = {
    /**
     * Render the component content.
     */
    render: async (policies, orgUnitCompletePath) => {

        let tablesRows = '';

        for (let i = 0; i < Object.keys(policies).length; i++) {
            tablesRows += `
                <tr>
                    <th style="width:40%">${Object.keys(policies)[i]}</th>
                    <th></th>
                </tr>
            `;

            tablesRows += policies[Object.keys(policies)[i]].map(({leafName, value}) => {
                if (value.toString() && (value.toString().toLowerCase() === 'true' || value.toString().toLowerCase() === 'false')) {
                    return switchInput(leafName, value.toString().toLowerCase());
                } else if (/^#[0-9A-F]{6}$/i.test(value)) {
                    return colorInput(leafName, value);
                } else {
                    return textInput(leafName, value);
                }
            }).join('\n');
        }

        return `
            <div class="sub-content">
                <div>
                    <h3 class="edit-policies-title">${orgUnitCompletePath}</h3>
                </div>
                <div class="edit-table-div">
                    <table>
                        ${tablesRows}
                    </table>
                </div>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async () => {}
};

export default EditPolicies;
