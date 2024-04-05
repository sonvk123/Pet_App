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
const btn_healthy = document.getElementById("healthy-btn");
const btn_BMI = document.getElementById("BMI-btn");

const btn_danger = document.querySelectorAll(".btn-danger");

const color = document.getElementById("color");
const bmi_value = document.getElementById("bmi-value");

const sidebar = document.querySelector("#sidebar");

let pet = {};

let id = {};
let healthyPetArr = [];
let healthyCheck = false;
let bmiCheck = false;

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

//  tạo hàm kiểm tra
const test = function () {
  var kt = true;
  if (
    input_id.value == "" ||
    input_name.value == "" ||
    input_age.value == "" ||
    input_type.value == "" ||
    input_weight.value == "" ||
    input_length.value == "" ||
    input_breed.value == ""
  ) {
    kt = false;
    alert("Mời nhập đủ dữ liệu !");
  } else {
    id = petArr.map((petArr) => petArr.id);
    for (let i = 0; i < id.length; i++) {
      if (input_id.value == id[i]) {
        kt = false;
        alert("ID must be unique!");
      }
    }
    if (input_age.value < 1 || input_age.value > 15) {
      kt = false;
      alert("Age must be between 1 and 15!");
    }
    if (input_weight.value < 1 || input_weight.value > 15) {
      kt = false;
      alert("Weight must be between 1 and 15!");
    }
    if (input_length.value < 1 || input_length.value > 100) {
      kt = false;
      alert("Length must be between 1 and 100!");
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
        if (bmiCheck === false) {
          const col = document.createElement("td");
          col.innerHTML = "?";
          col.classList.add("bmi-value");
          row.appendChild(col);
        } else {
          const col = document.createElement("td");
          col.innerHTML = e[i].bmi;
          col.classList.add("bmi-value");
          row.appendChild(col);
        }
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
    btn.id = pet_id;
    btn.setAttribute("onclick", `deletePet('${pet_id}')`);
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
// tạo hàm xóa 1 thú cưng
const deletePet = (pet_id) => {
  let id_del = pet_id;
  // xác nhận trước khi xóa
  if (confirm(`Bạn có chắc chắn muốn xóa ?`)) {
    petArr = petArr.filter(function (pet) {
      return pet.id !== id_del;
    });
  }
  //  chuyển petArr thanhgf chuỗi Json và thêm vào Storage
  saveToStorage("petArr", JSON.stringify(petArr));
  renderTableData(petArr);
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

// tạo hàm kiểm tra healthyPetArr
const healthyPet = function () {
  petArr.forEach(function (value) {
    if (
      value.vaccinated === true &&
      value.dewormed === true &&
      value.sterilized === true
    ) {
      healthyPetArr.push(value);
    }
  });
  return healthyPetArr;
};

console.log(healthyPetArr);
 
// nhấn nút submit
btn_submit.addEventListener("click", function () {
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
    date: today,
  };

  // const a = test(pet);

  // if (a) {
  petArr.push(pet);
  // clearInput();
  renderTableData(petArr);
  saveToStorage("petArr", JSON.stringify(petArr));

  // }

  console.log(pet.id);
});

// khi nhấn nút btn healthi
btn_healthy.addEventListener("click", function () {
  healthyPet();
  if (!healthyCheck) {
    btn_healthy.textContent = "Show All Pet";
    renderTableData(healthyPetArr);
    healthyCheck = true;
  } else {
    btn_healthy.textContent = "Show Healthy Pet";
    renderTableData(petArr);
    healthyCheck = false;
  }

  clearInput();
});

// khi nhấn nút  Calculate BMI
btn_BMI.addEventListener("click", function () {
  bmi()
  if (healthyCheck === false && bmiCheck === false) {
    bmiCheck = true;
    renderTableData(petArr);
  } else if (healthyCheck === false && bmiCheck === true) {
    console.log("2");
    bmiCheck = false;
    renderTableData(petArr);
  } else if (healthyCheck === true && bmiCheck === false) {
    console.log("3");
    bmiCheck = true;
    renderTableData(healthyPetArr);
  } else if (healthyCheck === true && bmiCheck === true) {
    bmiCheck = false;
    renderTableData(healthyPetArr);
  }
});

// Bổ sung Animation cho Sidebar
sidebar.addEventListener("click", function () {
  sidebar.classList.toggle("active");
});


renderTableData(petArr);
input_type.addEventListener("change", renderBreed);
