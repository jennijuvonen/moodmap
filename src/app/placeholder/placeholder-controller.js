angular
  .module('application.placeholder')
  .controller('PlaceholderController', PlaceholderController);

PlaceholderController.$inject = ['$scope', '$state', '$http'];

function PlaceholderController($scope, $state, $http)
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

  var getFearfulSvg = function()
  {
    //return '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="24px" height="24px" viewBox="0 0 24 24" enable-background="new 0 0 24 24" xml:space="preserve"> <g id="Layer_1"> <rect x="-1370.177" y="-512.911" fill="#757575" width="1275.13" height="951.095"/> <rect x="-1370.177" y="-512.911" fill="#FFFFFF" stroke="#BDBDBD" stroke-width="0.5" stroke-miterlimit="10" width="1275.13" height="104.688"/> <rect x="-685.458" y="-104.736" fill="#FFFFFF" width="565" height="513.511"/> <g> <defs> <rect id="SVGID_1_" x="-1343.512" y="-382.679" width="640" height="792.655"/> </defs> <clipPath id="SVGID_2_"> <use xlink:href="#SVGID_1_" overflow="visible"/> </clipPath> <g clip-path="url(#SVGID_2_)"> <image overflow="visible" width="2880" height="1800" xlink:href="../../../../../Desktop/Screen Shot 2015-10-17 at 14.05.04.png" transform="matrix(0.5397 0 0 0.5397 -1861.2048 -487.3674)"> </image> </g> </g> <rect x="-685.458" y="-384.181" fill="#26C6DA" width="565" height="263.992"/> <g> <text transform="matrix(1 0 0 1 -1281.2865 -430.5954)"><tspan x="0" y="0" fill="#26C6DA" font-family="'AdventPro-Regular'" font-size="46.2454">mood</tspan><tspan x="100.952" y="0" fill="#757575" font-family="'AdventPro-Regular'" font-size="46.2454">maps</tspan></text> </g> </g> <g id="Layer_2"> <text transform="matrix(1 0 0 1 -528.3756 -279.0102)" fill="#FFFFFF" font-family="'Roboto-Light'" font-size="30">Enter your location</text> <text transform="matrix(1 0 0 1 -516.5157 -33.8401)"><tspan x="0" y="0" fill="#757575" font-family="'Roboto-Light'" font-size="30">Select your </tspan><tspan x="154.131" y="0" fill="#757575" font-family="'Roboto-Light'" font-size="30">mood</tspan></text> <text transform="matrix(1 0 0 1 -599.53 153.8806)" fill="#757575" font-family="'Roboto-Light'" font-size="18.8194">Happy</text> <text transform="matrix(1 0 0 1 -597.0944 312.2179)" fill="#757575" font-family="'Roboto-Light'" font-size="18.8194">Bored</text> <text transform="matrix(1 0 0 1 -422.0668 153.8806)" fill="#757575" font-family="'Roboto-Light'" font-size="18.8194">Sad</text> <text transform="matrix(1 0 0 1 -429.6166 312.2179)" fill="#757575" font-family="'Roboto-Light'" font-size="18.8194">Crazy</text> <text transform="matrix(1 0 0 1 -261.8862 153.8806)" fill="#757575" font-family="'Roboto-Light'" font-size="18.8194">Angry</text> <rect x="-645.874" y="-238.925" fill="#FFFFFF" width="482.833" height="53.648"/> <g> <circle fill="none" stroke="#BDBDBD" stroke-width="3.4985" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="-200.613" cy="-214.532" r="9.971"/> <line fill="none" stroke="#BDBDBD" stroke-width="3.4985" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" x1="-193.46" y1="-207.064" x2="-183.403" y2="-198.74"/> </g> <g> <circle fill="none" stroke="#E91E63" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="-572.738" cy="81.678" r="45.541"/> <g> <path fill="none" stroke="#E91E63" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d=" M-557.597,91.748c-2.744,5.003-8.061,8.396-14.17,8.396c-6.376,0-11.889-3.695-14.514-9.06"/> <circle fill="#E91E63" cx="-585.044" cy="69.592" r="6.38"/> <circle fill="#E91E63" cx="-560.433" cy="69.592" r="6.38"/> </g> </g> <g> <path fill="#1E88E5" d="M38.829-50.776c-24.405,0-44.261-19.855-44.261-44.261s19.855-44.261,44.261-44.261 s44.261,19.855,44.261,44.261S63.234-50.776,38.829-50.776z M38.829-132.981c-20.923,0-37.944,17.021-37.944,37.944 s17.021,37.944,37.944,37.944s37.944-17.021,37.944-37.944S59.751-132.981,38.829-132.981z"/> <g> <path fill="#1E88E5" d="M39.706-75.213c-6.827,0-12.935-3.812-15.938-9.946c-0.767-1.566-0.118-3.459,1.448-4.226 c1.565-0.766,3.459-0.12,4.226,1.448c1.935,3.952,5.867,6.407,10.264,6.407c4.171,0,8.01-2.275,10.019-5.938 c0.839-1.53,2.761-2.087,4.288-1.251c1.529,0.839,2.09,2.759,1.251,4.288C52.145-78.744,46.184-75.213,39.706-75.213z"/> <circle fill="#1E88E5" cx="27.723" cy="-105.945" r="5.759"/> <circle fill="#1E88E5" cx="49.934" cy="-105.945" r="5.759"/> </g> </g> <g> <path fill="#1E88E5" d="M11.983,23.966C5.375,23.966,0,18.59,0,11.983S5.375,0,11.983,0s11.983,5.375,11.983,11.983 S18.59,23.966,11.983,23.966z M11.983,1.71C6.318,1.71,1.71,6.318,1.71,11.983s4.608,10.273,10.273,10.273 s10.273-4.608,10.273-10.273S17.647,1.71,11.983,1.71z"/> <g> <path fill="#1E88E5" d="M12.22,17.35c-1.848,0-3.502-1.032-4.315-2.693c-0.208-0.424-0.032-0.936,0.392-1.144 c0.424-0.207,0.936-0.033,1.144,0.392c0.524,1.07,1.588,1.735,2.779,1.735c1.129,0,2.168-0.616,2.712-1.607 c0.227-0.414,0.747-0.565,1.161-0.339c0.414,0.227,0.566,0.747,0.339,1.161C15.588,16.394,13.974,17.35,12.22,17.35z"/> <circle fill="#1E88E5" cx="8.976" cy="9.03" r="1.559"/> <circle fill="#1E88E5" cx="14.989" cy="9.03" r="1.559"/> </g> </g> <g> <g> <path fill="#26C6DA" d="M-1307.316-428.676c-26.89-24.22-25.483-40.361-25.483-40.361c0-14.141,11.464-25.605,25.605-25.605 c14.141,0,25.605,11.464,25.605,25.605c0,0,0.783,18.048-24.773,39.598L-1307.316-428.676z"/> <circle fill="#FFFFFF" cx="-1307.194" cy="-469.037" r="16.387"/> </g> <path fill="none" stroke="#757575" stroke-width="2.8352" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d=" M-1301.832-464.307c-1.111,2.027-3.265,3.401-5.74,3.401c-2.583,0-4.816-1.497-5.879-3.67"/> <g> <circle fill="#757575" cx="-1312.574" cy="-472.669" r="2.558"/> <circle fill="#757575" cx="-1302.709" cy="-472.669" r="2.558"/> </g> </g> <g> <circle fill="none" stroke="#0097A7" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="-406.115" cy="81.678" r="45.541"/> <g> <path fill="none" stroke="#0097A7" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d=" M-390.974,91.748c-2.744,5.003-8.061,8.396-14.17,8.396c-6.376,0-11.889-3.695-14.514-9.06"/> <circle fill="#0097A7" cx="-418.42" cy="69.592" r="6.38"/> <circle fill="#0097A7" cx="-393.81" cy="69.592" r="6.38"/> </g> </g> <g> <circle fill="none" stroke="#FFAB00" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="-237.723" cy="81.678" r="45.541"/> <g> <path fill="none" stroke="#FFAB00" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d=" M-222.582,91.748c-2.744,5.003-8.061,8.396-14.17,8.396c-6.376,0-11.889-3.695-14.514-9.06"/> <circle fill="#FFAB00" cx="-250.028" cy="69.592" r="6.38"/> <circle fill="#FFAB00" cx="-225.418" cy="69.592" r="6.38"/> </g> </g> <text transform="matrix(1 0 0 1 -266.7241 312.2184)" fill="#757575" font-family="'Roboto-Light'" font-size="18.8194">Fearful</text> <g> <circle fill="none" stroke="#8BC34A" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="-237.723" cy="235.939" r="45.541"/> <g> <path fill="none" stroke="#8BC34A" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d=" M-222.582,246.009c-2.744,5.003-8.061,8.396-14.17,8.396c-6.376,0-11.889-3.695-14.514-9.06"/> <circle fill="#8BC34A" cx="-250.028" cy="223.853" r="6.38"/> <circle fill="#8BC34A" cx="-225.418" cy="223.853" r="6.38"/> </g> </g> <g> <circle fill="none" stroke="#1E88E5" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="-572.738" cy="235.939" r="45.541"/> <g> <path fill="none" stroke="#1E88E5" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d=" M-557.597,246.009c-2.744,5.003-8.061,8.396-14.17,8.396c-6.376,0-11.889-3.695-14.514-9.06"/> <circle fill="#1E88E5" cx="-585.044" cy="223.853" r="6.38"/> <circle fill="#1E88E5" cx="-560.433" cy="223.853" r="6.38"/> </g> </g> <g> <circle fill="none" stroke="#AB47BC" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" cx="-406.115" cy="235.939" r="45.541"/> <g> <path fill="none" stroke="#AB47BC" stroke-width="6.9991" stroke-linecap="round" stroke-linejoin="round" stroke-miterlimit="10" d=" M-390.974,246.009c-2.744,5.003-8.061,8.396-14.17,8.396c-6.376,0-11.889-3.695-14.514-9.06"/> <circle fill="#AB47BC" cx="-418.42" cy="223.853" r="6.38"/> <circle fill="#AB47BC" cx="-393.81" cy="223.853" r="6.38"/> </g> </g> </g> </svg>';
    return '<svg  width="24" height="24" xmlns="http://www.w3.org/2000/svg">' +
    '<rect stroke="black" fill="${FILL}" x="1" y="1" width="22" height="22" />' +
    '<text x="12" y="18" font-size="12pt" font-family="Arial" font-weight="bold" ' +
    'text-anchor="middle" fill="${STROKE}" >B</text></svg>';
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
          fill = 'yellow';
          svg = getHappySvg();
          break;
      case "sad":
          fill = 'blue';
          break;
      case "bored":
          fill = 'grey';
          break;
      case "crazy":
          fill = 'orange';
          break;
      case "fearful":
          fill = 'green';
          svg = getFearfulSvg();
            break;
      case "angry":
          fill = 'red';
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

  var getCurrentPosition = function()
  {
    if (navigator.geolocation) {
        return navigator.geolocation.getCurrentPosition(showPosition);
    }
    else
    {
        return "Geolocation is not supported by this browser.";
    }
  };

  var showPosition = function (position)
  {
    var x = getElementById("display");
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;	
    //window.confirm('current position = ' + position.coords.latitude + ',' + position.coords.longitude);
  };
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
  addMarkers(map);
  var pos = getCurrentPosition();


}
