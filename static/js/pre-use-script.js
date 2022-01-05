document.addEventListener("DOMContentLoaded", (event) => {
    let nextButtons = document.getElementsByClassName('next-btn');
    let formTabsLinks = document.getElementsByClassName('pre-use-form-link');
    let formTabsContent = document.getElementsByClassName('form-content');

    for (let nextButton of nextButtons) {
        let thisTabContentName = nextButton.closest(".form-content").getAttribute('data-tab-content');

        nextButton.onclick = () => {

            // Move tabs highlight
            for (let i = 0; i < formTabsLinks.length; i++) {
                const thisTabLinkElement = formTabsLinks[i];

                if (thisTabLinkElement.getAttribute('data-attr') === thisTabContentName) {
                    let nextTabElement = formTabsLinks[i + 1];
                    document.getElementById("form-tab-highlight").style.left = nextTabElement.offsetLeft + 'px';
                    thisTabLinkElement.classList.toggle('active');
                    break;
                }
            }

            // Change tab content
            for (let i = 0; i < formTabsContent.length; i++) {
                const thisTabContentElement = formTabsContent[i];

                if (thisTabContentElement.getAttribute('data-tab-content') === thisTabContentName) {
                    let nextTabContent = formTabsContent[i + 1];
                    nextTabContent.classList.toggle('show');
                    break;
                }
            }
        }
    }
});
