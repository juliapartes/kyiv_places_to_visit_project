import React, { Component } from 'react';
import escapeRegExp from 'escape-string-regexp';

/*https://github.com/sindresorhus/escape-string-regexp*/

/*Slide Menu component*/

class SlideMenu extends Component {

/*Here are states for:
the query, that user types in the input field;
the filtred markers and the filtred query*/

	state = {
		query: '',
		filtredMarkers: [
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
		],
		filtredQuery: [
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

/*Searching through locations list implemented based on reacr: myReads project*/

updateQuery = (query) => {
	this.setState({ query });
	this.updatefiltredQuery(query);
}


/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp
'i' in the RegExp parametr allows to ignore case, so the search works better*/

/*https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_Expressions*/

/*In the updatefiltredQuery method with regular expression test method,
we check if the query match any location (and marker).

When query exist, the all the markers firstly setted to no visible, 
but if any of them match the query, they setted to visible*/

updatefiltredQuery = (query) => {
/*https://www.sitepoint.com/bind-javascripts-this-keyword-react/*/
	let component = this;

	if(query) {
		let re = new RegExp(escapeRegExp(query), 'i');

		this.setState({
			filtredQuery: this.props.locationsList.filter(location =>
				re.test(location.title)), 
			filtredMarkers: this.props.allMarkers.filter(marker =>
				re.test(marker.title))
		})

		this.props.allMarkers.map(marker => 
			marker.setVisible(false));
		
		setTimeout(function () {
			component.props.allMarkers.map(marker =>
			{
				component.state.filtredMarkers.map(filtredMarker =>
					{if(marker.id === filtredMarker.id) {
						marker.setVisible(true)
					}}
				)
			})
		}, 500);

	} else {
		this.setState({ filtredQuery: this.props.locationsList, 
			filtredMarkers: this.props.allMarkers });
	}
}

	render() {
		return(
			<div className="slide-menu" aria-label="slide menu" role="navigation">
			    <input 
			    type='text' 
			    placeholder='Location Filter'
			    value={this.state.query}
			    onChange={(event) => this.updateQuery(event.target.value)}
			    aria-label="search box"
			    role="search"
			    />

			    <ol className="location-list" aria-label="list of locations">
				    {
				    	this.state.filtredQuery.map(location => (
				    		<li key={location.id}
				    		onClick={() => this.props.openInfoWindow(location)}
				    		aria-label="location title"
				    		role="button"
				    		tabIndex='0'
				    		>
				    		{location.title}
				    		</li>
				    		))
				    }
			    </ol>
			</div>
		);
	}
}

export default SlideMenu;