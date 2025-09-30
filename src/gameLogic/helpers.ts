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

export { getCurrentRow, getGurrentLetterBox, insertWordToRow };
