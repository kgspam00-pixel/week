/* =========================
   Valentine Week TEST MODE
   ALL DAYS UNLOCKED
   ========================= */

// Get today's date in IST
function getISTDate() {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000;
  return new Date(now.getTime() + istOffset);
}

// 🔓 ALL days set to Jan 1, 2020 (always unlocked)
const unlockDates = {
  rose:      new Date(2020, 0, 1),
  propose:   new Date(2020, 0, 1),
  chocolate: new Date(2020, 0, 1),
  teddy:     new Date(2020, 0, 1),
  promise:   new Date(2020, 0, 1),
  hug:       new Date(2020, 0, 1),
  kiss:      new Date(2020, 0, 1),
  valentine: new Date(2020, 0, 1)
};

// Main unlock handler
function handleDayUnlock(dayKey) {
  const today = getISTDate();
  today.setHours(0, 0, 0, 0);

  const unlockDate = unlockDates[dayKey];

  const lockedSection = document.getElementById("locked");
  const unlockedSection = document.getElementById("unlocked");

  if (!unlockDate) {
    console.error("Unknown day key:", dayKey);
    lockedSection.style.display = "block";
    return;
  }

  // ALWAYS TRUE in test mode
  if (today >= unlockDate) {
    unlockedSection.style.display = "block";
    lockedSection.style.display = "none";
  } else {
    lockedSection.style.display = "block";
    unlockedSection.style.display = "none";
  }
}

// Helper for landing page
function isUnlocked(dayKey) {
  return true; // EVERYTHING unlocked in test mode
}
