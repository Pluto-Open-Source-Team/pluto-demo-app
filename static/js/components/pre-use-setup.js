import authService from '../services/auth.service.js';
import { messageAlert } from '../services/alert.service.js';
import {
    APP,
    AUTH,
    ERR,
    STORAGE
} from '../config.js';

let controlSetupSlide = () => {
    let nextButtons = document.getElementsByClassName('next-btn');
    let formTabsLinks = document.getElementsByClassName('pre-use-form-link');
    let formTabsContent = document.getElementsByClassName('form-content');
    let languages = document.getElementsByName('fav_language');
    let appName = document.getElementById('appNameInputId');
    let clientIDInput = document.getElementById('clientIDInput');
    let saveButton = document.getElementById('saveButton');
    let buttonsContainer = document.getElementById('buttonsContainer');

    // Tabs and tabs contents
    let controlTabulation = (currentTab) => {
        // Move tabs highlight
        for (let i = 0; i < formTabsLinks.length; i++) {
            const thisTabLinkElement = formTabsLinks[i];

            if (thisTabLinkElement.getAttribute('data-attr') === currentTab) {
                let nextTabElement = formTabsLinks[i + 1];
                document.getElementById("form-tab-highlight").style.left = nextTabElement.offsetLeft + 'px';
                thisTabLinkElement.classList.toggle('active');
                break;
            }
        }

        // Change tab content
        for (let i = 0; i < formTabsContent.length; i++) {
            const thisTabContentElement = formTabsContent[i];

            if (thisTabContentElement.getAttribute('data-tab-content') === currentTab) {
                let nextTabContent = formTabsContent[i + 1];
                nextTabContent.classList.toggle('show');
                break;
            }
        }
    };

    // Button loading animation
    let buttonHandleAnimation = (buttonId, loading, disable) => {
        let _thisButton = document.getElementById(buttonId);
        if (disable) {
            _thisButton.classList.add('disabled-link');
            _thisButton.style.backgroundColor = '#698eea';
        } else {
            _thisButton.classList.remove('disabled-link');
            _thisButton.style.backgroundColor = '#2a56c6';
            _thisButton.setAttribute('href', "javascript:");
        }
        loading ? _thisButton.innerHTML = '<div class="processing-icon"></div> Checking...' : _thisButton.innerHTML = 'Save';
    };

    // Handle Sign In button
    let handleSignInButton = (element, show) => {
        if (show) {
            element.innerHTML = '<button type="button" class="google-login-button float-right" id="signInWithGoogle"><span class="iconButton"></span>Sign in with Google</button>';
        } else {
            element.innerHTML = '<a href="javascript:" class="save-button float-right" id="saveButton">Save</a>';
        }
    };

    for (let nextButton of nextButtons) {
        let thisTabContentElement = nextButton.closest(".form-content");
        let thisTabContentName = thisTabContentElement.getAttribute('data-tab-content');

        nextButton.onclick = () => {
            controlTabulation(thisTabContentName);
        }
    }

    saveButton.addEventListener("click", () => {
        let clientIdValidated = true;
        let appSettings = {};

        // Launch animation
        buttonHandleAnimation('saveButton', true, true);

        // Get selected language
        for (let i = 0, len = languages.length; i < len; i++ ) {
            if (languages[i].checked) {
                appSettings.language = languages[i].value;
                break;
            }
        }

        appSettings = {
            ...appSettings,
            appName: appName.value.trim() || APP.NAME,
            googleClientId: clientIDInput.value.trim()
        };

        // TODO: add client ID validation process
        if (clientIdValidated && clientIDInput.value.trim()) {
            // Save settings to local storage
            localStorage.setItem(STORAGE.APP_SETTINGS, JSON.stringify(appSettings));

            // Initialize Google Auth
            authService.initGoogleAuth({
                client_id: clientIDInput.value.trim(),
                scope: AUTH.SCOPE
            })
                .then(() => {
                    // Display Sign In button
                    handleSignInButton(buttonsContainer, true);
                })
                .catch(() => {
                    buttonHandleAnimation('saveButton', false, false);
                    messageAlert.show('alert-message', ERR.GENERAL.message, ERR.GENERAL.color)
                });
        } else {
            buttonHandleAnimation('saveButton', false, false);
            messageAlert.show('alert-message', ERR.FIELD_REQUIRED.message, ERR.FIELD_REQUIRED.color);
        }
    });

    buttonsContainer.addEventListener("click", (event) => {
        if (event.target && event.target.id === 'signInWithGoogle') {
            authService.handleSignIn();
        }
    });
};

document.addEventListener('DOMContentLoaded', controlSetupSlide);
