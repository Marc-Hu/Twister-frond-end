/**
 * Fonction qui va remettre par defaut le panneau de login en enlevant les textes
 */
function setLoginDefaultPanel(){
    $('#login_name').val("");
    $('#login_name').removeClass("touched");
    $('#login_password').val("");
    $('#login_password').removeClass("touched");
    $('#msg-err-login').text("");
    $('#login_connexion').prop("disabled", true)
}

function setRegisterDefaultPanel(){
    $('#register_name').val("");
    $('#register_surname').val("");
    $('#register_login').val("");
    $('#register_email').val("");
    $('#register_password').val("");
    $('#register_repeat').val("");
    $('#register_name').removeClass("touched");
    $('#register_surname').removeClass("touched");
    $('#register_login').removeClass("touched");
    $('#register_email').removeClass("touched");
    $('#register_password').removeClass("touched");
    $('#register_repeat').removeClass("touched");
    $('#msg-err-register').text("");
    $('#register_button_register').prop("disabled", true)
}