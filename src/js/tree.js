let test = {
    policySchema: 'chrome.users.BrowserThemeColor',
    value: {
        browserThemeColor: '#4DB246',
    },
};

getLeafValue(test.value);

function getLeafValue(object, key) {
    if (typeof object === 'object') {
        getLeafValue(object[Object.keys(object)[0]], Object.keys(object)[0]);
    } else {
        return {
            valueName: key,
            value: object,
        };
    }
}
