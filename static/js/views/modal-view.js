import Diagram from '../views/diagram-view.js'

const renderDiagram = async (elem) => {
    elem.innerHTML = await Diagram.render();
    await Diagram.post_render();
};

const Modal = {
    /**
     * Render the component content.
     */
    render: async () => {
        return `
            <div id="mainModal" class="modal">
                <div class="modal-content">
                    <div class="card inline-content">
                        <p class="title">Import Policies From File</p>
                        <button type="button" id="importPoliciesFromFileBtn">Start</button>
                    </div>
    
                    <div class="card inline-content">
                        <p class="title">Import Policies From OUs</p>
                        <button type="button" id="importPoliciesFromOUsBtn">Start</button>
                    </div>
    
                    <div class="card inline-content">
                        <p class="title">Backup Policies</p>
                        <button type="button" id="backupPoliciesBtn">Start</button>
                    </div>
                </div>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async () => {
        let modal = document.getElementById("mainModal");
        let importPoliciesFromFileBtn = document.getElementById("importPoliciesFromFileBtn");
        let importPoliciesFromOUsBtn = document.getElementById("importPoliciesFromOUsBtn");
        let backupPoliciesBtn = document.getElementById("backupPoliciesBtn");
        let contentElement = document.getElementById('content');

        // Show Modal
        modal.style.display = "block";

        // Import Policies From Organizational Unit
        importPoliciesFromOUsBtn.addEventListener("click", async (event) => {
            // Hide Modal
            modal.style.display = "none";

            // Render OU Preview
            await renderDiagram(contentElement);
        });
    }
};

export default Modal;
