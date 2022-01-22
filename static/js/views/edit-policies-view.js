const EditPolicies = {
    /**
     * Render the component content.
     */
    render: async () => {
        return `
            <div class="sub-content">
                <div>
                    <h3 class="edit-policies-title">/User/Office 365/Chromebook</h3>
                </div>
                <table>
                    <tr>
                        <th style="width:40%">chrome.users.*</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr class="row">
                        <td>chrome.users.IsAllowSomething</td>
                        <td>
                            <label class="switch">
                                <input type="checkbox">
                                <span class="slider round"></span>
                            </label>
                        </td>
                        <td>True or False.</td>
                    </tr>
                    <tr class="row">
                        <td>chrome.users.BrowserThemeColor</td>
                        <td>
                            <input type="color" id="head" name="head" value="#4DB246">
                        </td>
                        <td>Custom theme color.</td>
                    </tr>
                    <tr>
                        <th style="width:40%">chrome.devices.*</th>
                        <th></th>
                        <th></th>
                    </tr>
                    <tr class="row">
                        <td>chrome.devices.SomeValue</td>
                        <td>
                            <input class="editValueInputText" type="text" placeholder="Enter stuff" name="testo" id="testo" value="stuff" required>
                        </td>
                        <td>Enter some value of some stuff.</td>
                    </tr>
                    <tr class="row">
                        <td>chrome.devices.BlaType</td>
                        <td>
                            <select class="editValueSelectOptions" id="types" name="types">
                                <option value="1">NOT_INSTALLED</option>
                                <option value="3">FORCED</option>
                                <option value="4">FORCED_AND_PIN_TO_TOOLBAR</option>
                            </select>
                        </td>
                        <td>Custom theme color.</td>
                    </tr>
                </table>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async () => {}
};

export default EditPolicies;
