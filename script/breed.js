"use strict";

const input_breed = document.getElementById("input-breed");
const input_type = document.getElementById("input-type");

const btn_submit = document.getElementById("submit-btn");

let breed = {};
let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
let id = [];

//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

//  tạo hàm kiểm tra
const test = function () {
  var kt = true;
  if (input_type.value == "" || input_breed.value == "") {
    kt = false;
    alert("Mời nhập đủ dữ liệu !");
  } else {
    id = breedArr.map((breedArr) => breedArr.id);
    for (let i = 0; i < id.length; i++) {
      if (input_id.value == id[i]) {
        kt = false;
        alert("ID must be unique!");
      }
    }
    if (input_type.value === "Select Type") {
      kt = false;
      alert("Please select Type!");
    }
    if (input_type.value === "Select Breed") {
      kt = false;
      alert("Please select Breed!");
    }
    return kt;
  }
};

// tạo hàm xóa danh sách
const del_table = function () {
  var tableBodyEl = document.querySelectorAll("#tbody");

  tableBodyEl.forEach(function (tableBody) {
    while (tableBody.firstChild) {
      if (tableBody.firstChild.tagName == "TR") {
        tableBody.removeChild(tableBody.firstChild);
      } else {
        tableBody.removeChild(tableBody.firstChild);
      }
    }
  });
};

// tạo hàm xóa input
const clearInput = function () {
  input_type.value = "Select Type";
  input_breed.value = "Select Breed";
};

// tạo hàm hiển thị danh sách thú cưng
const renderTableData = function (e) {
  del_table();

  const tableBodyEl = document.querySelector("#tbody");

  for (var i = 0; i < e.length; i++) {
    var row = document.createElement("tr");
    const col = document.createElement("td");
    var breed_id = e[i]["id"];
    var stt = 0 
    for (var j = 0; j < Object.keys(e[i]).length; j++) {
      if (Object.keys(e[i])[j] === "id") {
        //  tạo biến col
        const col = document.createElement("th");
        col.innerHTML =e[i]['id'] ;
        // thêm scope vào
        col.setAttribute("scope", "row");
        // thêm màu từ input
        row.appendChild(col);
      }
      // các key còn lại
      else {
        const col = document.createElement("td");
        col.innerHTML = Object.values(e[i])[j];
        row.appendChild(col);
      }
    }

    // tạo nút delete

    const btn = document.createElement("button");

    btn.innerHTML = "delete";
    btn.type = "button";
    btn.classList.add("btn");
    btn.classList.add("btn-danger");
    btn.id = breed_id;
    btn.setAttribute("onclick", `deletePet('${breed_id}')`);
    col.appendChild(btn);
    row.appendChild(col);
    tableBodyEl.appendChild(row);
  }
};
// tạo hàm cho chạy stt từ 1
const stt_up = function () {
  if (getFromStorage("breedArr") == null) {
    stt = stt + 1;
  } else {
    id_stt = JSON.parse(getFromStorage("breedArr"));
    let value = Number(id_stt[id_stt.length - 1]["id"])
    stt = value + 1;
  }
  return stt;
};
// tạo hàm xóa 1 thú cưng
const deletePet = (breed_id) => {
  let id_del = breed_id;
  // xác nhận trước khi xóa
  if (confirm(`Bạn có chắc chắn muốn xóa ?`)) {
    (breedArr = breedArr.filter(function (breed) {
      return breed.id != id_del;
    }))
     
  }
  console.log(breedArr);
  //  chuyển breedArr thanhgf chuỗi Json và thêm vào Storage
  saveToStorage("breedArr", JSON.stringify(breedArr));
  saveToStorage("id", JSON.stringify(id));
  renderTableData(breedArr);
};

// nhấn nút submit
let stt = 0;
let id_stt;
btn_submit.addEventListener("click", function () {


  const breed = {
    id: stt_up(),
    breed: input_breed.value,
    type: input_type.value,
  };

  breedArr.push(breed);

  
  renderTableData(breedArr);
  saveToStorage("breedArr", JSON.stringify(breedArr));

});
renderTableData(breedArr);
