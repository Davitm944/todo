import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function CountDownModal(props) {
	const [ value, setValue ] = React.useState('');
	const [ open, setOpen ] = React.useState(true);
	const handleApply = () => {
		props.setOpenCount(false);
		setOpen(false);
		if (typeof Number(value) === 'number' && value > 0) {
			props.setTime(value);
			const newList = props.list.filter((item) => {
				if (item.key === props.itemKey) {
					item.time = value;
				}
				return item;
			});
			props.setList(newList);
			console.log(newList);
		} else {
			alert('type valid value');
		}
	};

	const handleClose = () => {
		props.setOpenCount(false);
		setOpen(false);
	};

	return (
		<div>
			<Dialog open={open} onClose={handleClose}>
				<DialogTitle>Set timer</DialogTitle>
				<DialogContent>
					<DialogContentText>Please set the time when task should be done!</DialogContentText>
					<TextField
						autoFocus
						margin='dense'
						id='name'
						label='Type time using minutes'
						type='email'
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
export default CountDownModal;
