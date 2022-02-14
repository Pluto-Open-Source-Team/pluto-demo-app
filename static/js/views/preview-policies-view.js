import {
    previewInput
} from "../components/inputs.js";
import { showAlert } from "../components/pageLoader.js";
import {showError, showSuccessful} from "../components/requestsBehaviour.js";
import googleApiService from "../services/googleApi.service.js";

const PreviewPolicies = {
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
                return previewInput(leafName, value.toString());
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
                    <button id="previewApplyButtonId" class="edit-button" type="button">Apply</button>
                </div>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async (policies) => {
        let applyButton = document.getElementById('previewApplyButtonId');
        let contentElement = document.getElementById('content');

        applyButton.addEventListener("click", async (event) => {
            // Start page loader
            showAlert(contentElement, true, 'Preparing to apply edited policies...');
            let alertMessageElement = document.getElementById('loaderSubText');

            // Build modify request
            let requests = [];

            for (let i = 0; i < Object.keys(policies).length; i++) { // Namespaces
                let chunk = [];

                for (let j = 0; j < policies[Object.keys(policies)[i]].length; j++) { // Policies
                    let _thisPolicy = policies[Object.keys(policies)[i]][j];

                    chunk.push({
                        policyTargetKey: {
                            targetResource: `orgunits/${_thisPolicy.targetResource}`
                        },
                        policyValue: _thisPolicy.valueStructure,
                        updateMask: {
                            paths: Object.keys(_thisPolicy.valueStructure.value).map((_key) => {
                                return _key;
                            })
                        }
                    });
                }

                requests.push(chunk);
            }

            // Send batch modify request
            const batchModifyPoliciesResponse = await googleApiService.batchModifyPolicies(requests, alertMessageElement);

            if (batchModifyPoliciesResponse === true) {
                showSuccessful(contentElement, true);
            } else {
                showError(contentElement, true, batchModifyPoliciesResponse);
            }
        });
    }
};

export default PreviewPolicies;
