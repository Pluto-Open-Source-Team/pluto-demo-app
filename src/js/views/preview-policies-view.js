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
                let unformattedNetworkPolicies = {};
                let existedWifiNetworks = [];
                let networkBatchModifyRequests = {};

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

                            // Check if Wi-Fi network exists already
                            if (Object.keys(policies)[i] === 'chrome.networks.wifi.*') {
                                /*
                                We executed the API call inside loop in this position to make sure that it is executed only if there is network policies
                                Also, we store the policies, so we don't execute the API multiple times
                                 */
                                if (existedWifiNetworks.length === 0) {
                                    const _getResolvedPoliciesPromiseAllResponse = await googleApiService.getResolvedPoliciesPromiseAll(
                                      orgUnitId.split(':')[1],
                                      ['chrome.networks.wifi.Details']
                                    );
                                    existedWifiNetworks = _getResolvedPoliciesPromiseAllResponse['chrome.networks.wifi.*'].map(function(i) {
                                        return i.targetKey.additionalTargetKeys.network_id;
                                    });
                                }
                            }

                            if ((Object.keys(policies)[i] === 'chrome.networks.wifi.*') && !existedWifiNetworks.includes(_thisPolicy.policiesAdditionalTargetKeys.network_id)) {
                                const _networkId = _thisPolicy.policiesAdditionalTargetKeys.network_id;
                                const _thisNetworkObj = {
                                    policySchema: _thisPolicy.valueStructure.policySchema,
                                    value: _thisPolicy.valueStructure.value,
                                };

                                if (unformattedNetworkPolicies[_networkId] && unformattedNetworkPolicies[_networkId].length >= 0) {
                                    unformattedNetworkPolicies[_networkId].push(_thisNetworkObj);
                                } else {
                                    unformattedNetworkPolicies[_networkId] = [_thisNetworkObj];
                                }
                            } else {
                                if (Object.keys(policies)[i] === 'chrome.networks.wifi.*') {
                                    const _thisObjKey = reqObj.policyTargetKey.additionalTargetKeys.network_id;

                                    if (networkBatchModifyRequests[_thisObjKey] && networkBatchModifyRequests[_thisObjKey].length >= 0) {
                                        networkBatchModifyRequests[reqObj.policyTargetKey.additionalTargetKeys.network_id].push(reqObj);
                                    } else {
                                        networkBatchModifyRequests[reqObj.policyTargetKey.additionalTargetKeys.network_id] = [reqObj]
                                    }
                                } else {
                                    chunk.push(reqObj);
                                }
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

                // Format network policies request
                let wifiNetworkRequests = [];
                for (let i = 0; i < Object.keys(unformattedNetworkPolicies).length; i++) {
                    let _thisRequest = {
                        targetResource: `orgunits/${orgUnitId.split(':')[1]}`,
                        settings: [],
                        name: Object.keys(unformattedNetworkPolicies)[i].replace(/-[^/-]+$/, '')
                    }
                    for (let j = 0; j < unformattedNetworkPolicies[Object.keys(unformattedNetworkPolicies)[i]].length; j++) {
                        _thisRequest.settings.push(unformattedNetworkPolicies[Object.keys(unformattedNetworkPolicies)[i]][j]);
                    }
                    wifiNetworkRequests.push(_thisRequest);
                }

                let errorMessages = {};
                let successMessages = {
                    batchModify: true,
                    defineNetwork: true,
                };

                for (let i = 0; i < Object.keys(networkBatchModifyRequests).length; i++) {
                    clearedRequests.push(networkBatchModifyRequests[Object.keys(networkBatchModifyRequests)[i]]);
                }

                // Send batch modify request
                const batchModifyPoliciesResponse = await googleApiService.batchModifyPolicies(
                    clearedRequests,
                    alertMessageElement
                );

                if (batchModifyPoliciesResponse !== true) {
                    errorMessages.batchModify = batchModifyPoliciesResponse;
                    successMessages.batchModify = false;
                }

                if (wifiNetworkRequests.length > 0) {
                    successMessages.defineNetwork = true;

                    // Define Network
                    const defineNetworkResponse = await googleApiService.defineNetworks(
                      wifiNetworkRequests,
                      alertMessageElement
                    );

                    if (defineNetworkResponse !== true) {
                        successMessages.defineNetwork = false;
                        errorMessages.defineNetwork = defineNetworkResponse;
                    }
                }

                showErrorAndSuccessful(contentElement, true, successMessages, errorMessages);
            });
        } else {
            let behaviourContainerElement = document.getElementById('behaviourContainer');

            showNothingToModify(behaviourContainerElement, true);
        }
    },
};

export default PreviewPolicies;
