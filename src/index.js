import { STORAGE } from '@/js/config.js';
import SetupTabs from '@/js/views/setup-tabs-view.js';
import Header from '@/js/views/header-view.js';
import Footer from '@/js/views/footer-view.js';
import authService from '@/js/services/auth.service.js';
import Diagram from '@/js/views/diagram-view.js';
import '@/styles/style.css';

const renderSetupPage = async (elem) => {
    elem.innerHTML = await SetupTabs.render();
    await SetupTabs.post_render();
};

const renderHeaderNFooter = async (headerElem, footerElem) => {
    headerElem.innerHTML = await Header.render();
    await Header.post_render();

    footerElem.innerHTML = await Footer.render();
    await Footer.post_render();
};

const renderDiagram = async (elem) => {
    elem.innerHTML = await Diagram.render();
    await Diagram.post_render();
};

const app = async () => {
    // Load view elements
    const headerElement = document.getElementById('header');
    const footerElement = document.getElementById('footer');
    const contentElement = document.getElementById('content');

    // Get App Settings
    const appSettings = localStorage.getItem(STORAGE.APP_SETTINGS);

    // Get Access Token
    const accessToken = authService.getAccessToken();

    if (appSettings && accessToken) {
        await renderHeaderNFooter(headerElement, footerElement); // Render Header and Footer
        await renderDiagram(contentElement); // Render Main Modal
    } else {
        await renderSetupPage(contentElement);
    }
};

document.addEventListener('DOMContentLoaded', app);
