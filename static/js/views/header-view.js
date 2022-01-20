const Header = {
    /**
     * Render the component content.
     */
    render: async () => {
        return `
            <div class="main-logo-holder main-logo">
                <h3>Chrome Policy Manager <span class="sub-title-main-logo">By Pluto</span></h3>
            </div>
        `;
    },

    /**
     * DOM
     */
    post_render: async () => {}
};

export default Header;
