// ============================================================================
// DooSi.BaRa — Engine สำหรับห้องทำนายไพ่ (Tarot Reading Chamber)
// รองรับการสลับโหมด: general (ทั่วไป 56 ใบ) / love (ความรัก) / money (การเงิน)
// ============================================================================

const MODE_CONFIG = {
    general: {
        title: "โหมดดวงทั่วไป & ภาพรวมชีวิต",
        titleEng: "GENERAL & DAILY FORTUNE",
        desc: "ตั้งจิตอธิษฐานแล้วเปิดรับคำอวยพรและคำทำนายภาพรวมชีวิตประจำวัน จากวลีไวรัลแห่งปี 2026",
        badge: "🔮 หมวดทั่วไป (56 ใบ)",
        deck: typeof GENERAL_DECK !== "undefined" ? GENERAL_DECK : []
    },
    love: {
        title: "โหมดดวงความรัก & คนคุย",
        titleEng: "LOVE & SITUATIONSHIP",
        desc: "คนคุยหรือคนคุก? ตอบแชทกี่โมง? ไทป์โกลเด้นมายัง? เช็กดวงความรักสุดปั่นได้ที่นี่",
        badge: "💘 หมวดความรัก (16 ใบ)",
        deck: typeof LOVE_DECK !== "undefined" ? LOVE_DECK : []
    },
    money: {
        title: "โหมดดวงการเงิน & การงาน",
        titleEng: "MONEY & CAREER PROVIDENCE",
        desc: "รวยกี่โมง? งานงอกตอนห้าโมงเย็นหรือโบนัสก้อนโต? เช็กสถานะกระเป๋าตังค์และงานด่วน",
        badge: "💸 หมวดการเงิน & งาน (12 ใบ)",
        deck: typeof MONEY_DECK !== "undefined" ? MONEY_DECK : []
    }
};

let currentMode = "general";
let state = {
    cards: [],
    shuffledDeck: [],
    spreadMode: 1, // 1 or 3
    selectedIndices: [],
    soundEnabled: true,
    lastRevealedCards: [],
    viewMode: "fan" // "fan" (ribbon) or "grid"
};

