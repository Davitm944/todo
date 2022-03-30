import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import check from 'components/Icons/check.png';
import edit from 'components/Icons/pen.png';
import remove from 'components/Icons/x.png';
import EditModal from 'components/EditModal';

function App() {

	const [ list, setList ] = useState([]);
	const [ addItem, setAddItem ] = useState('');
	const [ open, setOpen ] = useState(false);
	const [key, setKey] = useState('')

	const onAdd = () => {
		const newList = list;
		const newItem = {
			value : addItem,
			key   : uuidv4(),
			done  : false
		}
		newList.push(newItem);
		setList(newList);
		setAddItem('');
	};



	const onDelete = (key) => {
		const newList = list.filter((item) => {
			return item.key !== key;
		});
		setList(newList);
	};

	const onEdit = (key) => {
		setKey(key)
		setOpen(true)
	};

	const onDone = (key) => {
		const newList = list.filter((item) => {
			if (item.key === key) {
				item.done = !item.done;
			}
			return item;
		});
		setList(newList);
	}


                   
	return (
		<div className='bg-neutral-200 w-screen h-screen flex flex-col'>
			{open ? <EditModal open={open} setOpen={setOpen} list={list} setList={setList} itemKey={key}  /> : <></>}
			<div className='mx-auto my-5 w-1/2 h-full bg-neutral-400 shadow-lg rounded-sm shadow-gray-500  flex flex-col '>
				<div className='mx-auto my-12 mt-12 '>
					<input
						type='text'
						placeholder='Add ToDo'
						className='border-2 border-solid border-gray-500 rounded py-3 px-2  h-10 sm:w-64 -ml-0.5'
						onChange={(e) => {
							setAddItem(e.target.value);
						}}
						value={addItem}
					/>
					<button
						className='bg-gradient-to-r from-gray-500 to-gray-700 py-2 px-6 rounded-r-lg text-white ml-[-5px]'
						onClick={onAdd}>
						Submit
					</button>
				</div>
				<div>
					<section>
						{list.map((item) => {
							return (
								<div key={item.key} className='flex justify-between px-2 bg-gray-300 border-b-2 border-black'>
									<div className='max-w-xl w-full'>
										{item.done ? <span className='line-through'>{item.value}</span> :  <span>{item.value}</span>}
									</div>
									<div className='flex'>
										<div className='wrapper'>
											<img src={check} alt='logo' onClick={() => onDone(item.key)}/>
										</div>
										<div className='wrapper'>
											<img src={edit} alt='logo' onClick={() => onEdit(item.key)} />
										</div>
										<div className='wrapper'>
											<img src={remove} alt='logo' onClick={() => onDelete(item.key)} />
										</div>
									</div>
								</div>
							);
						})}
					</section>
				</div>
			</div>
		</div>
	);
}

export default App;
