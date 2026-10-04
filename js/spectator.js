/* ============================================================
   ЗРИТЕЛЬСКИЙ РЕЖИМ — имитация live-батла
   ============================================================ */
(function () {
  if (!document.getElementById('spectatorScreen')) return;

  const BOT_NAMES = [
    { nick: 'ShadowKiller', avatar: '🐉' },
    { nick: 'NightCoder',   avatar: '🦊' },
    { nick: 'Zeus',         avatar: '⚡' },
    { nick: 'TurboNoob',    avatar: '🐸' },
    { nick: 'xX_ProGamer_Xx', avatar: '🐼' },
    { nick: 'DarkPhoenix',  avatar: '🔥' },
    { nick: 'IceQueen',     avatar: '❄️' },
    { nick: 'NoobSlayer',   avatar: '🦁' },
    { nick: 'ByteWizard',   avatar: '🧙' },
    { nick: 'CyberWolf',    avatar: '🐺' }
  ];

  const TASK_POOL = [
    { cat: '🧮 Математика', desc: 'Напиши функцию, которая возвращает сумму двух чисел.' },
    { cat: '🧮 Математика', desc: 'Найди наибольший общий делитель двух чисел.' },
    { cat: '💻 Программирование', desc: 'Переверни строку задом наперёд.' },
    { cat: '💻 Программирование', desc: 'Убери повторяющиеся элементы из массива, сохранив порядок.' },
    { cat: '💻 Программирование', desc: 'Two Sum: верни индексы двух чисел, дающих в сумме target.' },
    { cat: '🛒 Магазины', desc: 'Посчитай сумму всех товаров в корзине.' },
    { cat: '🛒 Магазины', desc: 'Купоны: "A" — 8% (не более 100₽), "B" — 5% (не более 50₽).' },
    { cat: '🎮 Игры', desc: 'Dota. Посчитай KDA: (kills + assists) / deaths.' },
    { cat: '🎮 Игры', desc: 'CS2. Урон AK-47: тело = 36, голова = 143.' },
    { cat: '🎮 Игры', desc: 'FIFA. Посчитай очки команды: победа = 3, ничья = 1.' }
  ];

  const BOT_MESSAGES = {
    start: [
      'Погнали! 😎', 'Ща разнесу', 'Готов к батлу',
      'Давай по-быстрому', 'Лёгкая задача', 'Удачи, брат!'
    ],
    progress: [
      'Один тест готов ✅', 'Уже половина!', 'Идём дальше',
      'Хороший старт', 'Ещё чуть-чуть', 'Легко!'
    ],
    error: [
      'Блин, скобку забыл 😅', 'Опечатка, секунду...', 'Точку с запятой пропустил',
      'Кавычки не закрыл 😐', 'Отступ поправлю'
    ],
    almost: [
      'Осталось чуть-чуть!', 'Почти всё!', 'Последний тест!'
    ],
    win: [
      'ГГ ВП! 🏆', 'Иззи катка', 'Победа! 💪'
    ],
    lose: [
      'Эх, не успел...', 'В следующий раз повезёт', 'ГГ, сильный соперник'
    ]
  };

  const VIEWER_MESSAGES = [
    'Красиво играет 👌', 'Вот это реакция!', 'Ставлю на первого',
    'Кто-нибудь ещё тут?', 'Реально быстро пишет код',
    'Ого, 2 теста уже!', 'Давай, давай! 💪', 'Мой рейтинг бы такое не потянул',
    'Ну это просто изи', 'GG WP', 'Захватывающе 🔥',
    'Ля, не успел исправить', 'Оба красавцы',
    'Хочу так же уметь', 'Матч огонь 🔥'
  ];

  // DOM
  const intro = document.getElementById('spectatorIntro');
  const screen = document.getElementById('spectatorScreen');
  const result = document.getElementById('spectatorResult');
  const matchPreview = document.getElementById('matchPreview');
  const watchBtn = document.getElementById('watchBtn');
  const restartBtn = document.getElementById('restartSpectator');
  const newMatchBtn = document.getElementById('newMatchBtn');

  const timerEl = document.getElementById('spectatorTimer');
  const statusEl = document.getElementById('spectatorStatus');
  const p1Name = document.getElementById('player1Name');
  const p2Name = document.getElementById('player2Name');
  const p1Avatar = document.getElementById('player1Avatar');
  const p2Avatar = document.getElementById('player2Avatar');
  const p1Progress = document.getElementById('p1Progress');
  const p2Progress = document.getElementById('p2Progress');
  const p1Percent = document.getElementById('p1Percent');
  const p2Percent = document.getElementById('p2Percent');
  const specTaskCat = document.getElementById('specTaskCat');
  const specTaskDesc = document.getElementById('specTaskDesc');
  const chatMessages = document.getElementById('chatMessages');
  const chatInput = document.getElementById('chatInput');
  const chatSend = document.getElementById('chatSend');
  const viewersCount = document.getElementById('viewersCount');
  const resultTitle = document.getElementById('resultTitle');
  const resultText = document.getElementById('resultText');

  const BATTLE_TIME = 120;
  let timerInt, p1Int, p2Int, viewerInt, chatInt;
  let timeLeft, p1Passed, p2Passed;
  let player1, player2, currentTask;
  let active = false;
  let p1Speed, p2Speed;
  let p1NextAt, p2NextAt;
  let p1StuckUntil, p2StuckUntil;
  let viewers;

  function pickRandom(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

  function pickUniquePlayers() {
    const shuffled = [...BOT_NAMES].sort(() => Math.random() - 0.5);
    return [shuffled[0], shuffled[1]];
  }

  function setPreview() {
    const [p1, p2] = pickUniquePlayers();
    player1 = p1; player2 = p2;
    currentTask = pickRandom(TASK_POOL);

    matchPreview.innerHTML = `
      <div class="spectator__preview-players">
        <div class="spectator__preview-player">
          <span class="spectator__preview-avatar">${p1.avatar}</span>
          <div>
            <div class="spectator__preview-nick">${p1.nick}</div>
            <div class="spectator__preview-role">Игрок A</div>
          </div>
        </div>
        <div class="spectator__preview-vs">VS</div>
        <div class="spectator__preview-player">
          <span class="spectator__preview-avatar">${p2.avatar}</span>
          <div>
            <div class="spectator__preview-nick">${p2.nick}</div>
            <div class="spectator__preview-role">Игрок B</div>
          </div>
        </div>
      </div>
      <div class="spectator__preview-task">
        <b>${currentTask.cat}</b> — ${currentTask.desc}
      </div>
    `;
  }

  function startBattle() {
    intro.style.display = 'none';
    screen.style.display = 'block';
    result.style.display = 'none';

    // Имена и аватары
    p1Name.innerHTML = `<span class="spectator__avatar">${player1.avatar}</span> ${player1.nick}`;
    p2Name.innerHTML = `<span class="spectator__avatar">${player2.avatar}</span> ${player2.nick}`;

    // Задача
    specTaskCat.textContent = currentTask.cat;
    specTaskDesc.textContent = currentTask.desc;

    // Сброс
    p1Passed = 0;
    p2Passed = 0;
    timeLeft = BATTLE_TIME;
    p1Progress.style.width = '0%';
    p2Progress.style.width = '0%';
    p1Percent.textContent = '0 / 3 тестов';
    p2Percent.textContent = '0 / 3 тестов';
    timerEl.classList.remove('danger');
    timerEl.textContent = '02:00';
    statusEl.textContent = 'Матч идёт...';
    statusEl.className = 'spectator__status';
    chatMessages.innerHTML = '';
    viewers = 80 + Math.floor(Math.random() * 200);
    viewersCount.textContent = viewers;

    // Скорости (обе случайные, чуть разные)
    p1Speed = 14000 + Math.random() * 12000;
    p2Speed = 14000 + Math.random() * 12000;
    p1NextAt = Date.now() + p1Speed;
    p2NextAt = Date.now() + p2Speed;

    // Ошибки ботов
    const p1ErrorAt = Math.random() < 0.5 ? (Math.random() < 0.5 ? 1 : 2) : -1;
    const p2ErrorAt = Math.random() < 0.5 ? (Math.random() < 0.5 ? 1 : 2) : -1;
    p1StuckUntil = 0;
    p2StuckUntil = 0;

    active = true;

    // Приветствие в чате
    pushChat(player1.nick, player1.avatar, pickRandom(BOT_MESSAGES.start), 'player1');
    pushChat(player2.nick, player2.avatar, pickRandom(BOT_MESSAGES.start), 'player2');

    // Таймер
    timerInt = setInterval(() => {
      if (!active) return;
      timeLeft--;
      updateTimer();
      if (timeLeft <= 0) endBattle('time');
    }, 1000);

    // Игрок 1
    p1Int = setInterval(() => {
      if (!active) return;
      const now = Date.now();

      if (p1StuckUntil > now) return;
      if (p1StuckUntil > 0) { p1StuckUntil = 0; p1NextAt = now + p1Speed * 0.5; return; }

      if (now >= p1NextAt) {
        p1Passed++;
        updateProgress();

        // Ошибка?
        if (p1Passed === p1ErrorAt && p1Passed < 3) {
          p1StuckUntil = now + 3000 + Math.random() * 4000;
          pushChat(player1.nick, player1.avatar, pickRandom(BOT_MESSAGES.error), 'player1');
          return;
        }

        if (p1Passed >= 3) { endBattle('player1'); return; }

        // Сообщение о прогрессе
        if (Math.random() < 0.5) {
          const msg = p1Passed === 2 ? pickRandom(BOT_MESSAGES.almost) : pickRandom(BOT_MESSAGES.progress);
          pushChat(player1.nick, player1.avatar, msg, 'player1');
        }

        p1NextAt = now + p1Speed;
      }
    }, 500);

    // Игрок 2
    p2Int = setInterval(() => {
      if (!active) return;
      const now = Date.now();

      if (p2StuckUntil > now) return;
      if (p2StuckUntil > 0) { p2StuckUntil = 0; p2NextAt = now + p2Speed * 0.5; return; }

      if (now >= p2NextAt) {
        p2Passed++;
        updateProgress();

        if (p2Passed === p2ErrorAt && p2Passed < 3) {
          p2StuckUntil = now + 3000 + Math.random() * 4000;
          pushChat(player2.nick, player2.avatar, pickRandom(BOT_MESSAGES.error), 'player2');
          return;
        }

        if (p2Passed >= 3) { endBattle('player2'); return; }

        if (Math.random() < 0.5) {
          const msg = p2Passed === 2 ? pickRandom(BOT_MESSAGES.almost) : pickRandom(BOT_MESSAGES.progress);
          pushChat(player2.nick, player2.avatar, msg, 'player2');
        }

        p2NextAt = now + p2Speed;
      }
    }, 500);

    // Зрители пишут в чат
    chatInt = setInterval(() => {
      if (!active) return;
      if (Math.random() < 0.7) {
        const viewerNick = 'viewer' + (100 + Math.floor(Math.random() * 900));
        pushChat(viewerNick, '👤', pickRandom(VIEWER_MESSAGES), 'viewer');
      }
    }, 3500);

    // Просмотры колеблются
    viewerInt = setInterval(() => {
      if (!active) return;
      const delta = Math.floor(Math.random() * 11) - 5;
      viewers = Math.max(50, viewers + delta);
      viewersCount.textContent = viewers;
    }, 4000);

    // Первое сообщение зрителя
    setTimeout(() => {
      if (active) pushChat('viewer123', '👤', pickRandom(VIEWER_MESSAGES), 'viewer');
    }, 1500);
  }

  function updateTimer() {
    const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
    const s = (timeLeft % 60).toString().padStart(2, '0');
    timerEl.textContent = `${m}:${s}`;
    if (timeLeft <= 20) timerEl.classList.add('danger');
  }

  function updateProgress() {
    p1Progress.style.width = (p1Passed / 3 * 100) + '%';
    p2Progress.style.width = (p2Passed / 3 * 100) + '%';
    p1Percent.textContent = `${p1Passed} / 3 тестов`;
    p2Percent.textContent = `${p2Passed} / 3 тестов`;
  }

  function pushChat(nick, avatar, text, type) {
    const msg = document.createElement('div');
    msg.className = 'spectator__msg spectator__msg--' + (type || 'viewer');
    msg.innerHTML = `
      <span class="spectator__msg-avatar">${avatar}</span>
      <span class="spectator__msg-nick">${nick}</span>
      <span class="spectator__msg-text">${text}</span>
    `;
    chatMessages.appendChild(msg);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Ограничение — максимум 50 сообщений
    while (chatMessages.children.length > 50) {
      chatMessages.removeChild(chatMessages.firstChild);
    }
  }

  function endBattle(reason) {
    if (!active) return;
    active = false;

    clearInterval(timerInt);
    clearInterval(p1Int);
    clearInterval(p2Int);
    clearInterval(chatInt);
    clearInterval(viewerInt);

    // Финальные сообщения
    if (reason === 'player1') {
      pushChat(player1.nick, player1.avatar, pickRandom(BOT_MESSAGES.win), 'player1');
      pushChat(player2.nick, player2.avatar, pickRandom(BOT_MESSAGES.lose), 'player2');
    } else if (reason === 'player2') {
      pushChat(player2.nick, player2.avatar, pickRandom(BOT_MESSAGES.win), 'player2');
      pushChat(player1.nick, player1.avatar, pickRandom(BOT_MESSAGES.lose), 'player1');
    }

    setTimeout(() => {
      screen.style.display = 'none';
      result.style.display = 'block';

      if (reason === 'player1') {
        resultTitle.textContent = `🏆 Победа ${player1.nick}!`;
        resultText.textContent = `${player1.avatar} ${player1.nick} решил задачу первым. Счёт: ${p1Passed} / ${p2Passed}.`;
      } else if (reason === 'player2') {
        resultTitle.textContent = `🏆 Победа ${player2.nick}!`;
        resultText.textContent = `${player2.avatar} ${player2.nick} решил задачу первым. Счёт: ${p2Passed} / ${p1Passed}.`;
      } else if (reason === 'time') {
        if (p1Passed > p2Passed) {
          resultTitle.textContent = `🏆 Победа ${player1.nick} по очкам!`;
          resultText.textContent = `Время вышло. Счёт: ${p1Passed} / ${p2Passed}.`;
        } else if (p2Passed > p1Passed) {
          resultTitle.textContent = `🏆 Победа ${player2.nick} по очкам!`;
          resultText.textContent = `Время вышло. Счёт: ${p2Passed} / ${p1Passed}.`;
        } else {
          resultTitle.textContent = '🤝 Ничья!';
          resultText.textContent = `Оба прошли ${p1Passed} тестов.`;
        }
      }
    }, 1500);
  }

  function reset() {
    clearInterval(timerInt);
    clearInterval(p1Int);
    clearInterval(p2Int);
    clearInterval(chatInt);
    clearInterval(viewerInt);
    active = false;

    screen.style.display = 'none';
    result.style.display = 'none';
    intro.style.display = 'block';
    setPreview();
  }

  /* ---------- Чат зрителя (только для авторизованных) ---------- */
const chatInputBlock = document.getElementById('chatInputBlock');
const chatGuestBlock = document.getElementById('chatGuestBlock');
const chatLoginBtn = document.getElementById('chatLoginBtn');

function updateChatAccess() {
  const user = window.CodeArenaAuth?.getUser?.();
  if (user) {
    chatInputBlock.style.display = 'flex';
    chatGuestBlock.style.display = 'none';
  } else {
    chatInputBlock.style.display = 'none';
    chatGuestBlock.style.display = 'flex';
  }
}

function sendViewerMessage() {
  const user = window.CodeArenaAuth?.getUser?.();
  if (!user) return; // защита от обхода через консоль

  const text = chatInput.value.trim();
  if (!text) return;

  pushChat(user.nick, user.style, text, 'you');
  chatInput.value = '';
}

chatSend.addEventListener('click', sendViewerMessage);
chatInput.addEventListener('keydown', e => {
  if (e.key === 'Enter') sendViewerMessage();
});

// Кнопка «Войти» в плашке — открывает ту же модалку, что и в шапке
chatLoginBtn.addEventListener('click', () => {
  if (window.CodeArenaAuth?.openModal) {
    window.CodeArenaAuth.openModal(false);
  }
});

// Проверяем статус при загрузке страницы
updateChatAccess();

// Периодически перепроверяем — если игрок залогинился/разлогинился
// (auth.js меняет шапку, но не сообщает нам об этом)
setInterval(updateChatAccess, 800);

// Также обновляем при клике на любое место в документе
document.addEventListener('click', () => {
  setTimeout(updateChatAccess, 50);
});

/* ---------- Кнопки ---------- */
watchBtn.addEventListener('click', startBattle);
restartBtn.addEventListener('click', reset);
if (newMatchBtn) newMatchBtn.addEventListener('click', reset);

/* ---------- Инициализация ---------- */
setPreview();

})();