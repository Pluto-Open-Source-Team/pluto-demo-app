/*
Components ONLY for edit policies page
 */

export const textInput = (leafName, value, namespace) => {
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <input class="editValueInputText policies-inputs" type="text" name="${leafName}" id="${leafName}" value="${value}" data-namespace="${namespace}" required>
            </td>
        </tr>
    `;
};

export const switchInput = (leafName, isOn, namespace) => {
    const isChecked = (isOn === 'true') ? 'checked' : '';
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <label class="switch">
                    <input class="policies-inputs" type="checkbox" id="${leafName}" name="${leafName}" data-namespace="${namespace}" ${isChecked}>
                    <span class="slider round"></span>
                </label>
            </td>
        </tr>
    `;
};

export const colorInput = (leafName, value, namespace) => {
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <input class="policies-inputs" type="color" id="${leafName}" name="${leafName}" value="${value}" data-namespace="${namespace}">
            </td>
        </tr>
    `;
};

export const optionsInput = (leafName, value) => {
    /*return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <input class="editValueInputText" type="text" name="${leafName}" id="${leafName}" value="${value}" required>
                <select id="${leafName}" name="${leafName}">
                    <option value="1">NOT_INSTALLED</option>
                    <option value="3">FORCED</option>
                    <option value="4">FORCED_AND_PIN_TO_TOOLBAR</option>
                </select>
            </td>
        </tr>
    `;*/

    return ``;
};