// ============================================================================
// Audio & BGM Engine (Continuous Ambient Looping Music + SFX)
// ============================================================================
class MysticSoundEngine {
    constructor() {
        this.ctx = null;
        this.soundEnabled = localStorage.getItem("doosi_sound_enabled") !== "false";
        state.soundEnabled = this.soundEnabled;
        this.isPlaying = false;
        this.hasInteracted = false;

        this.bgm = new Audio("sound.mp3");
        this.bgm.loop = true;
        this.bgm.volume = 0.32;

        this.setupAutoplay();
    }
    initCtx() {
        if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
            const AudioCtx = window.AudioContext || window.webkitAudioContext;
            this.ctx = new AudioCtx();
        }
    }
    setupAutoplay() {
        // Attempt initial autoplay if allowed
        if (this.soundEnabled) {
            const p = this.bgm.play();
            if (p !== undefined) {
                p.then(() => {
                    this.isPlaying = true;
                    this.updateUi();
                }).catch(() => {
                    // Browser policy blocked autoplay without user gesture
                    this.updateUi();
                });
            }
        }

        // On first user interaction (touch, click card), play BGM if enabled
        const startOnGesture = () => {
            if (this.hasInteracted) return;
            this.hasInteracted = true;
            this.initCtx();
            if (this.soundEnabled && !this.isPlaying) {
                const playPromise = this.bgm.play();
                if (playPromise !== undefined) {
                    playPromise.then(() => {
                        this.isPlaying = true;
                        this.updateUi();
                    }).catch(() => {});
                }
            }
            window.removeEventListener("click", startOnGesture);
            window.removeEventListener("touchstart", startOnGesture);
            window.removeEventListener("keydown", startOnGesture);
        };

        window.addEventListener("click", startOnGesture, { passive: true });
        window.addEventListener("touchstart", startOnGesture, { passive: true });
        window.addEventListener("keydown", startOnGesture, { passive: true });
    }
    toggleSound() {
        this.soundEnabled = !this.soundEnabled;
        state.soundEnabled = this.soundEnabled;
        localStorage.setItem("doosi_sound_enabled", this.soundEnabled ? "true" : "false");
        if (this.soundEnabled) {
            this.initCtx();
            const p = this.bgm.play();
            if (p !== undefined) {
                p.then(() => {
                    this.isPlaying = true;
                    this.updateUi();
                }).catch(() => {});
            }
        } else {
            this.bgm.pause();
            this.isPlaying = false;
            this.updateUi();
        }
    }
    updateUi() {
        const desktopBtn = document.getElementById("btnToggleSound");
        const mobileBtn = document.getElementById("btnToggleSoundMobile");

        if (desktopBtn) {
            if (this.soundEnabled) {
                desktopBtn.innerHTML = `<span class="bgm-wave-anim">🎶</span> <span id="soundBtnText">เพลง: เปิด</span>`;
                desktopBtn.classList.add("sound-active");
            } else {
                desktopBtn.innerHTML = `🔇 <span id="soundBtnText">เพลง: ปิด</span>`;
                desktopBtn.classList.remove("sound-active");
            }
        }
        if (mobileBtn) {
            if (this.soundEnabled) {
                mobileBtn.innerHTML = `<span class="bgm-wave-anim">🎶</span> เพลงบรรยากาศ: เปิด`;
                mobileBtn.classList.add("sound-active");
            } else {
                mobileBtn.innerHTML = `🔇 เพลงบรรยากาศ: ปิด`;
                mobileBtn.classList.remove("sound-active");
            }
        }
    }
    playTone(freq, type = "sine", duration = 0.25, delay = 0, gainVal = 0.08) {
        if (!this.soundEnabled) return;
        try {
            this.initCtx();
            if (!this.ctx) return;
            const now = this.ctx.currentTime + delay;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(gainVal, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {}
    }
    playShuffle() {
        [330, 392, 440, 523.25, 659.25].forEach((n, idx) => {
            this.playTone(n, "triangle", 0.14, idx * 0.05, 0.06);
        });
    }
    playFlip() {
        this.playTone(440, "sine", 0.2, 0, 0.08);
        this.playTone(554.37, "sine", 0.25, 0.08, 0.08);
        this.playTone(659.25, "triangle", 0.45, 0.16, 0.1);
        this.playTone(880, "sine", 0.6, 0.24, 0.07);
    }
}
const sound = new MysticSoundEngine();

// ============================================================================
// SVG Tarot Emblem Generator
// ============================================================================
function getTarotSvg(iconType) {
    const commonDefs = `
        <defs>
            <linearGradient id="goldGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#fff4b8"/>
                <stop offset="50%" stop-color="#e5c158"/>
                <stop offset="100%" stop-color="#b58520"/>
            </linearGradient>
        </defs>
    `;
    const outerRing = `
        <circle cx="80" cy="80" r="70" fill="none" stroke="url(#goldGrad)" stroke-width="2" stroke-dasharray="4 4"/>
        <circle cx="80" cy="80" r="62" fill="none" stroke="url(#goldGrad)" stroke-width="1.2" opacity="0.7"/>
        <polygon points="80,14 96,58 142,58 105,85 119,130 80,103 41,130 55,85 18,58 64,58" fill="none" stroke="url(#goldGrad)" stroke-width="1" opacity="0.3"/>
    `;

    let centerArt = "";
    switch (iconType) {
        case "lips-crown":
            centerArt = `
                <path d="M52,62 L62,42 L80,55 L98,42 L108,62 Z" fill="none" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <path d="M48,88 Q64,74 80,84 Q96,74 112,88 Q96,108 80,104 Q64,108 48,88 Z" fill="rgba(255,110,199,0.25)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="50" y1="88" x2="110" y2="88" stroke="url(#goldGrad)" stroke-width="1.5"/>
                <circle cx="80" cy="35" r="4" fill="#fdf0a6"/>
            `;
            break;
        case "question-eye":
            centerArt = `
                <path d="M34,80 Q80,45 126,80 Q80,115 34,80 Z" fill="rgba(184,107,255,0.2)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <circle cx="80" cy="80" r="16" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
                <text x="80" y="88" text-anchor="middle" fill="#fdf0a6" font-family="Cinzel Decorative, serif" font-size="24" font-weight="bold">?</text>
            `;
            break;
        case "hourglass-staff":
            centerArt = `
                <path d="M56,44 L104,44 L80,80 L104,116 L56,116 L80,80 Z" fill="rgba(229,193,88,0.18)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="50" y1="44" x2="110" y2="44" stroke="url(#goldGrad)" stroke-width="3"/>
                <line x1="50" y1="116" x2="110" y2="116" stroke="url(#goldGrad)" stroke-width="3"/>
                <circle cx="80" cy="60" r="5" fill="#fdf0a6"/>
            `;
            break;
        case "sparkle-lotus":
            centerArt = `
                <path d="M80,38 C95,60 95,90 80,112 C65,90 65,60 80,38 Z" fill="rgba(92,225,230,0.2)" stroke="url(#goldGrad)" stroke-width="2.2"/>
                <path d="M80,112 C105,98 118,75 112,54 C96,64 86,82 80,112 Z" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
                <path d="M80,112 C55,98 42,75 48,54 C64,64 74,82 80,112 Z" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
                <circle cx="80" cy="30" r="4" fill="#fdf0a6"/>
            `;
            break;
        case "chalice-star":
            centerArt = `
                <path d="M56,52 L104,52 C104,82 88,92 80,94 C72,92 56,82 56,52 Z" fill="rgba(255,110,199,0.2)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="80" y1="94" x2="80" y2="118" stroke="url(#goldGrad)" stroke-width="3"/>
                <line x1="62" y1="118" x2="98" y2="118" stroke="url(#goldGrad)" stroke-width="3"/>
                <polygon points="80,28 84,38 95,38 86,44 89,54 80,48 71,54 74,44 65,38 76,38" fill="#fdf0a6"/>
            `;
            break;
        case "wheel-sun":
            centerArt = `
                <circle cx="80" cy="80" r="34" fill="rgba(229,193,88,0.18)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <circle cx="80" cy="80" r="12" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
                <line x1="80" y1="36" x2="80" y2="124" stroke="url(#goldGrad)" stroke-width="2"/>
                <line x1="36" y1="80" x2="124" y2="80" stroke="url(#goldGrad)" stroke-width="2"/>
                <line x1="49" y1="49" x2="111" y2="111" stroke="url(#goldGrad)" stroke-width="2"/>
                <line x1="111" y1="49" x2="49" y2="111" stroke="url(#goldGrad)" stroke-width="2"/>
            `;
            break;
        case "sun-bell":
            centerArt = `
                <path d="M56,96 L104,96 L96,62 C96,48 64,48 64,62 Z" fill="rgba(229,193,88,0.22)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <circle cx="80" cy="104" r="7" fill="#fdf0a6"/>
                <circle cx="80" cy="44" r="5" fill="none" stroke="url(#goldGrad)" stroke-width="2"/>
            `;
            break;
        case "twin-moons":
            centerArt = `
                <path d="M72,46 A30,30 0 1,0 72,114 A22,22 0 1,1 72,46 Z" fill="rgba(184,107,255,0.25)" stroke="url(#goldGrad)" stroke-width="2"/>
                <path d="M88,46 A30,30 0 1,1 88,114 A22,22 0 1,0 88,46 Z" fill="rgba(92,225,230,0.2)" stroke="url(#goldGrad)" stroke-width="2"/>
            `;
            break;
        case "lightning-coin":
            centerArt = `
                <circle cx="80" cy="80" r="32" fill="rgba(229,193,88,0.16)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <polygon points="86,44 62,82 78,82 72,116 100,76 82,76" fill="#fdf0a6" stroke="url(#goldGrad)" stroke-width="1.5"/>
            `;
            break;
        case "crescent-cloud":
            centerArt = `
                <path d="M90,44 A34,34 0 1,0 116,98 A26,26 0 1,1 90,44 Z" fill="rgba(229,193,88,0.25)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <circle cx="62" cy="58" r="3" fill="#fdf0a6"/>
                <circle cx="98" cy="68" r="2.5" fill="#fdf0a6"/>
            `;
            break;
        case "crown-star":
            centerArt = `
                <polygon points="44,98 52,56 80,76 108,56 116,98" fill="rgba(255,110,199,0.22)" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="44" y1="106" x2="116" y2="106" stroke="url(#goldGrad)" stroke-width="3"/>
                <circle cx="52" cy="48" r="4" fill="#fdf0a6"/>
                <circle cx="80" cy="42" r="5" fill="#fdf0a6"/>
                <circle cx="108" cy="48" r="4" fill="#fdf0a6"/>
            `;
            break;
        default:
            centerArt = `
                <line x1="80" y1="38" x2="80" y2="120" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <line x1="46" y1="62" x2="114" y2="62" stroke="url(#goldGrad)" stroke-width="2.5"/>
                <polygon points="46,62 36,90 56,90" fill="rgba(229,193,88,0.2)" stroke="url(#goldGrad)" stroke-width="2"/>
                <polygon points="114,62 104,90 124,90" fill="rgba(229,193,88,0.2)" stroke="url(#goldGrad)" stroke-width="2"/>
            `;
            break;
    }

    return `<svg viewBox="0 0 160 160" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        ${commonDefs}
        ${outerRing}
        ${centerArt}
    </svg>`;
}

function getToneBadgeHtml(tone) {
    if (tone === "positive") {
        return `<span class="tone-badge tone-positive">🟢 พลังบวก (สายอวย)</span>`;
    }
    if (tone === "negative") {
        return `<span class="tone-badge tone-negative">🔴 พลังลบ (สายแกง)</span>`;
    }
    return `<span class="tone-badge tone-neutral">🟡 พลังกลาง (เตือนสติ)</span>`;
}

// ============================================================================
// Mode Initialization
// ============================================================================
function setMode(modeKey) {
    if (!MODE_CONFIG[modeKey]) modeKey = "general";
    currentMode = modeKey;
    const conf = MODE_CONFIG[modeKey];

    const titleEl = document.getElementById("modeHeaderTitle");
    if (titleEl) titleEl.textContent = conf.title;
    const descEl = document.getElementById("modeHeaderDesc");
    if (descEl) descEl.textContent = conf.desc;
    const badgeEl = document.getElementById("activeModeBadge");
    if (badgeEl) badgeEl.textContent = conf.badge;

    document.querySelectorAll(".mode-pill-btn").forEach(btn => {
        const isActive = btn.dataset.targetMode === modeKey;
        btn.classList.toggle("active-pill", isActive);
        btn.classList.toggle("active", isActive);
    });

    state.cards = [...conf.deck];
    shuffleAndDeal(true);
}

function shuffleArray(arr) {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
}

// ============================================================================
// View Mode Controller (Fan Ribbon vs Grid)
// ============================================================================
function setViewMode(mode) {
    state.viewMode = mode;
    const container = document.querySelector(".tarot-spread-container");
    if (!container) return;
    container.classList.remove("view-fan", "view-grid");
    container.classList.add(mode === "fan" ? "view-fan" : "view-grid");

    document.querySelectorAll(".view-pill").forEach(btn => {
        btn.classList.toggle("active", btn.dataset.view === mode);
    });

    const navBar = document.getElementById("fanNavigatorBar");
    if (navBar) {
        navBar.style.display = mode === "fan" ? "flex" : "none";
    }

    updateFanIndicator();
}

function updateFanIndicator() {
    const textEl = document.getElementById("fanCardCounterText");
    if (!textEl) return;
    const total = state.cards.length;
    textEl.textContent = `🃏 ปัดเลือกจากทั้ง ${total} ใบ`;
}

function initFanDragAndScroll() {
    const ribbon = document.getElementById("tarotDeckGrid");
    const btnLeft = document.getElementById("btnFanLeft");
    const btnRight = document.getElementById("btnFanRight");
    const counterText = document.getElementById("fanCardCounterText");

    if (btnLeft && ribbon) {
        btnLeft.addEventListener("click", () => {
            ribbon.scrollBy({ left: -320, behavior: "smooth" });
        });
    }
    if (btnRight && ribbon) {
        btnRight.addEventListener("click", () => {
            ribbon.scrollBy({ left: 320, behavior: "smooth" });
        });
    }

    if (ribbon) {
        // Track scroll position to update counter indicator
        ribbon.addEventListener("scroll", () => {
            if (state.viewMode !== "fan") return;
            const scrollPercent = ribbon.scrollLeft / (ribbon.scrollWidth - ribbon.clientWidth || 1);
            const currentApproxCard = Math.min(
                state.cards.length,
                Math.max(1, Math.round(scrollPercent * (state.cards.length - 1)) + 1)
            );
            if (counterText) {
                counterText.textContent = `🃏 กำลังดูไพ่ใบที่ ~${currentApproxCard} / ${state.cards.length}`;
            }
        }, { passive: true });

        // Mouse drag scrolling for desktop
        let isDown = false;
        let startX, scrollLeft;
        ribbon.addEventListener("mousedown", (e) => {
            if (state.viewMode !== "fan") return;
            isDown = true;
            startX = e.pageX - ribbon.offsetLeft;
            scrollLeft = ribbon.scrollLeft;
        });
        window.addEventListener("mouseup", () => { isDown = false; });
        ribbon.addEventListener("mouseleave", () => { isDown = false; });
        ribbon.addEventListener("mousemove", (e) => {
            if (!isDown || state.viewMode !== "fan") return;
            e.preventDefault();
            const x = e.pageX - ribbon.offsetLeft;
            const walk = (x - startX) * 1.6;
            ribbon.scrollLeft = scrollLeft - walk;
        });
    }
}

// ============================================================================
// Render Deck Spread
// ============================================================================
function shuffleAndDeal(animate = true) {
    sound.playShuffle();
    state.selectedIndices = [];
    state.shuffledDeck = shuffleArray(state.cards);

    const readingStage = document.getElementById("readingStage");
    readingStage.classList.remove("visible");

    const grid = document.getElementById("tarotDeckGrid");
    grid.innerHTML = "";
    grid.scrollLeft = 0;

    const deckCount = state.shuffledDeck.length;
    for (let i = 0; i < deckCount; i++) {
        const slot = document.createElement("div");
        slot.className = `deck-card-slot ${animate ? "shuffling" : ""}`;
        slot.style.animationDelay = `${(i % 16) * 0.028}s`;
        slot.dataset.index = i;

        slot.innerHTML = `
            <div class="card-back-design">
                <div class="card-back-inner">
                    <svg viewBox="0 0 80 80" width="46" height="46">
                        <circle cx="40" cy="40" r="30" fill="none" stroke="#e5c158" stroke-width="1.5" stroke-dasharray="3 3"/>
                        <polygon points="40,12 47,32 68,32 51,44 57,64 40,52 23,64 29,44 12,32 33,32" fill="rgba(229,193,88,0.2)" stroke="#e5c158" stroke-width="1.2"/>
                        <circle cx="40" cy="40" r="6" fill="#fdf0a6"/>
                    </svg>
                    <span class="card-back-number">DOOSI • ${i + 1}</span>
                </div>
            </div>
        `;

        slot.addEventListener("click", () => handleCardPick(i, slot));
        grid.appendChild(slot);
    }

    updateOraclePrompt();
    updateFanIndicator();
}

function updateOraclePrompt() {
    const promptEl = document.getElementById("oraclePromptText");
    const friendName = document.getElementById("friendNameInput").value.trim();
    const prefix = friendName ? `ตั้งจิตถึง "${friendName}" แล้ว` : "ตั้งจิตอธิษฐาน แล้ว";
    const totalCount = state.cards.length;

    if (state.spreadMode === 1) {
        promptEl.textContent = `${prefix}เลือกไพ่ 1 ใบจากทั้ง ${totalCount} ใบในสำรับ เพื่อรับคำทำนายแห่งโชคชะตา`;
    } else {
        const remaining = 3 - state.selectedIndices.length;
        promptEl.textContent = remaining > 0
            ? `${prefix}เลือกไพ่ให้ครบ 3 ใบจากทั้ง ${totalCount} ใบ (อดีต • ปัจจุบัน • อนาคต) — เหลืออีก ${remaining} ใบ`
            : `เปิดไพ่ครบ 3 ใบแล้ว! เลื่อนลงเพื่ออ่านคำทำนายได้เลย`;
    }
}

function handleCardPick(index, slotEl) {
    if (state.selectedIndices.includes(index)) return;
    if (state.selectedIndices.length >= state.spreadMode) return;

    sound.playFlip();
    state.selectedIndices.push(index);
    slotEl.classList.add("selected");

    updateOraclePrompt();

    if (state.selectedIndices.length === state.spreadMode) {
        revealReading();
    }
}

// ============================================================================
// Reveal Reading
// ============================================================================
function revealReading() {
    // Notify counter API of genuine completed reading
    const sId = sessionStorage.getItem("doosi_session_id") || "sess_reading";
    const isLocal = window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1";
    if (isLocal) {
        fetch(`api/counter.php?action=read&session=${encodeURIComponent(sId)}`).catch(() => {});
    }

    // Global Cloud Counter (Abacus API)
    try {
        const todayStr = new Date().toISOString().slice(0, 10);
        fetch("https://abacus.jasoncameron.dev/hit/doosibara-2026-v1/readings", { mode: "cors" }).catch(() => {});
        fetch(`https://abacus.jasoncameron.dev/hit/doosibara-2026-v1/readings-${todayStr}`, { mode: "cors" }).catch(() => {});
    } catch (_) {}

    const readingStage = document.getElementById("readingStage");
    const friendName = document.getElementById("friendNameInput").value.trim() || "ผู้รับคำทำนายผู้ทรงเกียรติ";
    const conf = MODE_CONFIG[currentMode];

    const pickedCards = state.selectedIndices.map(idx => state.shuffledDeck[idx]);
    state.lastRevealedCards = pickedCards;

    if (state.spreadMode === 1) {
        const card = pickedCards[0];

        readingStage.innerHTML = `
            <div class="single-reading-layout">
                <div class="tarot-card-showcase">
                    <div class="tarot-card-front">
                        <div class="tarot-card-frame">
                            <div class="tarot-roman">${card.roman}</div>
                            <div class="tarot-art-box">
                                <div class="tarot-svg-wrap">${getTarotSvg(card.svgIcon)}</div>
                                <span class="tarot-Power-tag">✦ ${card.powerTag}</span>
                            </div>
                            <div class="tarot-title-plate">
                                <div class="tarot-phrase-main">“${card.phrase}”</div>
                                <div class="tarot-phrase-eng">${card.engTitle}</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="prophecy-content">
                    <div class="prophecy-header">
                        <div class="recipient-badge">🎴 คำทำนายแด่: <strong>${escapeHtml(friendName)}</strong> • ${conf.title}</div>
                        <h2 class="prophecy-card-title">ไพ่ “${card.phrase}” ${getToneBadgeHtml(card.tone)}</h2>
                        <div class="prophecy-card-subtitle">${card.roman} — ${card.engTitle}</div>
                    </div>

                    <div class="prophecy-box funny-lore">
                        <div class="box-label">😂 คำจำกัดความจากจักรวาล (Meme Lore)</div>
                        <p>${card.funnyMeaning}</p>
                    </div>

                    <div class="prophecy-box real-prediction">
                        <div class="box-label">🔮 คำทำนายที่พอเป็นไปได้ (Prophecy)</div>
                        <p>${card.realisticProphecy}</p>
                    </div>

                    <div class="prophecy-box blessing-box">
                        <div class="box-label">✨ คำอวยพรประจำการ์ด (Sacred Blessing)</div>
                        <p><strong>“${card.blessing}”</strong></p>
                    </div>

                    <div class="lucky-stats-grid">
                        <div class="lucky-stat-card">
                            <span class="lucky-stat-label">🎨 สีมงคลเสริมความจึ้ง</span>
                            <span class="lucky-stat-value">${card.luckyColor}</span>
                        </div>
                        <div class="lucky-stat-card">
                            <span class="lucky-stat-label">🧿 ไอเทมนำโชค</span>
                            <span class="lucky-stat-value">${card.luckyItem}</span>
                        </div>
                        <div class="lucky-stat-card">
                            <span class="lucky-stat-label">🔢 เลขมงคล 2026</span>
                            <span class="lucky-stat-value">${card.luckyNumber}</span>
                        </div>
                    </div>

                    <div class="reading-actions-bar">
                        <button class="btn-gold" onclick="downloadCardImage()">
                            📸 บันทึกรูปการ์ดส่งให้เพื่อน
                        </button>
                        <button class="btn-outline-gold" onclick="copyReadingText()">
                            📋 คัดลอกคำทำนายไปแชร์
                        </button>
                        <button class="btn-pill" onclick="shuffleAndDeal(true)">
                            🔄 สับไพ่เปิดใหม่
                        </button>
                    </div>
                </div>
            </div>
        `;
    } else {
        const positions = ["⏪ อดีตที่ผ่านมา", "⚡ ปัจจุบันที่เป็นอยู่", "⏩ อนาคตที่กำลังจะมา"];
        const cardsHtml = pickedCards.map((card, i) => `
            <div class="three-card-item">
                <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:0.4rem;">
                    <span class="position-pill">${positions[i]}</span>
                    ${getToneBadgeHtml(card.tone)}
                </div>
                <div class="tarot-card-showcase" style="max-width: 230px; margin: 0.5rem auto;">
                    <div class="tarot-card-front">
                        <div class="tarot-card-frame">
                            <div class="tarot-roman">${card.roman}</div>
                            <div class="tarot-art-box">
                                <div class="tarot-svg-wrap" style="width:115px;height:115px;">${getTarotSvg(card.svgIcon)}</div>
                                <span class="tarot-Power-tag">${card.powerTag}</span>
                            </div>
                            <div class="tarot-title-plate">
                                <div class="tarot-phrase-main" style="font-size:1.15rem;">“${card.phrase}”</div>
                                <div class="tarot-phrase-eng">${card.engTitle}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="prophecy-box funny-lore">
                    <div class="box-label">😂 ความหมายหน้าไพ่</div>
                    <p>${card.funnyMeaning}</p>
                </div>
                <div class="prophecy-box real-prediction">
                    <div class="box-label">🔮 คำทำนาย</div>
                    <p>${card.realisticProphecy}</p>
                </div>
                <div class="prophecy-box blessing-box">
                    <div class="box-label">✨ คำอวยพร</div>
                    <p><strong>“${card.blessing}”</strong></p>
                </div>
                <div style="text-align:center; margin-top:0.75rem;">
                    <button type="button" class="btn-pill" style="font-size:0.78rem; padding:0.32rem 0.85rem;" onclick="downloadSingleCardImage(state.lastRevealedCards[${i}])">
                        📥 บันทึกรูปเฉพาะใบนี้
                    </button>
                </div>
            </div>
        `).join("");

        readingStage.innerHTML = `
            <div style="text-align:center; margin-bottom:1.25rem;">
                <div class="recipient-badge">🎴 เปิดไพ่ 3 กาลเวลาแด่: <strong>${escapeHtml(friendName)}</strong> • ${conf.title}</div>
                <h2 class="prophecy-card-title">บันทึกชะตา 3 ใบจากสำนัก DooSi.BaRa</h2>
            </div>
            <div class="three-card-grid">
                ${cardsHtml}
            </div>
            <div class="reading-actions-bar" style="justify-content:center;">
                <button class="btn-gold" onclick="downloadThreeCardsImage()">
                    📸 บันทึกรูปคำทำนาย 3 ใบรวมกัน (PNG)
                </button>
                <button class="btn-outline-gold" onclick="copyReadingText()">
                    📋 คัดลอกผลทำนายทั้ง 3 ใบ
                </button>
                <button class="btn-pill" onclick="shuffleAndDeal(true)">
                    🔄 สับไพ่เปิดใหม่
                </button>
            </div>
        `;
    }

    readingStage.classList.add("visible");
    setTimeout(() => {
        readingStage.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 120);
}

// ============================================================================
// Share, Copy & Download
// ============================================================================
function copyReadingText() {
    if (!state.lastRevealedCards || !state.lastRevealedCards.length) return;
    const friendName = document.getElementById("friendNameInput").value.trim() || "เพื่อนรัก";
    const conf = MODE_CONFIG[currentMode];

    let text = `🔮 สำนักไพ่ทาโรต์ DooSi.BaRa (ดูสิ.บาร่า) 2026\n`;
    text += `🎴 หมวด: ${conf.title}\n`;
    text += `💌 คำทำนายและคำอวยพรแด่: ${friendName}\n\n`;

    if (state.lastRevealedCards.length === 1) {
        const c = state.lastRevealedCards[0];
        text += `🃏 ไพ่ที่ได้: “${c.phrase}” (${c.engTitle})\n`;
        text += `😂 คำนิยาม: ${c.funnyMeaning}\n`;
        text += `🌟 คำทำนาย: ${c.realisticProphecy}\n`;
        text += `✨ คำอวยพร: “${c.blessing}”\n`;
        text += `🎨 สีมงคล: ${c.luckyColor} | 🔢 เลขนำโชค: ${c.luckyNumber}\n`;
    } else {
        const labels = ["อดีต", "ปัจจุบัน", "อนาคต"];
        state.lastRevealedCards.forEach((c, idx) => {
            text += `[${labels[idx]}] ไพ่ “${c.phrase}” — ${c.blessing}\n`;
        });
    }

    text += `\n👉 มาเปิดการ์ดดูดวงขำๆ ได้ที่: ${window.location.origin}${window.location.pathname}?mode=${currentMode}`;

    navigator.clipboard.writeText(text).then(() => {
        showToast("📋 คัดลอกคำทำนายเรียบร้อย! เอาไปแชร์ให้เพื่อนในแชทได้เลย");
    }).catch(() => {
        showToast("คัดลอกข้อความสำเร็จ!");
    });
}

// ============================================================================
// Canvas Text Wrapping Helper
// ============================================================================
function wrapCanvasText(ctx, text, maxWidth) {
    if (!text) return [];
    if (typeof Intl !== "undefined" && Intl.Segmenter) {
        try {
            const segmenter = new Intl.Segmenter("th", { granularity: "word" });
            const words = Array.from(segmenter.segment(text), s => s.segment);
            const lines = [];
            let cur = "";
            for (let w of words) {
                if (ctx.measureText(cur + w).width <= maxWidth) {
                    cur += w;
                } else {
                    if (cur) lines.push(cur);
                    cur = w;
                }
            }
            if (cur) lines.push(cur);
            return lines;
        } catch (e) {}
    }
    const chars = Array.from(text);
    const lines = [];
    let cur = "";
    for (let ch of chars) {
        if (ctx.measureText(cur + ch).width <= maxWidth) {
            cur += ch;
        } else {
            lines.push(cur);
            cur = ch;
        }
    }
    if (cur) lines.push(cur);
    return lines;
}

// ============================================================================
// QR Code Asset Preloader for Card Exports & Modals
// ============================================================================
const qrCodeAsset = new Image();
qrCodeAsset.src = "qrcode.png";

async function ensureQrAssetLoaded() {
    if (qrCodeAsset.complete && qrCodeAsset.naturalWidth > 0) return qrCodeAsset;
    return new Promise((resolve) => {
        qrCodeAsset.onload = () => resolve(qrCodeAsset);
        qrCodeAsset.onerror = () => resolve(null);
        setTimeout(() => resolve(null), 1200);
    });
}

async function downloadSingleCardImage(customCard = null) {
    if (!state.lastRevealedCards || !state.lastRevealedCards.length) return;
    const card = customCard || state.lastRevealedCards[0];
    const friendName = document.getElementById("friendNameInput").value.trim() || "เพื่อนผู้โชคดี";
    const conf = MODE_CONFIG[currentMode];
    const qrImg = await ensureQrAssetLoaded();

    const canvas = document.createElement("canvas");
    canvas.width = 860;
    canvas.height = 910;
    const ctx = canvas.getContext("2d");

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 860, 910);
    bgGrad.addColorStop(0, "#16092b");
    bgGrad.addColorStop(0.5, "#0a0415");
    bgGrad.addColorStop(1, "#210d3c");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 860, 910);

    // Radial Gold Glow
    const radGrad = ctx.createRadialGradient(430, 270, 30, 430, 270, 360);
    radGrad.addColorStop(0, "rgba(229, 193, 88, 0.2)");
    radGrad.addColorStop(1, "rgba(229, 193, 88, 0)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, 860, 910);

    // Double Borders
    ctx.strokeStyle = "#e5c158";
    ctx.lineWidth = 3.5;
    ctx.strokeRect(16, 16, 828, 878);

    ctx.strokeStyle = "rgba(229, 193, 88, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(26, 26, 808, 858);

    // Corner Diamonds
    function drawCornerDiamond(x, y) {
        ctx.fillStyle = "#e5c158";
        ctx.beginPath();
        ctx.moveTo(x, y - 5);
        ctx.lineTo(x + 5, y);
        ctx.lineTo(x, y + 5);
        ctx.lineTo(x - 5, y);
        ctx.closePath();
        ctx.fill();
    }
    drawCornerDiamond(26, 26);
    drawCornerDiamond(834, 26);
    drawCornerDiamond(26, 884);
    drawCornerDiamond(834, 884);

    // Header
    ctx.textAlign = "center";
    ctx.fillStyle = "#fdf0a6";
    ctx.font = "bold 28px 'Cinzel Decorative', Georgia, serif";
    ctx.fillText("DOOSI.BARA • ดูสิ.บาร่า", 430, 68);

    ctx.fillStyle = "#c9bfe3";
    ctx.font = "15.5px 'Prompt', sans-serif";
    ctx.fillText(`${conf.title} • คำทำนายแด่: ${friendName}`, 430, 98);

    // Roman & Tone
    ctx.fillStyle = "#e5c158";
    ctx.font = "bold 16px Georgia, serif";
    ctx.fillText(card.roman, 430, 134);

    const toneInfo = card.tone === "positive" ? { text: "🟢 พลังบวก", color: "#7bed9f" }
                   : card.tone === "neutral" ? { text: "🟡 พลังกลาง", color: "#ffeaa7" }
                   : { text: "🔴 พลังลบ", color: "#ff7f8a" };
    ctx.fillStyle = toneInfo.color;
    ctx.font = "bold 13px 'Prompt', sans-serif";
    ctx.fillText(toneInfo.text, 430, 153);

    // Seal Crest
    const sealY = 224;
    ctx.beginPath();
    ctx.arc(430, sealY, 56, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(28, 13, 56, 0.92)";
    ctx.fill();
    ctx.strokeStyle = "#e5c158";
    ctx.lineWidth = 2.2;
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(430, sealY, 50, 0, Math.PI * 2);
    ctx.strokeStyle = "rgba(229, 193, 88, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Phrase inside Seal
    ctx.fillStyle = "#fdf0a6";
    const displayPhrase = card.phrase.replace(/^[“"']+|[”"']+$/g, '');
    let fontSize = 30;
    ctx.font = `bold ${fontSize}px 'Prompt', sans-serif`;
    while (ctx.measureText(displayPhrase).width > 90 && fontSize > 16) {
        fontSize -= 2;
        ctx.font = `bold ${fontSize}px 'Prompt', sans-serif`;
    }
    ctx.fillText(displayPhrase, 430, sealY + (fontSize * 0.36));

    // English Title & Power Tag
    ctx.fillStyle = "#ffb8e4";
    ctx.font = "italic 14.5px Georgia, serif";
    ctx.fillText(card.engTitle, 430, 303);

    ctx.fillStyle = "#bbaed6";
    ctx.font = "13px 'Prompt', sans-serif";
    ctx.fillText(`✦ ${card.powerTag}`, 430, 323);

    // Divider
    ctx.beginPath();
    ctx.moveTo(80, 338);
    ctx.lineTo(780, 338);
    ctx.strokeStyle = "rgba(229, 193, 88, 0.35)";
    ctx.lineWidth = 1;
    ctx.stroke();

    // Text Blocks
    ctx.textAlign = "left";
    function drawSingleBlock(title, body, startY, titleColor) {
        ctx.fillStyle = titleColor;
        ctx.font = "bold 16px 'Prompt', sans-serif";
        ctx.fillText(title, 80, startY);

        ctx.fillStyle = "#f6f2fc";
        ctx.font = "14.5px 'Prompt', sans-serif";
        const lines = wrapCanvasText(ctx, body, 700);
        let y = startY + 22;
        lines.forEach(l => {
            ctx.fillText(l, 80, y);
            y += 21;
        });
        return y + 8;
    }

    let curY = 368;
    curY = drawSingleBlock("😂 คำจำกัดความจากจักรวาล:", card.funnyMeaning, curY, "#ff9de2");
    curY = drawSingleBlock("🔮 คำทำนายที่พอเป็นไปได้:", card.realisticProphecy, curY, "#5ce1e6");
    curY = drawSingleBlock("✨ คำอวยพรประจำการ์ด:", `“${card.blessing}”`, curY, "#fdf0a6");

    // Lucky Stats Capsule Box
    const luckyBoxY = curY + 6;
    ctx.fillStyle = "rgba(229, 193, 88, 0.08)";
    ctx.fillRect(70, luckyBoxY, 720, 64);
    ctx.strokeStyle = "rgba(229, 193, 88, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(70, luckyBoxY, 720, 64);

    ctx.textAlign = "center";
    ctx.font = "14px 'Prompt', sans-serif";
    
    ctx.fillStyle = "#fdf0a6";
    ctx.fillText(`🎨 สีมงคล: ${card.luckyColor}     •     🧿 ไอเทม: ${card.luckyItem}`, 430, luckyBoxY + 26);

    ctx.fillStyle = "#7bed9f";
    ctx.fillText(`🔢 เลขมงคลประจำดวง 2026: ${card.luckyNumber}`, 430, luckyBoxY + 49);

    // Footer with QR Code Container
    const footerY = luckyBoxY + 76;
    ctx.fillStyle = "rgba(10, 4, 20, 0.78)";
    ctx.fillRect(70, footerY, 720, 102);
    ctx.strokeStyle = "rgba(229, 193, 88, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(70, footerY, 720, 102);

    if (qrImg) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(694, footerY + 7, 88, 88);
        ctx.drawImage(qrImg, 694, footerY + 7, 88, 88);
    }

    ctx.textAlign = "left";
    ctx.fillStyle = "#fdf0a6";
    ctx.font = "bold 15px 'Prompt', sans-serif";
    ctx.fillText("📱 สแกน QR Code เปิดไพ่ชะตาของคุณได้ที่นี่ (เล่นฟรี!) ➔", 88, footerY + 30);

    ctx.fillStyle = "#c9bfe3";
    ctx.font = "13px 'Prompt', sans-serif";
    ctx.fillText("🔮 DooSi.BaRa — สำนักไพ่ทาโรต์สายมีม 2026 (3 หมวดจัดเต็ม 84 ใบ)", 88, footerY + 56);

    ctx.fillStyle = "#9f93ba";
    ctx.font = "12px 'Prompt', sans-serif";
    ctx.fillText("🔗 thanabara.github.io/DooSi  •  ดวงนี้ขึ้นอยู่กับนิ้วที่เพื่อนจิ้มล้วนๆ", 88, footerY + 80);

    const link = document.createElement("a");
    link.download = `DooSiBaRa-${card.id}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    showToast(`📸 บันทึกรูปการ์ด “${card.phrase}” พร้อม QR Code เรียบร้อย!`);
}

async function downloadThreeCardsImage() {
    if (!state.lastRevealedCards || state.lastRevealedCards.length < 3) return;
    const cards = state.lastRevealedCards.slice(0, 3);
    const friendName = document.getElementById("friendNameInput").value.trim() || "เพื่อนผู้โชคดี";
    const conf = MODE_CONFIG[currentMode];
    const qrImg = await ensureQrAssetLoaded();

    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 770;
    const ctx = canvas.getContext("2d");

    // Background Gradient
    const bgGrad = ctx.createLinearGradient(0, 0, 1200, 770);
    bgGrad.addColorStop(0, "#15082a");
    bgGrad.addColorStop(0.5, "#090314");
    bgGrad.addColorStop(1, "#1c0b33");
    ctx.fillStyle = bgGrad;
    ctx.fillRect(0, 0, 1200, 770);

    // Subtle Gold Glow Center
    const radGrad = ctx.createRadialGradient(600, 350, 40, 600, 350, 450);
    radGrad.addColorStop(0, "rgba(229, 193, 88, 0.18)");
    radGrad.addColorStop(1, "rgba(229, 193, 88, 0)");
    ctx.fillStyle = radGrad;
    ctx.fillRect(0, 0, 1200, 770);

    // Double Golden Border
    ctx.strokeStyle = "#e5c158";
    ctx.lineWidth = 3.5;
    ctx.strokeRect(16, 16, 1168, 738);

    ctx.strokeStyle = "rgba(229, 193, 88, 0.4)";
    ctx.lineWidth = 1.5;
    ctx.strokeRect(26, 26, 1148, 718);

    function drawCornerDiamond(x, y) {
        ctx.fillStyle = "#e5c158";
        ctx.beginPath();
        ctx.moveTo(x, y - 5);
        ctx.lineTo(x + 5, y);
        ctx.lineTo(x, y + 5);
        ctx.lineTo(x - 5, y);
        ctx.closePath();
        ctx.fill();
    }
    drawCornerDiamond(26, 26);
    drawCornerDiamond(1174, 26);
    drawCornerDiamond(26, 744);
    drawCornerDiamond(1174, 744);

    // Global Header
    ctx.textAlign = "center";
    ctx.fillStyle = "#fdf0a6";
    ctx.font = "bold 26px 'Cinzel Decorative', Georgia, serif";
    ctx.fillText("DOOSI.BARA • ดูสิ.บาร่า", 600, 58);

    ctx.fillStyle = "#e5c158";
    ctx.font = "bold 15px 'Prompt', sans-serif";
    ctx.fillText("✦ คำทำนาย 3 กาลเวลา (อดีต • ปัจจุบัน • อนาคต) ✦", 600, 84);

    ctx.fillStyle = "#c9bfe3";
    ctx.font = "13.5px 'Prompt', sans-serif";
    ctx.fillText(`${conf.title} • บันทึกชะตาแด่: ${friendName}`, 600, 107);

    // Separator line
    ctx.beginPath();
    ctx.moveTo(60, 120);
    ctx.lineTo(1140, 120);
    ctx.strokeStyle = "rgba(229, 193, 88, 0.35)";
    ctx.lineWidth = 1.2;
    ctx.stroke();

    // 3 Columns Sizing
    const positions = [
        { label: "⏪ 1. อดีต (THE PAST)", color: "#a6e3e9", bg: "rgba(92, 225, 230, 0.15)" },
        { label: "⚡ 2. ปัจจุบัน (THE PRESENT)", color: "#fdf0a6", bg: "rgba(229, 193, 88, 0.18)" },
        { label: "⏩ 3. อนาคต (THE FUTURE)", color: "#ffb8e4", bg: "rgba(255, 110, 199, 0.15)" }
    ];

    const colWidth = 348;
    const colStarts = [56, 426, 796];
    const colY = 134;
    const colHeight = 490;

    cards.forEach((card, idx) => {
        const x = colStarts[idx];
        const center = x + colWidth / 2;
        const pos = positions[idx];

        // Column Background Box
        ctx.fillStyle = "rgba(18, 9, 36, 0.94)";
        ctx.fillRect(x, colY, colWidth, colHeight);

        // Column Border
        ctx.strokeStyle = "rgba(229, 193, 88, 0.55)";
        ctx.lineWidth = 1.8;
        ctx.strokeRect(x, colY, colWidth, colHeight);

        // Inner fine border
        ctx.strokeStyle = "rgba(229, 193, 88, 0.18)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 5, colY + 5, colWidth - 10, colHeight - 10);

        // 1. Position Badge Header
        ctx.fillStyle = pos.bg;
        ctx.fillRect(x + 8, colY + 8, colWidth - 16, 26);
        ctx.strokeStyle = pos.color;
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 8, colY + 8, colWidth - 16, 26);

        ctx.textAlign = "center";
        ctx.fillStyle = pos.color;
        ctx.font = "bold 13px 'Prompt', sans-serif";
        ctx.fillText(pos.label, center, colY + 25);

        // 2. Roman Numeral & Tone Tag
        ctx.fillStyle = "#e5c158";
        ctx.font = "bold 13.5px Georgia, serif";
        ctx.fillText(card.roman, center, colY + 49);

        const toneInfo = card.tone === "positive" ? { text: "🟢 พลังบวก", color: "#7bed9f" }
                       : card.tone === "neutral" ? { text: "🟡 พลังกลาง", color: "#ffeaa7" }
                       : { text: "🔴 พลังลบ", color: "#ff7f8a" };

        ctx.fillStyle = toneInfo.color;
        ctx.font = "bold 12px 'Prompt', sans-serif";
        ctx.fillText(toneInfo.text, center, colY + 66);

        // 3. Central Circular Seal
        const crestCenterY = colY + 116;
        ctx.beginPath();
        ctx.arc(center, crestCenterY, 40, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(26, 12, 52, 0.9)";
        ctx.fill();
        ctx.strokeStyle = "#e5c158";
        ctx.lineWidth = 1.8;
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(center, crestCenterY, 36, 0, Math.PI * 2);
        ctx.strokeStyle = "rgba(229, 193, 88, 0.35)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // Phrase inside Seal with Auto Font Scaling
        ctx.fillStyle = "#fdf0a6";
        const displayPhrase = card.phrase.replace(/^[“"']+|[”"']+$/g, '');
        let fontSize = 21;
        ctx.font = `bold ${fontSize}px 'Prompt', sans-serif`;
        while (ctx.measureText(displayPhrase).width > 70 && fontSize > 13) {
            fontSize -= 1;
            ctx.font = `bold ${fontSize}px 'Prompt', sans-serif`;
        }

        const measuredW = ctx.measureText(displayPhrase).width;
        if (measuredW <= 70) {
            ctx.fillText(displayPhrase, center, crestCenterY + (fontSize * 0.36));
        } else {
            const lines = wrapCanvasText(ctx, displayPhrase, 68);
            let startY = crestCenterY - ((lines.length - 1) * (fontSize * 0.55));
            lines.forEach(l => {
                ctx.fillText(l, center, startY + (fontSize * 0.36));
                startY += fontSize * 1.15;
            });
        }

        // English Title & Power Tag
        ctx.fillStyle = "#ffb8e4";
        ctx.font = "italic 11.5px Georgia, serif";
        ctx.fillText(card.engTitle, center, colY + 170);

        ctx.fillStyle = "#c9bfe3";
        ctx.font = "11px 'Prompt', sans-serif";
        ctx.fillText(`✦ ${card.powerTag}`, center, colY + 185);

        // Dividing Line
        ctx.beginPath();
        ctx.moveTo(x + 16, colY + 195);
        ctx.lineTo(x + colWidth - 16, colY + 195);
        ctx.strokeStyle = "rgba(229, 193, 88, 0.3)";
        ctx.lineWidth = 1;
        ctx.stroke();

        // 4. Text Blocks
        ctx.textAlign = "left";
        const textX = x + 16;
        const textW = colWidth - 32;

        function drawBlock(title, body, startY, titleColor) {
            ctx.fillStyle = titleColor;
            ctx.font = "bold 13px 'Prompt', sans-serif";
            ctx.fillText(title, textX, startY);

            ctx.fillStyle = "#f6f2fc";
            ctx.font = "12.5px 'Prompt', sans-serif";
            const lines = wrapCanvasText(ctx, body, textW);
            let y = startY + 17;
            const showLines = lines.slice(0, 3);
            showLines.forEach(l => {
                ctx.fillText(l, textX, y);
                y += 17.5;
            });
            return y + 6;
        }

        let curY = colY + 211;
        curY = drawBlock("😂 ความหมาย:", card.funnyMeaning, curY, "#ff9de2");
        curY = drawBlock("🔮 คำทำนาย:", card.realisticProphecy, curY, "#5ce1e6");
        curY = drawBlock("✨ คำอวยพร:", `“${card.blessing}”`, curY, "#fdf0a6");

        // 5. Lucky Stats Capsule Box
        const luckyBoxY = colY + colHeight - 74;
        ctx.fillStyle = "rgba(229, 193, 88, 0.08)";
        ctx.fillRect(x + 10, luckyBoxY, colWidth - 20, 64);
        ctx.strokeStyle = "rgba(229, 193, 88, 0.35)";
        ctx.lineWidth = 1;
        ctx.strokeRect(x + 10, luckyBoxY, colWidth - 20, 64);

        ctx.textAlign = "center";
        ctx.font = "12px 'Prompt', sans-serif";
        
        ctx.fillStyle = "#fdf0a6";
        ctx.fillText(`🎨 สีมงคล: ${card.luckyColor}`, center, luckyBoxY + 19);

        ctx.fillStyle = "#ffb8e4";
        ctx.fillText(`🧿 ไอเทม: ${card.luckyItem}`, center, luckyBoxY + 38);

        ctx.fillStyle = "#7bed9f";
        ctx.fillText(`🔢 เลขมงคล: ${card.luckyNumber}`, center, luckyBoxY + 56);
    });

    // Global Footer with QR Code Container
    const footerY = 650;
    ctx.fillStyle = "rgba(10, 4, 20, 0.78)";
    ctx.fillRect(60, footerY, 1080, 84);
    ctx.strokeStyle = "rgba(229, 193, 88, 0.35)";
    ctx.lineWidth = 1;
    ctx.strokeRect(60, footerY, 1080, 84);

    if (qrImg) {
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(1058, footerY + 5, 74, 74);
        ctx.drawImage(qrImg, 1058, footerY + 5, 74, 74);
    }

    ctx.textAlign = "left";
    ctx.fillStyle = "#fdf0a6";
    ctx.font = "bold 15px 'Prompt', sans-serif";
    ctx.fillText("📱 สแกน QR Code เปิดไพ่ 3 กาลเวลาของคุณเองได้ที่นี่ (เล่นฟรี!) ➔", 84, footerY + 28);

    ctx.fillStyle = "#c9bfe3";
    ctx.font = "12.5px 'Prompt', sans-serif";
    ctx.fillText("🔮 DooSi.BaRa — สำนักไพ่ทาโรต์สายมีม 2026 • thanabara.github.io/DooSi (ดวงนี้ขึ้นอยู่กับนิ้วที่เพื่อนจิ้มล้วนๆ)", 84, footerY + 54);

    const link = document.createElement("a");
    link.download = `DooSiBaRa-3Cards-${Date.now()}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();

    showToast("📸 บันทึกรูปการ์ดคำทำนาย 3 ใบพร้อม QR Code เรียบร้อย! ส่งให้เพื่อนได้เลย");
}

function downloadCardImage(cardIndex = null) {
    if (!state.lastRevealedCards || !state.lastRevealedCards.length) return;
    if (state.lastRevealedCards.length === 3 && cardIndex === null) {
        downloadThreeCardsImage();
    } else {
        const idx = typeof cardIndex === "number" ? cardIndex : 0;
        downloadSingleCardImage(state.lastRevealedCards[idx]);
    }
}

// ============================================================================
// Gallery Modal
// ============================================================================
function openGalleryModal() {
    const modal = document.getElementById("galleryModal");
    const container = document.getElementById("galleryGridContainer");
    const conf = MODE_CONFIG[currentMode];

    document.getElementById("galleryModalTitle").textContent = `🃏 ไพ่ทั้งหมดใน ${conf.title} (${state.cards.length} ใบ)`;
    container.innerHTML = state.cards.map(card => `
        <div class="gallery-mini-card" onclick="previewSpecificCard('${card.id}')">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.25rem; margin-bottom:0.25rem;">
                <span style="font-size:0.68rem; color:var(--gold-primary); font-family:'Cinzel Decorative',serif;">${card.roman.split('•')[0]}</span>
                ${getToneBadgeHtml(card.tone)}
            </div>
            <h4>“${escapeHtml(card.phrase)}”</h4>
            <p>${escapeHtml(card.funnyMeaning)}</p>
        </div>
    `).join("");

    modal.classList.add("open");
}

function previewSpecificCard(cardId) {
    const cardObj = state.cards.find(c => c.id === cardId);
    if (!cardObj) return;

    document.getElementById("galleryModal").classList.remove("open");
    state.spreadMode = 1;
    updateModeTabUI();

    const idx = state.shuffledDeck.findIndex(c => c.id === cardId);
    if (idx !== -1) {
        state.selectedIndices = [idx];
    } else {
        state.shuffledDeck[0] = cardObj;
        state.selectedIndices = [0];
    }
    sound.playFlip();
    revealReading();
}

// ============================================================================
// Starfield Background
// ============================================================================
function initStarfield() {
    const canvas = document.getElementById("starfield");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let width, height, stars = [];

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        stars = Array.from({ length: 95 }, () => ({
            x: Math.random() * width,
            y: Math.random() * height,
            r: Math.random() * 1.8 + 0.4,
            alpha: Math.random(),
            speed: (Math.random() * 0.015 + 0.004) * (Math.random() < 0.5 ? 1 : -1),
            gold: Math.random() < 0.35
        }));
    }

    function draw() {
        ctx.clearRect(0, 0, width, height);
        for (const s of stars) {
            s.alpha += s.speed;
            if (s.alpha <= 0.15 || s.alpha >= 0.95) s.speed *= -1;
            ctx.beginPath();
            ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
            ctx.fillStyle = s.gold
                ? `rgba(243, 212, 112, ${s.alpha})`
                : `rgba(235, 225, 255, ${s.alpha})`;
            ctx.fill();
        }
        requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    resize();
    draw();
}

function escapeHtml(str) {
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

let toastTimer = null;
function showToast(msg) {
    const toast = document.getElementById("mysticToast");
    toast.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.remove("show");
    }, 3200);
}

function updateModeTabUI() {
    document.querySelectorAll(".mode-tab").forEach(btn => {
        const mode = Number(btn.dataset.mode);
        btn.classList.toggle("active", mode === state.spreadMode);
    });
}

// ============================================================================
// DOM Ready
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
    initStarfield();

    // Check mode from URL (e.g. ?mode=love or ?mode=money or ?mode=general)
    const urlParams = new URLSearchParams(window.location.search);
    const modeFromUrl = urlParams.get("mode") || "general";
    setMode(modeFromUrl);

    // Initialize View Mode (default to fan ribbon, seamless on mobile)
    setViewMode("fan");
    initFanDragAndScroll();

    document.querySelectorAll(".view-pill").forEach(btn => {
        btn.addEventListener("click", () => {
            setViewMode(btn.dataset.view);
        });
    });

    // Mode Switcher buttons
    document.querySelectorAll(".mode-pill-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const targetMode = btn.dataset.targetMode;
            setMode(targetMode);
            // Update URL without full page reload
            const newUrl = `${window.location.pathname}?mode=${targetMode}`;
            window.history.pushState({ path: newUrl }, "", newUrl);
        });
    });

    // Spread mode tabs (1 vs 3 cards)
    document.querySelectorAll(".mode-tab").forEach(btn => {
        btn.addEventListener("click", () => {
            state.spreadMode = Number(btn.dataset.mode);
            updateModeTabUI();
            shuffleAndDeal(true);
        });
    });

    // Shuffle button
    document.getElementById("btnShuffleDeck").addEventListener("click", () => {
        shuffleAndDeal(true);
        showToast("🔀 สับไพ่แห่งโชคชะตาใหม่เรียบร้อย!");
    });

    // Instant Random Draw
    document.getElementById("btnQuickDraw").addEventListener("click", () => {
        state.selectedIndices = [];
        const slots = document.querySelectorAll(".deck-card-slot");
        const indices = shuffleArray(Array.from({ length: slots.length }, (_, i) => i)).slice(0, state.spreadMode);
        indices.forEach(idx => handleCardPick(idx, slots[idx]));
    });

    // Friend name live prompt
    document.getElementById("friendNameInput").addEventListener("input", updateOraclePrompt);

    // Sound toggle (desktop & mobile)
    sound.updateUi();
    const soundBtn = document.getElementById("btnToggleSound");
    if (soundBtn) {
        soundBtn.addEventListener("click", () => {
            sound.toggleSound();
        });
    }
    const soundBtnMobile = document.getElementById("btnToggleSoundMobile");
    if (soundBtnMobile) {
        soundBtnMobile.addEventListener("click", () => {
            sound.toggleSound();
        });
    }

    // Mobile Hamburger Dropdown Toggle
    const btnNavToggle = document.getElementById("btnNavToggle");
    const navMobileDropdown = document.getElementById("navMobileDropdown");
    if (btnNavToggle && navMobileDropdown) {
        btnNavToggle.addEventListener("click", (e) => {
            e.stopPropagation();
            const isOpen = navMobileDropdown.classList.toggle("open");
            btnNavToggle.classList.toggle("open", isOpen);
            btnNavToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
        });
        document.addEventListener("click", (e) => {
            if (!navMobileDropdown.contains(e.target) && !btnNavToggle.contains(e.target)) {
                navMobileDropdown.classList.remove("open");
                btnNavToggle.classList.remove("open");
                btnNavToggle.setAttribute("aria-expanded", "false");
            }
        });
    }

    // Gallery modal (desktop & mobile)
    const btnOpenGallery = document.getElementById("btnOpenGallery");
    if (btnOpenGallery) {
        btnOpenGallery.addEventListener("click", openGalleryModal);
    }
    const btnOpenGalleryMobile = document.getElementById("btnOpenGalleryMobile");
    if (btnOpenGalleryMobile) {
        btnOpenGalleryMobile.addEventListener("click", () => {
            if (navMobileDropdown) {
                navMobileDropdown.classList.remove("open");
                btnNavToggle?.classList.remove("open");
                btnNavToggle?.setAttribute("aria-expanded", "false");
            }
            openGalleryModal();
        });
    }

    // QR Code Modal (desktop & mobile)
    const btnOpenQrModal = document.getElementById("btnOpenQrModal");
    const btnOpenQrModalMobile = document.getElementById("btnOpenQrModalMobile");
    const qrModal = document.getElementById("qrModal");
    if (btnOpenQrModal && qrModal) {
        btnOpenQrModal.addEventListener("click", () => qrModal.classList.add("open"));
    }
    if (btnOpenQrModalMobile && qrModal) {
        btnOpenQrModalMobile.addEventListener("click", () => {
            if (navMobileDropdown) {
                navMobileDropdown.classList.remove("open");
                btnNavToggle?.classList.remove("open");
                btnNavToggle?.setAttribute("aria-expanded", "false");
            }
            qrModal.classList.add("open");
        });
    }

    // Close mobile dropdown when mode pill in dropdown is clicked
    document.querySelectorAll(".dropdown-item.mode-pill-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            if (navMobileDropdown) {
                navMobileDropdown.classList.remove("open");
                btnNavToggle?.classList.remove("open");
                btnNavToggle?.setAttribute("aria-expanded", "false");
            }
        });
    });

    // Close modals on backdrop click
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
        backdrop.addEventListener("click", (e) => {
            if (e.target === backdrop) backdrop.classList.remove("open");
        });
    });

    // Session heartbeat in reading chamber
    let readingSessionId = sessionStorage.getItem("doosi_session_id");
    if (!readingSessionId) {
        readingSessionId = "sess_" + Math.random().toString(36).slice(2, 10) + "_" + Date.now().toString(36);
        sessionStorage.setItem("doosi_session_id", readingSessionId);
    }
    fetch(`api/counter.php?action=ping&session=${encodeURIComponent(readingSessionId)}`).catch(() => {});
    setInterval(() => {
        fetch(`api/counter.php?action=ping&session=${encodeURIComponent(readingSessionId)}`).catch(() => {});
    }, 25000);
});
