import React from 'react';

function Input(props) {
	return (
		<div className='mx-auto my-12 mt-12 '>
			<input
				type='text'
				placeholder='Add ToDo'
				className='border-2 border-solid border-gray-500 rounded py-3 px-2  h-10 sm:w-64 -ml-0.5'
				onChange={(e) => {
					props.setAddItem(e.target.value);
				}}
				value={props.addItem}
			/>
			<button
				className='bg-gradient-to-r from-gray-500 to-gray-700 py-2 px-6 rounded-r-lg text-white ml-[-5px]'
				onClick={props.onAdd}>
				Submit
			</button>
		</div>
	);
}

export default Input;
