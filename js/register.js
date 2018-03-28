$(document).ready(function() {

    $('.register_input').keyup(function(){
        $('#register_button_register').prop("disabled", true) //Boutton S'inscrire est disable
        var name = $('.register_input')[0].value; //Récup des valeurs de nom
        var surname = $('.register_input')[1].value //Et de prénom
        var login = $('.register_input')[2].value
        var email = $('.register_input')[3].value
        var password = $('.register_input')[4].value
        var repeat = $('.register_input')[5].value
        var field_valid = verifField(name, surname, login, email, password, repeat)
        // console.log(surname+" "+name+" "+login+" "+email+" "+password+" "+repeat)
        $(this).addClass("touched")
        if(name.length==0 && $('#register_name').hasClass("touched")){
            $('#msg-err-register').text("Prénom obligatoire")
        }else if (surname.length==0 && $('#register_surname').hasClass("touched")){
            $('#msg-err-register').text("Nom de famille obligatoire")
        }else if (login.length==0 && $('#register_login').hasClass("touched")){
            $('#msg-err-register').text("Login obligatoire")
        }else if (email.length==0 && $('#register_email').hasClass("touched")){
            $('#msg-err-register').text("Email obligatoire")
        }else if (password.length==0 && $('#register_password').hasClass("touched")){
            $('#msg-err-register').text("Mot de passe obligatoire")
        }else if (repeat.length==0 && $('#register_repeat').hasClass("touched")){
            $('#msg-err-register').text("Répéter le mot de passe obligatoire")
        }else if (password!=repeat){
            $('#msg-err-register').text("Les deux mots de passe doivent être identitque")
        }else if (field_valid){
            console.log("form good")
            $('#msg-err-register').text("")
            $('#register_button_register').prop("disabled", false)
        }else if (!verifEmail(email) && $('#register_email').hasClass("touched")){
            $('#msg-err-register').text("Email invalide")
        }else{
            $('#msg-err-register').text("")
        }
    });

    /**
     * Click sur le bouton s'enregistrer de la page register
     */
    $('#register_button_register').click(function(e){
        var name = $('.register_input')[0].value; //Récup des valeurs de nom
        var surname = $('.register_input')[1].value //Et de prénom
        var login = $('.register_input')[2].value
        var email = $('.register_input')[3].value
        var password = $('.register_input')[4].value
        var repeat = $('.register_input')[5].value
        var response=createUser(name, surname, login, email, password, repeat)
        if(response){
            $('#register').hide();
            showMainPage()
            setRegisterDefaultPanel()
        }else{
            $('#msg-err-register').text("L'utilisateur existe déjà")// Sera modifié par la suite car on à le message de retour de l'API
        }
    });

});

var regex_email = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function verifField(name, surname, login, email, password, repeat){
    return name.length!=0 && surname.length!=0 && login.length!=0 && email.length!=0 && password.length!=0 && repeat.length!=0 && password==repeat && regex_email.test(email.toLowerCase());
}

function verifEmail(email){
    return regex_email.test(email);
}