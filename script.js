document.addEventListener("DOMContentLoaded", () => {

    //Випадаюче підменю при кліку на «Новини культури» (Головна сторінка)
    const topNav = document.querySelector("body > nav");
    const cultureLink = topNav ? topNav.querySelector('a[href="culture.html"]') : null;

    // Перевіряємо, чи ми на головній сторінці (наявність секції #about)
    if (cultureLink && document.getElementById("about")) {
        const parentLi = cultureLink.parentElement;
        parentLi.style.position = "relative";

        // Динамічно створюємо випадаюче підменю з тематичними розділами
        const submenu = document.createElement("ul");
        submenu.id = "culture-submenu";
        submenu.style.cssText = `
            display: none;
            position: absolute;
            top: 100%;
            left: 0;
            background: #ffffff;
            border: 2px solid #6b0f1a;
            border-radius: 4px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.2);
            list-style: none;
            padding: 8px 0;
            margin: 4px 0 0 0;
            min-width: 210px;
            z-index: 1000;
        `;

        const sections = [
            { name: "Усі новини культури", href: "culture.html" },
            { name: "Театр та драматургія", href: "culture.html" },
            { name: "Сучасний живопис", href: "culture.html" },
            { name: "Музика та філармонія", href: "culture.html" },
            { name: "Кінематограф", href: "culture.html" }
        ];

        sections.forEach(sec => {
            const li = document.createElement("li");
            const a = document.createElement("a");
            a.textContent = sec.name;
            a.href = sec.href;
            a.style.cssText = "display: block; padding: 6px 14px; color: #6b0f1a; text-decoration: none;";
            a.addEventListener("mouseover", () => a.style.backgroundColor = "#f5e6e8");
            a.addEventListener("mouseout", () => a.style.backgroundColor = "transparent");
            li.appendChild(a);
            submenu.appendChild(li);
        });

        parentLi.appendChild(submenu);

        // При кліку на "Новини культури" на головній сторінці показуємо/ховаємо підменю
        cultureLink.addEventListener("click", (e) => {
            e.preventDefault();
            submenu.style.display = (submenu.style.display === "none") ? "block" : "none";
        });

        // Закриття підменю при кліку поза ним
        document.addEventListener("click", (e) => {
            if (!parentLi.contains(e.target)) {
                submenu.style.display = "none";
            }
        });
    }

    // Пошук новин за назвою на сторінці «Новини культури»
    const mainElement = document.querySelector("main");
    const pageHeading = mainElement ? mainElement.querySelector("h2") : null;
    const articles = mainElement ? mainElement.querySelectorAll("article") : [];

    // Перевіряємо, чи ми на сторінці "Новини культури"
    if (pageHeading && pageHeading.textContent.includes("Список новин культури")) {
        const searchContainer = document.createElement("div");
        searchContainer.style.gridColumn = "1 / -1";
        searchContainer.style.marginBottom = "10px";

        const searchInput = document.createElement("input");
        searchInput.type = "text";
        searchInput.id = "newsSearchInput";
        searchInput.placeholder = "Пошук новин за назвою...";
        searchInput.style.cssText = `
            width: 100%;
            max-width: 450px;
            padding: 10px 12px;
            font-size: 16px;
            border: 2px solid #6b0f1a;
            border-radius: 4px;
        `;

        searchContainer.appendChild(searchInput);
        pageHeading.insertAdjacentElement("afterend", searchContainer);

        // Фільтрація новин при введенні тексту
        searchInput.addEventListener("input", () => {
            const query = searchInput.value.toLowerCase().trim();

            articles.forEach(article => {
                const h3 = article.querySelector("h3");
                // Беремо лише власний текст заголовка
                const titleText = h3.childNodes[0].textContent.toLowerCase();

                if (titleText.includes(query)) {
                    article.style.display = "";
                } else {
                    article.style.display = "none";
                }
            });
        });

        // Поява тексту «Увага!» кожні X сек на Y сек праворуч у важливих новинах
        const X = 5;
        const Y = 2;

        const importantArticles = [articles[0], articles[2]];

        setInterval(() => {
            importantArticles.forEach(article => {
                if (!article) return;
                const h3 = article.querySelector("h3");

                if (!h3.querySelector(".attention-label")) {
                    const badge = document.createElement("span");
                    badge.className = "attention-label";
                    badge.textContent = "Увага!";
                    badge.style.cssText = `
                        color: red;
                        font-weight: bold;
                        margin-left: 12px;
                        display: inline-block;
                        transform: scaleX(1.2);
                        transform-origin: left center;
                    `;

                    h3.appendChild(badge);

                    setTimeout(() => {
                        badge.remove();
                    }, Y * 1000);
                }
            });
        }, X * 1000);
    }

    // Поле «Детально» (id="detailText") та підказка (tooltip) праворуч
    const detailField = document.getElementById("detailText");

    if (detailField) {
        const parentParagraph = detailField.parentElement;
        parentParagraph.style.position = "relative";

        // Створюємо елемент підказки
        const tooltip = document.createElement("span");
        tooltip.textContent = "Дякуючи Вам, ми стаємо кращі! Конкретизуйте мету звернення, будь ласка";
        tooltip.style.cssText = `
            display: none;
            position: absolute;
            left: calc(100% + 15px);
            top: 28px;
            width: 240px;
            background-color: #6b0f1a;
            color: #ffffff;
            padding: 10px 14px;
            border-radius: 6px;
            font-size: 14px;
            box-shadow: 0 4px 10px rgba(0,0,0,0.25);
            z-index: 100;
        `;
        parentParagraph.appendChild(tooltip);

        // При наведенні миші змінюємо фон, рамку, тінь і показуємо підказку
        detailField.addEventListener("mouseover", () => {
            detailField.style.backgroundColor = "#fff5f5";
            detailField.style.border = "2px solid #6b0f1a";
            detailField.style.boxShadow = "0 0 10px rgba(107, 15, 26, 0.5)";
            tooltip.style.display = "block";
        });

        // При відведенні миші повертаємо початковий вигляд
        detailField.addEventListener("mouseout", () => {
            detailField.style.backgroundColor = "";
            detailField.style.border = "";
            detailField.style.boxShadow = "";
            tooltip.style.display = "none";
        });
    }

    // Розташування меню залежно від ширини екрана
    function adjustNavigationLayout() {
        if (!topNav) return;
        const navUl = topNav.querySelector("ul");

        if (window.innerWidth <= 768) {
            topNav.style.float = "left";
            topNav.style.width = "210px";
            topNav.style.marginRight = "20px";
            if (navUl) {
                navUl.style.display = "flex";
                navUl.style.flexDirection = "column";
                navUl.style.alignItems = "flex-start";
                navUl.style.gap = "10px";
            }
        } else {
            topNav.style.float = "none";
            topNav.style.width = "100%";
            topNav.style.marginRight = "0";
            if (navUl) {
                navUl.style.display = "flex";
                navUl.style.flexDirection = "row";
                navUl.style.justifyContent = "center";
                navUl.style.gap = "20px";
            }
        }
    }

    adjustNavigationLayout();
    window.addEventListener("resize", adjustNavigationLayout);
});