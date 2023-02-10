if (!window.openDatabase) {
  alert("ERROR");
} else {
  var db = openDatabase("store.db", "1.0", "table-echant", 1024 * 1024 * 5);
}

const insertData = event => {
  event.preventDefault();

  // get value of radio input
  const s1 =
    document.querySelector('input[name="s1"]:checked')?.value ||
    document.getElementById("s1").value;

  const s2 =
    document.querySelector('input[name="s2"]:checked')?.value ||
    document.getElementById("s2").value;

  const s3 =
    document.querySelector('input[name="s3"]:checked')?.value ||
    document.getElementById("s3").value;

  const s4 = document.querySelector('input[name="s4"]').value;

  const s5 =
    document.querySelector('input[name="s5"]:checked')?.value ||
    document.getElementById("s5").value;

  const s6 =
    document.querySelector('input[name="s6"]:checked')?.value ||
    document.getElementById("s6").value;

  const s7 =
    document.querySelector('input[name="s7"]:checked')?.value ||
    document.getElementById("s7").value;

  const s8 =
    document.querySelector('input[name="s8"]:checked')?.value ||
    document.getElementById("s8").value;

  const s9 =
    document.querySelector('input[name="s9"]:checked')?.value ||
    document.getElementById("s9").value;

  const s10 =
    document.querySelector('input[name="s10"]:checked')?.value ||
    document.getElementById("s10").value;

  // validate input
  if (!s1 || !s2 || !s3 || !s4 || !s9 || !s10) {
    alert("Please fill all fields");
    return;
  }

  // get echatillon data from websql
  db.transaction(function (tx) {
    // 1 - get echantillon data by discrict name

    tx.executeSql(
      "select * from echantillon where code_district = ? ;",
      [getDistrictName()],
      function (tx, result) {
        if (!result.rows.length) {
          alert("echantillon not found");
          return;
        }
        const echantillon = result.rows.item(0);
        console.log(echantillon);

        // 2 - insert data into database
        db.transaction(function (tx) {
          tx.executeSql(
            "insert into menage (code_district,gouvernorat,num_m,nom_chef_f,adresse,s1,s2,s3,s4,s5,s6,s7,s8,s9,s10) values (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",
            [
              echantillon.code_district,
              echantillon.gouvernorat,
              echantillon.num_m,
              echantillon.nom_chef_f,
              echantillon.adresse,
              s1,
              s2,
              s3,
              s4,
              s5,
              s6,
              s7,
              s8,
              s9,
              s10,
            ],
            function (tx, result) {
              window.location.href = "page4.html";
              console.log("success", result);
              alert("Data inserted successfully");
              
            },
            function (tx, error) {
              console.log("error", error);
              window.location.href = "page4.html";
            }
          );
        });
      },
      error => console.log("error 1", error)
    );
  });
};

// get user
const getDistrictName = () => {
  const district = sessionStorage.getItem("code_district");

  console.log("district : ", district);
  if (!district) return null;

  return district;
};

// redirect if not logged in
const checkLogin = () => {
  if (!getDistrictName()) {
    window.location.href = "index.html";
  }
};

checkLogin();

