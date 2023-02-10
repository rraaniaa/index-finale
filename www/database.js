const webSql = {
  connectToDb() {
    return openDatabase("store.db", "1.0", "table-echant", 1024 * 1024 * 5);
  },

  createTables() {
    // create login table
    db.transaction(function (tx) {
      tx.executeSql(
        "create table if not exists login(firstname TEXT , lastname TEXT ,username TEXT Primary Key ,pwd TEXT )",
        []
      );
    });

    // create membre_menage table
    db.transaction(function (tx) {
      tx.executeSql(
        `create table if not exists membre_menage(
        code_district TEXT Primary Key ,
        gourvanerat TEXT ,
        num_m TEXT,
        num_indiv TEXT,
        nom TEXT,
        relation TEXT,
        sexe TEXT ,
        etat_civil TEXT,
        date_nais DATE,
        age TEXT,
        niv_s TEXT,
        pers_s TEXT
      )`,
        [],
        (tx, success) => console.log(success),
        (tx, error) => console.log("error membre_menage : ", error)
      );
    });

    // create echantillon table
    db.transaction(function (tx) {
      tx.executeSql(
        `create table if not exists echantillon(
        code_district TEXT Primary Key ,
        gouvernorat TEXT ,
        num_m TEXT,
        nom_chef_f TEXT, 
        adresse TEXT,
        user TEXT,
        foreign key (user) references login(username)
      )`,
        [],
        result => console.log(result),
        error => console.log(error)
      );
    });
    // create menage table
    db.transaction(function (tx) {
      tx.executeSql(
        `create table if not exists menage(
        code_district TEXT Primary Key ,
        gouvernorat TEXT ,
        num_m TEXT,
        nom_chef_f TEXT, 
        adresse TEXT ,
        s1 TEXT ,
        s2 TEXT ,
        s3 TEXT ,
        s4 TEXT ,
        s5 TEXT ,
        s6 TEXT ,
        s7 TEXT ,
        s8 TEXT ,
        s9 TEXT ,
        s10 TEXT 
      )`,
        []
      );
    });
  },

  loginDummyData() {
    db.transaction(function (tx) {
      tx.executeSql(
        "insert into login (username,pwd) values (?,?)",
        ["rania.chebbi", "123"],
        function (tx) {
          alert("insertion éffectuée");
        }
      );
      tx.executeSql("insert into login (username,pwd) values (?,?)", [
        "khalil.chermiti",
        "456",
      ]);

      tx.executeSql("insert into login (username,pwd) values (?,?)", [
        "safa.farhat",
        "789",
      ]);
    });
  },

  echantillonDummyData() {
    db.transaction(function (tx) {
      tx.executeSql(
        "insert into echantillon (code_district,gouvernorat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)",
        ["110111", "11", "1", "Rania chebbi", "Tunis", "rania.chebbi"]
      );
      tx.executeSql(
        "insert into echantillon (code_district,gouvernorat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)",
        ["110000", "10", "2", "khalil.chermiti", "bizerte", "khalil.chermiti"]
      );

      tx.executeSql(
        "insert into echantillon (code_district,gouvernorat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)",
        ["111000", "12", "3", "safa farhat", "ariana", "safa.farhat"]
      );

      tx.executeSql(
        "insert into echantillon (code_district,gouvernorat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)",
        ["11010", "21", "4", "hbib dhaouadi", "bizerte", "hbib.dhaouadi"]
      );

      tx.executeSql(
        "insert into echantillon (code_district,gouvernorat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)",
        ["01101", "16", "5", "adam ratazi", "nabeul", "adam.ratazi"]
      );

      tx.executeSql(
        "insert into echantillon (code_district,gouvernorat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)",
        ["10101", "18", "6", "inzs khalifa", "tunis", "ines.khalifa"]
      );

      tx.executeSql(
        "insert into echantillon (code_district,gouvernorat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)",
        ["11111", "19", "7", "karim tababi", "tunis", "karim.tababi"]
      );

      tx.executeSql(
        "insert into echantillon (code_district,gouvernorat,num_m,nom_chef_f,adresse,user) values (?,?,?,?,?,?)",
        ["101101", "20", "8", "ela hamida", "sousse", "ela.hamida"]
      );
    });
  },
};
