const gameLogic = () => {
  const keyboard = document.querySelector(".keyboard");
  const letterBoxRows = document.querySelectorAll(".row");

  if (!keyboard) {
    console.log("keyboard couldt be found");
  }

  keyboard?.addEventListener("click", (e) =>
    handleClick(e, keyboard, letterBoxRows),
  );
};

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
      handleValidate(pressedKey);
      break;
    case "backspace":
      handleDelete(pressedKey, rows);
      break;
    default:
      handleLetter(pressedKey, rows);
  }
};

// maybe I have too loop backwards - to get the last used row..
const getCurrentRow = (rows: NodeListOf<Element>) => {
  for (let i = 0; i < rows.length; i++) {
    const row = rows[i];

    if (row.className !== "filled") {
      return row;
    }
  }
};

const getGurrentLetterBox = (letterBoxes: HTMLCollection) => {
  for (let i = 0; i < letterBoxes.length; i++) {
    const currentLetterBox = letterBoxes[i] as HTMLElement;

    if (currentLetterBox.dataset.filled !== "true") {
      return currentLetterBox;
    }
  }
};

const insertWordToRow = (value: string, currentRow: Element) => {
  const letterBoxes = currentRow.children;

  const currentLetterBox = getGurrentLetterBox(letterBoxes) as Element;

  if (!currentLetterBox) {
    console.log(
      "last currentBox reached - time to press enter for validation, or delete to go back",
    );
    return;
  }

  currentLetterBox.setAttribute("data-filled", "true");
  currentLetterBox.textContent = value;
};

const handleLetter = (target: HTMLElement, rows: NodeListOf<Element>) => {
  const value = target.innerText;
  const currentRow = getCurrentRow(rows);

  if (!currentRow) return;

  insertWordToRow(value, currentRow);
};

const handleValidate = (target: HTMLElement) => {
  console.log("enter clicked");
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

export default gameLogic;
