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

    getAccessToken = () => {
        console.log('qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');
        console.log(gapi.auth2.getAuthInstance());
    };
}

const authService = new AuthService();

export default authService;
