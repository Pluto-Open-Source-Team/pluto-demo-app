export const showLoader = (element, show, message) => {
    if (show) {
        element.innerHTML = `
            <div id="page-loader"></div>
            <div id="loaderSubText"><p>${message}</p></div>
        `;
    } else {
        let loader = document.getElementById('page-loader');
        let loaderText = document.getElementById('loaderSubText');

        if (loader) {
            loader.style.display = 'none';
            loaderText.style.display = 'none';
        }
    }
};
