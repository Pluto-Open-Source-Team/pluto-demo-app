const EditPolicies = {
    /**
     * Render the component content.
     */
    render: async (policies, orgUnitCompletePath) => {

        let tablesRows = '';

        for (let i = 0; i < Object.keys(policies).length; i++) {
            tablesRows += `
                <tr>
                    <th style="width:40%">${Object.keys(policies)[i]}</th>
                    <th></th>
                </tr>
            `;

            tablesRows += policies[Object.keys(policies)[i]].map(({leafName, value}) => {
                return `
                    <tr>
                        <td  class="child-row">${leafName}</td>
                        <td>
                            <input class="editValueInputText" type="text" name="${leafName}" id="${leafName}" value="${value}" required>
                        </td>
                    </tr>
                `;
            }).join('\n');
        }

        return `
            <div class="sub-content">
                <div>
                    <h3 class="edit-policies-title">${orgUnitCompletePath}</h3>
                </div>
                <div class="edit-table-div">
                    <table>
                        ${tablesRows}
                    </table>
                </div>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async () => {}
};

export default EditPolicies;
