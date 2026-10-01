// ============================================================================
// DooSi.BaRa — Dashboard Controller (index.html)
// ============================================================================

class DashboardSoundEngine {
    constructor() {
        this.ctx = null;
        this.soundEnabled = localStorage.getItem("doosi_sound_enabled") !== "false";
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

        // On first user interaction, play BGM if enabled
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
        const btn = document.getElementById("btnToggleSound");
        if (!btn) return;
        if (this.soundEnabled) {
            btn.innerHTML = `<span class="bgm-wave-anim">🎶</span> เพลงบรรยากาศ: เปิด`;
            btn.classList.add("sound-active");
        } else {
            btn.innerHTML = `🔇 เพลงบรรยากาศ: ปิด`;
            btn.classList.remove("sound-active");
        }
    }
    playChime(freq = 587.33, type = "sine", duration = 0.3) {
        if (!this.soundEnabled) return;
        try {
            this.initCtx();
            if (!this.ctx) return;
            const now = this.ctx.currentTime;
            const osc = this.ctx.createOscillator();
            const gain = this.ctx.createGain();
            osc.type = type;
            osc.frequency.setValueAtTime(freq, now);
            gain.gain.setValueAtTime(0.06, now);
            gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);
            osc.connect(gain);
            gain.connect(this.ctx.destination);
            osc.start(now);
            osc.stop(now + duration);
        } catch (e) {
            // Audio context policy
        }
    }
    playPortalHover() {
        this.playChime(440, "sine", 0.15);
    }
    playPortalClick() {
        this.playChime(659.25, "triangle", 0.4);
        setTimeout(() => this.playChime(880, "sine", 0.5), 100);
    }
}

const dashboardSound = new DashboardSoundEngine();

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

// ============================================================================
// Stats & Counter Initialization
// ============================================================================
function initStats() {
    const generalCount = typeof GENERAL_DECK !== "undefined" ? GENERAL_DECK.length : 56;
    const loveCount = typeof LOVE_DECK !== "undefined" ? LOVE_DECK.length : 16;
    const moneyCount = typeof MONEY_DECK !== "undefined" ? MONEY_DECK.length : 12;
    const totalCount = generalCount + loveCount + moneyCount;

    const elTotal = document.getElementById("statTotalCards");
    const elGeneral = document.getElementById("statGeneralCards");
    const elLove = document.getElementById("statLoveCards");
    const elMoney = document.getElementById("statMoneyCards");

    if (elTotal) elTotal.textContent = `${totalCount}+`;
    if (elGeneral) elGeneral.textContent = `${generalCount} ใบ`;
    if (elLove) elLove.textContent = `${loveCount} ใบ`;
    if (elMoney) elMoney.textContent = `${moneyCount} ใบ`;
}

