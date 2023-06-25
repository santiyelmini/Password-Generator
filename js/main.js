

const lengthInput = document.querySelector(".lengthInput");
const lengthIndicator = document.querySelector(".lengthIndicator");
lengthInput.addEventListener("input", updateData);
const generateBtn = document.querySelector(".generateBtn");
generateBtn.addEventListener("click", generatePassword);
const options = document.querySelectorAll(".option input");
const passwordInput = document.querySelector(".passwordInput");
const passwordStrength = document.querySelector(".strengthIndicator");
const copyIcon = document.querySelector(".bxs-copy");
copyIcon.addEventListener("click", copyPassword);
const saveSettingsCheckbox = document.querySelector("#saveSettings");

const characters = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "^!$%&|[](){}:;.,*+-#@<>~"
};

function generatePassword() {
  let staticPassword = "";
  let passwordLength = lengthInput.value;
  randomPassword = "";
  excludeDuplicate = false;
  options.forEach(option => {
    if (option.checked) {
      if (option.id === "excludeDuplicate") {
        excludeDuplicate = true;
      } else {
        staticPassword += characters[option.id];
      }
    }
  });
  for (let i = 0; i < passwordLength; i++) {
    let randomChar =
      staticPassword[Math.floor(Math.random() * staticPassword.length)];
    if (excludeDuplicate) {
      !randomPassword.includes(randomChar) || randomChar == " "
        ? (randomPassword += randomChar)
        : i--;
    } else {
      randomPassword += randomChar;
    }
  }
  passwordInput.value = randomPassword;

  if (saveSettingsCheckbox.checked) {
    saveCheckboxState();
  } else {
    clearCheckboxState();
  }
}

function updateStrength() {
  passwordStrength.id =
    lengthInput.value <= 8
      ? "weak"
      : lengthInput.value <= 16
      ? "medium"
      : "strong";
  console.log(passwordStrength.id);
}

function copyPassword() {
  navigator.clipboard.writeText(passwordInput.value);
  copyIcon.classList.remove("bxs-copy");
  copyIcon.classList.add("bx-check");
  setTimeout(() => {
    copyIcon.classList.remove("bx-check");
    copyIcon.classList.add("bxs-copy");
  }, 1500);
}

function updateData() {
  lengthIndicator.innerText = lengthInput.value;
  generatePassword();
  updateStrength();
}

function saveCheckboxState() {
  const checkboxState = {};
  options.forEach(option => {
    checkboxState[option.id] = option.checked;
  });
  localStorage.setItem("checkboxState", JSON.stringify(checkboxState));
}

function clearCheckboxState() {
  localStorage.removeItem("checkboxState");
}

function loadCheckboxState() {
  const checkboxStateString = localStorage.getItem("checkboxState");
  if (checkboxStateString) {
    const checkboxState = JSON.parse(checkboxStateString);
    options.forEach(option => {
      if (option.id in checkboxState) {
        option.checked = checkboxState[option.id];
      }
    });
  }
}

options.forEach(option => {
  option.addEventListener("change", saveCheckboxState);
});

loadCheckboxState();
updateData();


