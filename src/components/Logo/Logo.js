import React from 'react';
import Tilt from 'react-tilt';
import './Logo.css';
import robot from './icons8-science-fiction-96.png'

const Logo = (props) => {
	return (

		<div className='ma4 mt0'>
			<Tilt className="Tilt br2 shadow-2" options={{ max : 75 }} style={{ height: 125, width: 125 }} >
			<div className="Tilt-inner pa3"> <img style={{paddingTop: '2px'}} alt='logo' src={robot} /> </div>
			</Tilt>
		</div>

		);

}

export default Logo;