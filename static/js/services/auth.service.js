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
            localStorage.setItem(STORAGE.ACCESS_TOKEN, this.getAccessToken(gapi.auth2.getAuthInstance()));

            const event = new CustomEvent(EVENTS.USER_AUTHENTICATED, {
                detail: {
                    isAuthenticated: true
                }
            });
            document.dispatchEvent(event);
        }
    };

    getAccessToken = (auth2) => {
        return auth2.currentUser.get().getAuthResponse().access_token
    };
}

const authService = new AuthService();

export default authService;
