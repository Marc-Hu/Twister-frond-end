
$(document).ready(function() {

    init()

    /**
     * Fonction qui va initialiser
     */
    function init(){
        $('.commentaire-item').hide();
        $('#register').hide();
        $('#password_lost').hide();
        // $('#login').hide()
        showLogin()
    }

    /**
     * Fonction qui va afficher la page de login et cacher le reste
     */
    function showLogin(){
        $('#register').hide();
        $('#middlediv').hide();
        $('#log').hide();
        $('.maindiv').hide();
        $('#password_lost').hide();
        $('#login').show();
    }

    /**
     * Dans la page de login, click sur le bouton "Pas encore inscrit"
     */
    $('#notregister').click(function(e){
        $('#login').hide();
        $('#register').show()
    });

    /**
     * Appuie sur le bouton se connecter dans la page login
     */
    $('#login_connexion').click(function(e){
        $('#login').hide();
        showMainPage()
    });

    /**
     * Bouton déconnexion de la barre
     */
    $('.login_page').click(function(e){
        showLogin()
    });

    /**
     * Click sur le bouton s'enregistrer de la page register
     */
    $('#register_button_register').click(function(e){
        $('#register').hide();
        showMainPage()
    });

    /**
     * Clique sur le bouton annuler de la page register
     */
    $('.button_cancel').click(function(e){
        $('#register').hide();
        showLogin()
    });

    $('#lost_password').click(function(e){
        $('#login').hide();
        $('#password_lost').show();
    });

    function showMainPage(){
        $('#middlediv').show();
        $('#log').show();
        $('.maindiv').show();
    }

    $('.show-com').click(function(e) {
        console.log("Appuie sur le bouton commentaire");
        if($(this).parent().find('.commentaire-item').first().is(":visible")){
            $(this).parent().find('.commentaire-item').first().hide();
            $(this).text('+ Commentaires');
        } else {
            $(this).parent().find('.commentaire-item').first().show();
            $(this).text('- Commentaires');
        }
    });
    // Fonction qui sera appelé lorsqu'on clique sur la barre de recherche
    $('#bar-recherche').click(function(e){
       console.log("Appuie dans la barre de recherche");
       $(this).css("width", "85%");
       $(this).css("margin-left", "10%");
    });

    //Si on clique quelque part dans la page
    $("body").click(function(e){
        // console.log(e.target.attributes[0])
        if(e.target.attributes[0]==undefined || e.target.attributes[0].value!="bar-recherche"){
            var bar_recherche=parseInt($('#bar-recherche').css("width"));
            var parent_bar_recherche=parseInt($('#bar-recherche').parent().css("width"))/2;
            // console.log("Valeur du width de la barre de recherche : "+bar_recherche+" Valeur width parent :"+parent_bar_recherche);
            if(bar_recherche>parent_bar_recherche){
                $('#bar-recherche').css("width", "35%");
                $('#bar-recherche').css("margin-left", "60%");
            }
        }
    });
})