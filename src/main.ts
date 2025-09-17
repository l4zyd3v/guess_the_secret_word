const app = document.getElementById("app") as HTMLElement;
import renderAll from "./createGame/createGame";
import gameLogic from "./gameLogic/gameLogic";

renderAll(app);

gameLogic();
