import {
    textInput,
    switchInput,
    colorInput
} from "../components/inputs.js";
import PreviewPolicies from "./preview-policies-view.js";
import { showAlert } from "../components/pageLoader.js";
import { policySchemasStore } from "../stores/policySchemas.store.js";

const renderPreviewPoliciesPage = async (elem, _policies, ouPathName) => {
    elem.innerHTML = await PreviewPolicies.render(_policies, ouPathName);
    await PreviewPolicies.post_render(_policies);
}

function replacePolicyValue(obj, objKey, newValue) {
    if (objKey in obj) {
        obj[objKey] = newValue;
        return true;
    } else {
        for (let i = 0; i < Object.keys(obj).length; i++) {
            let done = replacePolicyValue(obj[Object.keys(obj)[i]], objKey, newValue);

            if (done === true) {
                return true;
            }
        }
    }
}

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

            tablesRows += policies[Object.keys(policies)[i]].map(({leafName, value, valueStructure, targetResource}) => {
                if (value.toString() && (value.toString().toLowerCase() === 'true' || value.toString().toLowerCase() === 'false')) {
                    return switchInput(leafName, value.toString().toLowerCase(), Object.keys(policies)[i], targetResource, valueStructure);
                } else if (/^#[0-9A-F]{6}$/i.test(value)) {
                    return colorInput(leafName, value, Object.keys(policies)[i], targetResource, valueStructure);
                } else {
                    return textInput(leafName, value, Object.keys(policies)[i], targetResource, valueStructure);
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
                    <button id="editPreviewButtonId" class="edit-button" type="button">Preview</button>
                </div>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async (orgUnitCompletePath) => {
        let contentElement = document.getElementById('content');
        let previewButton = document.getElementById('editPreviewButtonId');
        let policiesInputs = document.getElementsByClassName('policies-inputs');

        previewButton.addEventListener("click", async (event) => {
            let policiesFromEdit = {};

            for (let i = 0; i < policiesInputs.length; i++) {
                const inputType = policiesInputs[i].getAttribute('type');
                const policyNamespace = policiesInputs[i].getAttribute('data-namespace');
                const _ouId = policiesInputs[i].getAttribute('data-ou-id');
                const _valueStructure = policiesInputs[i].getAttribute('data-value-structure');
                const _oldValue = policiesInputs[i].getAttribute('data-old-value');

                let isChanged = false;

                if (inputType === 'checkbox') {
                    if (policiesInputs[i].checked.toString() !== _oldValue.toString()) {
                        isChanged = true;
                    }
                } else {
                    if (policiesInputs[i].value !== _oldValue) {
                        isChanged = true;
                    }
                }


                if (isChanged) {
                    if (!(policyNamespace in policiesFromEdit)) {
                        policiesFromEdit[policyNamespace] = [];
                    }

                    if (inputType === 'checkbox') {
                        policiesFromEdit[policyNamespace].push({
                            leafName: policiesInputs[i].getAttribute('name'),
                            value: policiesInputs[i].checked,
                            valueStructure: JSON.parse(_valueStructure.replace(/\\/g, '')),
                            targetResource: _ouId
                        });
                    } else {
                        policiesFromEdit[policyNamespace].push({
                            leafName: policiesInputs[i].getAttribute('name'),
                            value: policiesInputs[i].value,
                            valueStructure: JSON.parse(_valueStructure.replace(/\\/g, '')),
                            targetResource: _ouId
                        });
                    }
                }
            }

            // Start page loader
            showAlert(contentElement, true, 'Preparing to preview edited policies...');
            let alertMessageElement = document.getElementById('loaderSubText');

            // Replace old value with new one in the structure
            for (let i = 0; i < Object.keys(policiesFromEdit).length; i++) { // Namespaces
                for (let j = 0; j < policiesFromEdit[Object.keys(policiesFromEdit)[i]].length; j++) { // policies
                    let _thisPolicy = policiesFromEdit[Object.keys(policiesFromEdit)[i]][j];
                    let propertyKeyName = _thisPolicy.leafName.split('.')[_thisPolicy.leafName.split('.').length - 1];

                    replacePolicyValue(_thisPolicy.valueStructure.value, propertyKeyName, _thisPolicy.value);
                }
            }

            alertMessageElement.innerHTML = `<p>Checking for associated notice messages...</p>`;

            // Check for associated notice messages
            let checkedPolicies = await policySchemasStore(policiesFromEdit, alertMessageElement);

            // Stop page loader
            showAlert(contentElement, false);

            // Render preview page
            await renderPreviewPoliciesPage(contentElement, checkedPolicies, orgUnitCompletePath);
        });
    }
};

export default EditPolicies;
