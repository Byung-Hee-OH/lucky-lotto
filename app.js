const drawButton = document.getElementById("drawButton");
const resetButton = document.getElementById("resetButton");
const numberDisplay = document.getElementById("numberDisplay");

let numbers = [];

function getRandomLottoNumbers() {
  const result = new Set();
  while (result.size < 6) {
    const num = Math.floor(Math.random() * 45) + 1;
    result.add(num);
  }
  return Array.from(result);
}

function getKoreanNumber(num) {
  const units = ["", "일", "이", "삼", "사", "오", "육", "칠", "팔", "구"];
  const tens = ["", "십", "이십", "삼십", "사십"];
  const t = Math.floor(num / 10);
  const u = num % 10;
  if (t === 0) return units[u];
  if (u === 0) return tens[t];
  return tens[t] + units[u];
}

function speakNumber(num) {
  const utter = new SpeechSynthesisUtterance(`${getKoreanNumber(num)} 번입니다.`);
  utter.lang = "ko-KR";
  window.speechSynthesis.speak(utter);
}

function getBallColor(num) {
  if (num < 10) return "#fff176";     // 밝은 노랑
  else if (num < 20) return "#81d4fa"; // 하늘색
  else if (num < 30) return "#ff8a80"; // 연분홍
  else if (num < 40) return "#aed581"; // 연두색
  else return "#ffb74d";               // 주황색
}

function displayNumbersSequentially(nums) {
  numberDisplay.innerHTML = "";
  let i = 0;
  const interval = setInterval(() => {
    if (i >= nums.length) {
      clearInterval(interval);
      return;
    }
    const span = document.createElement("span");
    span.className = "ball";
    span.textContent = nums[i];
    span.style.backgroundColor = getBallColor(nums[i]);
    numberDisplay.appendChild(span);
    speakNumber(nums[i]);
    i++;
  }, 2000);
}

drawButton.addEventListener("click", () => {
  numbers = getRandomLottoNumbers();
  displayNumbersSequentially(numbers);
});

resetButton.addEventListener("click", () => {
  numberDisplay.innerHTML = "";
  window.speechSynthesis.cancel();
});
