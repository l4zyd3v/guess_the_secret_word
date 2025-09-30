import { handleClick } from "./handlers";

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

export default gameLogic;
