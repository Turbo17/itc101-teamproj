// auth.js
let attemptsRemaining = 10;
const lockoutTime = 60; // seconds

function toggleHint() {
  const panel = document.getElementById("hintPanel");
  panel.style.display = panel.style.display === "block" ? "none" : "block";
}

function handleLogin(event) {
  event.preventDefault();

  if (localStorage.getItem("lockout_until")) {
    const lockoutUntil = parseInt(localStorage.getItem("lockout_until"));
    const now = Date.now();
    if (now < lockoutUntil) {
      triggerLockout(lockoutUntil - now);
      return;
    } else {
      localStorage.removeItem("lockout_until");
    }
  }

  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;
  const loginBox = document.getElementById("loginBox");
  const errorMsg = document.getElementById("errorMsg");
  const attemptsText = document.getElementById("attempts");
  const hintPanel = document.getElementById("hintPanel");
  const finalWarning = document.getElementById("finalWarning");
  const accessBtn = document.getElementById("accessBtn");
  const overlay = document.getElementById("accessOverlay");
  const accessText = document.getElementById("accessText");
  const body = document.body;

  const expectedUser = atob("YWRtaW4=");
  const expectedPass = atob("c3BlY3Ryb2dyYW0=");

  if (user === expectedUser && pass === expectedPass) {
    grantAccess();
    return;
  }

  attemptsRemaining--;
  errorMsg.classList.add("visible");
  accessBtn.classList.add("error");
  loginBox.classList.remove("shake");
  void loginBox.offsetWidth;
  loginBox.classList.add("shake");
  attemptsText.textContent = `Attempts Remaining: ${attemptsRemaining}`;

  setTimeout(() => {
    errorMsg.classList.remove("visible");
    accessBtn.classList.remove("error");
  }, 1500);

  if (attemptsRemaining === 7) {
    hintPanel.style.transition = "box-shadow 1.5s ease";
    hintPanel.style.boxShadow = "0 0 15px 5px #50fa7b";
    setTimeout(() => {
      hintPanel.style.boxShadow = "none";
      hintPanel.style.display = "block";
    }, 1500);
  }

  if (attemptsRemaining === 5) {
    loginBox.style.boxShadow = "0 0 20px 5px red";
    loginBox.classList.remove("shake");
    void loginBox.offsetWidth;
    loginBox.classList.add("shake");
    setTimeout(() => {
      loginBox.style.boxShadow = "none";
    }, 2000);
  }

  if (attemptsRemaining === 1) {
    document.body.style.backgroundColor = "#200";
    loginBox.style.backgroundColor = "#400";
    finalWarning.style.display = "block";
    hintPanel.style.display = "block";
  }

  if (attemptsRemaining <= 0) {
    const lockoutUntil = Date.now() + lockoutTime * 1000;
    localStorage.setItem("lockout_until", lockoutUntil);
    triggerLockout(lockoutTime * 1000);
  }

  if (user === expectedUser) {
    console.log("flag{not_the_real_flag_but_getting_warmer}");
  }
}

function grantAccess() {
  sessionStorage.setItem("authenticated", "true");
  const overlay = document.getElementById("accessOverlay");
  const accessText = document.getElementById("accessText");
  overlay.classList.add("visible");
  const message = "ACCESS GRANTED";
  accessText.textContent = "";
  let i = 0;
  const typeInterval = setInterval(() => {
    accessText.textContent += message[i];
    i++;
    if (i >= message.length) {
      clearInterval(typeInterval);
      setTimeout(() => {
        window.location.href = "main.html";
      }, 800);
    }
  }, 100);
}

function triggerLockout(remainingTime) {
  const screen = document.getElementById("lockoutScreen");
  const timerText = document.getElementById("lockoutCountdown");
  screen.style.display = "flex";

  const end = Date.now() + remainingTime;
  const countdownInterval = setInterval(() => {
    const now = Date.now();
    const diff = Math.max(0, Math.ceil((end - now) / 1000));
    timerText.textContent = `You may try again in ${diff} second${diff === 1 ? '' : 's'}...`;
    if (diff <= 0) {
      clearInterval(countdownInterval);
      localStorage.removeItem("lockout_until");
      window.location.reload();
    }
  }, 1000);
}

