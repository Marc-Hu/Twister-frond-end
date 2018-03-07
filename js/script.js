
$(document).ready(function() {
    $('.commentaire-item').hide();
    $('.show-com').click(function(e) {
        console.log("Appuie sur le bouton commentaire");
        if($(this).parent().find('.commentaire-item').first().is(":visible")){
            $(this).parent().find('.commentaire-item').first().hide();
        } else {
            $(this).parent().find('.commentaire-item').first().show();
        }
    });
})