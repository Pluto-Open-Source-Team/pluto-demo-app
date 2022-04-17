import { AUTH, STORAGE } from '../config.js';

class AuthService {
    initGoogleAuth() {
        return window.google.accounts.oauth2.initTokenClient({
            client_id: this.getClientId(),
            scope: AUTH.SCOPE,
            callback: this.signedInCallback,
            prompt: 'consent'
        });
    }

    /**
     * {
     *     "access_token": "",
     *     "token_type": "Bearer",
     *     "expires_in": 3599,
     *     "scope": "",
     *     "authuser": "0",
     *     "hd": "example.com",
     *     "prompt": "none"
     * }
     */
    signedInCallback(res) {
        if (res.access_token) {
            localStorage.setItem(STORAGE.ACCESS_TOKEN, res.access_token);
            window.location.reload();
        }
    }

    getClientId() {
        // Get App Settings
        const appSettings = localStorage.getItem(STORAGE.APP_SETTINGS);

        if (appSettings && JSON.parse(appSettings).googleClientId) {
            return JSON.parse(appSettings).googleClientId;
        }

        return null;
    }

    getAccessToken() {
        return localStorage.getItem(STORAGE.ACCESS_TOKEN);
    }

    logout() {
        localStorage.removeItem(STORAGE.ACCESS_TOKEN);
        window.location.reload();
    }
}

const authService = new AuthService();

export default authService;
