var ip = "http://192.168.1.56";
//$(document).ready(function () {
//    debug();
//});

//action requise avec la balise form pour annuler l'envoi automatique de la requete dû aux proprietées de la balise
$("form").submit(function(event){
    event.preventDefault();
    login();
});


function login(){
var user = {
    username : $("#inputUsername").val(),
    password : $("#inputPassword").val()
};

console.log(user);
    $.ajax({
        type: "POST",
        dataType : 'json',
        url : ip +":3002/verify",
        data : user,
        success : function(retour){
            window.location.href = "http://administration.restologue.bwb/";
        },
        error : function(param1, param2){
           alert('Erreur d\'authentification, veuillez réessayer');
        }

    });
}























//erreur lors de l'envoi d'une première requete elle est toujours canceled donc la fonction envoie une requete de connexion vide
function debug(){
    
    var bug = {
        username: "Thiery",
        password: "Halot"
    };
    $.ajax({
        type: "POST",
        dataType : 'json',
        url : ip +":3000/verify",
        data : bug,
        success : function(retour){
            //alert('données transmises');
        },
        error : function(param1, param2){
           // alert('erreur');
        }

    });
}
