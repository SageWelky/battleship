export function getShipCoordinates(ship) {
  let shipObject = ensureShipHasObjectFormatting(ship);
  let {x, y, length, orientation} = shipObject;


  let coordinates = [];

  if (orientation === "horizontal") {
    for (let i = 0; i < length; i++) {
      coordinates.push([x + i, y]);
    }

  } else if (orientation === "vertical") {
    for (let i = 0; i < length; i++) {
      coordinates.push([x, y + i]);
    }
  }

  return coordinates;
}

export function ensureShipHasObjectFormatting(ship) {
  let shipObject;
  if (ship instanceof Element) {
    let htmlElementFormat = ship;
    shipObject = {};
    shipObject.x = parseInt(htmlElementFormat.dataset.x);
    shipObject.y = parseInt(htmlElementFormat.dataset.y);
    shipObject.orientation = htmlElementFormat.dataset.orientation;
    shipObject.length = parseInt(htmlElementFormat.dataset.length);
    shipObject.coordinates = getShipCoordinates({
      x: parseInt(htmlElementFormat.dataset.x),
      y: parseInt(htmlElementFormat.dataset.y),
      length: parseInt(htmlElementFormat.dataset.length),
      orientation: htmlElementFormat.dataset.orientation
    });
  } else {
    shipObject = ship;
  }

  return shipObject;
}