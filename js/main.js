/* ===== МОБИЛЬНОЕ МЕНЮ ===== */
const toggle = document.querySelector('.nav__toggle');
const links = document.querySelector('.nav__links');
if (toggle && links) {
  toggle.addEventListener('click', () => links.classList.toggle('open'));
  links.querySelectorAll('a').forEach(a =>
    a.addEventListener('click', () => links.classList.remove('open'))
  );
}

/* ===== АКТИВНАЯ СТРАНИЦА ===== */
const current = location.pathname.split('/').pop() || 'index.html';
document.querySelectorAll('.nav__links a').forEach(a => {
  const href = a.getAttribute('href');
  if (href === current) a.classList.add('active');
});

/* ===== ТЕМА ===== */
const themeToggle = document.getElementById('themeToggle');
const themeIcon = themeToggle?.querySelector('.theme-toggle__icon');
function setTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('theme', theme);
  if (themeIcon) themeIcon.textContent = theme === 'light' ? '☀️' : '🌙';
}
setTheme(localStorage.getItem('theme') || 'dark');
themeToggle?.addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur === 'light' ? 'dark' : 'light');
});

/* ============================================================
   БАЗА ЗАДАЧ — 27 штук
   ============================================================ */
const TASKS = {
  math: {
    name: 'Математика',
    icon: '🧮',
    tasks: [
      {
        description: 'Посчитай площадь прямоугольника со сторонами a и b.',
        functionName: 'rectangleArea',
        pyName: 'rectangle_area',
        csPattern: /return\s+a\s*\*\s*b\s*;/,
        tests: [
          { args: [5, 4], expected: 20, label: 'rectangleArea(5, 4) → 20' },
          { args: [3, 3], expected: 9, label: 'rectangleArea(3, 3) → 9' },
          { args: [10, 2], expected: 20, label: 'rectangleArea(10, 2) → 20' }
        ]
      },
      {
        description: 'Найди среднее арифметическое трёх чисел.',
        functionName: 'average',
        pyName: 'average',
        csPattern: /return\s*\(\s*a\s*\+\s*b\s*\+\s*c\s*\)\s*\/\s*3/,
        tests: [
          { args: [1, 2, 3], expected: 2, label: 'average(1, 2, 3) → 2' },
          { args: [10, 20, 30], expected: 20, label: 'average(10, 20, 30) → 20' },
          { args: [5, 5, 5], expected: 5, label: 'average(5, 5, 5) → 5' }
        ]
      },
      {
        description: 'Найди наибольший общий делитель двух чисел.',
        functionName: 'gcd',
        pyName: 'gcd',
        csPattern: /while|%|for/,
        tests: [
          { args: [12, 18], expected: 6, label: 'gcd(12, 18) → 6' },
          { args: [100, 75], expected: 25, label: 'gcd(100, 75) → 25' },
          { args: [7, 13], expected: 1, label: 'gcd(7, 13) → 1' }
        ]
      },
      {
        description: 'Возведи число base в степень exp (целое > 0) без встроенной функции.',
        functionName: 'power',
        pyName: 'power',
        csPattern: /for|while/,
        tests: [
          { args: [2, 3], expected: 8, label: 'power(2, 3) → 8' },
          { args: [5, 2], expected: 25, label: 'power(5, 2) → 25' },
          { args: [10, 4], expected: 10000, label: 'power(10, 4) → 10000' }
        ]
      },
      {
        description: 'Совершенное число — равное сумме своих делителей (кроме себя). Верни true/false.',
        functionName: 'isPerfectNumber',
        pyName: 'is_perfect_number',
        csPattern: /for|while/,
        tests: [
          { args: [6], expected: true, label: 'isPerfectNumber(6) → true' },
          { args: [28], expected: true, label: 'isPerfectNumber(28) → true' },
          { args: [10], expected: false, label: 'isPerfectNumber(10) → false' }
        ]
      },
      {
        description: 'Верни n-е число Фибоначчи (0, 1, 1, 2, 3, 5, 8...).',
        functionName: 'fibonacci',
        pyName: 'fibonacci',
        csPattern: /for|while|recurs/,
        tests: [
          { args: [0], expected: 0, label: 'fibonacci(0) → 0' },
          { args: [7], expected: 13, label: 'fibonacci(7) → 13' },
          { args: [10], expected: 55, label: 'fibonacci(10) → 55' }
        ]
      }
    ]
  },

  code: {
    name: 'Программирование',
    icon: '💻',
    tasks: [
      {
        description: 'Переверни строку задом наперёд.',
        functionName: 'reverseString',
        pyName: 'reverse_string',
        csPattern: /Reverse|for/,
        tests: [
          { args: ['hello'], expected: 'olleh', label: 'reverseString("hello") → "olleh"' },
          { args: ['abc'], expected: 'cba', label: 'reverseString("abc") → "cba"' },
          { args: ['12345'], expected: '54321', label: 'reverseString("12345") → "54321"' }
        ]
      },
      {
        description: 'Найди максимальный элемент в массиве чисел.',
        functionName: 'maxInArray',
        pyName: 'max_in_array',
        csPattern: /for|while|Max/,
        tests: [
          { args: [[1, 5, 3]], expected: 5, label: 'maxInArray([1, 5, 3]) → 5' },
          { args: [[-10, -3, -7]], expected: -3, label: 'maxInArray([-10, -3, -7]) → -3' },
          { args: [[42]], expected: 42, label: 'maxInArray([42]) → 42' }
        ]
      },
      {
        description: 'Убери повторяющиеся элементы из массива, сохранив порядок.',
        functionName: 'removeDuplicates',
        pyName: 'remove_duplicates',
        csPattern: /Set|Distinct|HashSet/,
        tests: [
          { args: [[1, 2, 2, 3, 1]], expected: [1, 2, 3], label: 'removeDuplicates([1,2,2,3,1]) → [1,2,3]' },
          { args: [['a', 'b', 'a']], expected: ['a', 'b'], label: 'removeDuplicates(["a","b","a"]) → ["a","b"]' },
          { args: [[5, 5, 5]], expected: [5], label: 'removeDuplicates([5,5,5]) → [5]' }
        ]
      },
      {
        description: 'Верни true, если две строки — анаграммы (состоят из одних и тех же букв).',
        functionName: 'isAnagram',
        pyName: 'is_anagram',
        csPattern: /Sort|OrderBy/,
        tests: [
          { args: ['listen', 'silent'], expected: true, label: 'isAnagram("listen", "silent") → true' },
          { args: ['hello', 'world'], expected: false, label: 'isAnagram("hello", "world") → false' },
          { args: ['abc', 'cba'], expected: true, label: 'isAnagram("abc", "cba") → true' }
        ]
      },
      {
        description: 'Посчитай количество слов в строке (слова разделены пробелами).',
        functionName: 'countWords',
        pyName: 'count_words',
        csPattern: /Split/,
        tests: [
          { args: ['hello world'], expected: 2, label: 'countWords("hello world") → 2' },
          { args: ['  one  two  three  '], expected: 3, label: 'countWords("  one  two  three  ") → 3' },
          { args: [''], expected: 0, label: 'countWords("") → 0' }
        ]
      },
      {
        description: 'Two Sum: верни [i, j] — индексы двух чисел, дающих в сумме target.',
        functionName: 'twoSum',
        pyName: 'two_sum',
        csPattern: /Dictionary|Map|for/,
        tests: [
          { args: [[2, 7, 11, 15], 9], expected: [0, 1], label: 'twoSum([2,7,11,15], 9) → [0,1]' },
          { args: [[3, 2, 4], 6], expected: [1, 2], label: 'twoSum([3,2,4], 6) → [1,2]' },
          { args: [[1, 5, 8, 3], 11], expected: [2, 3], label: 'twoSum([1,5,8,3], 11) → [2,3]' }
        ]
      }
    ]
  },

  shop: {
    name: 'Магазины',
    icon: '🛒',
    tasks: [
      {
        description: 'Купоны: "A" — 8% (не более 100₽), "B" — 5% (не более 50₽). Посчитай скидку.',
        functionName: 'couponDiscount',
        pyName: 'coupon_discount',
        csPattern: /if|Math\.Min|Min/,
        tests: [
          { args: [1000, 'A'], expected: 80, label: 'couponDiscount(1000, "A") → 80' },
          { args: [2000, 'A'], expected: 100, label: 'couponDiscount(2000, "A") → 100' },
          { args: [1000, 'B'], expected: 50, label: 'couponDiscount(1000, "B") → 50' }
        ]
      },
      {
        description: 'Посчитай сумму всех товаров в корзине.',
        functionName: 'cartTotal',
        pyName: 'cart_total',
        csPattern: /for|Sum|foreach/,
        tests: [
          { args: [[100, 200, 300]], expected: 600, label: 'cartTotal([100,200,300]) → 600' },
          { args: [[50]], expected: 50, label: 'cartTotal([50]) → 50' },
          { args: [[]], expected: 0, label: 'cartTotal([]) → 0' }
        ]
      },
      {
        description: 'Накопительная скидка: 1% за каждые 1000₽ потраченных.',
        functionName: 'loyaltyDiscount',
        pyName: 'loyalty_discount',
        csPattern: /\/|Floor|floor/,
        tests: [
          { args: [5000], expected: 5, label: 'loyaltyDiscount(5000) → 5' },
          { args: [500], expected: 0, label: 'loyaltyDiscount(500) → 0' },
          { args: [12500], expected: 12, label: 'loyaltyDiscount(12500) → 12' }
        ]
      },
      {
        description: 'Округли цену до "...99": 150 → 149.99.',
        functionName: 'roundTo99',
        pyName: 'round_to_99',
        csPattern: /-\s*0\.01|Math\.Round/,
        tests: [
          { args: [150], expected: 149.99, label: 'roundTo99(150) → 149.99' },
          { args: [99], expected: 98.99, label: 'roundTo99(99) → 98.99' },
          { args: [1000], expected: 999.99, label: 'roundTo99(1000) → 999.99' }
        ]
      },
      {
        description: 'Три магазина: A, B, C — массивы цен. Верни "pyaterochka", "magnit" или "kb".',
        functionName: 'cheapestStore',
        pyName: 'cheapest_store',
        csPattern: /Sum|for/,
        tests: [
          { args: [[100, 200], [80, 150], [120, 180]], expected: 'magnit', label: 'cheapestStore([100,200],[80,150],[120,180]) → "magnit"' },
          { args: [[50, 50], [60, 60], [40, 40]], expected: 'kb', label: 'cheapestStore([50,50],[60,60],[40,40]) → "kb"' },
          { args: [[90, 90], [70, 110], [80, 80]], expected: 'pyaterochka', label: 'cheapestStore([90,90],[70,110],[80,80]) → "pyaterochka"' }
        ]
      },
      {
        description: 'Акция 1: "3 по цене 2", акция 2: скидка 30%. Верни "promo1", "promo2" или "equal".',
        functionName: 'bestPromo',
        pyName: 'best_promo',
        csPattern: /if|Math|Math\.Min/,
        tests: [
          { args: [100, 3], expected: 'promo1', label: 'bestPromo(100, 3) → "promo1"' },
          { args: [100, 2], expected: 'promo2', label: 'bestPromo(100, 2) → "promo2"' },
          { args: [100, 10], expected: 'equal', label: 'bestPromo(100, 10) → "equal"' }
        ]
      }
    ]
  },

  games: {
    name: 'Игры',
    icon: '🎮',
    tasks: [
      {
        description: 'Dota. Посчитай KDA: (kills + assists) / deaths. Если deaths = 0 — kills + assists.',
        functionName: 'kda',
        pyName: 'kda',
        csPattern: /deaths\s*==\s*0|deaths\s*>\s*0/,
        tests: [
          { args: [10, 2, 5], expected: 7.5, label: 'kda(10, 2, 5) → 7.5' },
          { args: [5, 0, 3], expected: 8, label: 'kda(5, 0, 3) → 8' },
          { args: [2, 4, 1], expected: 0.75, label: 'kda(2, 4, 1) → 0.75' }
        ]
      },
      {
        description: 'Dota. Battle Fury стоит 3900 золота. Сколько целых минут фармить?',
        functionName: 'timeToFarmBattleFury',
        pyName: 'time_to_farm_bf',
        csPattern: /Math\.Ceiling|Ceil/,
        tests: [
          { args: [0, 500], expected: 8, label: 'timeToFarmBattleFury(0, 500) → 8' },
          { args: [2000, 400], expected: 5, label: 'timeToFarmBattleFury(2000, 400) → 5' },
          { args: [4000, 300], expected: 0, label: 'timeToFarmBattleFury(4000, 300) → 0' }
        ]
      },
      {
        description: 'Dota. Время респавна героя = уровень × 4 секунды.',
        functionName: 'respawnTime',
        pyName: 'respawn_time',
        csPattern: /return\s+level\s*\*\s*4/,
        tests: [
          { args: [1], expected: 4, label: 'respawnTime(1) → 4' },
          { args: [10], expected: 40, label: 'respawnTime(10) → 40' },
          { args: [25], expected: 100, label: 'respawnTime(25) → 100' }
        ]
      },
      {
        description: 'CS2. Урон AK-47: тело = 36, голова = 143. Зона: "body" или "head".',
        functionName: 'ak47Damage',
        pyName: 'ak47_damage',
        csPattern: /body|head/,
        tests: [
          { args: [3, 'body'], expected: 108, label: 'ak47Damage(3, "body") → 108' },
          { args: [1, 'head'], expected: 143, label: 'ak47Damage(1, "head") → 143' },
          { args: [2, 'body'], expected: 72, label: 'ak47Damage(2, "body") → 72' }
        ]
      },
      {
        description: 'CS2. Перезарядка AK-47 = 2.4 сек, магазин = 30. Сколько секунд на перезарядки?',
        functionName: 'reloadTime',
        pyName: 'reload_time',
        csPattern: /Math\.Floor|Floor|2\.4/,
        tests: [
          { args: [90, 30], expected: 4.8, label: 'reloadTime(90, 30) → 4.8' },
          { args: [30, 30], expected: 0, label: 'reloadTime(30, 30) → 0' },
          { args: [45, 30], expected: 2.4, label: 'reloadTime(45, 30) → 2.4' }
        ]
      },
      {
        description: 'CS2. Урон по броне = baseDamage × (armorPen / 100).',
        functionName: 'armorDamage',
        pyName: 'armor_damage',
        csPattern: /\*\s*armorPenetration\s*\/\s*100/,
        tests: [
          { args: [36, 77.5], expected: 27.9, label: 'armorDamage(36, 77.5) → 27.9' },
          { args: [100, 77.5], expected: 77.5, label: 'armorDamage(100, 77.5) → 77.5' },
          { args: [50, 50], expected: 25, label: 'armorDamage(50, 50) → 25' }
        ]
      },
      {
        description: 'FIFA. Верни "win", "lose" или "draw" по счёту.',
        functionName: 'matchResult',
        pyName: 'match_result',
        csPattern: /if|else/,
        tests: [
          { args: [3, 1], expected: 'win', label: 'matchResult(3, 1) → "win"' },
          { args: [0, 2], expected: 'lose', label: 'matchResult(0, 2) → "lose"' },
          { args: [1, 1], expected: 'draw', label: 'matchResult(1, 1) → "draw"' }
        ]
      },
      {
        description: 'FIFA. Очки: победа = 3, ничья = 1. Посчитай очки команды.',
        functionName: 'groupPoints',
        pyName: 'group_points',
        csPattern: /wins\s*\*\s*3/,
        tests: [
          { args: [2, 1], expected: 7, label: 'groupPoints(2, 1) → 7' },
          { args: [3, 0], expected: 9, label: 'groupPoints(3, 0) → 9' },
          { args: [0, 2], expected: 2, label: 'groupPoints(0, 2) → 2' }
        ]
      },
      {
        description: 'FIFA. Разница забитых и пропущенных мячей.',
        functionName: 'goalDifference',
        pyName: 'goal_difference',
        csPattern: /goalsFor\s*-\s*goalsAgainst/,
        tests: [
          { args: [5, 2], expected: 3, label: 'goalDifference(5, 2) → 3' },
          { args: [1, 4], expected: -3, label: 'goalDifference(1, 4) → -3' },
          { args: [2, 2], expected: 0, label: 'goalDifference(2, 2) → 0' }
        ]
      }
    ]
  }
};

