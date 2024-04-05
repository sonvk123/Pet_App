'use strict';

const input_file = document.querySelector('#input-file');
const btn_import = document.querySelector('#import-btn');
const btn_export = document.querySelector('#export-btn');

let petArr = JSON.parse(getFromStorage('petArr')) ?? [];
let breedArr = JSON.parse(getFromStorage('breedArr')) ?? [];
let breed_new = [];
let data = [];

//  tạo hàm lưu dữ liệu vào Storage
function saveToStorage(key, value) {
  localStorage.setItem(key, value);
}

//  tạo hàm lấy dữ liệu ra từ Storage
function getFromStorage(key) {
  return localStorage.getItem(key);
}

// tạo hàm lưu dữ liệu
function saveStaticDataToFile() {
  var blob = new Blob([`${JSON.stringify(petArr)}`], {
    type: 'text/plain;charset=utf-8',
  });
  saveAs(blob, 'petArr.json');
}

// Đăng ký sự kiện khi đối tượng input file thay đổi giá trị
input_file.addEventListener('change', event => {
  const file = event.target.files[0]; // Lấy tệp được chọn

  const reader = new FileReader(); // Khởi tạo đối tượng FileReader

  // Đọc nội dung tệp khi sự kiện onload được kích hoạt
  reader.onload = event => {
    const content = event.target.result; // Lấy các dữ liệu được đọc từ tệp
    let contentJson = JSON.parse(content);
    data = JSON.parse(content);
    breed_new = JSON.parse(content);
  };

  reader.readAsText(file); // Đọc tệp dưới dạng text
});

// khi nhấn nút import
btn_import.addEventListener('click', function () {
  console.log(data);


  petArr.forEach(function (pet) {
    data = data.filter(function (value) {
      return value.id !== pet.id;
    });
  });
  breedArr.forEach(breed => {
    breed_new = breed_new.filter(item => {
      return !(item.breed === breed.breed && item.type === breed.type);
    });
  });

  let bmi = 0;

  data.forEach(function (data) {
    // tính bmi cho danh sách pet mới nhập
    if (data['type'] === 'Dog') {
      bmi = (data['weight'] * 703) / data['length'] ** 2;
      bmi = bmi.toFixed(2);
    } else if (data['type'] === 'Cat') {
      bmi = (data['weight'] * 886) / data['length'] ** 2;
      bmi = bmi.toFixed(2);
    }
    const pet = {
      id: data['id'],
      name: data['name'],
      age: data['age'],
      type: data['type'],
      weight: `${data['weight']} kg`,
      length: `${data['length']} cm`,
      breed: data['breed'],
      color: `${data['color']}`,
      vaccinated: data['vaccinated'],
      dewormed: data['dewormed'],
      sterilized: data['sterilized'],
      bmi: bmi,
      date: data['date'],
    };
    petArr.push(pet);
  });

  breed_new.forEach(function (data) {
    const new_breed = {
      breed: data['breed'],
      type: data['type'],
    };
    breedArr.push(new_breed);
  });

  saveToStorage('petArr', JSON.stringify(petArr));
  saveToStorage('breedArr', JSON.stringify(breedArr));
});

// khi nhấn nút export
btn_export.addEventListener('click', saveStaticDataToFile);
// Bổ sung Animation cho Sidebar
sidebar.addEventListener('click', function () {
  sidebar.classList.toggle('active');
});
