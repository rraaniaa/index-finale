if (!window.openDatabase) {
  alert("ERROR");
} else {
  var db = openDatabase("store.db", "1.0", "table-echant", 1024 * 1024 * 5);
}
const md = name => `
<table
class="table table-hover table-striped border shadow p-3 mb-5 bg-body-tertiary rounded"
>
  <thead>
    <tr>
      <th
        scope="col"
        colspan="2"
        style="text-align: center"
        class="bg-primary-subtle"
      >
      ${name}
      </th>
    </tr>
  </thead>
  <tbody class="table-group-divider">
    <tr>
      <th scope="row"><div style="margin-top: 8px">
      بين القرابة مع رئيس الاسرة
      </div></th>
      <td>
          <select id="relation" name="" class="form-select">
          <option>رئيس الاسرة</option>
          <option>زوجة</option>
          <option>ابن(ة)</option>
          <option>زوج(ة) ابن(ة)</option>
          <option>والد(ة) زوج(ة)</option>
          <option>قريب اخر</option>
          <option>بدون قرابة</option>
        </select>
      </td>
    </tr>
    <tr>
      <th scope="row"><div style="margin-top: 8px">
      الجنس
      </div></th>
      <td>
          <select id="sexe" name="" class="form-select">
            <option>ذكر</option>
            <option>انثى</option>
        </select>
      </td>
    </tr>
    <tr>
      <th scope="row"><div style="margin-top: 8px">
      الحالة الزواجية
      </div></th>
      <td>
          <select id="etat_civil" name="" class="form-select">
          <option>متزوج (ة)</option>
          <option>اعزب/عزباء</option>
          <option>ارمل(ة)</option>
          <option>مطلق(ة)</option>
        </select>
      </td>
    </tr>
    <tr>
      <th scope="row"><div style="margin-top: 8px">
      تاريخ الولادة
      </div></th>
      <td>
        <input class="form-control" type="date" id="date_naissance" />
      </td>
    </tr>

  </tbody>
</table>
`;
const memberData = name => `
<div class="member">
  <h3>${name}</h3>
  <div>
    <label for="">بين القرابة مع رئيس الاسرة</label>
    <select id="relation" name="">
      <option>رئيس الاسرة</option>
      <option>زوجة</option>
      <option>ابن(ة)</option>
      <option>زوج(ة) ابن(ة)</option>
      <option>والد(ة) زوج(ة)</option>
      <option>قريب اخر</option>
      <option>بدون قرابة</option>
    </select>
  </div>
  <div>
    <label for="">الجنس</label>
    <select id="sexe">
      <option>ذكر</option>
      <option>انثى</option>
    </select>
  </div>
  <div>
    <label for="">الحالة الزواجية</label>
    <select id="etat_civil">
      <option>متزوج (ة)</option>
      <option>اعزب/عزباء</option>
      <option>ارمل(ة)</option>
      <option>مطلق(ة)</option>
    </select>
  </div>
  <div>
    <label for="">تاريخ الولادة</label>
    <input type="date" id="date_naissance" />
  </div>
</div>
`;

let members;

// next button
const next = () => {
  members = Array.from(document.getElementsByClassName("names"))
    .filter(el => el.value !== "")
    .map(el => el.value);

  injectMemberData(members);
};

const injectMemberData = members => {
  const membersDataDiv = document.getElementById("container");
  membersDataDiv.innerHTML = "";

  let HTMLToInject = `
  <form onsubmit="selectData(event)">
   <section class="FlexContainer">`;

  members.forEach(member => {
    HTMLToInject = HTMLToInject.concat(md(member));
  });

  HTMLToInject = HTMLToInject.concat(
    `
    <h2 style="text-align: center">
        <button class="btn btn-success btn-lg" onclick="next()">
        تسجيل  
        </button>
    </h2> 
    `
      );
      
  membersDataDiv.insertAdjacentHTML("beforeend", HTMLToInject);
};

const selectData = event => {
  event.preventDefault();
  const relations = Array.from(document.querySelectorAll("#relation"));
  const sexes = Array.from(document.querySelectorAll("#sexe"));
  const etat_civils = Array.from(document.querySelectorAll("#etat_civil"));
  const dates_naissance = Array.from(
    document.querySelectorAll("#date_naissance")
  );

  let state = [];

  members.forEach((member, index) => {
    state.push({
      name: member,
      relation: relations[index].value,
      sexe: sexes[index].value,
      etat_civil: etat_civils[index].value,
      date_naissance: dates_naissance[index].value,
    });
  });

  // preate data
  prepareDataAndInsert(state);
};

function ajouter(values) {
  db.transaction(function (tx) {
    tx.executeSql(
      `insert into membre_menage 
      (id,code_district,gourvanerat,num_m,num_indiv,nom , relation, sexe ,etat_civil  ,date_nais) 
      values (?,?,?,?,?,?,?,?,?,?)
      `,
      values,
      function (tx, result) {
        console.log("success", result);
        alert("Data inserted successfully");
      },
      function (tx, error) {
        console.log("error", error);
      }
    );
  });
}

const prepareDataAndInsert = state => {
  const [code_district, gourvanerat, num_m] = getSessionData();
  state.forEach((member, index) => {
    const values = [
      Math.floor(Math.random() * 1111111111).toString(),
      code_district,
      gourvanerat,
      num_m,
      index + 1,
      member.name,
      member.relation,
      member.sexe,
      member.etat_civil,
      member.date_naissance,
    ];
    console.log(values);
    ajouter(values);
  });
};

function getSessionData() {
  return [
    sessionStorage.getItem("code_district"),
    sessionStorage.getItem("gouvernorat"),
    sessionStorage.getItem("num_m"),
  ];
}

function checkSessionData() {
  const data = getSessionData();
  if (data.includes(null)) window.location.href = "index.html";
}

// checkSessionData();
