// TODO needs to add <div id="alert-message"></div> element everytime, it needs a fix
export const showAlert = (elementId, message, color) => {
    document.getElementById(elementId).innerHTML = '' +
        '<div class="alert" style="background-color:' + color + '">' +
        '<span class="closebtn" onclick="this.parentElement.style.display=\'none\';">&times;</span>' +
        message +
        '</div>';
};
