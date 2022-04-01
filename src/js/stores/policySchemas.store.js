import googleApiService from '../services/googleApi.service.js';

export const policySchemasStore = async (_policies, _alertMessageElement) => {
    _alertMessageElement.innerHTML = `<p>Getting all policy schemas...</p>`;

    const policySchemasDataResponse = await googleApiService.getPolicySchemas();

    for (let i = 0; i < Object.keys(_policies).length; i++) {
        for (let j = 0; j < _policies[Object.keys(_policies)[i]].length; j++) {
            let _thisPolicy = _policies[Object.keys(_policies)[i]][j];

            if (_thisPolicy.value === true) {
                for (let k = 0; k < policySchemasDataResponse.length; k++) {
                    if (_thisPolicy.valueStructure.policySchema === policySchemasDataResponse[k].schemaName) {
                        if (policySchemasDataResponse[k].notices) {
                            for (let l = 0; l < policySchemasDataResponse[k].notices.length; l++) {
                                if (
                                    policySchemasDataResponse[k].notices[l].acknowledgementRequired === true
                                ) {
                                    let ackNotice = '';

                                    for (
                                        let m = 0;
                                        m < policySchemasDataResponse[k].fieldDescriptions.length;
                                        m++
                                    ) {
                                        let _field = policySchemasDataResponse[k].fieldDescriptions[m].field;

                                        if (
                                            _field.toLowerCase().includes('acknotice') &&
                                            _field
                                                .toLowerCase()
                                                .includes(
                                                    policySchemasDataResponse[k].notices[
                                                        l
                                                    ].field.toLowerCase()
                                                )
                                        ) {
                                            ackNotice = _field;
                                            break;
                                        }
                                    }

                                    if (ackNotice) {
                                        _thisPolicy.valueStructure.value[ackNotice] = true;
                                    }
                                }
                            }
                        }
                    }
                }
            } else {
                Object.keys(_thisPolicy.valueStructure.value).map((_key) => {
                    if (_key.toLowerCase().includes('acknotice')) {
                        delete _thisPolicy.valueStructure.value[_key];
                    }
                });
            }
        }
    }

    return _policies;
};
