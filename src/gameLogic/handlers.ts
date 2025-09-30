import { getCurrentRow, getGurrentLetterBox, insertWordToRow } from "./helpers";
const SECRET_WORD = "hello";

const handleClick = (
  e: Event,
  keyboard: Element,
  rows: NodeListOf<Element>,
) => {
  const pressedKey = e.target as HTMLElement;
  const idValueOfKey = pressedKey.id;

  if (pressedKey.tagName !== "BUTTON") return;

  switch (idValueOfKey) {
    case "enter":
      handleValidate(rows, SECRET_WORD);
      break;
    case "backspace":
      handleDelete(pressedKey, rows);
      break;
    default:
      handleLetterClick(pressedKey, rows);
  }
};

const handleLetterClick = (target: HTMLElement, rows: NodeListOf<Element>) => {
  const value = target.innerText;
  const currentRow = getCurrentRow(rows);

  if (!currentRow) return;

  insertWordToRow(value, currentRow);
};

const handleValidate = (rows: NodeListOf<Element>, SECRET_WORD: string) => {
  const currentRow = getCurrentRow(rows);

  if (!currentRow) return;

  const cells = currentRow.querySelectorAll(".letterBox");
  const guessedWord = Array.from(cells)
    .map((cell) => cell.textContent?.trim() || "")
    .join("");

  if (guessedWord.length !== 5) {
    console.log("Word must be 5 letters.");
    return;
  }

  const secretArr = SECRET_WORD.toLowerCase().split("");
  const guessArr = guessedWord.toLowerCase().split("");
  const result: ("green" | "yellow" | "gray")[] = Array(5).fill("gray");
  const secretUsed = Array(5).fill(false);

  // First pass: check for correct position (green)
  for (let i = 0; i < 5; i++) {
    if (guessArr[i] === secretArr[i]) {
      result[i] = "green";
      secretUsed[i] = true;
    }
  }

  // Second pass: check for correct letter, wrong position (yellow)
  for (let i = 0; i < 5; i++) {
    if (result[i] === "green") continue;
    for (let j = 0; j < 5; j++) {
      if (!secretUsed[j] && guessArr[i] === secretArr[j]) {
        result[i] = "yellow";
        secretUsed[j] = true;
        break;
      }
    }
  }

  // Apply results to cells (example: add class)
  cells.forEach((cell, i) => {
    cell.classList.remove("green", "yellow", "gray");
    cell.classList.add(result[i]);
  });

  console.log(result); // ['green', 'yellow', ...]
};

const handleDelete = (target: HTMLElement, rows: NodeListOf<Element>) => {
  const currentRow = getCurrentRow(rows);

  if (!currentRow) {
    console.log("deletion cant be done, cant find row");
    return;
  }

  const letterBoxes = currentRow.children;

  for (let i = letterBoxes.length - 1; i >= 0; i--) {
    const currentLetterBox = letterBoxes[i] as HTMLElement;

    if (currentLetterBox.dataset.filled === "true") {
      currentLetterBox.innerHTML = "";
      currentLetterBox.setAttribute("data-filled", "false");
      break;
    }
  }
};

export { handleClick, handleDelete, handleLetterClick, handleValidate };