/* ============================================================
   ОБЩЕЕ СОСТОЯНИЕ
   ============================================================ */
const BATTLE_TIME = 120;
let selectedCategory = null;
let selectedLang = 'js';
let currentTask = null;
let sessionQueue = [];
let currentIndex = 0;
let winsCount = 0;
let battleActive = false;
let pyodide = null;
let pyodideLoading = false;

// DOM
const battleIntro = document.getElementById('battleIntro');
const battleBox = document.getElementById('battle');
const battleSummary = document.getElementById('battleSummary');
const startBtn = document.getElementById('startBattle');
const checkBtn = document.getElementById('checkCode');
const nextTaskBtn = document.getElementById('nextTask');
const restartSessionBtn = document.getElementById('restartSession');
const codeInput = document.getElementById('codeInput');
const timerEl = document.getElementById('battleTimer');
const statusEl = document.getElementById('battleStatus');
const resultEl = document.getElementById('battleResult');
const progressYou = document.getElementById('progressYou');
const progressEnemy = document.getElementById('progressEnemy');
const percentYou = document.getElementById('percentYou');
const percentEnemy = document.getElementById('percentEnemy');
const taskCategory = document.getElementById('taskCategory');
const taskDescription = document.getElementById('taskDescription');
const categoryGrid = document.getElementById('categoryGrid');
const langTabs = document.getElementById('langTabs');
const editorLabel = document.getElementById('editorLabel');
const battleSession = document.getElementById('battleSession');
const enemyState = document.getElementById('enemyState');
const summaryTitle = document.getElementById('summaryTitle');
const summaryText = document.getElementById('summaryText');

