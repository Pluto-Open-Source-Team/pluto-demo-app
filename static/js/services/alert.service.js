export const messageAlert = (() => {

    const controller = {
        show (elementId, message, color) {
            document.getElementById(elementId).innerHTML = '' +
                '<div class="alert" style="background-color:' + color + '">' +
                    '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
                    message +
                '</div>';
        }
    }

    return controller;
})();