// ============================================================================
// Real-Time Player & Reading Counter
// ============================================================================
function initPlayerCounter() {
    function animateCount(elem, targetVal, duration = 1000, isFormatted = true) {
        if (!elem) return;
        const target = Number(targetVal) || 0;
        if (target <= 0) {
            elem.textContent = "0";
            return;
        }
        const startVal = Math.max(0, Math.floor(target * 0.5));
        const startTime = performance.now();
        function frame(now) {
            const progress = Math.min((now - startTime) / duration, 1);
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const val = Math.floor(startVal + (target - startVal) * easeOut);
            elem.textContent = isFormatted ? val.toLocaleString("en-US") : val;
            if (progress < 1) {
                requestAnimationFrame(frame);
            } else {
                elem.textContent = isFormatted ? target.toLocaleString("en-US") : target;
            }
        }
        requestAnimationFrame(frame);
    }

    // Get or create unique session ID for current browser tab/session
    let sessionId = sessionStorage.getItem("doosi_session_id");
    let isNewSession = false;
    if (!sessionId) {
        sessionId = "sess_" + Math.random().toString(36).slice(2, 10) + "_" + Date.now().toString(36);
        sessionStorage.setItem("doosi_session_id", sessionId);
        isNewSession = true;
    }

    const action = isNewSession ? "visit" : "ping";
    fetch(`api/counter.php?action=${action}&session=${encodeURIComponent(sessionId)}`)
        .then(r => r.json())
        .then(data => {
            if (data && data.status === "ok") {
                const total = data.total_readings ?? 0;
                const today = data.today_readings ?? 0;
                const online = data.online_now ?? 1;

                animateCount(document.getElementById("liveOnlineCount"), online, 600, false);
                animateCount(document.getElementById("liveTotalReadings"), total, 800, true);
                animateCount(document.getElementById("liveTodayReadings"), today, 800, true);

                const elStatPlayer = document.getElementById("statPlayerCount");
                if (elStatPlayer) {
                    elStatPlayer.textContent = total > 0 ? `${total.toLocaleString("en-US")} ครั้ง` : "0 ครั้ง";
                }
            }
        })
        .catch(() => {
            // Local zero-based fallback
            const elOnline = document.getElementById("liveOnlineCount");
            const elTotal = document.getElementById("liveTotalReadings");
            const elToday = document.getElementById("liveTodayReadings");
            const elStat = document.getElementById("statPlayerCount");
            if (elOnline) elOnline.textContent = "1";
            if (elTotal) elTotal.textContent = "0";
            if (elToday) elToday.textContent = "0";
            if (elStat) elStat.textContent = "0 ครั้ง";
        });

    // Auto-heartbeat and refresh online users every 25 seconds
    setInterval(() => {
        fetch(`api/counter.php?action=ping&session=${encodeURIComponent(sessionId)}`)
            .then(r => r.json())
            .then(data => {
                if (data && data.status === "ok") {
                    const elOnline = document.getElementById("liveOnlineCount");
                    if (elOnline) elOnline.textContent = data.online_now ?? 1;

                    const elTotal = document.getElementById("liveTotalReadings");
                    if (elTotal && data.total_readings !== undefined) {
                        elTotal.textContent = Number(data.total_readings).toLocaleString("en-US");
                    }
                    const elToday = document.getElementById("liveTodayReadings");
                    if (elToday && data.today_readings !== undefined) {
                        elToday.textContent = Number(data.today_readings).toLocaleString("en-US");
                    }
                    const elStat = document.getElementById("statPlayerCount");
                    if (elStat && data.total_readings !== undefined) {
                        elStat.textContent = data.total_readings > 0 ? `${Number(data.total_readings).toLocaleString("en-US")} ครั้ง` : "0 ครั้ง";
                    }
                }
            })
            .catch(() => {});
    }, 25000);
}

// ============================================================================
// All-Cards Master Gallery Modal with Search & Tone Filter
// ============================================================================
let galleryActiveFilter = "all";
let galleryToneFilter = "all";
let gallerySearchQuery = "";

function getAllCards() {
    const cards = [];
    if (typeof GENERAL_DECK !== "undefined") {
        GENERAL_DECK.forEach(c => cards.push({ ...c, modeCategory: "general", modeName: "ทั่วไป" }));
    }
    if (typeof LOVE_DECK !== "undefined") {
        LOVE_DECK.forEach(c => cards.push({ ...c, modeCategory: "love", modeName: "ความรัก" }));
    }
    if (typeof MONEY_DECK !== "undefined") {
        MONEY_DECK.forEach(c => cards.push({ ...c, modeCategory: "money", modeName: "การเงิน" }));
    }
    return cards;
}

function getToneBadgeHtml(tone) {
    if (tone === "positive") {
        return '<span class="card-tone-badge tone-positive">🟢 พลังบวก</span>';
    } else if (tone === "neutral") {
        return '<span class="card-tone-badge tone-neutral">🟡 พลังกลาง</span>';
    } else if (tone === "negative") {
        return '<span class="card-tone-badge tone-negative">🔴 พลังลบ</span>';
    }
    return "";
}

