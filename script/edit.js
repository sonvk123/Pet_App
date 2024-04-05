"use strict";

const input_id = document.getElementById("input-id");
const input_name = document.getElementById("input-name");
const input_age = document.getElementById("input-age");
const input_type = document.getElementById("input-type");
const input_weight = document.getElementById("input-weight");
const input_length = document.getElementById("input-length");
const input_color = document.getElementById("input-color-1");
const input_breed = document.getElementById("input-breed");
const input_vaccinated = document.getElementById("input-vaccinated");
const input_dewormed = document.getElementById("input-dewormed");
const input_sterilized = document.getElementById("input-sterilized");

const btn_submit = document.getElementById("submit-btn");

const form = document.querySelector("#container-form");

let petArr = JSON.parse(getFromStorage("petArr")) ?? [];

let petArrEdit = JSON.parse(getFromStorage("petArr")) ?? [];

petArrEdit.forEach(function (item) {
  delete item.bmi;
});

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
// // tạo hàm hiển thị danh sách thú cưng
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
      // các key còn lại
      else {
        const col = document.createElement("td");
        col.innerHTML = Object.values(e[i])[j];
        row.appendChild(col);
      }
    }

    // tạo nút edit

    const btn = document.createElement("button");

    btn.innerHTML = "Edit";
    btn.type = "button";
    btn.classList.add("btn");
    btn.classList.add("btn-edit");
    btn.id = pet_id;
    btn.setAttribute("onclick", `editPet('${pet_id}')`);
    col.appendChild(btn);
    row.appendChild(col);
    tableBodyEl.appendChild(row);
  }
};

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

//  tạp hàm tính MBI
const bmi = function () {
  let bmi = 0;
  if (input_type.value === "Dog") {
    bmi = (input_weight.value * 703) / input_length.value ** 2;
    bmi = bmi.toFixed(2);
  } else if (input_type.value === "Cat") {
    bmi = (input_weight.value * 886) / input_length.value ** 2;
    bmi = bmi.toFixed(2);
  }
  return bmi;
};
// khi nhấn nút edit
const editPet = (pet_id) => {
  form.classList.remove("hide");
  console.log(pet_id);
  var id_del = pet_id;
  let petArrs = petArrEdit.filter(function (pet) {
    return pet.id == id_del;
  });
  console.log(petArrs);

  console.log(`${petArrs[0].id}`);

  input_id.value = `${petArrs[0].id}`;
  input_name.value = `${petArrs[0].name}`;
  input_age.value = `${petArrs[0].age}`;
  input_type.value = `${petArrs[0].type}`;
  input_weight.value = `${petArrs[0].weight.match(/[0-9]+/)}`;
  input_length.value = `${petArrs[0].length.match(/[0-9]+/)}`;
  input_color.value = `${petArrs[0].color}`;
  input_breed.value = `${petArrs[0].breed}`;
  input_vaccinated.checked = `${petArrs[0].vaccinated}`;
  input_dewormed.checked = `${petArrs[0].dewormed}`;
  input_sterilized.checked = `${petArrs[0].sterilized}`;

  renderBreed();
  input_type.addEventListener("change", renderBreed);
};

// // nhấn nút submit
btn_submit.addEventListener("click", function () {
  form.classList.add("hide");
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth() + 1; // Tháng bắt đầu từ 0 nên phải cộng thêm 1
  var year = today.getFullYear();
  let bmi_value = bmi();

  const time = day + "/" + month + "/" + year;

  const pet = {
    id: input_id.value,
    name: input_name.value,
    age: input_age.value,
    type: input_type.value,
    weight: `${input_weight.value} kg`,
    length: `${input_length.value} cm`,
    breed: input_breed.value,
    color: `${input_color.value}`,
    vaccinated: input_vaccinated.checked,
    dewormed: input_dewormed.checked,
    sterilized: input_sterilized.checked,
    bmi: bmi_value,
    date: time,
  };

  const index = petArr.findIndex((person) => person.id === input_id.value);
  console.log(index);
  petArr.splice(index, 1, pet);
  // if (a) {

  console.log(petArr);
  saveToStorage("petArr", JSON.stringify(petArr));
  
  let petArrEdit = JSON.parse(getFromStorage("petArr")) ?? [];

  petArrEdit.forEach(function (item) {
    delete item.bmi;
  });

  renderTableData(petArrEdit);
  // }
});

renderTableData(petArrEdit);
// Bổ sung Animation cho Sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});


input_type.addEventListener("change", renderBreed);