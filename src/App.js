import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import check from 'components/icons/check.png';
import edit from 'components/icons/pen.png';
import remove from 'components/icons/x.png';
import watch from 'components/icons/stopwatch.png'
import EditModal from 'components/modals/EditModal';
import {DragDropContext, Droppable, Draggable} from 'react-beautiful-dnd'
import Countdown from 'react-countdown';
import CountDownModal from 'components/modals/CountDownModal';
import Input from 'components/input/Input' 


function App() {

	const [ list, setList ] = useState([]);
	const [ addItem, setAddItem ] = useState('');
	const [ open, setOpen ] = useState(false);
	const [ openCount, setOpenCount ] = useState(false);
	const [time, setTime] = useState(0)
	const [key, setKey] = useState('')

	useEffect(() => {
		const data = localStorage.getItem('todo-list')
		if(data) {
			setList(JSON.parse(data))
		}
	}, [])

	useEffect(() => {
		localStorage.setItem('todo-list', JSON.stringify(list))	
	})

	const onAdd = () => {
		const newList = list;
		if(addItem.length <= 0){
			alert('type valid value')
			return
		}
		const newItem = {
			value : addItem,
			key   : uuidv4(),
			done  : false,
			time	: null
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
				if(item.time){
					item.time = null
				}
			}
			return item;
		});
		setList(newList);
	}

	const handleTimer = (key) => {
		setKey(key)
		setOpenCount(true)
	}

	const onDragEnd = (result) => {
		if(!result.destination){
			return
		}
		const newList = list;
		const [reOrdered] = newList.splice(result.source.index, 1)
		newList.splice(result.destination.index, 0, reOrdered);
		setList(newList)
	} 

	return (
		<div className='bg-neutral-200 w-screen h-screen flex flex-col'>
			{open ? <EditModal open={open} setOpen={setOpen} list={list} setList={setList} itemKey={key}  /> : <></>}
			{openCount ? <CountDownModal setTime={setTime} setOpenCount={setOpenCount} list={list} setList={setList} itemKey={key}/> : <></>}
			<div className='mx-auto my-5 w-1/2 h-full bg-neutral-400 shadow-lg rounded-sm shadow-gray-500  flex flex-col '>
					<Input list={list} setList={setList} addItem={addItem} setAddItem={setAddItem} onAdd={onAdd}/>
				<div>
					<DragDropContext onDragEnd={onDragEnd}>
						<Droppable droppableId='droppable-1 '>
							{(provided ) =>  (
					<section {...provided.droppableProps} ref={provided.innerRef}>
						{list.map((item, index) => {
							return (
								<Draggable key={item.key} draggableId={item.key} index={index}>
									{(provided) => ( 
								<div {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef } className='todo_item'>
									<div className='max-w-xl w-full sticky'>
										{item.done ? <span className='line-through'>{item.value}</span> :  <span>{item.value}</span>}
									</div>
									<div className='flex'>
									{item.time ? <div className='timer'><Countdown date={Date.now() + 1000 * 60 * item.time} /></div> : <></>}
										<div className='wrapper'>
											<img src={watch} alt='logo' onClick={() => handleTimer(item.key)}/>
										</div>
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
								)}
								</Draggable>
							);
						})}
					{provided.placeholder}
					</section>
					
					)}
					</Droppable>
					</DragDropContext>
				</div>
			</div>
		</div>
	);
}

export default App;
