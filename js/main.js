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

    /**
     * Lorsque l'utilisateur appuie sur le bouton pour ajouter un nouveau commentaire
     */
    $(".add_comment_button").click(function(){
        console.log("Ajout d'un nouveau commentaire");
    });
});
