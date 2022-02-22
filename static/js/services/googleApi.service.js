import authService from "../services/auth.service.js";
import {
    STORAGE,
    API
} from "../config.js";

class GoogleApiService {

    apiInterceptor = async () => {
        const token = localStorage.getItem(STORAGE.ACCESS_TOKEN);

        if (authService.isValidToken()) {
            return `Bearer ${JSON.parse(token).accessToken}`;
        } else {
            let newToken = await authService.getNewAccessToken();
            return `Bearer ${newToken}`;
        }
    };

    retrievesAllOrganizationalUnits = () => new Promise(async (resolve, reject) => {
        const url = `${API.G_ADMIN_HOST}/admin/directory/v1/customer/${API.G_CUSTOMER}/orgunits?type=all&prompt=consent&access_type=offline`;

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: await this.apiInterceptor()
            }
        })
            .then(async (res) => {
                let parsedData = await res.json();

                if (parsedData && parsedData.organizationUnits) {
                    resolve(parsedData.organizationUnits);
                } else {
                    reject(false);
                }
            })
            .catch((err) => {
                reject(false);
            });
    });

    /*
    Get resolved policies: One request execution
     */
    getResolvedPolicies = (orgUnitId, schemaNamespace) => new Promise(async (resolve, reject) => {
        const url = `${API.G_CHROME_POLICY_HOST}/v1/customers/${API.G_CUSTOMER}/policies:resolve`;

        let policies = [];
        let isNextPage = false;
        let data = {
            policyTargetKey: {
                targetResource: `orgunits/${orgUnitId}`
            },
            policySchemaFilter: schemaNamespace,
            pageSize: 1000
        }

        try {
            do {
                const res = await fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: await this.apiInterceptor()
                    },
                    body: JSON.stringify(data)
                });

                let parsedResponse = await res.json();

                if (parsedResponse && parsedResponse.resolvedPolicies) {
                    policies.push(...parsedResponse.resolvedPolicies);
                }

                if (parsedResponse && parsedResponse.nextPageToken) {
                    isNextPage = true;
                    data.pageToken = parsedResponse.nextPageToken;
                } else {
                    isNextPage = false;
                }
            } while(isNextPage);

            resolve(policies);
        } catch (err) {
            reject(false);
        }
    });

    /*
    Get resolved policies: Multiple requests execution
     */
    getResolvedPoliciesPromiseAll = (orgUnitId, allSchemaNamespaces, messageElement) => new Promise(async (resolve, reject) => {
        const url = `${API.G_CHROME_POLICY_HOST}/v1/customers/${API.G_CUSTOMER}/policies:resolve`;
        let accessToken = await this.apiInterceptor();
        let policies = {};
        const delayIncrement = 1600;
        let delay = 0;

        const requests = allSchemaNamespaces.map(namespace => {
            delay += delayIncrement;

            let data = {
                policyTargetKey: {
                    targetResource: `orgunits/${orgUnitId}`
                },
                policySchemaFilter: namespace,
                pageSize: 1000
            };

            return new Promise(resolve => setTimeout(resolve, delay)).then(() => {
                if (messageElement) {
                    messageElement.innerHTML = `<p>Fetching <strong>${namespace}</strong> policies...</p>`;
                }

                return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify(data)
                })
            });
        });

        Promise.all(requests)
            .then(async (response) => {
                for (let i = 0; i < response.length; i++) {
                    let responseData = await response[i].json();

                    if (responseData && responseData.resolvedPolicies && (responseData.resolvedPolicies.length > 0)) {
                        let policySchema = responseData.resolvedPolicies[0].value.policySchema;
                        let pSchemaArr = policySchema.split('.');
                        pSchemaArr.pop();
                        let nameSpaceKey = pSchemaArr.join('.') + '.*';

                        policies[nameSpaceKey] = responseData.resolvedPolicies;
                    }
                }

                resolve(policies);
            })
            .catch((err) => {
                reject(false);
            });
    });

    getPolicySchemas = () => new Promise(async (resolve, reject) => {
        const url = `${API.G_CHROME_POLICY_HOST}/v1/customers/${API.G_CUSTOMER}/policySchemas?pageSize=1000`;

        fetch(url, {
            method: 'GET',
            headers: {
                Authorization: await this.apiInterceptor()
            }
        })
            .then(async (res) => {
                let parsedData = await res.json();

                if (parsedData && parsedData.policySchemas) {
                    resolve(parsedData.policySchemas);
                } else {
                    reject(false);
                }
            })
            .catch((err) => {
                reject(false);
            });
    });

    batchModifyPolicies = (policiesRequests, messageElement) => new Promise(async (resolve, reject) => {
        const url = `${API.G_CHROME_POLICY_HOST}/v1/customers/${API.G_CUSTOMER}/policies/orgunits:batchModify`;
        const accessToken = await this.apiInterceptor();
        const delayIncrement = 1500;
        let delay = 0;
        let counter = 1;
        let requestsCount = policiesRequests.length;

        const requests = policiesRequests.map(_request => {
            delay += delayIncrement;

            let data = {
                requests: _request
            };

            return new Promise(resolve => setTimeout(resolve, delay)).then(() => {
                messageElement.innerHTML = `<p>Modifying policies batch <strong>${counter} / ${requestsCount}</strong> ...</p>`;
                counter++;
                return fetch(url, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: accessToken
                    },
                    body: JSON.stringify(data)
                })
            });
        });

        Promise.all(requests)
            .then(async (response) => {
                let errorMessage = 'Oops! Something went wrong.';
                let isError = false;

                for (let i = 0; i < response.length; i++) {

                    if (response[i].status === 200) {
                        isError = false;
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

const googleApiService = new GoogleApiService();

export default googleApiService;
