export const showSuccessful = (element, show) => {
    if (show) {
        element.innerHTML = `
            <div id="successfulBehaviour">
                <img class="icon-image" src="/static/img/successful-icon.png" alt="successful-icon">
                <div id="successfulBehaviourSubText"><p>Policies are updated successfully!</p></div>
            </div>
        `;
    } else {
        let successfulBehaviourContent = document.getElementById("successfulBehaviour");
        let successfulBehaviourText = document.getElementById("successfulBehaviourSubText");

        if (successfulBehaviourContent) {
            successfulBehaviourContent.style.display = "none";
            successfulBehaviourText.style.display = "none";
        }
    }
};
