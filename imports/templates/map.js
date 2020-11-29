import { insertDoctor, doctorExists } from '../api/doctors-service.js';

import './map.html';
import './footer.js';

const mapOptions = {
  center: {},
  zoom: 14
};

Template.map.onCreated(function() {
  const sub = Meteor.subscribe('doctors');
  // get current position of client and add it to mapOptions
  navigator.geolocation.getCurrentPosition(function (pos) {
    const { latitude, longitude } = pos.coords;
    mapOptions.center.lat = latitude;
    mapOptions.center.lng = longitude;
  });
  // wait for sub before rendering map
  this.autorun(() => {
    if (sub.ready()) {
      initMap(mapOptions);
    };
  });
});

function initMap(options) {
    // create map and center it on current location
    const map = new google.maps.Map(document.getElementById('map'), options);
  
    // create marker at current location and display
    const userMarker = new google.maps.Marker({
      position: options.center,
      map,
      title: "Your location",
      label: "🙂",
      animation: google.maps.Animation.DROP,
    });
    userMarker.setMap(map);
  
    // search query to find nearby GPs
    const search = {
      keyword: "General Practitioner",
      location: options.center,
      radius: 3000,
    };
  
    // use places api to find and get data about nearby GPs
    const service = new google.maps.places.PlacesService(map);
    service.nearbySearch(search, (result, status) => {
      if (status == google.maps.places.PlacesServiceStatus.OK) {
        // loop through results and create a marker and info window
        const infowindow = new google.maps.InfoWindow;
        for (let i = 0 ; i < result.length; i++) {
          const marker = new google.maps.Marker({
            position: result[i].geometry.location,
            map,
            title: result[i].name,
            label: "💉",
            animation: google.maps.Animation.DROP,
          });

          // use the places api getDetails method to get more info
          const searchDetails = { placeId: result[i].reference };
          service.getDetails(searchDetails, (detail) => {
            const { name, formatted_address, formatted_phone_number, rating, reviews } = detail;
            // insert nearby GPs into collection
            const gpDetails = {
              placesId: result[i].reference,
              name,
              address: formatted_address,
              phone: formatted_phone_number,
            };
            // if nearby GPs already exists, do not insert into collection
            if (!doctorExists.call({ placesId: gpDetails.placesId }) ) {
              insertDoctor.call(gpDetails)
            }
            // build contentString to display on infowindow
            let contentString = `
              <div>
                <h6>${name}</h6>
                <span>${formatted_address}<br/></span>
            `;
            // if rating exists, then display ratings and reviews
            if (rating) {
              contentString += `
              <span>
                Rated ${rating} based on ${reviews.length} reviews<br/>
              <span>
              <div>
                </br>
                <button data-target="modal-${gpDetails.placesId}" class="btn modal-trigger">Book appointment</button>
              </div>
              </div>
              `;
            } else {
              contentString += `
              <div>
                </br>
                <button data-target="modal-${gpDetails.placesId}" class="btn modal-trigger">Book appointment</button>
              </div>
              </div>`;
            }
            // display infowindow on click
            marker.addListener('click', () => {
              infowindow.open(map, marker);
              infowindow.setContent(contentString);
            });
          });
        }
      }
    });
  }