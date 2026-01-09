groupmates = [
    {
        "name": "Никита",
        "surname": "Власов",
        "group": "БСТ2203",
        "exams": ["Философия", "ВВИТ", "КТП"],
        "marks": [5, 5, 5]
    },
    {
        "name": "Денис",
        "surname": "Истомин",
        "group": "БСТ2203",
        "exams": ["Философия", "ВВИТ", "КТП"],
        "marks": [3, 3, 3]
    },
    {
        "name": "Иван",
        "surname": "Полушин",
        "group": "БСТ2203",
        "exams": ["ВМ", "АиГ", "АИС"],
        "marks": [4, 4, 3]
    },
    {
        "name": "Михаил",
        "surname": "Ильин",
        "group": "БСТ2303",
        "exams": ["АиГ", "УД", "РОС"],
        "marks": [5, 4, 4]
    },
    {
        "name": "Завьялова",
        "surname": "Алиса",
        "group": "БСТ2203",
        "exams": ["ППСУБДиЗ", "АИС", "РОС"],
        "marks": [4, 4, 4]
    }]

console.log(groupmates)

var rpad = function(str, length) {
// js не поддерживает добавление нужного количества символов
// справа от строки, т.е. аналога ljust из Python здесь нет
    str = str.toString(); // преобразование в строку
    while (str.length < length)
        str = str + ' '; // добавление пробела в конец строки
    return str; // когда все пробелы добавлены, возвратить строку
};

var printStudents = function(students){
    console.log(
        rpad("Имя", 15),
        rpad("Фамилия", 15),
        rpad("Группа", 15),
        rpad("Экзамены", 20),
        rpad("Оценки", 20)
);
// был выведен заголовок таблицы
    for (var i = 0; i<=students.length-1; i++){
// в цикле выводится каждый экземпляр студента
    console.log(
        rpad(students[i]['name'], 15),
        rpad(students[i]['surname'], 15),
        rpad(students[i]['group'],15),
        rpad(students[i]['exams'], 20),
        rpad(students[i]['marks'], 20)
);
}
    console.log('\n'); // добавляется пустая строка в конце вывода
};
printStudents(groupmates);

// Средний балл одного студента
function getAverage(marks) {
  if (!Array.isArray(marks) || marks.length === 0) return 0;
  var sum = 0;
  for (var i = 0; i < marks.length; i++) sum += marks[i];
  return sum / marks.length;
}

// Фильтрация по порогу среднего балла
function filterByAverage(students, minAvg) {
  var result = [];
  for (var i = 0; i < students.length; i++) {
    var avg = getAverage(students[i].marks);
    if (avg > minAvg) result.push(students[i]);
  }
  return result;
}

// Вывод списка в консоль
function printStudents(students) {
  if (!students.length) {
    console.log("Нет студентов, подходящих под условие.");
    return;
  }
  for (var i = 0; i < students.length; i++) {
    var s = students[i];
    var avg = getAverage(s.marks);
    console.log(
      s.surname + " " + s.name + " | " +
      " | оценки: " + s.marks.join(", ") +
      " | средний: " + avg.toFixed(2)
    );
  }
}

// Ввод порога пользователем и запуск
var input = prompt("Введите минимальный средний балл:");
var minAvg = parseFloat((input || "").replace(",", "."));

if (isNaN(minAvg)) {
  console.log("Ошибка: введено не число.");
} else {
  var filtered = filterByAverage(groupmates, minAvg);
  console.log("Студенты со средним баллом выше " + minAvg + ":");
  printStudents(filtered);
}

function filterByGroup(students, groupName) {
  var g = (groupName || "").trim().toLowerCase();
  var result = [];

  for (var i = 0; i < students.length; i++) {
    var studentGroup = (students[i].group || "").trim().toLowerCase();
    if (studentGroup === g) {
      result.push(students[i]);
    }
  }
  return result;
}

// Вывод в консоль
function printStudents(students) {
  if (!students.length) {
    console.log("Нет студентов в этой группе.");
    return;
  }
  for (var i = 0; i < students.length; i++) {
    var s = students[i];
    console.log(s.surname + " " + s.name + " | группа: " + s.group + " | оценки: " + s.marks.join(", "));
  }
}

// Ввод группы пользователем и запуск
var groupInput = prompt("Введите группу для фильтрации:");

if (!groupInput || !groupInput.trim()) {
  console.log("Ошибка: группа не введена.");
} else {
  var filtered = filterByGroup(groupmates, groupInput);
  console.log("Студенты группы " + groupInput.trim() + ":");
  printStudents(filtered);
}