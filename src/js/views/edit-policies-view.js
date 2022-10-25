import { textInput } from '../components/inputs.js';
import { showLoader } from '../components/pageLoader.js';
import { policySchemasStore } from '../stores/policySchemas.store.js';
import PreviewPolicies from './preview-policies-view.js';

const renderPreviewPoliciesPage = async (elem, _policies, ouPathName, ouId, deprecatedPolicies) => {
    elem.innerHTML = await PreviewPolicies.render(_policies, ouPathName, deprecatedPolicies);
    await PreviewPolicies.post_render(_policies, ouId);
};

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

function escapeJsonString(jsonData) {
    return jsonData
      .replace(/\\n/g, '\\n')
      .replace(/\\'/g, "\\'")
      .replace(/\\"/g, '\\"')
      .replace(/\\&/g, '\\&')
      .replace(/\\r/g, '\\r')
      .replace(/\\t/g, '\\t')
      .replace(/\\b/g, '\\b')
      .replace(/\\f/g, '\\f');
}

function isObjectString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

const EditPolicies = {
    /**
     * Render the component content.
     */
    render: async (policies, orgUnitCompletePath, currentPolicies) => {
        let tablesRows = '';

        for (let i = 0; i < Object.keys(policies).length; i++) {
            tablesRows += `
                <tr>
                    <th style="width:40%">${Object.keys(policies)[i]}</th>
                    <th></th>
                </tr>
            `;

            tablesRows += policies[Object.keys(policies)[i]]
                .map(({ leafName, value, valueStructure, targetResource, policiesAdditionalTargetKeys }) => {
                    let oldValue = value;

                    if (currentPolicies) {
                        const cPoliciesArr = currentPolicies[Object.keys(policies)[i]];

                        if (cPoliciesArr) {
                            for (let j = 0; j < cPoliciesArr.length; j++) {
                                if (leafName === cPoliciesArr[j].leafName) {
                                    oldValue = cPoliciesArr[j].value;
                                    break;
                                }
                            }
                        }
                    }

                    return textInput(
                      leafName,
                      value, // new value
                      oldValue, // old value
                      Object.keys(policies)[i],
                      targetResource,
                      valueStructure,
                      policiesAdditionalTargetKeys
                    );
                })
                .join('\n');

            /**
             * Re-facto this code block
             */
            if (currentPolicies && currentPolicies[Object.keys(policies)[i]]) {
                const diffResults = policies[Object.keys(policies)[i]].filter(({ leafName: leaf1 }) => {
                    return !currentPolicies[Object.keys(policies)[i]].some(({ leafName: leaf2 }) => leaf2 === leaf1);
                });

                tablesRows += diffResults
                  .map(({ leafName, value, valueStructure, targetResource, policiesAdditionalTargetKeys }) => {
                      return textInput(
                        leafName,
                        value, // new value
                        '', // old value
                        Object.keys(policies)[i],
                        targetResource,
                        valueStructure,
                        policiesAdditionalTargetKeys
                      );
                  })
                  .join('\n');
            }
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
    post_render: async (orgUnitCompletePath, orgUnitId) => {
        let contentElement = document.getElementById('content');
        let previewButton = document.getElementById('editPreviewButtonId');
        let policiesInputs = document.getElementsByClassName('policies-inputs');

        previewButton.addEventListener('click', async () => {
            let policiesFromEdit = {};

            for (let i = 0; i < policiesInputs.length; i++) {
                const policyNamespace = policiesInputs[i].getAttribute('data-namespace');
                const _ouId = policiesInputs[i].getAttribute('data-ou-id');
                const _valueStructure = policiesInputs[i].getAttribute('data-value-structure');
                const _oldValue = policiesInputs[i].getAttribute('data-old-value');
                const _policiesAdditionalTargetKeys = policiesInputs[i].getAttribute('data-policies-additional-target-keys');

                let isChanged = false;

                if (policiesInputs[i].value !== _oldValue) {
                    isChanged = true;
                }

                if (isChanged) {
                    if (!(policyNamespace in policiesFromEdit)) {
                        policiesFromEdit[policyNamespace] = [];
                    }

                    const myEscapedJSONString = escapeJsonString(_valueStructure);
                    let escapedAdditionalTargetKeysJson = escapeJsonString(_policiesAdditionalTargetKeys);

                    try {
                        escapedAdditionalTargetKeysJson = JSON.parse(escapedAdditionalTargetKeysJson);
                    } catch (e) {
                        escapedAdditionalTargetKeysJson = {};
                    }

                    policiesFromEdit[policyNamespace].push({
                        leafName: policiesInputs[i].getAttribute('name'),
                        value: isObjectString(policiesInputs[i].value) ? JSON.parse(policiesInputs[i].value) : policiesInputs[i].value,
                        valueStructure: JSON.parse(myEscapedJSONString),
                        targetResource: _ouId,
                        policiesAdditionalTargetKeys: escapedAdditionalTargetKeysJson,
                    });
                }
            }

            // Start page loader
            showLoader(contentElement, true, 'Preparing to preview edited policies...');
            let alertMessageElement = document.getElementById('loaderSubText');

            let deprecatedPolicies = [];

            // Replace old value with new one in the structure
            for (let i = 0; i < Object.keys(policiesFromEdit).length; i++) {
                // Namespaces
                for (let j = 0; j < policiesFromEdit[Object.keys(policiesFromEdit)[i]].length; j++) {
                    // policies
                    let _thisPolicy = policiesFromEdit[Object.keys(policiesFromEdit)[i]][j];
                    let propertyKeyName =
                        _thisPolicy.leafName.split('.')[_thisPolicy.leafName.split('.').length - 1];

                    replacePolicyValue(_thisPolicy.valueStructure.value, propertyKeyName, _thisPolicy.value);

                    // Check if policy is in API_CURRENT
                    if (localStorage.getItem('policySchemas')) {
                        const parsedPolicySchemas = JSON.parse(localStorage.getItem('policySchemas'));
                        let isValid = false;

                        for (let k = 0; k < parsedPolicySchemas.length; k++) {
                            if (_thisPolicy.valueStructure.policySchema === parsedPolicySchemas[k].schemaName) {
                                isValid = true;
                            }
                        }

                        if (!isValid) {
                            deprecatedPolicies.push({
                                index: j,
                                policy: _thisPolicy.valueStructure.policySchema
                            });
                        }
                    }
                }

                // Remove deprecated policies
                for (let j = deprecatedPolicies.length - 1; j >= 0; j--) {
                    policiesFromEdit[Object.keys(policiesFromEdit)[i]].splice(deprecatedPolicies[j].index, 1);
                }
            }

            alertMessageElement.innerHTML = `<p>Checking for associated notice messages...</p>`;

            // Check for associated notice messages
            let checkedPolicies = await policySchemasStore(policiesFromEdit, alertMessageElement);

            // Stop page loader
            showLoader(contentElement, false);

            // Render preview page
            await renderPreviewPoliciesPage(contentElement, checkedPolicies, orgUnitCompletePath, orgUnitId, deprecatedPolicies);
        });
    },
};

export default EditPolicies;
