if (!window.openDatabase) {
  alert("ERROR");
} else {
  var db = openDatabase("store.db", "1.0", "table-echant", 1024 * 1024 * 5);
}

// save user to database
const insertUser = event => {
  event.preventDefault();
  const firstname = document.getElementById("firstname").value;
  const lastname = document.getElementById("lastname").value;
  const password = document.getElementById("pwd").value;

  if (firstname === "" || lastname === "" || password === "") {
    showLoginErrorMessage("please fill all fields");
  } else {
    db.transaction(function (tx) {
      tx.executeSql(
        "INSERT INTO login (firstname, lastname, username, pwd) VALUES (?,?,?,?)",
        [firstname, lastname, `${firstname}.${lastname}`, password],
        function (tx, result) {
          console.log("inserted");
          window.location.href = "index.html";
        },
        function (tx, error) {
          console.log("error");
          window.location.href = "page1.html?error=true";
        }
      );
    });
  }
};

function checkError() {
  const params = new URLSearchParams(window.location.search);

  if (params.has("error")) {
    showLoginErrorMessage("user not exist");
  }
}

const showLoginErrorMessage = errorMsg => {
  let message = document.getElementById("error");
  message.innerHTML = errorMsg;
};

checkError();
