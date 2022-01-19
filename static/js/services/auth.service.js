import {
    EVENTS, STORAGE
} from "../config.js";

class AuthService {

    initGoogleAuth = (params) => new Promise((resolve, reject) => {
        gapi.load('auth2', () => {
            gapi.auth2.init(params).then((res) => {
                resolve(res);
            }).catch((err) => {
                reject(err);
            });
        });
    });

    handleSignIn = () => {
        gapi.auth2.getAuthInstance().signIn();
    };

    signedInCallback = (isSignedIn) => {
        if (isSignedIn) {
            localStorage.setItem(STORAGE.ACCESS_TOKEN, JSON.stringify(this.getAccessToken(gapi.auth2.getAuthInstance())));

            const event = new CustomEvent(EVENTS.USER_AUTHENTICATED, {
                detail: {
                    isAuthenticated: true
                }
            });
            document.dispatchEvent(event);
        }
    };

    getAccessToken = (auth2) => {
        return {
            accessToken: auth2.currentUser.get().getAuthResponse().access_token,
            expiresAt: auth2.currentUser.get().getAuthResponse().expires_at
        }
    };

    isValidToken = () => {
        let token = localStorage.getItem(STORAGE.ACCESS_TOKEN);

        if (!token) {
            return false;
        }

        const currentTime = Date.now() / 1000;

        return JSON.parse(token).expiresAt > currentTime;
    };

    getNewAccessToken = async () => {
        if (gapi.auth2.getAuthInstance()) {
            // Get Token
            let newToken = await gapi.auth2.getAuthInstance().currentUser.get().reloadAuthResponse();

            // Save token to local storage
            localStorage.setItem(STORAGE.ACCESS_TOKEN, JSON.stringify(this.getAccessToken(gapi.auth2.getAuthInstance())));

            return newToken.access_token;
        } else {
            // TODO: remove localstorage and logout
            return false;
        }
    };
}

const authService = new AuthService();

export default authService;
