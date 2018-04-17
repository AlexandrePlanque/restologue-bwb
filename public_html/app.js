var ip = "http://192.168.1.36";
$(document).ready(function () {

    $.ajax({
        type: "get",
        url: ip + ":3000/connected",
        dataType: 'json',

        success: function (data) {
            isConnected(data);
        },
        error: function (param1, param2) {
            alert('La connexion au serveur d\'authentification à échoué désolé');
        }

    });


    $.ajax({
        type: "get",
        url: ip + ":3000/listeDeCarte",
        dataType: 'json',

        success: function (data) {
            affichageCarte(data);
//            affichageMenu(data);


        },
        error: function (param1, param2) {
            alert('La connexion au serveur d\'authentification à échoué désolé');
        }

    });

});


//fonction pour vérifier l'état du booléen isConnected pour savoir si l'administrateur est connecté
function isConnected(users) {
    if (users.isConnected) {
        return true
    } else {
        window.location.href = "http://restologue.bwb/connection.html?"
        return false
    }
}


function affichageCarte(listeDeCarte) {

    var table = $("<table>");
    $("#listeDeCarte").append(table);
    $(table).addClass("table table-dark")
            .append($("<thead>")
                    .append($("<tr>")
                            .append($("<th>").text("Entrée"))
                            .append($("<th>").text("Modifier"))
                            .append($("<th>").text("Supprimer"))));
    var tbody = $("<tbody>");
    $(table).append(tbody);
    for (var i = 0; i < listeDeCarte.length; i++) {
        var nom = listeDeCarte[i].nom
        var tr = $("<tr>");
        $(tr).append($("<td>").text(nom).attr('onclick', 'affichageMenu()'))
                .append($("<td>").append($("<button>").addClass("btn btn-secondary").text("Modifier")))
                .append($("<td>").append($("<button>").addClass("btn btn-danger").text("Supprimer")));
        $(tbody).append(tr);
    }
}
;
function creationInput() {

    var table = $("<table>");
    $("#listeDeMenu").append(table);
    $(table).addClass("table table-dark")
            .append($("<thead>")
                    .append($("<tr>")
                            .append($("<select>").addClass("form-control").text("Catégorie").append($("<select>")))));
    var input = $("<input>");
    $("#listeDeMenu").append($("<input>").text("test")).append($("<button>").addClass("btn btn-primary").text("add"));
}

function affichageMenu(listeDeCarte) {

    var table = $("<table>");
    $("#listeDeMenu").append(table);
    $(table).addClass("table table-dark")
            .append($("<thead>")
                    .append($("<tr>")
                            .append($("<th>").text("Entrée"))
                            .append($("<th>").text("Prix"))
                            .append($("<th>").text("Ajouter"))
                            .append($("<th>").text("Modifier"))
                            .append($("<th>").text("Supprimer"))));
    var tbody = $("<tbody>");
    $(table).append(tbody);
    for (var i = 0; i < listeDeCarte.length; i++) {
        var nom = listeDeCarte[i].menus[i].nom
        var prix = listeDeCarte[i].menus[i].entree.prix
        var tr = $("<tr>");
        $(tr).append($("<td>").text(nom)).append($("<td>").text(prix))
                .append($("<td>").append($("<button>").addClass("btn btn-primary").text("Ajouter").attr('onclick', "creationInput()")))
                .append($("<td>").append($("<button>").addClass("btn btn-secondary").text("Modifier")))
                .append($("<td>").append($("<button>").addClass("btn btn-danger").text("Supprimer")));
        $(tbody).append(tr);
    }
}
;

//function createTab() {
//
//    var table = $("<table>");
//    $("#listeDeCarte").append(table);
//    $(table).addClass("table table-dark").append($("<thead>")
//            .append($("<tr>")
//                    .append($("<th>").text("Entrée"))
//                    .append($("<th>").text("Modifier"))
//                    .append($("<th>").text("Supprimer"))));
//            
//    var tbody = $("<tbody>");
//    $(table).append(tbody);
//    var tr = $("<tr>");
//    $(tbody).append($("<td>").text("E1"))
//            .append($("<td>").append($("<button>").addClass("btn btn-secondary").text("Modifier")))
//            .append($("<td>").append($("<button>").addClass("btn btn-danger").text("Supprimer")))
//
//
//
//
//
//}

