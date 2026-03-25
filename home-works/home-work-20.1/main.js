console.log('#3. JavaScript homework example file');

/*
 * #1
 *
 * Створіть об'єкт userObj, що описує людину.
 *
 * Наступні поля обов'язкові:
 * firstName - будь-яке ім'я, рядок
 * lastName - будь-яке прізвище, рядок
 * age - будь-який вік, число
 */
const userObj = {
  firstName: 'Obi-Wan',
  lastName: 'Kenobi',
  age: 57,
  fullName() {
    return `${this.firstName} ${this.lastName}`;
  },
};

console.log(userObj);

/*
 * #2
 *
 * Для об'єкта з п.1 створіть метод fullName(), що повертає коректне повне ім'я, яке є конкатенацією firstName та lastName через пробіл.

 * Наприклад:
 * userObj.firstName ← 'John'
 * userObj.lastName  ← 'Smith'
 * userObj.fullName() → 'John Smith'.
 */

// console.log(userObj.fullName()) // John Smith
console.log(userObj.fullName());

/*
 * #3
 *
 * Функція defUpperStr('My text') повертає текст, перетворений у верхній регістр, тобто: defUpperStr('My text') → 'MY TEXT'.
 *
 * Якщо функція викликається без параметра defUpperStr(), вона не повинна повертати undefined, у цьому випадку потрібно повернути рядок тексту за замовчуванням у верхньому регістрі, тобто defUpperStr() → 'DEFAULT TEXT'.
 *
 * При виконанні завдання не використовуйте оператор if, потрібен розв'язок із логічним оператором ||.
 */
function defUpperStr(text) {
  // const result = text ?? 'default text';
  const result = text || 'default text';

  return result.toUpperCase();
}

console.log(defUpperStr('My text')); // MY TEXT
console.log(defUpperStr()); // DEFAULT TEXT

/*
 * #4
 *
 * Створіть функцію evenFn(n), яка приймає параметром число - кількість ітерацій циклу, тобто for 0..n.
 * Функція повинна повернути масив, що складається тільки з парних значень, які генеруються в циклі.
 *
 * Причому:
 * 0 не повинен потрапляти до результуючого масиву,
 * цикл має працювати до n включно,
 * дозволено тільки оператор for.
 *
 * Наприклад:
 * evenFn(10) → [2, 4, 6, 8, 10]
 * evenFn(15) → [2, 4, 6, 8, 10, 12, 14]
 * evenFn(20) → [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
 */

function evenFn(n) {
  const arr = [];
  for (let i = 0; i <= n; i++) {
    if (i % 2 === 0 && i !== 0) {
      arr.push(i);
    }
  }
  return arr;
}

console.log(evenFn(10)); // [2, 4, 6, 8, 10]
console.log(evenFn(15)); // [2, 4, 6, 8, 10, 12, 14]
console.log(evenFn(20)); // [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]

/*
 * #5
 *
 * Створіть функцію weekFn(n), яка приймає номер дня тижня, а повертає його назву.
 * Якщо вводиться рядок, будь-яке дробове число або число поза діапазоном 1...7 - функція повинна повернути null.
 *
 * Наприклад:
 * 1   → 'Понеділок'
 * 2   → 'Вівторок'
 * ...
 * 7   → 'Неділя'
 * 9   → null
 * 1.5 → null
 * '2' → null
 * У реалізації функції обов'язково мають бути використані оператори switch / case / default.
 */

function weekFn(dayNum) {
  switch (dayNum) {
    case 1:
      return 'Понеділок';
    case 2:
      return 'Вівторок';
    case 3:
      return 'Середа';
    case 4:
      return 'Четвер';
    case 5:
      return "П'ятниця";
    case 6:
      return 'Субота';
    case 7:
      return 'Неділя';
    default:
      return null;
  }
}

console.log(weekFn(1)); // 'Понеділок'
console.log(weekFn(3)); // 'Середа'
console.log(weekFn(7)); // 'Неділя'
console.log(weekFn(9)); // null
console.log(weekFn(1.5)); // null
console.log(weekFn('2')); // null

/*
 * #6
 *
 * створіть функцію ageClassification(n), яка буде як параметр приймати будь-які числа і повертатиме рядок згідно з такими умовами, n:
 * менше 0   - null (зверніть увагу, що це саме null, а не рядок)
 * 0..24     - 'Дитинство'
 * 24+...44  - 'Молодість'
 * 44+..65   - 'Зрілість'
 * 65+..75   - 'Старість'
 * 75+..90   - 'Довголіття'
 * 90+..122  - 'Рекорд'
 * понад 122 - null (зверніть увагу, що це саме null, а не рядок)
 *
 * При виконанні завдання допускається використовувати тільки тернарний оператор ?.
 * Використання операторів if, switch - заборонено.
 */

function ageClassification(n) {
  let age =
    n <= 0
      ? null
      : n <= 24
        ? 'Дитинство'
        : n <= 44
          ? 'Молодість'
          : n <= 65
            ? 'Зрілість'
            : n <= 75
              ? 'Старість'
              : n <= 90
                ? 'Довголіття'
                : n <= 122
                  ? 'Рекорд'
                  : null;

  return age;
}

