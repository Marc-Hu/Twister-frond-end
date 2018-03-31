
$(document).ready(function() {

    init()

    /**
     * Dans la page de login, click sur le bouton "Pas encore inscrit"
     */
    $('#notregister').click(function(e){
        hideAll();
        $('#register').show()
    });

    /**
     * Appuie sur le bouton se connecter dans la page login
     */
    $('#login_connexion').click(function(e){
        // console.log($('#login_name'))
        var login = $('.login_input')[0].value;
        var password = $('.login_input')[1].value;
        // console.log(login+" "+password)
        var connected = connection(login, password);
        if(connected){
            getMyProfile()
            $('#login').hide();
            showMainPage()
        }else{
            $('#msg-err-login').text("Nom d'utilisateur ou mot de passe erroné");
        }
    });

    /**
     * Clique sur le bouton annuler de la page register
     */
    $('.button_cancel').click(function(e){
        $('#register').hide();
        showLogin()
    });

    /**
     * Clique sur le boutton d'oublie de mot de passe
     */
    $('#lost_password').click(function(e){
        setPasswordLostDefaultPanel();
        $('#login').hide();
        $('#password_lost').show();
    });

    /**
     * Clique sur le bouton pour voir ou réduire les commentaires d'un post
     */
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

    /**
     * Dès qu'il y a une touche qui est appuyé dans la barre de recherche
     */
    $('#bar-recherche').keyup(function(e){
        var val = $('#bar-recherche')[0].value; //Récup la valeur dans la barre
        // console.log(val);
        $('#browsers').empty();
        if(val.length!=0){ //Si la valeur n'est pas vide
            addListToSearchBar(getUserList(val).list); //On cherche tous les users qui ont cette valeur dans leur username
        }
    });

    /**
     * Clique sur le bouton de recherche
     */
    $('#search-logo').click(function(){
        var username = $('#bar-recherche')[0].value; //Récup la valeur dans la barre de recherche
        var user_profile = getProfileByUsername(username); //Récupère le profil de la personne recherché
        if(user_profile.hasOwnProperty("firstname")){ //Si l'utilisateur existe
            current_user=user_profile; //On met dans une var globale l'utilisateur
            setUserProfile(user_profile);//On va mettre à jour la page des profils
            hideAll(); //On cache tout
            $('#profile').show(); //Et on ne montre que la page concerné
            $('#middlediv').show();
            $('#log').show();
        }
    });

    //Si on clique quelque part dans la page
    $("body").click(function(e){
        // console.log(e.target.attributes[0])
        if(e.target.attributes[0]==undefined || e.target.attributes[0].value!="bar-recherche" && e.target.attributes[0].value!="browsers"){
            var bar_recherche=parseInt($('#bar-recherche').css("width"));
            var parent_bar_recherche=parseInt($('#bar-recherche').parent().css("width"))/2;
            // console.log("Valeur du width de la barre de recherche : "+bar_recherche+" Valeur width parent :"+parent_bar_recherche);
            if(bar_recherche>parent_bar_recherche){
                $('#bar-recherche').css({width: "35%"});
                $('#bar-recherche').css({"margin-left": "60%", transition: "margin-left 0s"});
            }
        }
    });

    /**
     * Clique sur déconnexion
     */
    $('#logout').click(function(e){
        logout();
        setMyProfileDefaultPanel();//On va mettre les panels par défaut
        setProfileDefaultPanel();
        // console.log(res);
    });

    /**
     * Si on clique sur son nom
     */
    $('#user').click(function(){
       hideAll();
        $('#myprofile').show(); //La page mon profil apparaît
        $('#middlediv').show();
        $('#log').show();
    });

    /**
     * Clique sur le logo ou le nom du site
     */
    $('#home_page').click(function(){
       hideAll();
       showMainPage(); //Reviens sur la page principale
    });

    /**
     * Clique sur le bouton suivre sur un profil
     */
    $('#follow').click(function(){
        var key = localStorage.getItem("user-key"); //récupère la clé
        var follow_id = current_user.id; //Récupère l'id du profil courant
        // console.log(key, follow_id);
        // console.log(follow(key, follow_id));
        var result =  follow(key, follow_id); //Appel du service
        if(result.code==200){ //Si c'est bon
            alert("Vous suivez désormais "+current_user.username);
        }else{ //Sinon
            alert("Vous suivez déjà cette personne.");
        }
    });

    /**
     * Clique sur ne plus suivre dans un profil; même procédure que pour follow
     */
    $('#unfollow').click(function(){
        var key = localStorage.getItem("user-key");
        var follow_id = current_user.id;
        var result =  unfollow(key, follow_id);
        if(result.code==200){
            alert("Vous ne suivez plus "+current_user.username);
        }else{
            alert("Vous ne pouvez pas faire ça.");
        }
    });

});

var list_message=new Array(0);

/**
 * Fonction qui va initialiser
 */
function init(){
    $('.add_comment').val("");//Bug des textarea, par défaut il y a plein d'espace et on ne voit pas le placeholder
    $('#new-message').val("");//Pareil que celui au dessus
    hideAll();
    if(!isLogged()){
        // $('#login').hide()
        showLogin();
    }else{
        $('#login').hide();
        showMainPage();
        getMyProfile();//Récupère et rempli la page mon profil
        setListFollowed(getListFollowed());//Récupère et affiche la liste des follow
    }
}

var current_user=null;

/**
 * Fonction qui va afficher la page de login et cacher le reste
 */
function showLogin(){
    hideAll();
    $('#login').show();
}

/**
 * Fonction qui va afficher la page principale
 */
function showMainPage(){
    $('#middlediv').show();
    $('#log').show();
    $('.maindiv').show();
    setListFollowed(getListFollowed())
}

/**
 * Fonction qui va tous cacher
 */
function hideAll(){
    $('#register').hide();
    $('#middlediv').hide();
    $('#log').hide();
    $('.maindiv').hide();
    $('#password_lost').hide();
    $('#profile').hide();
    $('#myprofile').hide();
    $('#login').hide();
    $('.commentaire-item').hide();
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
    // console.log(list_message[0].getHtml());
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

/**
 * Fonction qui va récupérer tous les usernames qui correspondent à la valeur dans la barre
 * de recherche et l'ajoute dans la datalist de la barre de recherche
 * @param list Liste des usernames qui correspondent à la recherche
 */
function addListToSearchBar(list){
    var item = null;
    list.forEach(function(e){
        item="<option value=\""+e.username+"\">";
        $('#browsers').append(item);
    });
}

/**
 * Fonction qui va mettre le texte pour le nom de l'utilisateur et ses données
 * @param user
 */
function setUserProfile(user){
    $('.profile_username').text(user.username);
    $('#profile_lastname').text(user.lastname);
    $('#profile_firstname').text(user.firstname);
}

/**
 * Fonction qui va prendre une liste de follow en paramètre
 * Il va ajouter dans la page principal, tous les follow de la personne connecté
 * @param list
 */
function setListFollowed(list){
    $('#list_followed').empty();
    var item=null;
    list.forEach(function(e){
        item="<p>"+e.followed_username+"<p>"
        $('#list_followed').append(item);
    })
}