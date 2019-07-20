var foodType = [];
var foodLocation;

function renderPage() {
    $("#search-div").hide();
    $("#quiz-rando-buttons").hide();
    $("#quiz-body").hide();
    $("#random-btn-body").hide();
    $("#search-results").hide();
    $("#quiz-body-two").hide();
    $("#location").hide();
}



renderPage();

$("#search-button").on("click", function() {
    $("#start-buttons").hide();
    $("#search-div").show();
    //$(".container").attr("style", "background-color: azure; border: 1px solid black;");
    $("body").attr("style", "background-image: url('assets/images/serchWindowImg.png');");
    $("#secondary-txt").hide();
});

$("#quiz-button").on("click", function() {
    $("#start-buttons").hide();
    $("#quiz-body").show();
    //$(".container").attr("style", "background-color: azure; border: 1px solid black;");
    $("body").attr("style", "background-image: url('assets/images/serchWindowImg.png');");
    $("#secondary-txt").hide();
});



//To use this, call initMap() and pass in latitude, longitude and
//business name. Example: initMap(lat, lng, name)
var map;
var service;
var infowindow;
function initMap(userLat, userLon, string) {
  var location = new google.maps.LatLng(userLat, userLon);
  infowindow = new google.maps.InfoWindow();
  map = new google.maps.Map(
      document.getElementById('map'), {center: location,
         zoom: 15,
         styles: [
          {elementType: 'geometry', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.stroke', stylers: [{color: '#242f3e'}]},
          {elementType: 'labels.text.fill', stylers: [{color: '#746855'}]},
          {
            featureType: 'administrative.locality',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'geometry',
            stylers: [{color: '#263c3f'}]
          },
          {
            featureType: 'poi.park',
            elementType: 'labels.text.fill',
            stylers: [{color: '#6b9a76'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry',
            stylers: [{color: '#38414e'}]
          },
          {
            featureType: 'road',
            elementType: 'geometry.stroke',
            stylers: [{color: '#212a37'}]
          },
          {
            featureType: 'road',
            elementType: 'labels.text.fill',
            stylers: [{color: '#9ca5b3'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry',
            stylers: [{color: '#746855'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'geometry.stroke',
            stylers: [{color: '#1f2835'}]
          },
          {
            featureType: 'road.highway',
            elementType: 'labels.text.fill',
            stylers: [{color: '#f3d19c'}]
          },
          {
            featureType: 'transit',
            elementType: 'geometry',
            stylers: [{color: '#2f3948'}]
          },
          {
            featureType: 'transit.station',
            elementType: 'labels.text.fill',
            stylers: [{color: '#d59563'}]
          },
          {
            featureType: 'water',
            elementType: 'geometry',
            stylers: [{color: '#17263c'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.fill',
            stylers: [{color: '#515c6d'}]
          },
          {
            featureType: 'water',
            elementType: 'labels.text.stroke',
            stylers: [{color: '#17263c'}]
          }
        ]
      });

      
  var request = {
    query: string,
    fields: ['name', 'geometry'],
  };
  //console.log(userBusiness);
  service = new google.maps.places.PlacesService(map);
  service.findPlaceFromQuery(request, function(results, status) {
    if (status === google.maps.places.PlacesServiceStatus.OK) {
      for (var i = 0; i < results.length; i++) {
        createMarker(results[i]);
      }
      map.setCenter(results[0].geometry.location);
    }
  });
}
function createMarker(place) {
  var marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });
  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

function yelpAjax(foodType, foodLocation) {

let myUrl = `https://cors-anywhere.herokuapp.com/https://api.yelp.com/v3/businesses/search?term=by-${foodType}&location=${foodLocation}`;

$.ajax({
   url: myUrl,
   method: "GET",
   headers: {
        'Authorization':'Bearer _MCNjLezZ4Hb6LcVdSIrVW-Ju4K5g5jTvcIdHxorIdp4QmGhFAOxqCWnw8HabL_FWhcNRsKJK0E6oimVhtLaQzvAmCJrIOAkSrIa3WlYYVrDnm2u1V-sVjoD99uvXHYx',}
})
.then(function(response) {

   var results = response;
 
    console.log(response);
    

   for (var i = 0; i < results.businesses.length; i++) {
    var businessName = results.businesses[i].name;
    var businessLocation = results.businesses[i].location.display_address;
    var businessRating = results.businesses[i].rating;

    //console.log(businessName);
    //console.log(businessLocation);

    var resultText = $("<div>");
    resultText.html("<h6>" + businessName + ", " + businessLocation + " Rating: " + businessRating + "/5 </h6> <br>");
    resultText.attr("data-lat", results.businesses[i].coordinates.latitude);
    resultText.attr("data-lon", results.businesses[i].coordinates.longitude);
    resultText.attr("data-name", results.businesses[i].name);
    resultText.attr("data-location", results.businesses[i].location.display_address);
    resultText.attr("data-rating", results.businesses[i].rating);
    resultText.attr("data-phone", results.businesses[i].display_phone);
    resultText.attr("data-price", results.businesses[i].price);
    resultText.attr("data-img", `<img src='${results.businesses[i].image_url}' alt='Yelp Restaurant'></img>`);
    resultText.attr("data-addy-1", results.businesses[i].location.address1);

    $("#search-results-div").append(resultText);

    $(resultText).on("click", function() {
        console.log($(this)[0].innerText);
       // console.log($(this).attr("data-lat"));
       // console.log($(this).attr("data-lon"));

        var userLat = $(this).attr("data-lat");
        var userLon = $(this).attr("data-lon");
        var userBusiness = $(this).attr("data-name");
        var userLoc = $(this).attr("data-location");
        var userRating = $(this).attr("data-rating")
        var userPhone = $(this).attr("data-phone")
        var resultImg = $(this).attr("data-img");
        var userPrice = $(this).attr("data-price");
        var addy = $(this).attr("data-addy-1");

        var string = userBusiness + " " + addy

        //console.log(resultImg);
        

        //console.log(userLat);
        //console.log(userLon);

        $("#search-results-div").empty();
        $("#search-results").hide();

        $("#final-result").append("<h3 class='text-center'>" + userBusiness + "<br>" + userLoc + "<br>" + userRating + "/5 <br>" + userPhone + "<br>" + userPrice + "<br>" + resultImg);

        initMap(userLat, userLon, string);
    })

   }
})

};


$("#food-search-btn").on("click", function() {
    event.preventDefault();

    $("#search-div").hide();
    $("#search-results").show();

        foodType.push($("#food-type").val().trim());
        //foodType=["mexican","italian"]
        foodLocation = $("#food-location").val().trim();

        //console.log(foodType);

    yelpAjax(foodType, foodLocation);

});


$(".btn-1").on("click", function() {
  var userPref1 = $(this).attr("id");

  console.log(userPref1);
  $("#quiz-body-one").hide();
  $("#quiz-body-two").show();


$(".btn-2").on("click", function() {
        var userPref2 = $(this).attr("id");
        $("#quiz-body-two").hide();
        //$("#search-results").show();
        $("#location").show();

        

        foodType.push(userPref1, userPref2);

        console.log(foodType)

        $("#food-search-btn-2").on("click", function() {

            var foodLocation = $("#food-location-2").val().trim();

            $("#quiz-body").hide();
            $("#search-results").show();

            console.log(foodType, foodLocation);

            yelpAjax(foodType, foodLocation);
        })
    })
});


