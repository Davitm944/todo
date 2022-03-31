import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function EditModal(props) {
	const [ value, setValue ] = React.useState('');
	const [ open, setOpen ] = React.useState(true);
	const set = props.setOpen;

	const handleApply = () => {
		setOpen(false);
		set(false);
		if (value) {
			const newList = (
				props.list.filter((item) => {
					if (item.key === props.itemKey) {
						item.value = value;
					}
					return item;
				})
			);
      props.setList(newList)
		} else {
			alert('type valid value');
		}
	};

	const handleClose = () => {
		setOpen(false);
		set(false);
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Edit ToDo</DialogTitle>
				<DialogContent>
					<DialogContentText />
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='New task'
						fullWidth
						variant='standard'
						value={value}
						onChange={(e) => setValue(e.target.value)}
					/>
				</DialogContent>
				<DialogActions>
					<Button onClick={handleClose}>Cancel</Button>
					<Button onClick={handleApply}>Apply</Button>
				</DialogActions>
			</Dialog>
		</div>
	);
}

export default EditModal;
