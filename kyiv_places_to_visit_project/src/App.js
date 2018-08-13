/*I have tried to add most of references I used in the comments,
if I would like to see them later,
so sometimes there are several references to one method*/

import React, { Component } from 'react';
import fetchJsonp from 'fetch-jsonp';

/*Components import*/
import Header from './Header.js';
import SlideMenu from './SlideMenu.js';
import InfoWindow from './InfoWindow.js';
import Map from './Map.js';

/*Locations are hardcoded in the state, provided with
https://www.latlong.net/*/

class App extends Component {

/*Here are states for: controlling opening/closing the slide menu;
controlling opening/closing the info window;
collecting all the markers, when they are created;
collecting the information about selected location;
collecting information from Wikipedia
and hardcoded list of locations*/

  state = {
    slideMenuIsClose: true,
    infoWindowIsClose: true,
    allMarkers: [],
    selectedMarker: '',
    wikiData: '',
    locationsList: [
{
          'title': 'Kiev Pechersk Lavra',
          'id': 'lavra',
          'location': { 'lat': 50.434638, 'lng': 30.557256 },
          'wikiURL': 'Kiev_Pechersk_Lavra'
},

{
          'title': 'Maidan Nezalezhnosti',
          'id': 'maidan',
          'location': { 'lat': 50.450778, 'lng': 30.523686 },
          'wikiURL': 'Maidan_Nezalezhnosti'
},

{
          'title': 'The Motherland Monument',
          'id': 'motherland',
          'location': { 'lat': 50.426583, 'lng': 30.563054 },
          'wikiURL': 'The_Motherland_Monument'
},

{
          'title': 'Saint Andrews Church',
          'id': 'standrewchurch',
          'location': { 'lat': 50.459032, 'lng': 30.517931 },
          'wikiURL': 'St_Andrew%27s_Church,_Kiev'
},

{
          'title': 'Saint Sophia Cathedral',
          'id': 'sopiacathedral',
          'location': { 'lat': 50.452909, 'lng': 30.514306 },
          'wikiURL': 'Saint_Sophia%27s_Cathedral,_Kiev'
},

{
          'title': 'Golden Gates of Kyiv',
          'id': 'goldengates',
          'location': { 'lat': 50.448832, 'lng': 30.513332 },
          'wikiURL': 'Golden_Gate,_Kiev'
}
    ]
  }

/*https://eddyerburgh.me/toggle-visibility-with-react*/

/*If the slide menu state is true, then clicking on the button
will change the state and open the slide menu,
second click on the button will change the state back and close the slide menu*/

slideMenuController = () => {
  if(this.state.slideMenuIsClose) {
    this.setState({ slideMenuIsClose: false})
  } else {
    this.setState({ slideMenuIsClose: true})
  }
}

/*Same principle is here. But I needed to separate this in two methods, 
because there are few ways to open the info window, but one way to close it (close button)*/

infoWindowController = () => {
  this.setState({ infoWindowIsClose: false})
}

infoWindowClose = () => {
  this.setState({ infoWindowIsClose: true})
}


/*https://www.klaasnotfound.com/2016/11/06/making-google-maps-work-with-react/*/

componentDidMount() {
/*Connect the initMap() function to the global window context */
  window.initMap = this.initMap;
/*Asynchronously load the Google Maps script, passing in the callback reference*/
  loadJS('https://maps.googleapis.com/maps/api/js?key=AIzaSyBtQ52jzO9ISgzr_JbLG0pbMtxcPgC7jS4&callback=initMap');

/*http://qaru.site/questions/505326/try-catch-for-error-message-in-google-maps-api*/

/*Catching the Google Maps error*/
  window.gm_authFailure = () => {
    alert('Sorry! Google maps failed to load! Authentication problem');
  }
}

/*Map initialization*/

initMap = (state) => {
  const google = window.google;
/*https://www.sitepoint.com/bind-javascripts-this-keyword-react/*/
  let component = this;

/*Image link for the markers*/

  const markerIcon = new google.maps.MarkerImage("http://maps.google.com/mapfiles/ms/icons/blue-dot.png");

/*Creating the map, with zoom 13 and centr coordinates in Kyiv*/

  let map = new google.maps.Map(document.getElementById('map'), {
        zoom: 13,
        center: {lat: 50.4406269, lng: 30.5015694}  
        });

/*Creating markers on the map*/

  this.state.locationsList.map(location =>
  {
    let marker = new google.maps.Marker({
      map: map,
      position: location.location,
      id: location.id,
      title: location.title,
      icon: markerIcon,
      wikiURL: location.wikiURL,
      animation: google.maps.Animation.DROP
    })

/*All markers are added to the allMarkers state*/

    this.state.allMarkers.push(marker);

/*When clicking on the marker, the openInfoWindow methos is called,
so the info window is open*/

    marker.addListener('click', function() {
      component.openInfoWindow(marker);
    });
  })
}

/*When openInfoWindow methos is called, 
the setSelectedLocation method set selected marker to the selectedMarker state.
It is important, because the info window title collects the information from this state.
This method helps to ensure, that right location will setted, both when clicking on the marker
or selectong location from the list.
Next getData method collects the infromation from Wikipedia.
Next the infoWindowController methos opens the info window.

After small timeout the animation method is called.
I've tried to do it without timeout method,
but this is not worked, because as I learnt from my observations,
the state does not always manage to change on time*/

openInfoWindow = (marker) => {
  const google = window.google;
  let component = this;

  this.setSelectedLocation(marker);
  this.getData(marker);
  this.infoWindowController();

  setTimeout(function() {
   component.toggleBounce(component.state.selectedMarker);
  }, 200);
}

/*setSelectedLocation set the marker associated with selected location to the state*/

setSelectedLocation = (location) => {
  this.state.allMarkers.map(marker =>
      {if(marker.id === location.id) {
        this.setState({selectedMarker: marker});
      }}
  )
}

/*https://developers.google.com/maps/documentation/javascript/examples/marker-animations
from API documentation*/

/*Simple bounce animation for the marker.
The animation will stop after one bounce automatically*/

toggleBounce = (marker) => {
  const google = window.google;

  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
      setTimeout(function() {
        marker.setAnimation(null);
      }, 200)
  }
}



