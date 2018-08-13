import React, { Component } from 'react';

/*Info Window component,
consists of title of the location, close button that allow to close the info window,
information part and also an attribution*/

class InfoWindow extends Component {
	render() {
		return(
			<div className='info-window' aria-label="information window about location from wikipedia" tabIndex='0'>
				<div className='info-window-header'>
			{/*Showing the title of selected marker or selected location from the list*/}
					<h2 className='info-window-marker-title' aria-label="name of selected location">{this.props.selectedMarker.title} </h2>
			{/*Button for closing info window*/}
					<button className="fa fa-times close"
					aria-label="close info window"
					onClick={this.props.infoWindowClose}></button>

				</div>
			{/*Content for the info window*/}
				<article className='info-window-content'>{this.props.wikiData}</article>
			{/*Wikipedia atribution*/}
				<div className='wikipedia' aria-label="attribution">Provided by Wikipedia</div>

			</div>
		) 
	}
}
export default InfoWindow;