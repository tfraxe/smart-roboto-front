import React from 'react';

const Rank = (props) => {
	return (

		<div>
			<div className='white f3 '>
				{`${props.user.name}, your current score is...`}
			</div>


			<div className='white f1 '>
				{props.user.score}
			</div>
		</div>

		);

}

export default Rank;