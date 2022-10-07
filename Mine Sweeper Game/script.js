window.onload = loadGrid();
var bomb;
var score = 0;
function loadGrid() {
  const container = document.getElementById("container");
  const gameScore = document.getElementById("gameScore");
  const resultDisplay = document.getElementById("resultDisplay");
  gameScore.innerHTML = "0";
  resultDisplay.innerHTML = "";

  container.innerHTML = "";
  for (let i = 1; i <= 81; i++) {
    const cell = document.createElement("div");
    cell.id = `cell_${i}`;
    cell.classList.add("cell");
    cell.addEventListener("click", updateGame);
    container.append(cell);
  }

  score = 0;
  window.random = [];
  while (window.random.length < 10) {
    var r = Math.floor(Math.random() * 81) + 1;
    if (window.random.indexOf(r) === -1) window.random.push(r);
  }

  for (let b of window.random) {
    const cell = document.getElementById(`cell_${b}`);
    cell.classList.add("bomb");
    // cell.style.backgroundImage = "url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)";
  }

  //   console.log(bomb);
}

function revealBombs(cell_id) {
  document.getElementById(cell_id).classList.add("containBomb");
  document.getElementById("resultDisplay").innerText = "game over";

  for (let b of window.random) {
    document.getElementById(`cell_${b}`).style.backgroundImage =
      "url(https://img.icons8.com/emoji/48/000000/bomb-emoji.png)";
    document.getElementById(`cell_${b}`).style.backgroundSize = "cover";
  }

  for (let i = 1; i <= 81; i++) {
    document
      .getElementById(`cell_${i}`)
      .removeEventListener("click", updateGame);
  }
}

function allSafeSelected() {
  const safeElements = document.getElementsByClassName("safe");
  return safeElements.length >= 70 ? true : false;
}

function loadSafe(cell_id) {
  if (allSafeSelected()) {
    document.getElementById("resultDisplay").innerText = "win";
    for (let b of window.random) {
      document
        .getElementById(`cell_${b}`)
        .removeEventListener("click", updateGame);
    }
  }
  document.getElementById(cell_id).classList.add("safe");
  document.getElementById(cell_id).removeEventListener("click", updateGame);
  score += 1;
  document.getElementById("gameScore").innerText = score;
}

function updateGame() {
  if (this.classList.contains("bomb")) {
    revealBombs(this.id);
  } else {
    loadSafe(this.id);
  }
}

function resetGrid() {
  loadGrid();
}
