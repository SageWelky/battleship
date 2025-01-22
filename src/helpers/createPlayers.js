
export default async function createPlayers() {
  let players = await openPtmModal();
  let p1 = new Player(players.p1isCPU);
  let p2 = new Player(players.p2isCPU);
  return {playerOne: p1, playerTwo: p2};
}