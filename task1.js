let newsArray = [
    { id: 1, title: "Новина 1", author: "Коваленко О.", textLength: 1500,
                    readersDay1: 120, readersDay2: 150, publishDate: new Date(2026, 9, 11, 14, 30) },
    { id: 2, title: "Новина 2", author: "Шевченко М.", textLength: 800,
                    readersDay1: 300, readersDay2: 400, publishDate: new Date(2026, 9, 11, 9, 15) },
    { id: 3, title: "Новина 3", author: "Коваленко О.", textLength: 1200,
                    readersDay1: 450, readersDay2: 200, publishDate: new Date(2026, 9, 11, 19, 45) },
    { id: 4, title: "Новина 4", author: "Бойко І.", textLength: 2100,
                    readersDay1: 50, readersDay2: 80, publishDate: new Date(2026, 9, 11, 11, 0) },
    { id: 5, title: "Новина 5", author: "Шевченко М.", textLength: 950,
                    readersDay1: 600, readersDay2: 500, publishDate: new Date(2026, 9, 12, 16, 20) },
    { id: 6, title: "Новина 6", author: "Ткачук В.", textLength: 1100,
                    readersDay1: 340, readersDay2: 300, publishDate: new Date(2026, 9, 12, 8, 30) },
    { id: 7, title: "Новина 7", author: "Бойко І.", textLength: 1800,
                    readersDay1: 110, readersDay2: 90, publishDate: new Date(2026, 9, 12, 17, 50) },
    { id: 8, title: "Новина 8", author: "Коваленко О.", textLength: 1350,
                    readersDay1: 220, readersDay2: 280, publishDate: new Date(2026, 9, 13, 10, 10) },
    { id: 9, title: "Новина 9", author: "Ткачук В.", textLength: 1600,
                    readersDay1: 800, readersDay2: 600, publishDate: new Date(2026, 9, 13, 21, 5) },
    { id: 10, title: "Новина 10", author: "Шевченко М.", textLength: 700,
                    readersDay1: 500, readersDay2: 450, publishDate: new Date(2026, 9, 13, 13, 40) }
];

// Сортуємо масив за алфавітом по полю author
newsArray.sort((a, b) => a.author.localeCompare(b.author));
console.log("Відсортовані новини за автором:", newsArray);

// Знаходимо середню довжину повідомлення для кожного автора
function getAverageLengthByAuthor(news) {
    let authorStats = {};
    
    // Групуємо дані: сума символів та кількість новин для кожного автора
    let i = 0;
    while (i < news.length) {
        let item = news[i];
        if (!authorStats[item.author]) {
            authorStats[item.author] = { totalLength: 0, count: 0 };
        }
        authorStats[item.author].totalLength += item.textLength;
        authorStats[item.author].count += 1;
        i++;
    }

    console.log("Середня довжина повідомлення за автором:");
    for (let author in authorStats) {
        let avg = authorStats[author].totalLength / authorStats[author].count;
        console.log(`${author}: ${Math.round(avg)} символів`); 
    }
}
getAverageLengthByAuthor(newsArray);


// Максимальна кількість читачів за добу 1
function getMaxReadersDay1Id(news) {

    let maxNews = news.reduce((prev, current) => {
    if (prev.readersDay1 > current.readersDay1){
        return prev;
    } else {
        return current;
    }});

    console.log(`ID новини з максимальною кількістю читачів за добу 1: ${maxNews.id} (${maxNews.readersDay1} читачів)`);
}
getMaxReadersDay1Id(newsArray);


// Додавання нової новини
function addNewNews(newsList, newRecord) {
    // Перевіряємо типи даних і примусово перетворюємо їх на правильні
    if (typeof newRecord.textLength === "string") {
        newRecord.textLength = Number(newRecord.textLength);
    }
    if (typeof newRecord.title !== "string") {
        newRecord.title = String(newRecord.title);
    }
    if (typeof newRecord.readersDay1 === "boolean") {
        newRecord.readersDay1 = Number(newRecord.readersDay1); 
    }
    
    // Перевірка об'єктних типів
    let isDateObject = typeof newRecord.publishDate === "object";
    let isArrayList = typeof newsList === "object";

    let isMissingInfo = Object.values(newRecord).some(val => val === undefined || val === null || val === '');

    if (isMissingInfo) {
        newsList.push(newRecord);
        console.log("Новину додано в кінець списку (бракує даних).");
    } else {
        newsList.unshift(newRecord);
        console.log("Новину додано на початок списку (всі дані присутні).");
    }
}

// Тестуємо додавання:
let incompleteNews = { id: 11, title: "Неповна новина", author: "Іванов І.", textLength: null, readersDay1: 43, readersDay2: 10, publishDate: new Date() };
let completeNews = { id: 12, title: "Повна новина", author: "Петров П.", textLength: 1000, readersDay1: 50, readersDay2: 60, publishDate: new Date() };

addNewNews(newsArray, incompleteNews);
addNewNews(newsArray, completeNews);


// Обчислення суми оплати роботи автора
function calculateAuthorPay(newsRecord) {
    let hours = newsRecord.publishDate.getHours();
    let payPerChar = 0;

    // Перевіряємо, чи час публікації лежить у межах робочого часу
    if (hours >= 10 && hours < 18) {
        payPerChar = 0.5;
    } else {
        payPerChar = 0.8;
    }

    let totalPay = newsRecord.textLength * payPerChar;
    console.log(`Оплата за новину "${newsRecord.title}" (ID: ${newsRecord.id}): ${totalPay} грн (Тариф: ${payPerChar} грн/символ)`);
    return totalPay;
}

// Тестуємо для перших двох новин
calculateAuthorPay(newsArray[0]); // Опубліковано о 14:30 (робочий час)
calculateAuthorPay(newsArray[1]); // Опубліковано о 09:15 (неробочий час)

