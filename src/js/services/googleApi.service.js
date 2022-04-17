/* eslint-disable no-async-promise-executor */
import { API } from '../config.js';
import authService from '../services/auth.service.js';

class GoogleApiService {
    retrievesAllOrganizationalUnits() {
        return new Promise(async (resolve, reject) => {
            const url = `${API.G_ADMIN_HOST}/admin/directory/v1/customer/${API.G_CUSTOMER}/orgunits?type=all&prompt=consent&access_type=offline`;

            fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authService.getAccessToken()}`,
                },
            })
                .then(async (res) => {
                    let parsedData = await res.json();

                    if (parsedData && parsedData.organizationUnits) {
                        resolve(parsedData.organizationUnits);
                    } else {
                        (parsedData.error.code === 401) ? authService.logout() : reject(false);
                    }
                })
                .catch(() => {
                    reject(false);
                });
        });
    }

    /*
    Get resolved policies: Multiple requests execution
     */
    getResolvedPoliciesPromiseAll(orgUnitId, allSchemaNamespaces, messageElement) {
        return new Promise(async (resolve, reject) => {
            const url = `${API.G_CHROME_POLICY_HOST}/v1/customers/${API.G_CUSTOMER}/policies:resolve`;
            let accessToken = `Bearer ${authService.getAccessToken()}`;
            let policies = {};
            const delayIncrement = 1600;
            let delay = 0;

            const requests = allSchemaNamespaces.map((namespace) => {
                delay += delayIncrement;

                let data = {
                    policyTargetKey: {
                        targetResource: `orgunits/${orgUnitId}`,
                    },
                    policySchemaFilter: namespace,
                    pageSize: 1000,
                };

                return new Promise((resolve) => setTimeout(resolve, delay)).then(() => {
                    if (messageElement) {
                        messageElement.innerHTML = `<p>Fetching <strong>${namespace}</strong> policies...</p>`;
                    }

                    return fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: accessToken,
                        },
                        body: JSON.stringify(data),
                    });
                });
            });

            Promise.all(requests)
                .then(async (response) => {

                    for (let i = 0; i < response.length; i++) {
                        let responseData = await response[i];
                        let parsedResponse = responseData.json();

                        if (
                          parsedResponse &&
                          parsedResponse.resolvedPolicies &&
                          parsedResponse.resolvedPolicies.length > 0
                        ) {
                            let policySchema = parsedResponse.resolvedPolicies[0].value.policySchema;
                            let pSchemaArr = policySchema.split('.');
                            pSchemaArr.pop();
                            let nameSpaceKey = pSchemaArr.join('.') + '.*';

                            policies[nameSpaceKey] = parsedResponse.resolvedPolicies;
                        } else {
                            (responseData.status === 401) ? authService.logout() : reject(false);
                        }
                    }

                    resolve(policies);
                })
                .catch(() => {
                    reject(false);
                });
        });
    }

    getPolicySchemas() {
        return new Promise(async (resolve, reject) => {
            const url = `${API.G_CHROME_POLICY_HOST}/v1/customers/${API.G_CUSTOMER}/policySchemas?pageSize=1000`;

            fetch(url, {
                method: 'GET',
                headers: {
                    Authorization: `Bearer ${authService.getAccessToken()}`,
                },
            })
                .then(async (res) => {
                    let parsedData = await res.json();

                    if (parsedData && parsedData.policySchemas) {
                        resolve(parsedData.policySchemas);
                    } else {
                        (parsedData.error.code === 401) ? authService.logout() : reject(false);
                    }
                })
                .catch(() => {
                    reject(false);
                });
        });
    }

    batchModifyPolicies(policiesRequests, messageElement) {
        return new Promise(async (resolve) => {
            const url = `${API.G_CHROME_POLICY_HOST}/v1/customers/${API.G_CUSTOMER}/policies/orgunits:batchModify`;
            const accessToken = `Bearer ${authService.getAccessToken()}`;
            const delayIncrement = 1500;
            let delay = 0;
            let counter = 1;
            let requestsCount = policiesRequests.length;

            const requests = policiesRequests.map((_request) => {
                delay += delayIncrement;

                let data = {
                    requests: _request,
                };

                return new Promise((resolve) => setTimeout(resolve, delay)).then(() => {
                    messageElement.innerHTML = `<p>Modifying policies batch <strong>${counter} / ${requestsCount}</strong> ...</p>`;
                    counter++;
                    return fetch(url, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: accessToken,
                        },
                        body: JSON.stringify(data),
                    });
                });
            });

            Promise.all(requests)
                .then(async (response) => {
                    let errorMessage = 'Oops! Something went wrong.';
                    let isError = false;

                    for (let i = 0; i < response.length; i++) {
                        if (response[i].status === 200) {
                            isError = false;
                        } else if (response[i].status === 401) {
                            authService.logout();
                        } else {
                            errorMessage = await response[i].json();
                            isError = true;
                            break;
                        }
                    }

                    if (isError) {
                        resolve(errorMessage);
                    } else {
                        resolve(true);
                    }
                })
                .catch((err) => {
                    resolve(err);
                });
        });
    }
}

const googleApiService = new GoogleApiService();

export default googleApiService;