function renderGalleryCards() {
    const container = document.getElementById("galleryGridContainer");
    if (!container) return;

    const allCards = getAllCards();
    const filtered = allCards.filter(card => {
        // Mode filter
        if (galleryActiveFilter !== "all" && card.modeCategory !== galleryActiveFilter) {
            return false;
        }
        // Tone filter
        if (galleryToneFilter !== "all" && card.tone !== galleryToneFilter) {
            return false;
        }
        // Search query
        if (gallerySearchQuery) {
            const q = gallerySearchQuery.toLowerCase();
            const text = (card.phrase + " " + card.meaning + " " + card.funnyMeaning + " " + card.realisticProphecy).toLowerCase();
            if (!text.includes(q)) return false;
        }
        return true;
    });

    document.getElementById("galleryCountBadge").textContent = `แสดง ${filtered.length} จาก ${allCards.length} ใบ`;

    if (filtered.length === 0) {
        container.innerHTML = `
            <div style="grid-column: 1 / -1; text-align:center; padding:3rem 1rem; color:var(--text-muted);">
                <div style="font-size:2.5rem; margin-bottom:0.6rem;">🔍</div>
                <p>ไม่พบไพ่ที่ตรงกับคำค้นหา ลองพิมพ์คำอื่นหรือเลือกฟิลเตอร์ใหม่</p>
            </div>
        `;
        return;
    }

    container.innerHTML = filtered.map(card => `
        <div class="gallery-mini-card" onclick="openCardPreviewModal('${card.id}', '${card.modeCategory}')">
            <div style="display:flex; justify-content:space-between; align-items:center; gap:0.35rem; margin-bottom:0.35rem;">
                <span style="font-size:0.72rem; color:var(--gold-primary); font-weight:600; font-family:'Cinzel Decorative',serif;">
                    ${escapeHtml(card.roman.split('•')[0])}
                </span>
                ${getToneBadgeHtml(card.tone)}
            </div>
            <h4>“${escapeHtml(card.phrase)}”</h4>
            <div style="display:inline-block; font-size:0.72rem; padding:0.15rem 0.5rem; border-radius:999px; margin-bottom:0.4rem; background:rgba(229,193,88,0.12); color:var(--gold-light);">
                หมวด${escapeHtml(card.modeName)}
            </div>
            <p>${escapeHtml(card.meaning || card.funnyMeaning)}</p>
        </div>
    `).join("");
}

function openCardPreviewModal(cardId, modeCategory) {
    const allCards = getAllCards();
    const card = allCards.find(c => c.id === cardId && c.modeCategory === modeCategory);
    if (!card) return;

    dashboardSound.playChime(523.25, "sine", 0.25);

    const previewModal = document.getElementById("cardDetailModal");
    const previewContent = document.getElementById("cardDetailContent");

    const toneText = card.tone === "positive" ? "🟢 พลังงานบวก (สายอวยยศ & ปังปุริเย่)"
                   : card.tone === "neutral" ? "🟡 พลังงานกลาง (สายเตือนสติ & ดึงสติ)"
                   : "🔴 พลังงานลบ (สายแกงเพื่อน & สู้กลับ)";

    previewContent.innerHTML = `
        <div style="text-align:center; margin-bottom:1.5rem;">
            <div style="margin-bottom:0.6rem;">${getToneBadgeHtml(card.tone)}</div>
            <h2 style="font-size:clamp(1.6rem, 4vw, 2.2rem); color:var(--gold-light); margin-bottom:0.3rem;">“${escapeHtml(card.phrase)}”</h2>
            <div style="font-family:'Cinzel Decorative',serif; color:var(--purple-neon); font-size:0.95rem;">${escapeHtml(card.titleEng)} • ${escapeHtml(card.roman)}</div>
            <div style="margin-top:0.4rem; font-size:0.85rem; color:var(--text-muted);">ไพ่ประจำหมวด: <strong>${escapeHtml(card.modeName)}</strong></div>
        </div>

        <div class="prophecy-box funny-lore" style="margin-bottom:1rem;">
            <div class="box-label">😂 ความหมาย & คำจำกัดความจากจักรวาล</div>
            <p>${escapeHtml(card.funnyMeaning)}</p>
        </div>

        <div class="prophecy-box real-prediction" style="margin-bottom:1rem;">
            <div class="box-label">🔮 คำทำนายที่พอเป็นไปได้</div>
            <p>${escapeHtml(card.realisticProphecy)}</p>
        </div>

        <div class="prophecy-box blessing-box" style="margin-bottom:1.2rem;">
            <div class="box-label">✨ คำอวยพรประจำการ์ด</div>
            <p style="font-weight:600; color:var(--gold-light);">“${escapeHtml(card.blessing)}”</p>
        </div>

        <div class="lucky-stats-grid" style="margin-bottom:1.5rem;">
            <div class="lucky-stat-card">
                <span class="lucky-stat-label">🎨 สีมงคลเสริมชะตา</span>
                <span class="lucky-stat-value">${escapeHtml(card.luckyColor)}</span>
            </div>
            <div class="lucky-stat-card">
                <span class="lucky-stat-label">🔢 เลขมงคลจักรวาล</span>
                <span class="lucky-stat-value">${escapeHtml(card.luckyNumber)}</span>
            </div>
            <div class="lucky-stat-card">
                <span class="lucky-stat-label">⚡ ระดับพลังงาน</span>
                <span class="lucky-stat-value" style="font-size:0.85rem;">${escapeHtml(toneText)}</span>
            </div>
        </div>

        <div style="display:flex; justify-content:center; gap:0.8rem; flex-wrap:wrap;">
            <a href="reading.html?mode=${card.modeCategory}" class="btn-gold" style="text-decoration:none;">
                🔮 ไปเปิดไพ่ในหมวด${escapeHtml(card.modeName)} ➔
            </a>
            <button type="button" class="btn-outline-gold" onclick="document.getElementById('cardDetailModal').classList.remove('open')">
                ปิดหน้าต่างนี้
            </button>
        </div>
    `;

    previewModal.classList.add("open");
}

