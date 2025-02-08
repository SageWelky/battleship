export function loadPlayScreen(inputObject = {playerOneType: false, playerTwoType: true}) {
  //Swap to hardcoding this later, and write calls to child component creation.
  const startScreen = document.getElementById("start-screen");
  const playScreen = document.getElementById("play-screen");

  if (!document.startViewTransition) {
    startScreen.style.display = "none";
  } else {
    document.startViewTransition(() => {
      startScreen.style.display = "none";
    });
  }

  if (!document.startViewTransition) {
    playScreen.style.display = "grid";
  } else {
    document.startViewTransition(() => {
      playScreen.style.display = "grid";
    });
  }
}
