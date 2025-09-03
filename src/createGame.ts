import "./style.css";

const NUMBER_OF_ROWS = 6;
const LETTER_BOX_PER_ROW = 5;
const HEADER_TEXT = "Guess the secret word";

type CreateElement = <K extends keyof HTMLElementTagNameMap>(
  tag: K,
  classList?: string[],
  id?: string,
) => HTMLElementTagNameMap[K];

const createElement: CreateElement = (tag, classList, id) => {
  const el = document.createElement(tag);
  if (classList) el.classList.add(...classList);
  if (id) el.id = id;
  return el as HTMLElementTagNameMap[typeof tag];
};

const renderLetterBoxes = (gameWrapper: HTMLElement) => {
  for (let i = 0; i < NUMBER_OF_ROWS; i++) {
    const row = createElement("div", ["row"]);

    for (let j = 0; j < LETTER_BOX_PER_ROW; j++) {
      const letterBox = createElement("div", ["letterBox"]);

      row.appendChild(letterBox);
    }

    gameWrapper.appendChild(row);
  }
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

const createNewGame = (app: HTMLElement | null) => {
  if (!app) {
    showError();
    return;
  }

  app.innerHTML = ""; // idempotent

  const header = createElement("header");
  const h1 = createElement("h1");
  h1.textContent = HEADER_TEXT;
  header.appendChild(h1);

  const main = createElement("main");
  const gameWrapper = createElement("section", ["gameWrapper"]);

  app.append(header);
  app.append(main);

  main.append(gameWrapper);

  renderLetterBoxes(gameWrapper);
};

export default createNewGame;
