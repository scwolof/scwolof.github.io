// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lat: 51.40815597443401, lng: -0.34229867497811006 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "olfsn_wedding",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: 'Hampton Court House'
  });
}

initMap();