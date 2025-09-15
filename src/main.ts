const app = document.getElementById("app") as HTMLElement;
import renderAll from "./createGame";
import gameLogic from "./gameLogic";

renderAll(app);

gameLogic();