// Настройки соперника
const isDemo = location.pathname.includes('demo');
const ENEMY_CONFIG = isDemo
  ? { speedMin: 17000, speedMax: 24000, errorChance: 0.35, stuckMin: 4000, stuckMax: 8000 }
  : { speedMin: 15000, speedMax: 22000, errorChance: 0.10, stuckMin: 2000, stuckMax: 4000 };

/* ============================================================
   ВЫБОР КАТЕГОРИИ И ЯЗЫКА
   ============================================================ */
if (categoryGrid) {
  categoryGrid.querySelectorAll('.category-card').forEach(card => {
    card.addEventListener('click', () => {
      categoryGrid.querySelectorAll('.category-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');
      selectedCategory = card.dataset.category;

      // Показываем блок выбора языка
      const langSection = document.getElementById('langSection');
      if (langSection) langSection.classList.remove('hidden');

      updateStartBtn();
    });
  });
}

if (langTabs) {
  langTabs.querySelectorAll('.lang-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      langTabs.querySelectorAll('.lang-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      selectedLang = tab.dataset.lang;
      updateEditorLabel();
    });
  });
}

function updateStartBtn() {
  if (!selectedCategory) {
    startBtn.disabled = true;
    startBtn.textContent = 'Выбери категорию';
  } else {
    startBtn.disabled = false;
    startBtn.textContent = 'Начать батл ⚔️';
  }
}

