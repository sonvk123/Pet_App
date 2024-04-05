"use strict";

const input_id = document.getElementById("input-id");
const input_name = document.getElementById("input-name");
const input_type = document.getElementById("input-type");
const input_breed = document.getElementById("input-breed");
const input_vaccinated = document.getElementById("input-vaccinated");
const input_dewormed = document.getElementById("input-dewormed");
const input_sterilized = document.getElementById("input-sterilized");

const btn_find = document.getElementById("find-btn");

let breed = {};
let id = [];
let searchs = [];

let petArr = JSON.parse(getFromStorage("petArr")) ?? [];
let breedArr = JSON.parse(getFromStorage("breedArr")) ?? [];
let breedArrDog = breedArr.filter(function (breed) {
  return breed.type !== "Cat";
});
let breedArrCat = breedArr.filter(function (breed) {
  return breed.type !== "Dog";
});

//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// tạo hàm xóa hiển thị danh sách Breed
const delete_breed = function () {
  const breedInput = document.querySelectorAll("#input-breed");
  breedInput.forEach(function (option) {
    while (option.firstChild) {
      if (option.firstChild.tagName == "option") {
        option.removeChild(option.firstChild);
      } else {
        option.removeChild(option.firstChild);
      }
    }
  });
};
// tạo hàm hiển thị danh sách Breed
// breedArr
const renderBreed = function () {
  delete_breed();
  const breedInput = document.querySelector("#input-breed");
  const option = document.createElement("option");
  option.innerHTML = "Select Breed";
  breedInput.appendChild(option);
  if (input_type.value === "Dog") {
    for (var i = 0; i < breedArrDog.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = breedArrDog[i]["breed"];
      breedInput.appendChild(option);
    }
  } else if (input_type.value === "Cat") {
    for (var i = 0; i < breedArrCat.length; i++) {
      const option = document.createElement("option");
      option.innerHTML = breedArrCat[i]["breed"];
      breedInput.appendChild(option);
    }
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
  input_id.value = "";
  input_name.value = "";
  input_age.value = "";
  input_type.value = "Select Type";
  input_weight.value = "";
  input_length.value = "";
  input_color.value = "#000000";
  input_breed.value = "Select Breed";
  input_vaccinated.checked = false;
  input_dewormed.checked = false;
  input_sterilized.checked = false;
};

// tạo hàm hiển thị danh sách thú cưng
const renderTableData = function (e) {
  del_table();
  const tableBodyEl = document.querySelector("#tbody");

  for (var i = 0; i < e.length; i++) {
    var row = document.createElement("tr");
    const col = document.createElement("td");
    var pet_id = e[i]["id"];
    for (var j = 0; j < Object.keys(e[i]).length; j++) {
      if (Object.keys(e[i])[j] === "id") {
        //  tạo biến col
        const col = document.createElement("th");
        col.innerHTML = e[i]["id"];
        // thêm scope vào
        col.setAttribute("scope", "row");
        // thêm màu từ input

        row.appendChild(col);
      }

      // kiểm tra key của pet có color không
      else if (Object.keys(e[i])[j] === "color") {
        //  tạo biến col
        const col = document.createElement("td");
        // thêm class vào
        col.classList.add("bi");
        col.classList.add("bi-square-fill");
        // thêm màu từ input
        col.style.color = e[i]["color"];

        row.appendChild(col);
      }

      // kiểm tra xem key của pet có vaccinated không
      else if (Object.keys(e[i])[j] === "vaccinated") {
        const col = document.createElement("td");

        if (e[i]["vaccinated"] === true) {
          col.classList.add("bi");
          col.classList.add("bi-check-circle-fill");
          col.style.color = "green";
        } else {
          col.classList.add("bi");
          col.classList.add("bi-x-circle-fill");
          col.style.color = "red";
        }

        row.appendChild(col);
      }

      // kiểm tra key của pet có dewormed không
      else if (Object.keys(e[i])[j] === "dewormed") {
        const col = document.createElement("td");

        if (e[i]["dewormed"] === true) {
          col.classList.add("bi");
          col.classList.add("bi-check-circle-fill");
          col.style.color = "green";
        } else {
          col.classList.add("bi");
          col.classList.add("bi-x-circle-fill");
          col.style.color = "red";
        }
        row.appendChild(col);
      }

      // kiểm tra key của pet có sterilized không
      else if (Object.keys(e[i])[j] === "sterilized") {
        const col = document.createElement("td");

        if (e[i]["sterilized"] === true) {
          col.classList.add("bi");
          col.classList.add("bi-check-circle-fill");
          col.style.color = "green";
        } else {
          col.classList.add("bi");
          col.classList.add("bi-x-circle-fill");
          col.style.color = "red";
        }
        row.appendChild(col);
      }
      // kiểm tra key của pet có BMI
      else if (Object.keys(e[i])[j] === "bmi") {
      }

      // các key còn lại
      else {
        const col = document.createElement("td");
        col.innerHTML = Object.values(e[i])[j];
        row.appendChild(col);
      }
    }

    tableBodyEl.appendChild(row);
  }
};

// Tạo hàm tìm kiếm thú cưng theo các tiêu chí
function searchPets(id, name, type, breed, vaccinated, dewormed, sterilized) {
  return petArr.filter((pet) => {
    if (id && !pet.id.includes(id)) {
      return false;
    }
    if (name && !pet.name.includes(name)) {
      return false;
    }
    if (type && pet.type !== type) {
      return false;
    }
    if (breed && pet.breed !== breed) {
      return false;
    }
    if (vaccinated && !pet.vaccinated) {
      return false;
    }
    if (dewormed && !pet.dewormed) {
      return false;
    }
    if (sterilized && !pet.sterilized) {
      return false;
    }
    return true;
  });
}
//  khi nhấn nút Find

btn_find.addEventListener("click", function () {
  const search = searchPets(
    input_id.value,
    input_name.value,
    input_type.value,
    input_breed.value,
    input_vaccinated.checked,
    input_dewormed.checked,
    input_sterilized.checked
  );
  renderTableData(search);
});
// Bổ sung Animation cho Sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});


input_type.addEventListener("change", renderBreed);
