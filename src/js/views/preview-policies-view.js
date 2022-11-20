import { previewInput } from '../components/inputs.js';
import { showLoader } from '../components/pageLoader.js';
import { showError, showNothingToModify, showSuccessful, showErrorAndSuccessful } from '../components/requestsBehaviour.js';
import googleApiService from '../services/googleApi.service.js';
import { POLICIES_BLOCKLIST } from '../config.js';

function checkIfObjEmpty(_obj) {
    if (_obj) {
        return Object.keys(_obj).length !== 0;
    } else {
        return false;
    }
}

const PreviewPolicies = {
    /**
     * Render the component content.
     */
    render: async (policies, orgUnitCompletePath, deprecatedPolicies) => {
        let tablesRows = '';
        let finalHtmlContent = '';
        let deprecatedPoliciesAlert = '';

        if (checkIfObjEmpty(policies)) {
            for (let i = 0; i < Object.keys(policies).length; i++) {
                tablesRows += `
                <tr>
                    <th style="width:40%">${Object.keys(policies)[i]}</th>
                    <th></th>
                </tr>
            `;

                tablesRows += policies[Object.keys(policies)[i]]
                    .map(({ leafName, value }) => {
                        return previewInput(leafName, value);
                    })
                    .join('\n');
            }

            finalHtmlContent = `
                <div class="edit-table-div">
                    <table>
                        ${tablesRows}
                    </table>
                </div>
                <div>
                    <button id="previewApplyButtonId" class="edit-button" type="button">Save</button>
                </div>
            `;
        }

        if (deprecatedPolicies.length > 0) {
            deprecatedPoliciesAlert = `
                <div class="info-note mb-6">
                    <p>
                        The following policies are not supported:<br>
                        + ${deprecatedPolicies.map((policy) => {
                            return '<strong>' + policy.policy + '</strong> | ';
                        }).join(' ')}
                        <br>
                        Please check: <a href="https://chromeenterprise.google/policies/" target='_blank'>https://chromeenterprise.google/policies/</a> for more information.
                    </p>
                </div>
            `;
        }

        return `
            <div class="sub-content">
                <div>
                    <h3 class="edit-policies-title">${orgUnitCompletePath}</h3>
                </div>
                ${deprecatedPoliciesAlert}
                ${finalHtmlContent}
                <div id="behaviourContainer"></div>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async (policies, orgUnitId) => {
        if (checkIfObjEmpty(policies)) {
            let applyButton = document.getElementById('previewApplyButtonId');
            let contentElement = document.getElementById('content');

            applyButton.addEventListener('click', async () => {
                // Start page loader
                showLoader(contentElement, true, 'Preparing to apply edited policies...');
                let alertMessageElement = document.getElementById('loaderSubText');

                // Build modify request
                let requests = [];
                let wifiNetworkRequest = {
                    targetResource: `orgunits/${orgUnitId.split(':')[1]}`,
                    settings: []
                };

                for (let i = 0; i < Object.keys(policies).length; i++) {
                    // Namespaces
                    let chunk = [];

                    for (let j = 0; j < policies[Object.keys(policies)[i]].length; j++) {
                        // Policies
                        let _thisPolicy = policies[Object.keys(policies)[i]][j];

                        if (_thisPolicy.valueStructure.value && Object.keys(_thisPolicy.valueStructure.value).length !== 0 // Check if Obj not empty
                            && !POLICIES_BLOCKLIST.includes(_thisPolicy.valueStructure.policySchema)) { // Block some policies
                            const reqObj = {
                                policyTargetKey: {
                                    targetResource: `orgunits/${orgUnitId.split(':')[1]}`,
                                    additionalTargetKeys: _thisPolicy.policiesAdditionalTargetKeys
                                },
                                policyValue: _thisPolicy.valueStructure,
                                updateMask: {
                                    paths: Object.keys(_thisPolicy.valueStructure.value).map((_key) => {
                                        return _key;
                                    }),
                                },
                            };

                            if ('chrome.networks.wifi.*' === Object.keys(policies)[i]) {
                                if (_thisPolicy.valueStructure.policySchema === 'chrome.networks.wifi.Details') {
                                    wifiNetworkRequest.name = _thisPolicy.policiesAdditionalTargetKeys.network_id.replace(/-[^/-]+$/, '');
                                }

                                wifiNetworkRequest.settings.push({
                                    policySchema: _thisPolicy.valueStructure.policySchema,
                                    value: _thisPolicy.valueStructure.value,
                                });
                            } else {
                                chunk.push(reqObj);
                            }
                        }
                    }

                    requests.push(chunk);
                }

                // Remove and clean requests duplicates
                let clearedRequests = [];
                for (let i = 0; i < requests.length; i++) {
                    const arrUniq = [...new Map(requests[i].map(v => [JSON.stringify([v.policyValue.policySchema, v.policyTargetKey.additionalTargetKeys]), v])).values()];

                    if (arrUniq.length !== 0) {
                        clearedRequests.push(arrUniq);
                    }
                }

                let errorMessages = {};
                let successMessages = {
                    batchModify: true
                };

                // Send batch modify request
                const batchModifyPoliciesResponse = await googleApiService.batchModifyPolicies(
                    clearedRequests,
                    alertMessageElement
                );

                if (batchModifyPoliciesResponse !== true) {
                    errorMessages.batchModify = batchModifyPoliciesResponse;
                    successMessages.batchModify = false;
                }

                if (wifiNetworkRequest.settings.length > 0) {
                    successMessages.defineNetwork = true;
                    // Define Network
                    const defineNetworkResponse = await googleApiService.defineNetwork(
                      wifiNetworkRequest,
                      alertMessageElement
                    );

                    if (defineNetworkResponse !== true) {
                        successMessages.defineNetwork = false;
                        errorMessages.defineNetwork = defineNetworkResponse;
                    }
                }

                showErrorAndSuccessful(contentElement, true, successMessages, errorMessages);

                /*if (batchModifyPoliciesResponse === true) {
                    showSuccessful(contentElement, true);
                } else {
                    showError(contentElement, true, batchModifyPoliciesResponse);
                }*/
            });
        } else {
            let behaviourContainerElement = document.getElementById('behaviourContainer');

            showNothingToModify(behaviourContainerElement, true);
        }
    },
};

export default PreviewPolicies;