function updateEditorLabel() {
  const langNames = { js: 'JavaScript', py: 'Python', cs: 'C#' };
  editorLabel.textContent = `Твой код (${langNames[selectedLang]}):`;
}

/* ============================================================
   СТАРТ СЕССИИ
   ============================================================ */
if (startBtn) {
  startBtn.addEventListener('click', startSession);
  checkBtn.addEventListener('click', checkUserCode);
  nextTaskBtn.addEventListener('click', () => nextTask());
  restartSessionBtn.addEventListener('click', resetSession);
}

function startSession() {
  if (!selectedCategory) return;

  const categoryTasks = TASKS[selectedCategory].tasks;
  winsCount = 0;
  currentIndex = 0;

  if (isDemo) {
    // Демо: 3 случайные задачи
    const shuffled = [...categoryTasks].sort(() => Math.random() - 0.5);
    sessionQueue = shuffled.slice(0, 3);
  } else {
    // Практика: все задачи категории
    sessionQueue = [...categoryTasks];
  }

  battleIntro.style.display = 'none';
  battleBox.style.display = 'block';
  battleSummary.style.display = 'none';

  updateEditorLabel();
  loadTask();
}

function loadTask() {
  currentTask = sessionQueue[currentIndex];
  taskCategory.textContent = 'Задание';
  taskDescription.textContent = currentTask.description;

  const total = sessionQueue.length;
  battleSession.textContent = `Задача ${currentIndex + 1} / ${total} · Побед: ${winsCount}`;

  resultEl.textContent = '';
  resultEl.className = 'battle__result';
  codeInput.value = '';
  codeInput.disabled = false;
  checkBtn.style.display = 'inline-flex';
  checkBtn.disabled = false;
  nextTaskBtn.style.display = 'none';

  progressYou.style.width = '0%';
  progressEnemy.style.width = '0%';
  percentYou.textContent = `0 / ${currentTask.tests.length} тестов`;
  percentEnemy.textContent = `0 / ${currentTask.tests.length} тестов`;

  timerEl.classList.remove('danger');
  timerEl.textContent = '02:00';
  statusEl.textContent = 'Батл идёт...';
  statusEl.className = 'battle__status';
  enemyState.textContent = '';
  enemyState.className = 'enemy-state';

  battleActive = true;
  startBattleTimers();
}

