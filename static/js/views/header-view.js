import {
    APP,
    STORAGE
} from "../config.js";

const Header = {
    /**
     * Render the component content.
     */
    render: async () => {
        const appSettings = localStorage.getItem(STORAGE.APP_SETTINGS);
        const appName = appSettings ? JSON.parse(appSettings).appName : APP.NAME;

        return `
            <a href="/" class="main-logo-link">
                <div class="main-logo-holder main-logo">
                    <h3>${appName} <span class="sub-title-main-logo">By Pluto</span></h3>
                </div>
            </a>
        `;
    },

    /**
     * DOM
     */
    post_render: async () => {}
};

export default Header;
