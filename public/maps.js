let map;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 18.787747, lng: 98.993128 },
    zoom: 13,
    gestureHandling: "greedy",
  });
  const locationButton = document.getElementById("button");
  locationButton.textContent = "Go to my location";
  locationButton.classList.add("map-button");
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(locationButton);
  locationButton.addEventListener("click", () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        map.setCenter(pos);
        var marker = new google.maps.Marker({
          position: pos,
          map: map,
        });
        map.setZoom(16);
      });
    }
  });
  AutoComplete();
}
function AutoComplete() {
  autocomplete = new google.maps.places.Autocomplete(
    document.getElementById("autocomplete")
  );
  autocomplete.bindTo("bounds", map);
  const auto_marker = new google.maps.Marker({
    map,
    anchorPoint: new google.maps.Point(0, -29),
  });
  autocomplete.addListener("place_changed", () => {
    auto_marker.setVisible(false);
    const place = autocomplete.getPlace();
    const position = place.geometry.location;
    if (!place.geometry || !place.geometry.location) {
      window.alert("No details available for input: '" + place.name + "'");
    } else {
      if (place.geometry.viewport) {
        map.fitBounds(place.geometry.viewport);
      } else {
        map.setCenter(position);
        map.setZoom(17);
      }
    }
    auto_marker.setPosition(position);
    auto_marker.setVisible(true);
    const infoWindow = new google.maps.InfoWindow();
    const infoContent = document.createElement("div");
    infoContent.textContent = place.name;
    infoWindow.setContent(infoContent);
    infoWindow.open(map, auto_marker);
  });
}

window.initMap = initMap;
