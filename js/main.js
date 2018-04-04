$(document).ready(function() {

    /**
     * Lorsque l'utilisateur écrit dans le champ d'ajout d'un nouveau commentaire
     */
    $('.add_comment').keyup(function(){
        // console.log($(this).val());
        var new_comment=$(this).val();
        if(new_comment.length!=0){
            $(this).parent().find("input").prop("disabled", false);
        }else{
            $(this).parent().find("input").prop("disabled", true);
        }
    });
});

var list_comment = new Array(0); //Variable qui contiendra les commentaires récupérer lors de l'appel du servlet

/**
 * Fonction to sort list_comment
 * @param a
 * @param b
 * @returns {number}
 */
function custom_sort(a, b) {
    return new Date(b.date.$date) - new Date(a.date.$date) ;
}

/**
 * Fonction qui va ajouter les sweets dans la page main selon les sweets dans la liste
 * @param list liste des sweet reçu de la BDD
 */
function fillSweet(list){
    list_comment=list;
    var user = "";
    var id = "";
    $('.list-item').empty();
    // console.log("test1", list.length);
    console.log(list_comment)
    list_comment.sort(custom_sort)
    console.log(list_comment)
    list.forEach(function(e){
        // console.log(e._id.$oid);
        id= e._id.$oid;
        var text = $('<div class="sweets" id="'+id+'"><div class="list-item-top">\n' +
            '    <div class="list-item-top-span">\n' +
            '        <span class="user-message"></span>\n' +
            '    </div>\n' +
            '    <div class="list-item-top-span">\n' +
            '        <span class="date-message"></span>\n' +
            '    </div>\n' +
            '</div>\n' +
            '<div class="list-item-mid">\n' +
            '    <p class="contenu-message"></p>\n' +
            '</div>\n' +
            '<div>\n' +
            '    <span class="show-com" >+ Commentaires</span>\n' +
            '    <div class="commentaire-item">\n' +
            '    </div>\n' +
            '</div>\n' +
            '<div>\n' +
            '    <span>Ajouter un commentaire</span>\n' +
            '    <div class="div_new_comment">\n' +
            '        <textarea rows="1" placeholder="Nouveau commentaire" class="add_comment" value="">\n' +
            '        </textarea>\n' +
            '        <input type="submit" value="Ajouter" class="add_comment_button">\n' +
            '    </div>\n' +
            '</div></div>' +
            '<br>');
        //Condition pour éviter d'appeler l'API pour rien
        if(user.id!=""){
            if(user.id!=e.userId){
                // console.log("test");
                user = getProfileById(e.userId) //Récupération du profil par rapport à l'id
            }
        }
        text.find('.contenu-message').first().text(e.sweet); //Ajout du contenu du sweet
        text.find('.user-message').first().text(user.username); //Ajout du username du sweet
        date = new Date(e.date.$date);
        text.find('.date-message').first().text(date.getHours()+':'+date.getMinutes()+' '+date.toLocaleDateString());//Ajout de la date du sweet
        // console.log("test")
        $('.list-item').append(text)//Ajout du sweet dans la page
        setCommentBySweet(e);
    })
    setListenerToSweet(); //Ajout des listener sur les sweets
    // setComment();
}

/**
 * Fonction appelé après que l'utilisateur ajoute un sweet dans la base de données
 * Cette fonction va seulement ajouter les sweet non existant sur le board
 * @param sweet
 */
