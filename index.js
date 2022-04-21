export const SIZE_BLOCK = 25;
export const COLUMS = 10;
export const ROWS = 20;

import { Game } from "./modul/game.js";
import { View } from "./modul/view.js";
import { Controller } from "./modul/controller.js";

const game = new Game();
const view = new View(document.querySelector('.container'));
const controller = new Controller(game, view);

controller.init('Enter');