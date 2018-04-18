var ip = "http://192.168.1.56";

isConnected();


//fonction pour vérifier l'état du booléen isConnected pour savoir si l'administrateur est connecté
function isConnected() {
        $.ajax({
        type: "get",
        url: ip + ":3002/connected",
        dataType: 'json',

        statusCode: {
            200: function () { //Employee_Company saved now updated
                getCartes();
            },
            401: function(){
                window.location.href = "http://administration.restologue.bwb/connection.html?";
            }

            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
            }
        });
//    if (users.isConnected) {
//        return true
//    } else {
//        return false
//    }
}

function startTest(){
    $.ajax({
        type: "get",
        url: ip + ":3000/cartes/get",
        dataType: 'json',

        success: function (data) {
            affichageCarte(data);


        },
        error: function (param1, param2) {
            
        }

    });
}
function affichageCartes(listeDeCarte) {


    $('#listeDeCarte').empty();
    
    var table = $("<table>");
    $("#listeDeCarte").append(table);
    $(table).addClass("table table-dark")
            .append($("<thead>")
                    .append($("<tr>")
                            .append($("<th>").text("Nom de la carte"))
                            .append($("<th>").text("Modifier"))
                            .append($("<th>").text("Supprimer"))));
    var tbody = $("<tbody>");
    $(table).append(tbody);
    for (var i = 0; i < listeDeCarte.length; i++) {
        var nom = listeDeCarte[i].nom
        var tr = $("<tr>");
        $(tr).append($("<td>").text(nom).attr('onclick', 'getCarteMenus('+ listeDeCarte[i].id+')'))
                .append($("<td>").append($("<button>").addClass("btn btn-secondary").text("Modifier").attr('onclick', 'updateMenu()')))
                .append($("<td>").append($("<button>").addClass("btn btn-danger").text("Supprimer")));
        $(tbody).append(tr);
    }
};

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

function affichageMenu() {
    
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
};

function addCartes(){
    var carte = {

        nom : $("#nomCarte").val(),

        menus : []


        };
        
        $.ajax({

       type: "POST",

       url: ip + ":3000/cartes/add",

       data: carte,

       success : function(data) {
           
            
            affichageCarte(data);
            
            alert("bravo vous avez bien acheter la place de cinema corespondant au film que vous venez d'entrer,votre compte sera débiter dans les prochains jours,merci de votre achat");
           alert("Success");

       }

       

    });
};

function removeCarte(){
    
};

function removeMenu(){
    
};

function removeAllMenus(){
    
};

function DeleteCarte(id){
    $.ajax({
        type: "post",
        url : "http://192.168.1.56:3000/cartes/" + id + "/remove",
        //success est le retour du serveur si les données requetées sont envoyées
        success : function(data){
            //une fois les données reçues j'appelle la fonction qui permet l'affichage des cartes
            
            updateViewDetail(data);
        }
    });
};

function updateMenu(id){
    var menu = {
        nom : $("#nomMenu").val(),
            entree: {
                nom : $("#nomEntree").val(),
                prix : $("#prixEntree").val()
            },
            plat : {
                nom : $("#nomPlat").val(),
                prix : $("#prixPlat").val()
            },
            dessert : {
                nom : $("#nomDessert").val(),
                prix : $("#prixDessert").val()
            }
        };
        $.ajax({
        type: "POST",
        url : ip + ":3000/cartes/menus/" + id + "/update",
        data : menu,
        success : function(retour){
            alert('menu mis à jour');
            
        }

    });
};

/*plusieurs fonction destinées à emettre les requetes*/

function getCartes(){
       $.ajax({
        type: "get",
        url: ip + ":3000/cartes/get",
        dataType: 'json',

        success: function (data) {
            affichageCartes(data);
         


        },
        error: function (param1, param2) {
            
        }
    });
}


function getCarteMenus(id){
     $.ajax({
        type: "get",
        url: ip + ":3000/cartes/"+ id +"/menus/get",
        dataType: 'json',

        success: function (data) {
            affichageCarteMenus(data);


        },
        error: function (param1, param2) {
            
        }
    });
};

function deleteMenu(id){
    
     $.ajax({
        type: "post",
        url: ip + ":3000/menus/" + id + "/remove",

        success: function (data) {
            affichageCarteMenus(data);


        },
        error: function (param1, param2) {
            
        }
    });
}

function affichageCarteMenus(menus) {
    
    $("#listeDeMenu").empty();
    
    var table = $("<table>");
    $("#listeDeMenu").append(table);
    $(table).addClass("table table-dark")
            .append($("<thead>")
                    .append($("<tr>")
                            .append($("<th>").text("Nom du menu"))
                            .append($("<th>").text("Prix"))
                            .append($("<th>").text("Ajouter"))
                            .append($("<th>").text("Modifier"))
                            .append($("<th>").text("Supprimer"))));
    var tbody = $("<tbody>");
    $(table).append(tbody);
    for (var i = 0; i < menus.length; i++) {
        var nom = menus[i].nom;
        var prix = menus[i].entree.prix + menus[i].plat.prix + menus[i].dessert.prix +" €";
        var tr = $("<tr>");
        $(tr).append($("<td>").text(nom)).append($("<td>").text(prix))
                .append($("<td>").append($("<button>").addClass("btn btn-primary").text("Ajouter").attr('onclick', "creationInput()")))
                .append($("<td>").append($("<button>").addClass("btn btn-secondary").text("Modifier")))
                .append($("<td>").append($("<button>").addClass("btn btn-danger").text("Supprimer").attr('onclick', 'deleteMenu(' + menus[i].id +')')));
        $(tbody).append(tr);
    }
};














//function getMenus(){
//           $.ajax({
//        type: "get",
//        url: ip + ":3000/cartes/menus/get",
//        dataType: 'json',
//
//        success: function (data) {
//                console.log(data);
//                affichageMenus(data);
//
//        },
//        error: function (param1, param2) {
//            
//        }
//    });
//}


//function affichageMenus(menus) {
//    
//    $("#listeDeMenu").empty();
//    
//    var table = $("<table>");
//    $("#listeDeMenu").append(table);
//    $(table).addClass("table table-dark")
//            .append($("<thead>")
//                    .append($("<tr>")
//                            .append($("<th>").text("Nom du menu"))
//                            .append($("<th>").text("Prix"))
//                            .append($("<th>").text("Ajouter"))
//                            .append($("<th>").text("Modifier"))
//                            .append($("<th>").text("Supprimer"))));
//    var tbody = $("<tbody>");
//    $(table).append(tbody);
//    for (var i = 0; i < menus.length; i++) {
//        var nom = menus.nom
//        //var prix = menus[i].entree.prix + menus[i].plat.prix + menus[i].dessert.prix +" €";
//        var tr = $("<tr>");
//        $(tr).append($("<td>").text(nom)).append($("<td>").text())
//                .append($("<td>").append($("<button>").addClass("btn btn-primary").text("Ajouter").attr('onclick', "creationInput()")))
//                .append($("<td>").append($("<button>").addClass("btn btn-secondary").text("Modifier")))
//                .append($("<td>").append($("<button>").addClass("btn btn-danger").text("Supprimer")));
//        $(tbody).append(tr);
//    }
//};