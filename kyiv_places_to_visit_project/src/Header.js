import React, { Component } from 'react';

/*Header component,
here are the title of the cite and the button for opening the slide menu*/

class Header extends Component {
	render() {
		return(
        <div className="app-header" aria-label="header">
          <button className="fas fa-bars hamburger"
          aria-label="open slide menu"
          onClick={this.props.slideMenuController.bind(this)}></button>

          <h1 className="app-title" aria-label="header title">Kyiv: places to visit</h1>
        </div> 
		) 
	}
}

export default Header;