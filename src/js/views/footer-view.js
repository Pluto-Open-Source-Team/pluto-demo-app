const Footer = {
    /**
     * Render the component content.
     */
    render: async () => {
        return `<p><span class="footer-part-1">&copy; 2022 Pluto. All Rights Reserved</span><span class="footer-part-2"><a href="/privacy.html">Privacy Policy</a> | <a href="/tos.html">Terms of Service</a></span></p>`;
    },

    /**
     * DOM
     */
    post_render: async () => {},
};

export default Footer;