/* ============================================================
   ТАЙМЕРЫ
   ============================================================ */
let timerInt = null;
let enemyInt = null;
let timeLeft = BATTLE_TIME;
let userPassed = 0;
let enemyPassed = 0;
let enemyNextProgressAt = 0;
let enemyStuckUntil = 0;
let enemySpeed = 30000;

function startBattleTimers() {
  clearInterval(timerInt);
  clearInterval(enemyInt);

  timeLeft = BATTLE_TIME;
  userPassed = 0;
  enemyPassed = 0;
  enemyStuckUntil = 0;

  // Скорость соперника
  enemySpeed = ENEMY_CONFIG.speedMin + Math.random() * (ENEMY_CONFIG.speedMax - ENEMY_CONFIG.speedMin);
  enemyNextProgressAt = Date.now() + enemySpeed;

  // Шанс ошибки на эту задачу
  const willError = Math.random() < ENEMY_CONFIG.errorChance;
  let errorAtTest = -1;
  if (willError) {
    errorAtTest = Math.floor(Math.random() * (currentTask.tests.length - 1)) + 1; // 1 или 2
  }

  // Таймер
  timerInt = setInterval(() => {
    if (!battleActive) return;
    timeLeft--;
    updateTimer();
    if (timeLeft <= 0) endBattle('time');
  }, 1000);

  // Соперник
  enemyInt = setInterval(() => {
    if (!battleActive) return;
    const now = Date.now();

    // Если "застрял" на ошибке — ждём
    if (enemyStuckUntil > now) {
      enemyState.textContent = '✏️ исправляет ошибку...';
      enemyState.className = 'enemy-state error';
      return;
    }

    if (enemyStuckUntil > 0 && enemyStuckUntil <= now) {
      // Закончил исправлять
      enemyStuckUntil = 0;
      enemyState.textContent = '';
      enemyState.className = 'enemy-state';
      enemyNextProgressAt = now + enemySpeed * 0.5;
      return;
    }

    // Прогресс соперника
    if (now >= enemyNextProgressAt) {
      enemyPassed++;
      if (enemyPassed > currentTask.tests.length) enemyPassed = currentTask.tests.length;
      updateProgress();

      // Ошибка?
      if (enemyPassed === errorAtTest && enemyPassed < currentTask.tests.length) {
        enemyStuckUntil = now + ENEMY_CONFIG.stuckMin + Math.random() * (ENEMY_CONFIG.stuckMax - ENEMY_CONFIG.stuckMin);
        enemyState.textContent = '✏️ ошибка в коде...';
        enemyState.className = 'enemy-state error';
        return;
      }

      // Финиш
      if (enemyPassed >= currentTask.tests.length) {
        endBattle('enemy');
        return;
      }

      enemyNextProgressAt = now + enemySpeed;
    }
  }, 500);
}

