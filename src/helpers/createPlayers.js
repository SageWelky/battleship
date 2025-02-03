import {  Player, CPUPlayer, HumanPlayer } from "../components/player";

export default async function createPlayers() {
  let players = await openPtmModal();
  let p1 = players.p1isCPU ? new CPUPlayer() : new HumanPlayer();
  let p2 = players.p2isCPU ? new CPUPlayer() : new HumanPlayer();
  return {player: p1, opponent: p2};
}