import "./style.css";
const NUMBER_OF_ROWS = 6;
const LETTER_BOX_PER_ROW = 5;
const HEADER_TEXT = "Wordle";
const GRID_COLOR_DELAY = 70;

type CreateElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  classList?: string[],
  id?: string,
  classNameTimeOut?: number | undefined,
) => HTMLElementTagNameMap[K];

const createElement: CreateElement = (tag, classList, id) => {
  const el = document.createElement(tag);

  if (classList) {
    el.classList.add(...classList);
  }

  if (id) el.id = id;
  return el as HTMLElementTagNameMap[typeof tag];
};

const renderLetterBoxes = () => {
  const letterBoxContainer = createElement("section", ["letterBoxContainer"]);

  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    const row = createElement("div", ["row"]);
    row.setAttribute("data-filled", "false");

    for (let j = 0; j < LETTER_BOX_PER_ROW; j++) {
      const letterBox = createElement("div", ["letterBox"]);
      letterBox.setAttribute("data-filled", "false");
      const randomLetter = String.fromCharCode(
        97 + Math.floor(Math.random() * 26),
      ); // 'a' to 'z'

      setTimeout(
        () => {
          letterBox.classList.add("letterBox__backgroundColorDelay");
          // letterBox.textContent = randomLetter;
          setTimeout(
            () => {
              letterBox.classList.add("letterBox__secondBackgroundColorDelay");
              // letterBox.textContent = randomLetter;
              setTimeout(
                () => {
                  letterBox.classList.add(
                    "letterBox__thirdBackgroundColorDelay",
                  );
                  // letterBox.textContent = "";
                },
                j * GRID_COLOR_DELAY + 2 + i * GRID_COLOR_DELAY,
              );
            },
            j * GRID_COLOR_DELAY * 2 + i * GRID_COLOR_DELAY,
          );
        },
        j * GRID_COLOR_DELAY * 2 + i * GRID_COLOR_DELAY,
      );

      row.appendChild(letterBox);
    }

    letterBoxContainer.appendChild(row);
  }

  return letterBoxContainer;
};

const showError = () => {
  if (document.getElementById("app-error")) return; // prevent duplicates

  const wrapper = createElement("div", ["error"], "app-error");
  const h1 = createElement("h1");
  const p = createElement("p");

  h1.textContent = "Error: App could not be found";
  p.textContent = "Please make sure there is a div with id 'app' in index.html";

  wrapper.append(h1, p);

  document.body.appendChild(wrapper);
};

const createHeader = () => {
  const header = createElement("header", ["header"]);
  const h1 = createElement("h1");
  h1.textContent = HEADER_TEXT;
  header.appendChild(h1);

  return header;
};

const createMain = () => {
  const main = createElement("main", ["main"]);

  return main;
};

type KeyboardLayout = { [row: string]: string[] };

const qwertyKeyboard: KeyboardLayout = {
  firstRow: ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p", "å"],
  secondRow: ["a", "s", "d", "f", "f", "g", "h", "j", "k", "l", "æ", "ø"],
  thirdRow: ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
};

const renderkeyboardRow = (rowOfKeys: string[], className: string) => {
  const rowContainer = createElement("div", [
    `keyboard__${className}`,
    "keyboard__rows",
  ]);

  for (let i = 0; i < rowOfKeys.length; i++) {
    const letter = rowOfKeys[i];
    const enter = "\u23CE";
    const backspace = "\u232B";

    const key = createElement("button", [
      `keyboard__key-${rowOfKeys[i]}`,
      "keyboard__key",
    ]);
    if (letter !== "enter" && letter !== "backspace") {
      key.textContent = letter;
    }

    if (letter === "enter") {
      key.id = "enter";
      key.textContent = enter;
    }

    if (letter === "backspace") {
      key.id = "backspace";
      key.textContent = backspace;
    }

    rowContainer.append(key);
  }

  return rowContainer;
};

const renderKeyboard = (qwertyKeyboard: KeyboardLayout) => {
  const keyboardContainer = createElement("section", ["keyboard"]);

  const { firstRow, secondRow, thirdRow } = qwertyKeyboard;

  const firstRowContainer = renderkeyboardRow(firstRow, "firstRow");
  const secondRowContainer = renderkeyboardRow(secondRow, "secondRow");
  const thirdRowContainer = renderkeyboardRow(thirdRow, "thirdRow");

  keyboardContainer.append(
    firstRowContainer,
    secondRowContainer,
    thirdRowContainer,
  );

  return keyboardContainer;
};

const renderAll = (app: HTMLElement | null) => {
  if (!app) {
    showError();
    return;
  }
  app.innerHTML = ""; // idempotent

  const header = createHeader();
  const main = createMain();
  const letterBoxes = renderLetterBoxes();
  const keyboard = renderKeyboard(qwertyKeyboard);

  main.append(letterBoxes, keyboard);

  app.append(header, main);
};

export default renderAll;
