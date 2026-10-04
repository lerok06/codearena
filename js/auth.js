/* ============================================================
   АВТОРИЗАЦИЯ (localStorage + эмодзи-аватарки + Bento-профиль)
   ============================================================ */
(function () {
  const STORAGE_KEY = 'codearena_user';
  const STATS_KEY = 'codearena_stats';

  const AVATAR_STYLES = [
    { id: '🐱', label: 'Кот' },
    { id: '🐉', label: 'Дракон' },
    { id: '🦊', label: 'Лис' },
    { id: '🐼', label: 'Панда' },
    { id: '🐸', label: 'Жаба' },
    { id: '🦁', label: 'Лев' }
  ];

  function getUser() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch { return null; }
  }
  function saveUser(user) { localStorage.setItem(STORAGE_KEY, JSON.stringify(user)); }
  function clearUser() { localStorage.removeItem(STORAGE_KEY); }

  function getUserStats() {
    try {
      const raw = localStorage.getItem(STATS_KEY);
      const s = raw ? JSON.parse(raw) : { battles: 0, wins: 0 };
      const winrate = s.battles > 0 ? Math.round(s.wins / s.battles * 100) : 0;
      return { battles: s.battles, wins: s.wins, winrate };
    } catch { return { battles: 0, wins: 0, winrate: 0 }; }
  }

  let modal, nickInput, avatarGrid, currentStyle = AVATAR_STYLES[0].id;

  function createModal() {
    const m = document.createElement('div');
    m.className = 'auth-modal';
    m.id = 'authModal';
    m.innerHTML = `
      <div class="auth-modal__box">
        <button class="auth-modal__close" data-close aria-label="Закрыть">×</button>
        <h3 id="authTitle">Создать профиль</h3>
        <p class="auth-modal__sub" id="authSub">Придумай ник и выбери аватарку — это займёт 10 секунд.</p>

        <div class="auth-field">
          <label for="authNick">Ник</label>
          <input type="text" id="authNick" maxlength="16" placeholder="Например, ProGamer" autocomplete="off">
        </div>

        <div class="auth-field">
          <label>Аватарка</label>
          <div class="avatar-grid" id="avatarGrid"></div>
        </div>

        <div class="auth-actions">
          <button id="authSave">Сохранить</button>
        </div>
      </div>
    `;
    document.body.appendChild(m);
    return m;
  }

  function initModal() {
    modal = document.getElementById('authModal') || createModal();
    nickInput = modal.querySelector('#authNick');
    avatarGrid = modal.querySelector('#avatarGrid');

    avatarGrid.innerHTML = '';
    AVATAR_STYLES.forEach(s => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'avatar-option';
      btn.dataset.style = s.id;
      btn.title = s.label;
      btn.textContent = s.id;
      btn.addEventListener('click', () => {
        avatarGrid.querySelectorAll('.avatar-option').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentStyle = s.id;
      });
      avatarGrid.appendChild(btn);
    });

    modal.querySelector('[data-close]').addEventListener('click', () => modal.classList.remove('open'));
    modal.addEventListener('click', e => {
      if (e.target === modal) modal.classList.remove('open');
    });

    modal.querySelector('#authSave').addEventListener('click', () => {
      const nick = nickInput.value.trim();
      if (nick.length < 3) {
        nickInput.style.borderColor = '#ff5c7a';
        nickInput.focus();
        return;
      }
      saveUser({ nick, style: currentStyle, createdAt: Date.now() });
      modal.classList.remove('open');
      renderNavUser();
      renderBentoProfile();
      updateBattleNames();
    });

    nickInput.addEventListener('keydown', e => {
      if (e.key === 'Enter') modal.querySelector('#authSave').click();
    });
  }

  function openModal(editing = false) {
    const user = getUser();
    if (editing && user) {
      nickInput.value = user.nick;
      currentStyle = user.style;
      modal.querySelector('#authTitle').textContent = 'Настройки профиля';
      modal.querySelector('#authSub').textContent = 'Измени ник или аватарку.';
    } else {
      nickInput.value = '';
      currentStyle = AVATAR_STYLES[0].id;
      modal.querySelector('#authTitle').textContent = 'Создать профиль';
      modal.querySelector('#authSub').textContent = 'Придумай ник и выбери аватарку — это займёт 10 секунд.';
    }
    nickInput.style.borderColor = '';

    avatarGrid.querySelectorAll('.avatar-option').forEach(b => {
      b.classList.toggle('active', b.dataset.style === currentStyle);
    });

    modal.classList.add('open');
    setTimeout(() => nickInput.focus(), 100);
  }

  /* ---------- Кнопка в навигации ---------- */
  function renderNavUser() {
    const themeToggle = document.querySelector('.theme-toggle');
    if (!themeToggle) return;

    const parent = themeToggle.parentNode;
    const existing = parent.querySelector('.user-menu__wrap');
    if (existing) existing.remove();

    const user = getUser();
    const wrap = document.createElement('div');
    wrap.className = 'user-menu__wrap';

    if (!user) {
      const btn = document.createElement('button');
      btn.className = 'user-btn user-btn--guest';
      btn.textContent = 'Войти';
      btn.addEventListener('click', () => openModal(false));
      wrap.appendChild(btn);
    } else {
      const btn = document.createElement('button');
      btn.className = 'user-btn';
      btn.innerHTML = `
        <span class="user-avatar">${user.style}</span>
        <span>${user.nick}</span>
      `;

      const menu = document.createElement('div');
      menu.className = 'user-menu';
      menu.innerHTML = `
        <div class="user-menu__header">
          <span class="user-avatar">${user.style}</span>
          <div>
            <b>${user.nick}</b>
            <span>Игрок CodeArena</span>
          </div>
        </div>
        <button class="user-menu__item" data-action="edit">Сменить профиль</button>
        <button class="user-menu__item user-menu__item--danger" data-action="logout">Выйти</button>
      `;

      btn.addEventListener('click', e => {
        e.stopPropagation();
        menu.classList.toggle('open');
      });

      menu.querySelector('[data-action="edit"]').addEventListener('click', () => {
        menu.classList.remove('open');
        openModal(true);
      });

      menu.querySelector('[data-action="logout"]').addEventListener('click', () => {
        clearUser();
        renderNavUser();
        renderBentoProfile();
        updateBattleNames();
      });

      document.addEventListener('click', () => menu.classList.remove('open'));

      wrap.appendChild(btn);
      wrap.appendChild(menu);
    }

    parent.insertBefore(wrap, themeToggle);
  }

  /* ---------- Большая Bento-карточка ---------- */
  function renderBentoProfile() {
    const card = document.getElementById('bentoProfile');
    if (!card) return;

    const user = getUser();

    if (!user) {
      card.innerHTML = `
        <div class="bento__icon">👤</div>
        <h3>Личный кабинет</h3>
        <p>Создай профиль, чтобы сохранять прогресс, рейтинг и историю матчей.</p>
        <button class="btn btn--primary bento__cta" id="bentoLogin">Войти →</button>
      `;
      const btn = card.querySelector('#bentoLogin');
      if (btn) btn.addEventListener('click', () => openModal(false));
    } else {
      const stats = getUserStats();
      card.innerHTML = `
        <div class="bento__profile">
          <div class="bento__profile-avatar">${user.style}</div>
          <div>
            <div class="bento__profile-nick">${user.nick}</div>
            <div class="bento__profile-status">Игрок CodeArena</div>
          </div>
        </div>

        <div class="bento__stats">
          <div><b>${stats.battles}</b><span>батлов</span></div>
          <div><b>${stats.wins}</b><span>побед</span></div>
          <div><b>${stats.winrate}%</b><span>винрейт</span></div>
        </div>

        <div class="bento__actions">
          <button data-action="edit">Сменить профиль</button>
          <button data-action="logout">Выйти</button>
        </div>
      `;

      card.querySelector('[data-action="edit"]').addEventListener('click', () => openModal(true));
      card.querySelector('[data-action="logout"]').addEventListener('click', () => {
        clearUser();
        renderNavUser();
        renderBentoProfile();
        updateBattleNames();
      });
    }
  }

  /* ---------- Замена «🧑 Вы» на ник ---------- */
  function updateBattleNames() {
    const user = getUser();
    const stamp = user ? user.nick : 'guest';

    document.querySelectorAll('.battle__name').forEach(el => {
      if (el.dataset.stamp === stamp) return;

      const isYou = el.textContent.includes('Вы') || el.dataset.isYou === '1';
      if (!isYou) return;

      el.dataset.isYou = '1';
      el.dataset.stamp = stamp;

      if (user) {
        el.innerHTML = `<span class="battle__avatar">${user.style}</span> ${user.nick}`;
      } else {
        el.textContent = '🧑 Вы';
      }
    });
  }

  /* ---------- Публичный API ---------- */
  window.CodeArenaAuth = { getUser, openModal, updateBattleNames, renderBentoProfile };

  /* ---------- Инициализация ---------- */
  function init() {
    initModal();
    renderNavUser();
    renderBentoProfile();
    updateBattleNames();
    // УБРАН MutationObserver — он и вызывал зависание.
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();