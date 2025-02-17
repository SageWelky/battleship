import {  Player, CPUPlayer, HumanPlayer } from "../components/player";
import { openPtmModal } from "../dom/ptmModal";

export default async function createPlayers(firstLaunch = false) {
  let players = await openPtmModal(firstLaunch);
  let p1 = players.p1isCPU ? new CPUPlayer(1) : new HumanPlayer(1);
  let p2 = players.p2isCPU ? new CPUPlayer(2) : new HumanPlayer(2);
  console.log(p1.id);
  console.log(p2.id);

  return {activePlayer: p1, opponent: p2};
}