import { showAlert } from '../components/alerts.js';
import { controlTabulation, handleButtonAnimation, handleSignInButton } from '../components/index.js';
import { APP, ERR, STORAGE } from '../config.js';
import authService from '../services/auth.service.js';

const TABS_NAMES = [
    {
        label: 'Language',
        attr: 'language',
        active: true,
    },
    {
        label: 'General Settings',
        attr: 'general-settings',
    },
    {
        label: 'Google Settings',
        attr: 'google-settings',
    },
];
const LANGUAGES = [
    {
        label: 'english',
        flagImg: 'lang/united-kingdom.png',
        imgAlt: 'uk-flag',
        checked: true,
        disabled: false,
    },
    {
        label: 'french',
        flagImg: 'lang/france.png',
        imgAlt: 'france-flag',
        checked: false,
        disabled: true,
    },
    {
        label: 'german',
        flagImg: 'lang/germany.png',
        imgAlt: 'german-flag',
        checked: false,
        disabled: true,
    },
];

const tabs = (tabsNames) => {
    const tabsList = tabsNames
        .map(({ label, attr, active }) => {
            const elementClassAttr = active ? 'pre-use-form-link active' : 'pre-use-form-link';
            return `
            <li>
                <a class="${elementClassAttr}" href="javascript:" data-attr="${attr}">
                    <span>${label}</span>
                </a>
            </li>
        `;
        })
        .join('\n');

    return `
    <ul>
        ${tabsList}

        <li class="form-tab-highlight" id="form-tab-highlight"></li>
    </ul>
    `;
};

const languagesSection = (languages) => {
    const _languages = languages
        .map(({ label, flagImg, imgAlt, checked, disabled }) => {
            const _checked = checked ? 'checked' : '';
            const _class = disabled ? 'flag-image disable-div' : 'flag-image';
            const _disabled = disabled ? 'disabled' : '';
            const tooltipMessage = disabled
                ? '<span class="tooltip-text">Will be available next release!</span>'
                : '';
            return `
            <div class="form-column">
                <input type="radio" id="${label}" name="fav_language" value="${label}" ${_checked} ${_disabled}>
                <label for="${label}" class="tooltip">
                    <img class="${_class}" src="assets/${flagImg}" alt="${imgAlt}" width="80" height="53">
                    ${tooltipMessage}
                </label>
            </div>
        `;
        })
        .join('\n');

    return `
        <div class="form-content show" data-tab-content="language">
            <form action="#">
                <h6>Select Language</h6>
                <h5>Please select the language you would like to use while running the application.</h5>
                <div class="form-row forms-margin-top">
                    ${_languages}
                    
                    <div class="full-wdth clearfix">
                        <a href="javascript:" class="next-btn float-right">Next</a>
                    </div>
                </div>
            </form>
        </div>
    `;
};

const generalSection = () => {
    return `
        <div class="form-content" data-tab-content="general-settings">
            <form action="#">
                <h6>General Settings</h6>
                <div class="form-row forms-margin-top">
                    <div class="form-column">
                        <label>Application Name</label>
                        <input type="text" id="appNameInputId" class="text-field" placeholder="e.g. Pluto" value="${APP.NAME}">
                    </div>
                    <div class="form-column"></div>

                    <div class="full-wdth clearfix">
                        <a href="javascript:" class="next-btn float-right">Next</a>
                    </div>
                </div>
            </form>
        </div>
    `;
};

const googleSettingsSection = () => {
    return `
        <div class="form-content" data-tab-content="google-settings">
            <form action="#">
                <h6>Google Settings</h6>
                <h5>By clicking Save, your Google settings are validated before Login!</h5>
                <h5>Visit the following link to get your Client ID: <a href="https://console.developers.google.com/apis/credentials">https://console.developers.google.com/apis/credentials</a></h5>
                <div id="alert-message"></div>
                <div class="form-row">
                    <div class="full-wdth">
                        <label>Client ID</label>
                        <input id="clientIDInput" type="text" class="text-field google-settings-input" placeholder="e.g. ...iqlo2.apps.googleusercontent.com" value="${process.env.CLIENT_ID}">
                    </div>

                    <div class="full-wdth clearfix" id="buttonsContainer">
                        <a href="javascript:" class="save-button float-right" id="saveButton">Save</a>
                    </div>
                </div>
            </form>
        </div>
    `;
};

const SetupTabs = {
    /**
     * Render the page content.
     */
    render: async () => {
        return `
            <div class="pre-use-form-wrapper">
                ${tabs(TABS_NAMES)}
                
                <div class="form-content-wrapper">
                    ${languagesSection(LANGUAGES)}
                    ${generalSection()}
                    ${googleSettingsSection()}
                </div>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async () => {
        let nextButtons = document.getElementsByClassName('next-btn');
        let formTabsLinks = document.getElementsByClassName('pre-use-form-link');
        let formTabsContent = document.getElementsByClassName('form-content');
        let languages = document.getElementsByName('fav_language');
        let appName = document.getElementById('appNameInputId');
        let clientIDInput = document.getElementById('clientIDInput');
        let saveButton = document.getElementById('saveButton');
        let buttonsContainer = document.getElementById('buttonsContainer');

        for (let nextButton of nextButtons) {
            let thisTabContentElement = nextButton.closest('.form-content');
            let thisTabContentName = thisTabContentElement.getAttribute('data-tab-content');

            nextButton.onclick = () => {
                controlTabulation(formTabsLinks, formTabsContent, thisTabContentName);
            };
        }

        saveButton.addEventListener('click', async () => {
            let appSettings = {};

            // Launch animation
            handleButtonAnimation('saveButton', true, true);

            // Get selected language
            for (let i = 0, len = languages.length; i < len; i++) {
                if (languages[i].checked) {
                    appSettings.language = languages[i].value;
                    break;
                }
            }

            appSettings = {
                ...appSettings,
                appName: appName.value.trim() || APP.NAME,
                googleClientId: clientIDInput.value.trim(),
            };

            if (clientIDInput.value.trim()) {
                // Save settings to local storage
                localStorage.setItem(STORAGE.APP_SETTINGS, JSON.stringify(appSettings));

                // Load Google client library
                const script = document.createElement('script');
                script.src = "https://accounts.google.com/gsi/client";
                script.onload = () => {
                    handleSignInButton(buttonsContainer, true); // Display Sign In button
                };
                script.async = true;
                script.defer = true;
                script.id = "google-client-script";
                document.querySelector('body')?.appendChild(script);

            } else {
                handleButtonAnimation('saveButton', false, false);
                showAlert('alert-message', ERR.FIELD_REQUIRED.message, ERR.FIELD_REQUIRED.color);
            }
        });

        buttonsContainer.addEventListener('click', async (event) => {
            if (event.target && event.target.id === 'signInWithGoogle') {
                const googleClient = authService.initGoogleAuth(); // Initialize Google Auth
                googleClient.requestAccessToken();
            }
        });
    },
};

export default SetupTabs;
