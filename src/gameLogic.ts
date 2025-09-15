const gameLogic = () => {
  const keyboard = document.querySelector(".keyboard");

  console.log("keyboard: ", keyboard);

  keyboard?.addEventListener("click", (e) => {
    console.log("clicked");
    console.log("click: ", e.target);
  });
};

export default gameLogic;
