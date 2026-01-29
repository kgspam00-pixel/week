/* =========================
   VALENTINE WEEK ENGINE
   TEST MODE — ALL UNLOCKED
========================= */

const TEST_MODE = true;

/* Unlock dates (kept for reference, ignored in test mode) */
const DAY_UNLOCK = {
  rose: "2026-02-07",
  propose: "2026-02-08",
  chocolate: "2026-02-09",
  teddy: "2026-02-10",
  promise: "2026-02-11",
  hug: "2026-02-12",
  kiss: "2026-02-13",
  valentine: "2026-02-14"
};


/* ---------- Page Lock / Unlock ---------- */

function handleDayUnlock(dayKey) {
  const locked = document.getElementById("locked");
  const unlocked = document.getElementById("unlocked");

  if (!locked || !unlocked) return;

  if (TEST_MODE) {
    locked.style.display = "none";
    unlocked.style.display = "block";
    return;
  }

  const today = new Date().toISOString().slice(0, 10);
  const unlockDate = DAY_UNLOCK[dayKey];

  if (today >= unlockDate) {
    locked.style.display = "none";
    unlocked.style.display = "block";
  } else {
    locked.style.display = "block";
    unlocked.style.display = "none";
  }
}


/* ---------- Progress Tracking ---------- */

function markProgress(dayKey) {
  try {
    localStorage.setItem("vday_" + dayKey, "1");
  } catch (e) {}
}

function getProgressCount() {
  try {
    return Object.keys(DAY_UNLOCK)
      .filter(k => localStorage.getItem("vday_" + k) === "1")
      .length;
  } catch (e) {
    return 0;
  }
}


/* ---------- Landing Progress Bar ---------- */

function updateProgressBar() {
  const bar = document.getElementById("progressFill");
  if (!bar) return;

  const done = getProgressCount();
  const total = Object.keys(DAY_UNLOCK).length;
  const pct = Math.round((done / total) * 100);

  bar.style.width = pct + "%";
}


/* ---------- Countdown (Landing Page) ---------- */

function startCountdown(targetDateStr) {
  const el = document.getElementById("countdown");
  if (!el) return;

  if (TEST_MODE) {
    el.textContent = "Unlocked for testing 💗";
    return;
  }

  const target = new Date(targetDateStr + "T00:00:00");

  function tick() {
    const now = new Date();
    const diff = target - now;

    if (diff <= 0) {
      el.textContent = "It begins ❤️";
      return;
    }

    const d = Math.floor(diff / (1000*60*60*24));
    const h = Math.floor(diff / (1000*60*60) % 24);
    const m = Math.floor(diff / (1000*60) % 60);

    el.textContent = `${d}d ${h}h ${m}m`;
  }

  tick();
  setInterval(tick, 60000);
}


/* ---------- Init Landing Helpers ---------- */

document.addEventListener("DOMContentLoaded", () => {
  updateProgressBar();
});
