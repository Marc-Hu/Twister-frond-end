
$(document).ready(function() {

    init()

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
        // console.log($('#login_name'))
        var login = $('.login_input')[0].value
        var password = $('.login_input')[1].value
        // console.log(login+" "+password)
        var connected = connection(login, password)
        if(connected){
            $('#login').hide();
            showMainPage()
        }else{
            $('#msg-err-login').text("Nom d'utilisateur ou mot de passe erroné");
        }
    });

    $('#password_lost_validate').click(function(e){
       $('#password_lost').hide();
       showLogin();
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
       $(this).css({width: "85%", transition: "width 1s"});
       $(this).css({"margin-left": "10%", transition: "margin-left 1s"});
    });

    //Si on clique quelque part dans la page
    $("body").click(function(e){
        // console.log(e.target.attributes[0])
        if(e.target.attributes[0]==undefined || e.target.attributes[0].value!="bar-recherche"){
            var bar_recherche=parseInt($('#bar-recherche').css("width"));
            var parent_bar_recherche=parseInt($('#bar-recherche').parent().css("width"))/2;
            // console.log("Valeur du width de la barre de recherche : "+bar_recherche+" Valeur width parent :"+parent_bar_recherche);
            if(bar_recherche>parent_bar_recherche){
                $('#bar-recherche').css({width: "35%"});
                $('#bar-recherche').css({"margin-left": "60%", transition: "margin-left 0s"});
            }
        }
    });

});

var list_message=new Array(0);

/**
 * Fonction qui va initialiser
 */
function init(){
    $('.commentaire-item').hide();
    $('#register').hide();
    $('#password_lost').hide();
    // $('#login').hide()
    showLogin()
    getjsonData();
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

function showMainPage(){
    $('#middlediv').show();
    $('#log').show();
    $('.maindiv').show();
}

function Message(id, auteur, texte, date, comments){
    this.id=id;
    this.auteur=auteur;
    this.texte=texte;
    this.date=date;
    this.comments=comments;
}

Message.prototype.getHtml=function(){
    var s="Test";
    return s;
};

function Commentaire(id, auteur, texte, date){
    this.id=id;
    this.auteur=auteur;
    this.texte=texte;
    this.date=date;
}

function refresh_message_data(){
    console.log(list_message[0].getHtml());
}

function getjsonData(){
    $.getJSON( "json/message.json", function( data ){
        console.log(data);
        $.each( data, function( i, item ) {
            console.log(i+" "+item["username"]);
            var comments=[];
            item["commentaire"].forEach(function(element) {
                console.log(element);
                comments.push(new Commentaire(element.id, element.username, element.message, element.date));
            });
            list_message.push(new Message(item["id"], item["username"], item["message"], item["date"], comments));
        });
        console.log(list_message);
        refresh_message_data()
    });
}