function updateTimer() {
  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  timerEl.textContent = `${m}:${s}`;
  if (timeLeft <= 20) timerEl.classList.add('danger');
}

function updateProgress() {
  const total = currentTask.tests.length;
  progressYou.style.width = (userPassed / total * 100) + '%';
  progressEnemy.style.width = (enemyPassed / total * 100) + '%';
  percentYou.textContent = `${userPassed} / ${total} тестов`;
  percentEnemy.textContent = `${enemyPassed} / ${total} тестов`;
}

/* ============================================================
   ПРОВЕРКА КОДА
   ============================================================ */
async function checkUserCode() {
  if (!battleActive) return;
  const code = codeInput.value;
  let results;

  try {
    if (selectedLang === 'js') results = checkJS(code);
    else if (selectedLang === 'py') results = await checkPython(code);
    else results = checkCSharp(code);
  } catch (err) {
    resultEl.textContent = 'Ошибка: ' + err.message;
    resultEl.className = 'battle__result lose';
    return;
  }

  userPassed = results.filter(Boolean).length;
  updateProgress();

  if (userPassed >= currentTask.tests.length) {
    endBattle('user');
  } else {
    resultEl.textContent = `Пройдено тестов: ${userPassed} / ${currentTask.tests.length}. Исправь код и попробуй снова.`;
    resultEl.className = 'battle__result';
  }
}

