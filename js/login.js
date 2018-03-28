$(document).ready(function() {

    $('.login_input').keyup(function(){
        $('#login_connexion').prop("disabled", true) //Boutton Se connecter est disable
        var login = $('.login_input')[0].value; //Récup des valeurs de login
        var password = $('.login_input')[1].value //Et de password
        $(this).addClass("touched") //On ajoute une classe touched pour dire si le input est touché
        if(login.length==0 && $('#login_name').hasClass("touched")){ //Si c'est le cas et que la longueur de login est 0
            $('#msg-err-login').text("Nom d'utilisateur obligatoire") //On affiche le message d'erreur
        }else if (password.length==0 && $('#login_password').hasClass("touched")){ //Pareil pour password
            $('#msg-err-login').text("Mot de passe obligatoire")
            //Sinon si tout est là, alors on enlève le disable du boutton pour se connecter
        }else if(login.length!=0 && password.length!=0){
            $('#msg-err-login').text("")
            $('#login_connexion').prop("disabled", false)
            console.log($('#login_connexion').prop("disabled"));
        }else {
            $('#msg-err-login').text("")
        }
    });

    /**
     * Lorsqu'on clique sur un bouton qui nous amène sur la page de login
     */
    $('.login_page').click(function(e) {
        removeUserKey()
        setLoginDefaultPanel()
        showLogin()
    });
});