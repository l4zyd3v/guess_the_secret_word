import "../style.css";

import { createElement } from "./utils";

const NUMBER_OF_ROWS = 6;
const LETTER_BOX_PER_ROW = 5;
const HEADER_TEXT = "Wordle";
const GRID_COLOR_DELAY = 70;

import {
  renderLetterBoxes,
  renderKeyboard,
  showError,
  createHeader,
  createMain,
} from "./helpers";

const renderAll = (app: HTMLElement | null) => {
  if (!app) {
    showError();
    return;
  }
  app.innerHTML = ""; // idempotent

  const header = createHeader(HEADER_TEXT);
  const main = createMain();
  const letterBoxes = renderLetterBoxes(
    NUMBER_OF_ROWS,
    LETTER_BOX_PER_ROW,
    GRID_COLOR_DELAY,
  );
  const keyboard = renderKeyboard();

  main.append(letterBoxes, keyboard);

  app.append(header, main);
};

export default renderAll;
