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

        // Show Modal
        modal.style.display = "block";

        // Import Policies From Organizational Unit
    }
};

export default Modal;
