/*
Components ONLY for edit policies page
 */

export const textInput = (leafName, value, oldValue, namespace, ouId, valueStructure) => {
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <input class="editValueInputText policies-inputs" type="text" name="${leafName}" id="${leafName}" value="${value}" data-namespace="${namespace}" data-ou-id="${ouId}" data-value-structure='${valueStructure}' data-old-value="${oldValue}" required>
            </td>
        </tr>
    `;
};

export const switchInput = (leafName, isOn, namespace, ouId, valueStructure) => {
    const isChecked = isOn === 'true' ? 'checked' : '';
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <label class="switch">
                    <input class="policies-inputs" type="checkbox" id="${leafName}" name="${leafName}" data-namespace="${namespace}" data-ou-id="${ouId}" data-value-structure='${valueStructure}' data-old-value="${isOn}" ${isChecked}>
                    <span class="slider round"></span>
                </label>
            </td>
        </tr>
    `;
};

export const colorInput = (leafName, value, namespace, ouId, valueStructure) => {
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <input class="policies-inputs" type="color" id="${leafName}" name="${leafName}" value="${value}" data-namespace="${namespace}" data-ou-id="${ouId}" data-value-structure='${valueStructure}' data-old-value="${value}">
            </td>
        </tr>
    `;
};

// preview-input CSS class to display icon inside input
export const previewInput = (leafName, value) => {
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <input class="editValueInputText policies-inputs" type="text" name="${leafName}" id="${leafName}" value="${value}" required readonly>
            </td>
        </tr>
    `;
};

export const optionsInput = (leafName, value) => {
    return ``;
    // eslint-disable-next-line no-unreachable
    return `
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
    `;
};
