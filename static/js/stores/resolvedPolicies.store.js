import googleApiService from "../services/googleApi.service.js";
import {
    POLICIES_NAMESPACES,
    POLICIES_BLOCKLIST
} from "../config.js";

export const resolvedPoliciesStore = async (orgUnitId, allSchemaNamespaces, messageElement) => {
    let trimmedPolicies = {};

    const policiesDataResponse = await googleApiService.getResolvedPoliciesPromiseAll(orgUnitId, allSchemaNamespaces, messageElement);

    for (let i = 0; i < POLICIES_NAMESPACES.length; i++) {
        let formattedPolicies = [];

        for (let j = 0; j < policiesDataResponse[POLICIES_NAMESPACES[i]].length; j++) {

            let policiesValueObject = policiesDataResponse[POLICIES_NAMESPACES[i]][j].value;
            let valueObject = policiesValueObject.value;

            if (!POLICIES_BLOCKLIST.includes(policiesValueObject.policySchema)) {
                if (Object.keys(valueObject).length > 1) {
                    for (let k = 0; k < Object.keys(valueObject).length; k++) {
                        formattedPolicies.push({
                            leafName: `${policiesValueObject.policySchema.split('.')[2]}.${Object.keys(valueObject)[k]}`,
                            value: valueObject[Object.keys(valueObject)[k]],
                            valueStructure: JSON.stringify(policiesValueObject),
                            targetResource: orgUnitId
                        });
                    }
                } else {
                    let returnedLeafValue = getLeafValue(valueObject);
                    formattedPolicies.push({
                        leafName: `${policiesValueObject.policySchema.split('.')[2]}.${returnedLeafValue.valueName}`,
                        value: returnedLeafValue.value,
                        valueStructure: JSON.stringify(policiesValueObject),
                        targetResource: orgUnitId
                    });
                }
            }
        }

        trimmedPolicies[POLICIES_NAMESPACES[i]] = formattedPolicies;
    }

    function getLeafValue(object, key) {
        if (typeof object === 'object') {
            return getLeafValue(object[Object.keys(object)[0]], Object.keys(object)[0]);
        } else {
            return {
                valueName: `${key}`,
                value: object
            };
        }
    }

    return trimmedPolicies;
};
