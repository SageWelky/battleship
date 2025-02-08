export function generateEmptyBoard(numberOfSquaresPerSide) {
  let x = 0;
  let div;

  while ( x < numberOfSquaresPerSide ) {

    for ( let i = 0; i < numberOfSquaresPerSide; i++ ) {
      div = document.createElement( "div" );
      div.setAttribute( "id", `${squareID.toString()}` );
      div.style.width = `${100 / numberOfSquaresPerSide}cqi`;
      div.classList.add("grid-square");
      containerGrids.appendChild( div );
    }
    x++;
  }
}