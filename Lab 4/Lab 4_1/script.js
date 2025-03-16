function isValidString(input) {
    return input !== null && input.trim() !== "";
}

function isValidAge(age) {
    return !isNaN(age) && age > 0;
}

let lastName = prompt("Введите вашу фамилию:");
while (!isValidString(lastName)) {
    lastName = prompt("Фамилия не может быть пустой. Введитe фамилию:");
}

let firstName = prompt("Введите ваше имя:");
while (!isValidString(firstName)) {
    firstName = prompt("Имя не может быть пустым. Введите ваше имя:");
}

let middleName = prompt("Введите ваше отчество:");
while (!isValidString(middleName)) {
    middleName = prompt("Отчество не может быть пустым. Введите ваше отчество:");
}

let age = prompt("Введите ваш возраст в годах:");
while (!isValidAge(age)) {
    age = prompt("Возраст должен быть положительным числом. Введите ваш возраст в годах:");
}
age = parseInt(age);

let isMale = confirm("Ваш пол - мужской?");
let gender = isMale ? "мужской" : "женский";

let ageInDays = age * 365;
let ageIn5Years = age + 5;

let message = `
ваше ФИО: ${lastName} ${firstName} ${middleName}
ваш возраст в годах: ${age}
ваш возраст в днях: ${ageInDays}
через 5 лет вам будет: ${ageIn5Years}
ваш пол: ${gender}
`;

alert(message);