/*https://www.robinwieruch.de/react-fetching-data/*/

/*I've tried fetching with native fetch method firstly, but I had errors, so
I finally deciced to use the library*/

/*https://github.com/camsong/fetch-jsonp*/

/*https://stackoverflow.com/questions/7185288/how-to-get-wikipedia-content-using-wikipedias-api*/

getData = (marker) => {
  let component = this;

  fetchJsonp(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro=&explaintext=&titles=${marker.wikiURL}`)
    .then(response => response.json())
    .then(data => {
       component.setState({wikiData: data.query.pages[Object.keys(data.query.pages)[0]].extract});
     }).catch(error => {
          component.setState({wikiData: 'Sorry! Information was not loaded!'});
        })
}


  render() {
    return (

      <main className="App">

{/*Render the header component*/}
        <Header 
          slideMenuController={this.slideMenuController}
        />

{/*If slide menu state is false then render the slide menu component*/}
        {!this.state.slideMenuIsClose && 
          <SlideMenu 
            locationsList={this.state.locationsList}
            allMarkers={this.state.allMarkers}
            openInfoWindow={this.openInfoWindow}
            toggleBounce={this.toggleBounce}
          />
        }

{/*If info window state is false then render the info window component*/}
        {!this.state.infoWindowIsClose &&        
          <InfoWindow 
            wikiData={this.state.wikiData}
            selectedMarker={this.state.selectedMarker}
            infoWindowClose={this.infoWindowClose}
            selectedMarker={this.state.selectedMarker}
          />
        }
{/*Render the map component*/}
        <Map />

      </main>
    );
  }
}

export default App;

function loadJS(src) {
  let ref = window.document.getElementsByTagName('script')[0];
  let script = window.document.createElement('script');

  script.src = src;
  script.async = true;
  ref.parentNode.insertBefore(script, ref);

  script.onerror = function () {
    alert('Sorry! Google maps failed to load! Please check your Internet connection')
  };
}