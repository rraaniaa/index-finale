if (!window.openDatabase) {
  alert("ERROR");
} else {
  var db = openDatabase("store.db", "1.0", "table-echant", 1024 * 1024 * 5);
}

db.transaction(function (tx) {
  tx.executeSql(
    "create table if not exists login(firstname TEXT , lastname TEXT ,username TEXT Primary Key ,pwd TEXT )",
    []
  );
});

// insertion des donnes
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

db.transaction(function (tx) {
  tx.executeSql(
    `create table if not exists membre_menage(
    id TEXT Primary Key ,
    code_district TEXT ,
    gourvanerat TEXT ,
    num_m TEXT,
    num_indiv TEXT,
    nom TEXT,
    relation TEXT,
    sexe TEXT ,
    etat_civil TEXT,
    date_nais DATE
  )`,
    [],
    (tx, success) => console.log(success),
    (tx, error) => console.log("error membre_menage : ", error)
  );
});

const insetUser = event => {
  event.preventDefault();
  const username = document.getElementById("username").value;
  const password = document.getElementById("pwd").value;

  db.transaction(function (tx) {
    tx.executeSql(
      "INSERT INTO login (username, pwd) VALUES (?,?)",
      [username, password],
      function (tx, result) {
        console.log("inserted");
      },
      function (tx, error) {
        console.log("error");
      }
    );
  });
};

// check if user exist

function checkUser(event) {
  event.preventDefault();

  const username = document.getElementById("login").value;
  const password = document.getElementById("pwd").value;

  db.transaction(function (tx) {
    tx.executeSql(
      "SELECT * FROM login WHERE username = ? AND pwd = ?",
      [username, password],
      function (tx, result) {
        if (result.rows.length > 0) {
          // console.log("user exist");
          sessionStorage.setItem("username", username);
          window.location.href = `./echantillon.html`;
        } else {
          window.location.href = "./index.html";
        }
      },
      function (tx, error) {
        console.log("websql error", error);
      }
    );
  });
}

// check if user exist
// if exist
// redirect to question page
// if not exist
// error message

function checkError() {
  let data = sessionStorage.getItem("username");
  console.log(data);
  if (data == null) {
    showLoginErrorMessage("user not exist");
  }
}

const showLoginErrorMessage = errorMsg => {
  let message = document.getElementById("error");
  message.innerHTML = errorMsg;
};

checkError();
