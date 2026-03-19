console.log(
  'JS #1. Домашнє завдання. Основи JavaScript: Працюємо зі змінними, типами даних',
);

/*
 * #1
 *
 * Створіть змінні зі значеннями.
 */

// ім'я змінної: myNum, значення: 10
let myNum = 10;
// ім'я змінної: myStr, значення: 'some string'
let myStr = 'some string';
// ім'я змінної: myBool, значення: true
let myBool = true;
// ім'я змінної: myArr, значення: 1, 2, 3, 4, 5
let myArr = [1, 2, 3, 4, 5];
// ім'я змінної: myObj, значення: first: 'First Name', last: 'Last Name'
myObj = {
  first: 'First Name',
  last: 'Last Name',
};

/*
 * #2
 *
 * Відформатуйте ціле число, яке зберігається в змінній myNum, щоб отримати результат з 2 знаками після коми.
 * Результат збережіть у змінній decimal2.
 */

// decimal2
let decimal2 = myNum.toFixed(2);
console.log(decimal2);

/*
 * #3
 *
 * Створіть змінну myBigInt і запишіть в неї число 123n (BigInt).
 * Потім збільште його на 1 та запищіть в цю ж саму змінну.
 */

// myBigInt
let myBigInt = 123n;
myBigInt++;
console.log(myBigInt);
