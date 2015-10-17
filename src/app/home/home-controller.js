angular
  .module('application.home')
  .controller('HomeController', HomeController);

HomeController.$inject = ['$scope', '$state', '$http'];

function HomeController($scope, $state, $http)
{
    window.scope = $scope;
    $scope.mood = "";
    $scope.check = "Moodmap is gonna win!!";
    // Initialize the platform object:

  function moveMapToBerlin(map)
  {
    map.setCenter({lat:52.5159, lng:13.3777});
    map.setZoom(14);
  }

  /**
 * An event listener is added to listen to tap events on the map.
 * Clicking on the map displays an alert box containing the latitude and longitude
 * of the location pressed.
 * @param  {H.Map} map      A HERE Map instance within the application
 */
  function setUpClickListener(map)
  {
    // Attach an event listener to map display
    // obtain the coordinates and display in an alert box.
    map.addEventListener('tap', function (evt) {
      var coord = map.screenToGeo(evt.currentPointer.viewportX,
              evt.currentPointer.viewportY);

      var moodMarker = getMarkerByMood($scope.mood);
      addMarker(map,coord.lat,coord.lng, moodMarker.svg,moodMarker.fill,moodMarker.stroke);

    });
  }

  var getHappySvg  = function()
  {
    return '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
    '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
    'text-anchor="middle" fill="${STROKE}" >B</text></svg>';

      // return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px"'
      // +'height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve">'
      // +'<g id="Layer_1">'
      // +'</g>'
      // +'<g id="Layer_2">'
      // +'	<g>'
      // +'		<path fill="#E91E63" d="M11.983,23.966C5.375,23.966,0,18.59,0,11.983S5.375,0,11.983,0s11.983,5.375,11.983,11.983S18.59,23.966,11.983,23.966z M11.983,1.71C6.318,1.71,1.71,6.318,1.71,11.983s4.608,10.273,10.273,10.273s10.273-4.608,10.273-10.273S17.647,1.71,11.983,1.71z"/>'
      // +'		<g>'
      // +'			<path fill="#E91E63" d="M12.22,17.35c-1.848,0-3.502-1.032-4.315-2.693c-0.208-0.424-0.032-0.936,0.392-1.144c0.424-0.207,0.936-0.033,1.144,0.392c0.524,1.07,1.588,1.735,2.779,1.735c1.129,0,2.168-0.616,2.712-1.607c0.227-0.414,0.747-0.565,1.161-0.339c0.414,0.227,0.566,0.747,0.339,1.161C15.588,16.394,13.974,17.35,12.22,17.35z"/>'
      // +'			<circle fill="#E91E63" cx="8.976" cy="9.03" r="1.559"/>'
      // +'			<circle fill="#E91E63" cx="14.989" cy="9.03" r="1.559"/>'
      // +'		</g>'
      // +'	</g>'
      // +'</g>'
      // +'</svg>';

  };



  function getMarkerByMood(mood)
  {
    var returnValue =
    {
      svg:"",
      fill:"",
      stroke:"black",
      mood:mood
    };

    var fill = 'white';
    var svg = '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
    '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
    'text-anchor="middle" fill="${STROKE}" >B</text></svg>';

    switch(mood)
    {
      case "happy":
          fill = 'pink';
          svg = 'assets/images/icon_happy-24px-03.svg';
          break;
      case "sad":
          fill = 'blue';
          //svg = 'assets/images/icon_sad-24px.svg';
          break;
      case "bored":
          fill = 'grey';
          //svg = 'assets/images/icon_bored-24px.svg';
          break;
      case "crazy":
          fill = 'purple';
          //svg = 'assets/images/icon_crazy-24px.svg';
          break;
      case "fearful":
          fill = 'green';
          svg = 'assets/images/icon_fearful-24px.svg';
          break;
      case "angry":
          fill = 'yellow';
          //svg = 'assets/images/icon_angry-24px.svg';
          break;
      }

      //populate return object with correct mood
      returnValue.fill = fill;
      returnValue.svg = svg;

      return returnValue;
  }

  function addMarker(map,latitude,longitude,svgMarkup,fill,stroke)
  {

    // Add the first marker
    var theIcon = new H.map.Icon(
      svgMarkup.replace('${FILL}', fill).replace('${STROKE}', stroke)),
      theMarker = new H.map.Marker({lat:latitude, lng:longitude},
        {icon: theIcon});

    map.addObject(theMarker);

  }

  var getJSON = function() {
    return $http({
      method: 'GET',
      url: 'assets/fake-data.json'
    });
  };

  var addMarkers = function(map)
  {
    getJSON().then(function(data) {
      data.data.forEach(function(element) {
        var marker = getMarkerByMood(element.mood);
        console.log(marker);
        addMarker(map, element.lat, element.lng, marker.svg, marker.fill, marker.stroke);
      });
    });
  };

  //this one is used from ng-click in the html, so need to declare
  //as $scope
  $scope.allMoods = function()
  {
    addMarkers(map);
  };

  // var getCurrentPosition = function()
  // {
  //   if (navigator.geolocation) {
  //       return navigator.geolocation.getCurrentPosition(showPosition);
  //   }
  //   else
  //   {
  //       return "Geolocation is not supported by this browser.";
  //   }
  // };
  //
  // var showPosition = function (position)
  // {
  //   var x = getElementById("display");
  //   x.innerHTML = "Latitude: " + position.coords.latitude +
  //   "<br>Longitude: " + position.coords.longitude;
  //   //window.confirm('current position = ' + position.coords.latitude + ',' + position.coords.longitude);
  // };


  /**
   * Boilerplate map initialization code starts below:
   */

  //Step 1: initialize communication with the platform
  var platform = new H.service.Platform({
    app_id: 'hvdHh87cblpYlufAVPqu',
    app_code: 'hI7JTGFxyFxCuaTlkUdcgg',
    useCIT: true,
    useHTTPS: false
  });
  var defaultLayers = platform.createDefaultLayers();
  //Step 2: initialize a map  - not specificing a location will give a whole world view.
  var map = new H.Map(document.getElementById('map'),
    defaultLayers.normal.map
  );

  // Create the default UI components
  var ui = H.ui.UI.createDefault(map, defaultLayers);

  //Step 3: make the map interactive
  // MapEvents enables the event system
  // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
  var behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

  // Now use the map as required...
  moveMapToBerlin(map);
  setUpClickListener(map);
  //allMoods();



}
