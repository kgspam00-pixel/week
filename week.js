document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     IST DATE UTILITY
     ========================= */
  function getISTDate() {
    const now = new Date();
    const utc = now.getTime() + now.getTimezoneOffset() * 60000;
    return new Date(utc + 5.5 * 60 * 60 * 1000);
  }

  const today = getISTDate();

  /* =========================
     UNLOCK DATES (VALENTINE WEEK)
     ========================= */
  const unlockDates = {
    rose: new Date("2026-02-07T00:00:00"),
    propose: new Date("2026-02-08T00:00:00"),
    chocolate: new Date("2026-02-09T00:00:00"),
    teddy: new Date("2026-02-10T00:00:00"),
    promise: new Date("2026-02-11T00:00:00"),
    hug: new Date("2026-02-12T00:00:00"),
    kiss: new Date("2026-02-13T00:00:00"),
    valentine: new Date("2026-02-14T00:00:00")
  };

  /* =========================
     LANDING PAGE LOGIC
     ========================= */
  const dayCards = document.querySelectorAll(".day");

  if (dayCards.length > 0) {
    dayCards.forEach(card => {
      const key = card.dataset.day;
      const unlockDate = unlockDates[key];
      const status = card.querySelector(".status");

      if (!unlockDate || today < unlockDate) {
        card.classList.add("locked");
        if (status) status.innerText = "🔒";
      } else {
        if (status) status.innerText = "🔓";
      }
    });
  }

  /* =========================
     DAY PAGE UNLOCK HANDLER
     ========================= */
  window.handleDayUnlock = function (dayKey) {
    const unlockDate = unlockDates[dayKey];

    const lockedSection = document.getElementById("locked");
    const unlockedSection = document.getElementById("unlocked");

    if (!unlockDate || today < unlockDate) {
      if (lockedSection) lockedSection.style.display = "block";
      if (unlockedSection) unlockedSection.style.display = "none";
    } else {
      if (lockedSection) lockedSection.style.display = "none";
      if (unlockedSection) unlockedSection.style.display = "block";
    }
  };

});