function escapeHtml(str) {
    if (!str) return "";
    return String(str)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

// ============================================================================
// DOM Ready
// ============================================================================
document.addEventListener("DOMContentLoaded", () => {
    initStarfield();
    initStats();
    initPlayerCounter();

    // Sound toggle
    dashboardSound.updateUi();
    const btnSound = document.getElementById("btnToggleSound");
    if (btnSound) {
        btnSound.addEventListener("click", () => {
            dashboardSound.toggleSound();
        });
    }

    // Portal card hover sound
    document.querySelectorAll(".mode-portal-card").forEach(card => {
        card.addEventListener("mouseenter", () => {
            dashboardSound.playPortalHover();
        });
        card.addEventListener("click", () => {
            dashboardSound.playPortalClick();
        });
    });

    // Gallery Modal open
    const btnOpenGallery = document.getElementById("btnOpenGallery");
    const galleryModal = document.getElementById("galleryModal");
    if (btnOpenGallery && galleryModal) {
        btnOpenGallery.addEventListener("click", () => {
            galleryModal.classList.add("open");
            renderGalleryCards();
        });
    }

    // Gallery filters
    document.querySelectorAll(".gallery-filter-pill").forEach(pill => {
        pill.addEventListener("click", () => {
            document.querySelectorAll(".gallery-filter-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            galleryActiveFilter = pill.dataset.filter;
            renderGalleryCards();
        });
    });

    // Tone filters
    document.querySelectorAll(".gallery-tone-pill").forEach(pill => {
        pill.addEventListener("click", () => {
            document.querySelectorAll(".gallery-tone-pill").forEach(p => p.classList.remove("active"));
            pill.classList.add("active");
            galleryToneFilter = pill.dataset.tone;
            renderGalleryCards();
        });
    });

    // Search input
    const searchInput = document.getElementById("gallerySearchInput");
    if (searchInput) {
        searchInput.addEventListener("input", (e) => {
            gallerySearchQuery = e.target.value.trim();
            renderGalleryCards();
        });
    }

    // Backdrop close
    document.querySelectorAll(".modal-backdrop").forEach(backdrop => {
        backdrop.addEventListener("click", (e) => {
            if (e.target === backdrop) backdrop.classList.remove("open");
        });
    });
});
