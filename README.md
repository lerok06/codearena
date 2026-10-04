CodeArena - Киберспортивная платформа для программистов

Платформа для проведения соревнований по программированию
в формате реального времени — PvP-батлы, рейтинг ELO, зрительский режим.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/ru/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/ru/docs/Web/JavaScript)
[![Python](https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white)](https://www.python.org/)
[![C#](https://img.shields.io/badge/C%23-239120?style=for-the-badge&logo=c-sharp&logoColor=white)](https://learn.microsoft.com/ru-ru/dotnet/csharp/)

🌐 Открыть сайт](https://lerok06.github.io/codearena/) · 📁 Репозиторий](https://github.com/lerok06/codearena · 🐛 Сообщить о баге](https://github.com/lerok06/codearena/issues
 О проекте


Возможности

| Модуль | Описание |
|---|---|
| 🧑 **Личный кабинет** | Регистрация, профиль с рейтингом (ПТС), статистика побед |
| ⚔️ **Матчмейкинг** | Автоматический подбор соперников с близким уровнем |
| 🔒 **Sandbox** | Изолированная среда для запуска кода на JS, Python, C# |
| 🧩 **Система задач** | 27 задач в 4 категориях с автоматической проверкой |
| ⚡ **Режим реального времени** | Прогресс-бар соперника, чат, таймер |
| 📺 **Зрительский режим** | Наблюдение за батлом в прямом эфире + чат |


🎮 Режимы игры

🎯 Демо-батл
Три случайные задачи из выбранной категории. Соперник — новичок, иногда ошибается.
Идеально, чтобы попробовать платформу.

🔥 Практика
Все задачи категории подряд. Соперник — сильный игрок, ошибается редко.
Для тех, кто хочет настоящего вызова.

📺 Зрительский режим
Смотри, как сражаются два бота, читай живой чат, общайся сам.

🧠 Задачи

27 задач в 4 категориях, от лёгких до сложных:

Математика (6 задач):
- Площадь прямоугольника
- Среднее арифметическое
- НОД двух чисел
- Возведение в степень
- Совершенное число
- Числа Фибоначчи

Программирование (6 задач):
- Переворот строки
- Максимум в массиве
- Удаление дубликатов
- Проверка анаграммы
- Подсчёт слов
- Two Sum

</details>

Магазины (6 задач):
- Скидка по купону
- Сумма корзины
- Накопительная скидка
- Округление до «...99»
- Где дешевле (Пятёрочка, Магнит, КБ)
- Какая акция выгоднее

Игры (9 задач):
Dota 2: KDA, фарм Battle Fury, время респавна
CS2: Урон AK-47, время перезарядки, урон по броне
FIFA: Результат матча, очки в группе, разница мячей

Технологии

Frontend:
- HTML5, CSS3 (переменные, Grid, Flexbox)
- Vanilla JavaScript (ES6+)
- `localStorage` для авторизации и статистики

Выполнение кода:
- JavaScript — нативный `new Function()`
- Python — [Pyodide](https://pyodide.org/) (WebAssembly)
- C# — имитация проверки по шаблону



📁 Структура проекта
codearena/
├── index.html Главная
├── demo.html Демо-батл (3 задачи, слабый соперник)
├── practice.html Практика (все задачи, сильный соперник)
├── spectator.html Зрительский режим
├── contacts.html Контакты + команда
├── pricing.html Тарифы
├── faq.html Частые вопросы
├── features.html Возможности
├── favicon.svg Иконка сайта
├── css/
│ ├── style.css Основные стили
│ └── auth.css Стили авторизации
└── js/
├── main.js Логика задач и батлов
├── auth.js Авторизация, профиль, Bento-карточка
└── spectator.js Зрительский режим


Как запустить локально

Способ 1 — просто открыть:
```bash
git clone https://github.com/lerok06/codearena.git
cd codearena
# Открой index.html в браузере

Способ 2 — через Live Server (рекомендуется):
Установи VS Code
Установи расширение Live Server
Открой папку проекта в VS Code
Правой кнопкой по index.html → Open with Live Server

📄 Лицензия
Учебный проект. Свободно используется в образовательных целях.
