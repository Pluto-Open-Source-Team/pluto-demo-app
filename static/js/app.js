import {
    AUTH,
    STORAGE,
    EVENTS
} from "./config.js";
import SetupTabs from './views/setup-tabs-view.js'
import authService from "./services/auth.service.js";

const renderSetupPage = async (elem) => {
    elem.innerHTML = await SetupTabs.render();
    await SetupTabs.post_render();
};

const app = async () => {
    // Load view elements
    const contentElement = document.getElementById('content');
    let auth2Instance = {};

    // Get App Settings
    const appSettings = localStorage.getItem(STORAGE.APP_SETTINGS);

    // Detect if the user signed in
    document.addEventListener(EVENTS.USER_AUTHENTICATED, async (e) => {
        if (e.detail && e.detail.isAuthenticated) {
            // render protected pages
        } else {
            await renderSetupPage(contentElement);
        }
    });

    if (appSettings && JSON.parse(appSettings).googleClientId) {
        authService.initGoogleAuth({
            client_id: JSON.parse(appSettings).googleClientId,
            scope: AUTH.SCOPE
        })
            .then(async () => {
                if (gapi.auth2.getAuthInstance()) {
                    auth2Instance = gapi.auth2.getAuthInstance();

                    if (auth2Instance.isSignedIn.get()) { // is authenticated
                        localStorage.setItem(STORAGE.ACCESS_TOKEN, authService.getAccessToken(auth2Instance));

                        // render protected pages

                    } else { // not authenticated
                        await renderSetupPage(contentElement);
                    }
                } else { // no instance
                    await renderSetupPage(contentElement);
                }
            })
            .catch(() => { // TODO: handle error

            });
    } else {
        await renderSetupPage(contentElement);
    }
};

document.addEventListener("DOMContentLoaded", app);
