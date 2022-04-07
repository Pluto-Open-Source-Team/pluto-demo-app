export const controlTabulation = (tabsLink, tabsContent, currentTab) => {
    // Move tabs highlight
    for (let i = 0; i < tabsLink.length; i++) {
        const thisTabLinkElement = tabsLink[i];

        if (thisTabLinkElement.getAttribute('data-attr') === currentTab) {
            let nextTabElement = tabsLink[i + 1];
            document.getElementById('form-tab-highlight').style.left = nextTabElement.offsetLeft + 'px';
            thisTabLinkElement.classList.toggle('active');
            break;
        }
    }

    // Change tab content
    for (let i = 0; i < tabsContent.length; i++) {
        const thisTabContentElement = tabsContent[i];

        if (thisTabContentElement.getAttribute('data-tab-content') === currentTab) {
            let nextTabContent = tabsContent[i + 1];
            nextTabContent.classList.toggle('show');
            break;
        }
    }
};

export const handleButtonAnimation = (buttonId, loading, disable) => {
    let _thisButton = document.getElementById(buttonId);
    if (disable) {
        _thisButton.classList.add('disabled-link');
        _thisButton.style.backgroundColor = '#698eea';
    } else {
        _thisButton.classList.remove('disabled-link');
        _thisButton.style.backgroundColor = '#2a56c6';
        _thisButton.setAttribute('href', 'javascript:');
    }
    loading
        ? (_thisButton.innerHTML = '<div class="processing-icon"></div> Checking...')
        : (_thisButton.innerHTML = 'Save');
};

export const handleSignInButton = (element, show) => {
    if (show) {
        element.innerHTML =
            '<button type="button" class="google-login-button float-right" id="signInWithGoogle"><span class="iconButton"></span>Sign in with Google</button>';
    } else {
        element.innerHTML = '<a href="javascript:" class="save-button float-right" id="saveButton">Save</a>';
    }
};

/*
export const test = () => {

};
 */
