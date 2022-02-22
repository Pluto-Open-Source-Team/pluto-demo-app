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

export const showError = (element, show, errorMessage) => {
    if (show) {
        element.innerHTML = `
            <div id="errorBehaviour">
                <img class="icon-image" src="/static/img/error-icon.png" alt="successful-icon">
                <div id="errorBehaviourSubText">
                    <pre class="json-output">${syntaxHighlight(errorMessage)}</pre>
                </div>
            </div>
        `;
    } else {
        let errorBehaviour = document.getElementById("errorBehaviour");
        let errorBehaviourSubText = document.getElementById("errorBehaviourSubText");

        if (errorBehaviour) {
            errorBehaviour.style.display = "none";
            errorBehaviourSubText.style.display = "none";
        }
    }
};

export const showNothingToModify = (element, show) => {
    if (show) {
        element.innerHTML = `
            <div id="nothingToModifyBehaviour">
                <img class="icon-image" src="/static/img/nothing.png" alt="nothing-to-modify-icon">
                <div id="nothingToModifyBehaviourSubText"><p>You didn't Modify any policies!</p></div>
            </div>
        `;
    } else {
        let nothingToModifyBehaviourContent = document.getElementById("nothingToModifyBehaviour");
        let nothingToModifyBehaviourSubText = document.getElementById("nothingToModifyBehaviourSubText");

        if (nothingToModifyBehaviourContent) {
            nothingToModifyBehaviourContent.style.display = "none";
            nothingToModifyBehaviourSubText.style.display = "none";
        }
    }
};

/*
https://stackoverflow.com/questions/4810841/pretty-print-json-using-javascript
 */
function syntaxHighlight(json) {
    if (typeof json != 'string') {
        json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
        var cls = 'json-number';
        if (/^"/.test(match)) {
            if (/:$/.test(match)) {
                cls = 'json-key';
            } else {
                cls = 'json-string';
            }
        } else if (/true|false/.test(match)) {
            cls = 'json-boolean';
        } else if (/null/.test(match)) {
            cls = 'json-null';
        }
        return '<span class="' + cls + '">' + match + '</span>';
    });
}
