// partie login 

if(!window.openDatabase) {
    alert('ERROR');
 }
  else{
    var db = openDatabase('store.db','1.0','table-echant',1024*1024*5);


db.transaction(function(tx){
tx.executeSql('create table if not exists login(firstname TEXT , lastname TEXT ,username TEXT Primary Key ,pwd TEXT)', []);
});
}



db.transaction(function(tx) {
tx.executeSql('insert into login (username,pwd) values (?,?)',['rania.chebbi','123'],
function(tx) {
alert('insertion éffectuée')
});
tx.executeSql('insert into login (username,pwd) values (?,?)',['hbib.dhaouadi','456']
);

tx.executeSql('insert into login (username,pwd) values (?,?)',['safa.farhat','789']
);
});










function updateDrafts(transaction, results) {
  //initialise the listitems variable
  var listitems = "";
  //get the list holder ul
  var listholder = document.getElementById("drafts");

  //clear the list of drafts ul
  listholder.innerHTML = "";

  var i;
  //Iterate through the results
  for (i = 0; i < results.rows.length; i++) {
    //Get the current row from database
    var row = results.rows.item(i);

    listholder.innerHTML += "<li>" + row.login+ " - " + row.pwd + + "(<a href='javascript:void(0);' onclick='deleteDraft(" + row.id + ");'>Delete Draft</a>)";
  }
}



db.transaction(function(tx){
tx.executeSql('create table if not exists echantillon(code_district TEXT Primary Key ,gourvanerat TEXT ,num_m TEXT,nom_chef_f TEXT, adresse TEXT ,user TEXT)', []);
});




db.transaction(function(tx) {
tx.executeSql('insert into echantillon (code_district,gourvanerat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)',['110111','11','1','Rania chebbi','Tunis','rania.chebbi'],
);
tx.executeSql('insert into echantillon (code_district,gourvanerat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)',['110000','10','2','hbib dhaouadi','bizert','hbib.dhaouadi']
);


tx.executeSql('insert into echantillon (code_district,gourvanerat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)',['111000','12','3','safa farhat','ariana','safa.farhat']
);
});







//afficher le cont du tab








//effacer une colone du tab
function supprimer(id){
db.transaction(function(tx){

    tx.executeSql('delete from echantillon where id=?',[id],null,erreur);
    afficher();
})
}



//vider tous le cont du tab 
function vider(){
db.transaction(function(tx){
    tx.executeSql('delete from echantillon ',null,null,null,null,null,erreur);
    afficher();
});}

//partie menage 




//
//      function erreur(tx,error){
//      alert(error.message);
  //  }
    //db.transaction(function(tx){
      //tx.executeSql('create table if not exists echantillon(code_district varchar Primary Key ,gourvanerat varchar , mon_m varchar,nom_chef_f varchar, adresse varchar)',null,null,null,null,null,erreur);
//        });
//    }
//function ajouter(){


//var code_district=document.getElementById(code_district);
//var gourvanerat=document.getElementById(gourvanerat);
//var num_menage=document.getElementById(num-m);
//var nom_chef_f=document.getElementById(nom_chef_f);
//var adresse=document.getElementById(adresse);

//db.transaction(function(tx){
//tx.executeSql('insert into echantillon (code_district,gourvanerat, mon_m,nom_chef_f,adresse) values (?,?,?,?,?) ',[code_district.value,gourvanerat.value,num_menage.value,nom_chef_f.value,adresse.value],erreur);
// code_district.value='';
// gourvanerat.value='';
// num_menage.value='';
// nom_chef_f.value='';
// adresse.value='';
//});
//}

db.transaction(function(tx){
tx.executeSql('create table if not exists menage(code_district TEXT Primary Key ,gourvanerat TEXT ,num_m TEXT,nom_chef_f TEXT, adresse TEXT ,s1 TEXT ,s2 TEXT ,s3 TEXT ,s4 TEXT ,s5 TEXT ,s6 TEXT ,s7 TEXT ,s8 TEXT ,s9 TEXT ,s10 TEXT )', []);
});


function ajouter(){

db.transaction(function(tx) {
tx.executeSql('insert into echantillon (code_district,gourvanerat,num_m,nom_chef_f,adresse,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)',[], function(tx) {
alert('insertion éffectuée')
});
});}

//partie membre de menage

//      function erreur(tx,error){
//      alert(error.message);
  //  }
    //db.transaction(function(tx){
      //tx.executeSql('create table if not exists echantillon(code_district varchar Primary Key ,gourvanerat varchar , mon_m varchar,nom_chef_f varchar, adresse varchar)',null,null,null,null,null,erreur);
//        });jkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkkk,,,,,,,,,,,,,,**)*****è____________________________________________________________________________uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu3
//    }
//function ajouter(){


//var code_district=document.getElementById(code_district);
//var gourvanerat=document.getElementById(gourvanerat);
//var num_menage=document.getElementById(num-m);
//var nom_chef_f=document.getElementById(nom_chef_f);
//var adresse=document.getElementById(adresse);

//db.transaction(function(tx){
//tx.executeSql('insert into echantillon (code_district,gourvanerat, mon_m,nom_chef_f,adresse) values (?,?,?,?,?) ',[code_district.value,gourvanerat.value,num_menage.value,nom_chef_f.value,adresse.value],erreur);
// code_district.value='';
// gourvanerat.value='';
// num_menage.value='';
// nom_chef_f.value='';
// adresse.value='';
//});
//}

db.transaction(function(tx){
tx.executeSql('create table if not exists membre_menage(code_district TEXT Primary Key ,gourvanerat TEXT ,num_m TEXT,num_indiv TEXT ,nom TEXT, relation TEXT, sexe TEXT ,etat_civil TEXT ,date_nais DATE , age, niv_s TEXT, pers_s TEXT  )', []);
});


function ajouter(){

db.transaction(function(tx) {
tx.executeSql('insert into echantillon (code_district,gourvanerat,num_m,nom_indiv_f,nom , relation, sexe ,etat_civil  ,date_nais , age, niv_s, pers_s) values (?,?,?,?,?,?,?,?,?,?,?,?,)',[], function(tx) {
alert('insertion éffectuée')
});
});}

//afficher le cont du tab
function afficher(){
  db.transaction(function(tx){
      tx.executeSql('select * from echantillon ',[],function (tx,res){
          var html='';
          var i=0;
          for (i=0 ; i<res.rows.length;i++){
              var row=res.row[i];
              html+='<tr><td>'+row.code_district +'<tr><td>'+row.gourvanerat +'<tr><td>'+row.num_m +'<tr><td>'+row.adresse +'</td><td><button onclick=suprimer(' + row.id+')delete</button></td></tr>';
          }
          document.getElementById('afficher_cont').innerHTML=html;
      },erreur);
  });
}


//effacer une colone du tab
function supprimer(id){
  db.transaction(function(tx){

      tx.executeSql('delete from echantillon where id=?',[id],null,erreur);
      afficher();
  })
}



//vider tous le cont du tab 
function vider(){
  db.transaction(function(tx){
      tx.executeSql('delete from echantillon ',null,null,null,null,null,erreur);
      afficher();
  });
}