function addSweetToBoard(sweet){
    sweet.forEach(function(e){
        id= e._id.$oid;
        if($('#'+id).length==0){ //Si le sweet n'existe pas encore
            var text = $('<div class="sweets" id="'+id+'"><div class="list-item-top">\n' +
                '    <div class="list-item-top-span">\n' +
                '        <span class="user-message"></span>\n' +
                '    </div>\n' +
                '    <div class="list-item-top-span">\n' +
                '        <span class="date-message"></span>\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div class="list-item-mid">\n' +
                '    <p class="contenu-message"></p>\n' +
                '</div>\n' +
                '<div>\n' +
                '    <span class="show-com" >+ Commentaires</span>\n' +
                '    <div class="commentaire-item">\n' +
                '    </div>\n' +
                '</div>\n' +
                '<div>\n' +
                '    <span>Ajouter un commentaire</span>\n' +
                '    <div class="div_new_comment">\n' +
                '        <textarea rows="1" placeholder="Nouveau commentaire" class="add_comment" value="">\n' +
                '        </textarea>\n' +
                '        <input type="submit" value="Ajouter" class="add_comment_button">\n' +
                '    </div>\n' +
                '</div></div>' +
                '<br>');
            text.find('.contenu-message').first().text(e.sweet); //Ajout du contenu du sweet
            text.find('.user-message').first().text(localStorage.getItem('user-username')); //Ajout du username du sweet
            date = new Date(e.date.$date);
            text.find('.date-message').first().text(date.getHours()+':'+date.getMinutes()+' '+date.toLocaleDateString());//Ajout de la date du sweet
            $('.list-item').prepend(text)//Ajout du sweet dans la page
            setCommentBySweet(e); //Ajouter les commentaires du sweet (par défaut y'a rien donc il va juste ajouter les listener
        }
    })
}

/**
 * Fonction pour ajouter les commentaires pour un sweet
 * @param sweet
 */
function setCommentBySweet(sweet){
    // console.log(sweet);
    // console.log($('.sweets'));
    var i = 0;
    var user = null;
    sweet.comments.forEach(function(r){
        var text =
            $('<div class="commentaire-item-top">\n' +
                '   <div class="list-item-top-span">\n' +
                '       <span class="user-message"></span>\n' +
                '   </div>\n' +
                '   <div class="list-item-top-span">\n' +
                '       <span class="date-message"></span>\n' +
                '   </div>\n' +
                '</div>\n' +
                '<div class="commentaire-item-bottom">\n' +
                '    <p class="contenu-message"></p>\n' +
                '</div>\n');
        user = getProfileById(r.userId) //Récupération du profil par rapport à l'id
        text.find('.user-message').text(user.username);
        date = new Date(r.date.$date);
        text.find('.date-message').text(date.getHours()+':'+date.getMinutes()+' '+date.toLocaleDateString());
        text.find('.contenu-message').text(r.comment);
        // console.log(text)
        $('#'+sweet._id.$oid).find('.commentaire-item').append(text);
        $('.commentaire-item').hide();
        i++;
    })
    setListenerToSweet(sweet._id.$oid);
}


// /**
//  * Fonction pour ajouter les commentaires dans chaque sweet
//  */
// function setComment(){
//     setListenerToSweet(); //Ajout des listener sur les sweets
//     // console.log($('.sweets'));
//     var i = 0;
//     var user ="test";
//     list_comment.forEach(function(e){
//         e['comments'].forEach(function(r){
//             var text =
//                 $('<div class="commentaire-item-top">\n' +
//                 '   <div class="list-item-top-span">\n' +
//                 '       <span class="user-message"></span>\n' +
//                 '   </div>\n' +
//                 '   <div class="list-item-top-span">\n' +
//                 '       <span class="date-message"></span>\n' +
//                 '   </div>\n' +
//                 '</div>\n' +
//                 '<div class="commentaire-item-bottom">\n' +
//                 '    <p class="contenu-message"></p>\n' +
//                 '</div>\n');
//             if(user.id!=""){
//                 if(user.id!=e.userId){
//                     // console.log(e);
//                     user = getProfileById(e.userId).username //Récupération du profil par rapport à l'id
//                     // console.log(user)
//                 }
//             }
//             text.find('.user-message').text(user.username);
//             date = new Date(r.date.$date);
//             text.find('.date-message').text(date.getHours()+':'+date.getMinutes()+' '+date.toLocaleDateString());
//             text.find('.contenu-message').text(r.comment);
//             // console.log(text)
//             $('#'+e._id.$oid).find('.commentaire-item').append(text);
//         })
//         i++;
//     });
//     $('.commentaire-item').hide();
// }