const POLICIES_NAMESPACES = ['chrome.users.*', 'chrome.devices.*'];
const POLICIES_BLOCKLIST = ['chrome.users.RemoteAccessHostClientDomainList', 'chrome.users.ManagedBookmarksSetting'];

let policiesDataResponse = {
    "chrome.users.*": [
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.Wallpaper",
                "value": {
                    "wallpaperImage": {
                        "downloadUri": "https://storage.googleapis.com/chromeos-mgmt/0gjdgxs1odx3ih/ChromeOsWallpaper/054c8ddf-739b-4397-87c9-c8f9b54f28f0"
                    }
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.BrowserThemeColor",
                "value": {
                    "browserThemeColor": "#4DB246"
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.DeviceEnrollment",
                "value": {
                    "autoDevicePlacementEnabled": true
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.GaiaOfflineSigninTimeLimitDays",
                "value": {
                    "gaiaOfflineSigninTimeLimitDays": {
                        "value": "1"
                    }
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.GaiaLockScreenOfflineSigninTimeLimitDays",
                "value": {
                    "gaiaLockScreenOfflineSigninTimeLimitDays": {
                        "value": "1"
                    }
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.SingleSignOn",
                "value": {
                    "idpRedirectEnabled": true
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.SingleSignOnLoginFrequency",
                "value": {
                    "samlOfflineSigninTimeLimit": "SAML_SIGNIN_TIME_LIMIT_ENUM_SAML_ONE_DAY"
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.SamlLockScreenOfflineSigninTimeLimitDays",
                "value": {
                    "samlLockScreenOfflineSigninTimeLimitDays": {
                        "value": "1"
                    }
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.RemoteAccessHostClientDomainList",
                "value": {
                    "remoteAccessHostClientDomainList": [
                        "mobinergy.com"
                    ]
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.ManagedBookmarksSetting",
                "value": {
                    "managedBookmarks": {
                        "bookmarks": [
                            {
                                "link": {
                                    "name": "My Apps",
                                    "url": "https://mobinergy.okta.com/app/UserHome"
                                }
                            },
                            {
                                "link": {
                                    "name": "RingCentral",
                                    "url": "https://app.ringcentral.com/"
                                }
                            }
                        ],
                        "toplevelName": "Mobinergy"
                    }
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.BookmarkBarEnabled",
                "value": {
                    "bookmarkBarEnabled": "TRUE"
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.SmartLockAllowed",
                "value": {
                    "smartLockAllowed": true
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.users.VirtualMachinesAllowed",
                "value": {
                    "virtualMachinesAllowed": true
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        }
    ],
    "chrome.devices.*": [
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.devices.SsoIdpRedirection",
                "value": {
                    "loginAuthenticationBehavior": "LOGIN_BEHAVIOR_ENUM_SAML_INTERSTITIAL"
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.devices.SsoCookieBehavior",
                "value": {
                    "transferSamlCookies": true
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.devices.VirtualMachinesAllowedUnaffiliatedUser",
                "value": {
                    "virtualMachinesAllowedForUnaffiliatedUser": true
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        },
        {
            "targetKey": {
                "targetResource": "orgunits/03ph8a2z13iejgx"
            },
            "value": {
                "policySchema": "chrome.devices.PartnerAccess",
                "value": {
                    "chromeDeviceManagementApiEnabled": true,
                    "ackNoticeForChromeDeviceManagementApiEnabledSetToTrue": true
                }
            },
            "sourceKey": {
                "targetResource": "orgunits/03ph8a2z0pyg21q"
            }
        }
    ]
};

let trimmedPolicies = [];

for (let i = 0; i < POLICIES_NAMESPACES.length; i++) {
    let formattedPolicies = [];

    for (let j = 0; j < policiesDataResponse[POLICIES_NAMESPACES[i]].length; j++) {

        let policiesValueObject = policiesDataResponse[POLICIES_NAMESPACES[i]][j].value;
        let valueObject = policiesValueObject.value;

        if (!POLICIES_BLOCKLIST.includes(policiesValueObject.policySchema)) {
            if (Object.keys(valueObject).length > 1) {
                for (let k = 0; k < Object.keys(valueObject).length; k++) {
                    formattedPolicies.push({
                        leafName: `${policiesValueObject.policySchema.split('.')[2]}.${Object.keys(valueObject)[k]}`,
                        value: valueObject[Object.keys(valueObject)[k]]
                    });
                }
            } else {
                let returnedLeafValue = getLeafValue(valueObject);
                formattedPolicies.push({
                    leafName: `${policiesValueObject.policySchema.split('.')[2]}.${returnedLeafValue.valueName}`,
                    value: returnedLeafValue.value
                });
            }
        }
    }

    trimmedPolicies.push({
        [POLICIES_NAMESPACES[i]]: formattedPolicies
    });
}

function getLeafValue(object, key) {
    if (typeof object === 'object') {
        return getLeafValue(object[Object.keys(object)[0]], Object.keys(object)[0]);
    } else {
        return {
            valueName: `${key}`,
            value: object
        };
    }
}


console.log(trimmedPolicies);
