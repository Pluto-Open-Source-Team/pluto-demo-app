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
                    return switchInput(leafName, value.toString().toLowerCase(), Object.keys(policies)[i]);
                } else if (/^#[0-9A-F]{6}$/i.test(value)) {
                    return colorInput(leafName, value, Object.keys(policies)[i]);
                } else {
                    return textInput(leafName, value, Object.keys(policies)[i]);
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
                <div>
                    <button id="editApplyButtonId" class="edit-apply-button" type="button">Apply</button>
                </div>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async () => {
        let applyButton = document.getElementById('editApplyButtonId');
        let policiesInputs = document.getElementsByClassName('policies-inputs');

        applyButton.addEventListener("click", async (event) => {
            let policiesFromEdit = {};

            for (let i = 0; i < policiesInputs.length; i++) {
                const inputType = policiesInputs[i].getAttribute('type');
                const policyNamespace = policiesInputs[i].getAttribute('data-namespace');

                if (!(policyNamespace in policiesFromEdit)) {
                    policiesFromEdit[policyNamespace] = [];
                }

                if (inputType === 'checkbox') {
                    policiesFromEdit[policyNamespace].push({
                        leafName: policiesInputs[i].getAttribute('name'),
                        value: policiesInputs[i].checked
                    });
                } else {
                    policiesFromEdit[policyNamespace].push({
                        leafName: policiesInputs[i].getAttribute('name'),
                        value: policiesInputs[i].value
                    });
                }
            }

            console.log(policiesFromEdit);
        });
    }
};

export default EditPolicies;