console.log('    -1 :', ageClassification(-1)); // -1 : null
console.log('     0 :', ageClassification(0)); // 0 : null
console.log('     1 :', ageClassification(1)); // 1 : Дитинство
console.log('    24 :', ageClassification(24)); // 24 : Дитинство
console.log(' 24.01 :', ageClassification(24.01)); // 24.01 : Молодість
console.log('    44 :', ageClassification(44)); // 44 : Молодість
console.log(' 44.01 :', ageClassification(44.01)); // 44.01 : Зрілість
console.log('    65 :', ageClassification(65)); // 65 : Зрілість
console.log('  65.1 :', ageClassification(65.1)); // 65.1 : Старість
console.log('    75 :', ageClassification(75)); // 75 : Старість
console.log(' 75.01 :', ageClassification(75.01)); // 75.01 : Довголіття
console.log('    90 :', ageClassification(90)); // 90 : Довголіття
console.log(' 90.01 :', ageClassification(90.01)); // 90.01 : Рекорд
console.log('   122 :', ageClassification(122)); // 122 : Рекорд
console.log('122.01 :', ageClassification(122.01)); // 122.01 : null
console.log('   150 :', ageClassification(150)); // 150 : null

// Блок тестирования, везде должны быть true:
console.log('    -1 :', ageClassification(-1) === null); // -1 : null
console.log('     0 :', ageClassification(0) === null); // 0 : null
console.log('     1 :', ageClassification(1) === 'Дитинство'); // 1 : Дитинство
console.log('    24 :', ageClassification(24) === 'Дитинство'); // 24 : Дитинство
console.log(' 24.01 :', ageClassification(24.01) === 'Молодість'); // 24.01 : Молодість
console.log('    44 :', ageClassification(44) === 'Молодість'); // 44 : Молодість
console.log(' 44.01 :', ageClassification(44.01) === 'Зрілість'); // 44.01 : Зрілість
console.log('    65 :', ageClassification(65) === 'Зрілість'); // 65 : Зрілість
console.log('  65.1 :', ageClassification(65.1) === 'Старість'); // 65.1 : Старість
console.log('    75 :', ageClassification(75) === 'Старість'); // 75 : Старість
console.log(' 75.01 :', ageClassification(75.01) === 'Довголіття'); // 75.01 : Довголіття
console.log('    90 :', ageClassification(90) === 'Довголіття'); // 90 : Довголіття
console.log(' 90.01 :', ageClassification(90.01) === 'Рекорд'); // 90.01 : Рекорд
console.log('   122 :', ageClassification(122) === 'Рекорд'); // 122 : Рекорд
console.log('122.01 :', ageClassification(122.01) === null); // 122.01 : null
console.log('   150 :', ageClassification(150) === null); // 150 : null

/*
 * #7
 *
 * Створіть функцію oddFn(n), яка приймає параметром число - кількість ітерацій циклу.
 * Функція повинна повернути масив, що складається тільки з непарних значень, які генеруються в циклі.
 *
 * Причому:
 * 0 не повинен потрапляти в результуючий масив,
 * цикл має працювати до n включно,
 * дозволено тільки оператор while.
 *
 * Наприклад:
 * oddFn(10) → [1, 3, 5, 7, 9]
 * oddFn(15) → [1, 3, 5, 7, 9, 11, 13, 15]
 * oddFn(20) → [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]
 */

function oddFn(n) {
  let i = 0;
  const arr = [];
  while (i <= n) {
    if (i % 2) {
      arr.push(i);
    }
    i++;
  }
  return arr;
}

console.log(oddFn(10)); // [1, 3, 5, 7, 9]
console.log(oddFn(15)); // [1, 3, 5, 7, 9, 11, 13, 15]
console.log(oddFn(20)); // [1, 3, 5, 7, 9, 11, 13, 15, 17, 19]

/*
 * #8
 *
 * Створіть основну функцію mainFunc(a, b, callback), яка приймає три параметри:
 * a - число,
 * b - число,
 * callback - функція зворотнього виклику, що обробляє параметри a і b.
 *
 * Реалізуйте перевірку: якщо третім параметром передається не функція, потрібно повернути false.
 */

function mainFunc(a, b, cb) {
  if (typeof cb !== 'function') {
    return false;
  }

  return cb(a, b);
}

/*
 * Реалізуйте callback функції (cbRandom, cbPow, cbAdd) до основної функції (mainFunc), що повертатимуть відповідні результати обчислень.
 * Використовуйте Math для піднесення до ступеня (Math.pow) та генерації випадкових чисел (Math.floor, Math.random).
 */

// cbRandom(a, b) - обчислює і повертає довільне ціле число в діапазоні між a і b включно.
function cbRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// cbPow(a, b) - обчислює і повертає результат піднесення числа a у ступінь b.
function cbPow(num, pow) {
  return Math.pow(num, pow);
}

// cbAdd(a, b) - обчислює і повертає суму двох чисел a і b.
function cbAdd(a, b) {
  return a + b;
}

/*
 * mainFunc() повинна повертати результат роботи переданої їй поворотної функції, наприклад:
 * mainFunc(2, 5, cbRandom) → випадково від 2 до 5 включно
 * mainFunc(10, 30, cbRandom) → випадково 10..30 включно
 * mainFunc(2, 5, cbPow) → 32
 * mainFunc(2, 5, cbAdd) → 7
 * mainFunc(2, 5, 'not a func') → false
 */

console.log(mainFunc(2, 5, cbRandom)); // цілі числа в діапазоні 2..5
console.log(mainFunc(2, 5, cbPow)); // 32
console.log(mainFunc(2, 5, cbAdd)); // 7
console.log(mainFunc(2, 5, 'not a func')); // false
