/* =====================================
   Valentine Week – FINAL Unlock Logic
   Timezone: IST
   ===================================== */

/* IST DATE */
function getISTDate() {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60000;
  return new Date(utc + 5.5 * 60 * 60 * 1000);
}

/* UNLOCK DATES (Feb = month 1) */
const unlockDates = {
  rose:      new Date(2026, 1, 7),
  propose:   new Date(2026, 1, 8),
  chocolate: new Date(2026, 1, 9),
  teddy:     new Date(2026, 1, 10),
  promise:   new Date(2026, 1, 11),
  hug:       new Date(2026, 1, 12),
  kiss:      new Date(2026, 1, 13),
  valentine: new Date(2026, 1, 14)
};

/* LANDING PAGE LOCKING */
document.addEventListener("DOMContentLoaded", () => {
  const today = getISTDate();
  today.setHours(0, 0, 0, 0);

  document.querySelectorAll(".day-btn").forEach(btn => {
    const key = btn.dataset.day;
    const unlockDate = unlockDates[key];

    if (!unlockDate || today < unlockDate) {
      btn.classList.add("locked");
      btn.addEventListener("click", e => e.preventDefault());
    }
  });
});

/* DAY PAGE UNLOCK HANDLER */
function handleDayUnlock(dayKey) {
  const today = getISTDate();
  today.setHours(0, 0, 0, 0);

  const unlockDate = unlockDates[dayKey];
  const locked = document.getElementById("locked");
  const unlocked = document.getElementById("unlocked");

  if (!unlockDate) {
    locked.style.display = "block";
    return;
  }

  if (today >= unlockDate) {
    unlocked.style.display = "block";
    locked.style.display = "none";
  } else {
    locked.style.display = "block";
    unlocked.style.display = "none";
  }
}

/* PROGRESS DOTS */
function markProgress(currentDay) {
  const order = [
    "rose",
    "propose",
    "chocolate",
    "teddy",
    "promise",
    "hug",
    "kiss",
    "valentine"
  ];

  const index = order.indexOf(currentDay);
  document.querySelectorAll(".dot").forEach((dot, i) => {
    if (i <= index) dot.classList.add("done");
  });
}

/* AMBIENT HEARTS */
setInterval(() => {
  const heart = document.createElement("div");
  heart.className = "heart";
  heart.innerText = Math.random() > 0.5 ? "♡" : "♥";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.animationDuration = 8 + Math.random() * 6 + "s";

  document.body.appendChild(heart);
  setTimeout(() => heart.remove(), 14000);
}, 900);
