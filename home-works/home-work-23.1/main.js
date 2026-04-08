console.log('#6. JavaScript homework example file');

/*
 * #1
 * Задача: Калькулятор калорійності продуктів через клас.
 * Завдання: Розробити модуль на JavaScript, який імплементує клас CalorieCalculator. Клас має використовувати Map для управління даними про калорійність продуктів. Необхідно реалізувати наступні функціональності:
 * Додавання продуктів: Метод addProduct приймає назву продукту та його калорійність, додаючи їх до колекції.
 * Отримання калорійності продукту: Метод getProductCalories повертає калорійність продукту за його назвою. Якщо продукт не знайдено, повертає рядок 'Product not found'.
 * Видалення продукту: Метод removeProduct видаляє продукт з колекції за назвою.
 *
 * Критерії перевірки:
 * Клас CalorieCalculator має бути реалізований з використанням ключового слова class.
 * Внутрішнє сховище продуктів має бути реалізоване за допомогою new Map().
 * Наявність методів addProduct, getProductCalories, та removeProduct.
 */

class CalorieCalculator {
  #storage = new Map();

  addProduct(productName, calories) {
    this.#storage.set(productName, calories);
  }

  getProductCalories(productName) {
    return this.#storage.has(productName)
      ? this.#storage.get(productName)
      : 'Product not found';
  }

  removeProduct(productName) {
    this.#storage.delete(productName);
  }
}

// Демонстрація використання
const calorieCalculator = new CalorieCalculator();
calorieCalculator.addProduct('Apple', 52);
calorieCalculator.addProduct('Banana', 89);
//
console.log(calorieCalculator.getProductCalories('Apple')); // 52
console.log(calorieCalculator.getProductCalories('Banana')); // 89
//
calorieCalculator.removeProduct('Apple');
console.log(calorieCalculator.getProductCalories('Apple')); // Product not found

/*
 * #2
 * Задача: Унікальні користувачі.
 * Завдання: Реалізувати модуль на JavaScript у формі класу UniqueUsernames, який використовує Set для збереження унікальних імен користувачів. Клас має надавати можливість:
 * Додавання імен користувачів: Метод addUser дозволяє додати нове ім'я до набору. Якщо ім'я вже існує, воно не буде додано повторно, зберігаючи унікальність імен у наборі.
 * Перевірка наявності імені: Метод exists перевіряє, чи існує задане ім'я серед збережених унікальних імен.
 * Отримання кількості унікальних імен: Метод count повертає кількість унікальних імен, збережених у наборі.
 *
 * Критерії перевірки:
 * Наявність методів addUser, exists, count у класі UniqueUsernames.
 * Використання конструкції class для створення класу UniqueUsernames.
 * Застосування new Set() для внутрішнього сховища імен користувачів у конструкторі класу.
 */

class UniqueUsernames {
  #userStorage = new Set();

  addUser(username) {
    this.#userStorage.add(username);
  }

  exists(username) {
    return this.#userStorage.has(username);
  }

  count() {
    return this.#userStorage.size;
  }
}

// Демонстрація використання
const uniqueUsernames = new UniqueUsernames();
uniqueUsernames.addUser('john_doe');
uniqueUsernames.addUser('jane_doe');
uniqueUsernames.addUser('john_doe'); // Ця дія не змінить набір, оскільки 'john_doe' вже існує

console.log(`Існує 'john_doe': ${uniqueUsernames.exists('john_doe')}`); // true
console.log(`Кількість унікальних імен: ${uniqueUsernames.count()}`); // 2

// Експорт для використання в тестах
export { CalorieCalculator, UniqueUsernames };