function checkJS(code) {
  const fnName = currentTask.functionName;
  let userFn;
  try {
    userFn = new Function(code + `; return ${fnName};`)();
    if (typeof userFn !== 'function') throw new Error(`${fnName} не найдена`);
  } catch (err) {
    throw new Error('в коде ошибка — ' + err.message);
  }
  return currentTask.tests.map(t => {
    try {
      const out = userFn(...t.args);
      return JSON.stringify(out) === JSON.stringify(t.expected);
    } catch { return false; }
  });
}

async function checkPython(code) {
  if (!pyodide) {
    if (pyodideLoading) {
      while (pyodideLoading) await new Promise(r => setTimeout(r, 200));
    } else {
      pyodideLoading = true;
      statusEl.textContent = 'Загрузка Python...';
      pyodide = await loadPyodide();
      pyodideLoading = false;
      statusEl.textContent = 'Батл идёт...';
    }
  }

  try {
    await pyodide.runPythonAsync(code);
  } catch (err) {
    throw new Error('Python: ' + err.message);
  }

  const fnName = currentTask.pyName;
  const results = [];
  for (const t of currentTask.tests) {
    try {
      const call = `${fnName}(${t.args.map(a => JSON.stringify(a)).join(', ')})`;
      const out = pyodide.runPython(call);
      const jsOut = out?.toJs ? out.toJs() : out;
      results.push(JSON.stringify(jsOut) === JSON.stringify(t.expected));
    } catch { results.push(false); }
  }
  return results;
}

function checkCSharp(code) {
  const pattern = currentTask.csPattern;
  const hasReturn = /return\s+/.test(code);
  const matches = pattern ? pattern.test(code) : false;
  const total = currentTask.tests.length;
  if (!hasReturn) return new Array(total).fill(false);
  if (matches) return new Array(total).fill(true);
  return [true, false, false];
}

/* ============================================================
   КОНЕЦ БАТЛА
   ============================================================ */
function endBattle(reason) {
  if (!battleActive) return;
  battleActive = false;
  clearInterval(timerInt);
  clearInterval(enemyInt);
  checkBtn.style.display = 'none';
  codeInput.disabled = true;

  let text = '', cls = '';
  if (reason === 'user') {
    text = '🏆 Победа! Ты решил задачу быстрее!';
    cls = 'win';
    winsCount++;
  } else if (reason === 'enemy') {
    text = '😔 Поражение. Соперник решил первым.';
    cls = 'lose';
  } else if (reason === 'time') {
    if (userPassed > enemyPassed) { text = '🏆 Победа по очкам!'; cls = 'win'; winsCount++; }
    else if (userPassed < enemyPassed) { text = '😔 Поражение по очкам.'; cls = 'lose'; }
    else { text = '🤝 Ничья.'; cls = 'draw'; }
  }

  statusEl.textContent = text;
  statusEl.className = 'battle__status ' + cls;
  enemyState.textContent = '';

  battleSession.textContent = `Задача ${currentIndex + 1} / ${sessionQueue.length} · Побед: ${winsCount}`;

  // Проверка: последняя задача или нет
  if (currentIndex + 1 < sessionQueue.length) {
    nextTaskBtn.style.display = 'inline-flex';
    nextTaskBtn.textContent = `Следующая задача (${currentIndex + 2}/${sessionQueue.length}) →`;
  } else {
    nextTaskBtn.style.display = 'inline-flex';
    nextTaskBtn.textContent = 'Показать итог сессии →';
  }
}

function nextTask() {
  currentIndex++;
  if (currentIndex >= sessionQueue.length) {
    showSummary();
  } else {
    loadTask();
  }
}

function showSummary() {
  battleBox.style.display = 'none';
  battleSummary.style.display = 'block';

  const total = sessionQueue.length;
  const percent = Math.round(winsCount / total * 100);

  summaryTitle.textContent = `Сессия завершена`;
  let verdict = '';
  if (percent >= 80) verdict = '🔥 Огонь! Настоящий профи!';
  else if (percent >= 50) verdict = '💪 Хороший результат!';
  else verdict = '📚 Есть куда расти. Попробуй ещё!';

  summaryText.innerHTML = `Вы выиграли <b>${winsCount} из ${total}</b> батлов (${percent}%).<br>${verdict}`;
}

function resetSession() {
  clearInterval(timerInt);
  clearInterval(enemyInt);
  battleActive = false;
  battleSummary.style.display = 'none';
  battleIntro.style.display = 'block';
  battleBox.style.display = 'none';
}