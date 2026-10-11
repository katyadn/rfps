// Клас для створення облікового запису користувача
class User {
    constructor(surname, name, age, education, purpose, requestDate) {
        this.surname = surname;
        this.name = name;
        this.age = age;
        this.education = education;
        this.purpose = purpose;
        this.requestDate = requestDate;
    }
}

// Клас-менеджер для обробки масиву користувачів
class UserManager {
    constructor(users) {
        this.users = users;
    }

    // Виведення переліку за місяцем і часом
    filterByMonthAndTime(targetMonth, targetHours, targetMinutes) {

        const filtered = this.users.filter(u => 
            u.requestDate.getMonth() === targetMonth &&
            u.requestDate.getHours() === targetHours &&
            u.requestDate.getMinutes() === targetMinutes
        );
        console.log(`Звернення у ${targetMonth + 1}-му місяці о ${targetHours}:${targetMinutes}`);
        console.log(filtered);
    }

    // Мінімальний вік та типова освіта
    findMinAgeEducation() {
        // Знаходимо найменше число віку з усіх користувачів
        const minAge = Math.min(...this.users.map(u => u.age));
        // Шукаємо першого користувача з таким віком
        const youngest = this.users.find(u => u.age === minAge);
        
        console.log(`Найменший вік: ${minAge} років. Типова освіта для цього віку: "${youngest.education}"`);
    }

    // Розподіл на класи за прізвищем та освітою
    classifyUsers() {
        let womenHigher = 0;
        let menNoEd = 0;
        let others = 0;

        this.users.forEach(u => {
            // Для алгоритму визначаємо стать за типовими закінченнями прізвищ
            // Жіночі закінчуються на 'а' або 'я'
            const isWoman = u.surname.endsWith('а') || u.surname.endsWith('я');
            // Чоловічі - на приголосну або 'й'
            const isMan = u.surname.endsWith('в') || u.surname.endsWith('й') || u.surname.endsWith('н') || u.surname.endsWith('к');

            if (isWoman && u.education === "вища") {
                womenHigher++;
            } else if (isMan && u.education === "без освіти") {
                menNoEd++;
            } else {
                others++;
            }
        });

        console.log("Класифікація користувачів");
        console.log(`Жінки з вищою освітою: ${womenHigher}`);
        console.log(`Чоловіки без освіти: ${menNoEd}`);
        console.log(`Інші: ${others}`);
    }

    // Сортування: спадання віку -> алфавітний порядок
    sortUsers() {
        // Робимо копію масиву
        const sorted = [...this.users].sort((a, b) => {
            if (b.age !== a.age) {
                return b.age - a.age; // сортуємо за спаданням віку
            }
            // Якщо вік однаковий, сортуємо за прізвищем в алфавітному порядку
            return a.surname.localeCompare(b.surname); 
        });
        
        console.log("Відсортовані користувачі (вік за спаданням, потім алфавіт)");
        console.log(sorted);
    }
}

const usersList = [
    new User("Іванова", "Олена", 22, "вища", "питання", new Date(2026, 9, 15, 14, 30)),
    new User("Смірнов", "Іван", 18, "без освіти", "пропозиція", new Date(2026, 9, 12, 10, 15)),
    new User("Петрова", "Марія", 19, "вища", "скарга", new Date(2026, 8, 10, 14, 30)),
    new User("Ковальчук", "Олег", 35, "вища", "скарга", new Date(2026, 9, 20, 9, 0)),
    new User("Залужна", "Анна", 22, "вища", "питання", new Date(2026, 10, 5, 11, 45)),
    new User("Григор'єва", "Ірина", 18, "неповна", "пропозиція", new Date(2026, 9, 1, 14, 30)),
    new User("Макаров", "Дмитро", 40, "без освіти", "скарга", new Date(2026, 9, 15, 14, 30)),
    new User("Шевченкова", "Катерина", 25, "вища", "питання", new Date(2026, 7, 12, 14, 30)),
    new User("Морозов", "Олексій", 19, "повна", "скарга", new Date(2026, 9, 18, 10, 0)),
    new User("Кравцов", "Сергій", 29, "без освіти", "пропозиція", new Date(2026, 8, 22, 14, 30))
];

// Ініціалізуємо клас-менеджер та викликаємо методи
const manager = new UserManager(usersList);

// Тестуємо: Шукаємо тих, хто звернувся у жовтні (місяць 9) о 14:30
manager.filterByMonthAndTime(9, 14, 30); 
manager.findMinAgeEducation();
manager.classifyUsers();
manager.sortUsers();