/* =========================
   VALENTINE WEEK ENGINE
   IST LOCKED — PRODUCTION SAFE
========================= */

const TEST_MODE = false;

/* Unlock dates (YYYY-MM-DD, IST based) */
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


/* =========================
   GET TODAY IN IST (SAFE)
========================= */

function getTodayISTString() {
  const now = new Date();

  // Convert local time → UTC
  const utc = now.getTime() + (now.getTimezoneOffset() * 60000);

  // Add IST offset (+5:30)
  const ist = new Date(utc + (5.5 * 60 * 60 * 1000));

  const year = ist.getFullYear();
  const month = String(ist.getMonth() + 1).padStart(2, "0");
  const day = String(ist.getDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
}


/* =========================
   PAGE LOCK / UNLOCK
========================= */

function handleDayUnlock(dayKey) {

  const locked = document.getElementById("locked");
  const unlocked = document.getElementById("unlocked");

  if (!locked || !unlocked) return;

  if (TEST_MODE) {
    locked.style.display = "none";
    unlocked.style.display = "block";
    return;
  }

  const today = getTodayISTString();
  const unlockDate = DAY_UNLOCK[dayKey];

  console.log("Today IST:", today);
  console.log("Unlock Date:", unlockDate);

  if (!unlockDate) {
    locked.style.display = "block";
    unlocked.style.display = "none";
    return;
  }

  // Safe string comparison
  if (today >= unlockDate) {
    locked.style.display = "none";
    unlocked.style.display = "block";
    markProgress(dayKey);
  } else {
    locked.style.display = "block";
    unlocked.style.display = "none";
  }
}


/* =========================
   PROGRESS TRACKING
========================= */

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


/* =========================
   LANDING PROGRESS BAR
========================= */

function updateProgressBar() {
  const bar = document.getElementById("progressFill");
  if (!bar) return;

  const done = getProgressCount();
  const total = Object.keys(DAY_UNLOCK).length;
  const pct = Math.round((done / total) * 100);

  bar.style.width = pct + "%";
}


/* =========================
   INIT
========================= */

document.addEventListener("DOMContentLoaded", () => {
  updateProgressBar();
});
