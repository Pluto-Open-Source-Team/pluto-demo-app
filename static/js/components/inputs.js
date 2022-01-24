/*
Components ONLY for edit policies page
 */

export const textInput = (leafName, value) => {
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <input class="editValueInputText" type="text" name="${leafName}" id="${leafName}" value="${value}" required>
            </td>
        </tr>
    `;
};

export const switchInput = (leafName, isOn) => {
    const isChecked = (isOn === 'true') ? 'checked' : '';
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <label class="switch">
                    <input type="checkbox" id="${leafName}" name="${leafName}" ${isChecked}>
                    <span class="slider round"></span>
                </label>
            </td>
        </tr>
    `;
};

export const colorInput = (leafName, value) => {
    return `
        <tr>
            <td  class="child-row">${leafName}</td>
            <td>
                <input type="color" id="${leafName}" name="${leafName}" value="${value}">
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
