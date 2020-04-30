import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
	return (

		<div>
			<p className='f3'>
				{'This Robot will detect faces in your pictures. Give it a try!	'}
			</p>

			<div className='center'>
				<div className='form  pa4 br3 shadow-5'>
					<input className='f4 pa2 w-70 ' type='text' onChange={onInputChange} />
					<button className='w-35 br2 grow f5 link ph3 pv2 dib white bg-light-purple' onClick={onSubmit}> {'Detect'} </button>
				</div>
			</div>

		</div>

		);

}

export default ImageLinkForm;