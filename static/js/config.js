export const APP = {
    NAME: 'Chrome Policy Manager'
};

export const AUTH = {
    SCOPE: 'https://www.googleapis.com/auth/admin.directory.orgunit.readonly https://www.googleapis.com/auth/chrome.management.policy.readonly https://www.googleapis.com/auth/chrome.management.policy',
    VALIDATION_URL: 'https://oauth2.googleapis.com/token?client_secret=DEfucKS4NARV7fn8A2RaQbzb6kJgnZ&code=DEfucKS4NARV7fn8A2RaQbzb6kJgnZ&grant_type=authorization_code&redirect_uri=http://localhost:3030&client_id='
};

export const STORAGE = {
    APP_SETTINGS: 'APP_SETTINGS',
    ACCESS_TOKEN: 'ACCESS_TOKEN'
};

export const EVENTS = {
    USER_AUTHENTICATED: 'USER_AUTHENTICATED'
};

export const API = {
    G_ADMIN_HOST: 'https://admin.googleapis.com',
    G_CHROME_POLICY_HOST: 'https://chromepolicy.googleapis.com',
    G_CUSTOMER: 'my_customer'
};

export const POLICIES_NAMESPACES = ['chrome.users.*', 'chrome.devices.*'];

export const POLICIES_BLOCKLIST = ['chrome.users.RemoteAccessHostClientDomainList', 'chrome.users.ManagedBookmarksSetting'];

export const ERR = {
    GENERAL: {
        color: '#f69595',
        message: 'Oops! Something went wrong. Please try again.'
    },
    FIELD_REQUIRED: {
        color: '#f69595',
        message: 'An entry is required. Please correct and try again.'
    },
    CLIENT_ID: {
        color: '#f69595',
        message: 'Something went wrong with Client ID. Please correct and try again.'
    }
};
