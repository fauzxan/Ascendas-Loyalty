import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import "./styles/partnerCard.scss";
import Axios from "axios";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	"& .MuiDialogContent-root": {
		padding: theme.spacing(2),
	},
	"& .MuiDialogActions-root": {
		padding: theme.spacing(1),
	},
}));

const BootstrapDialogTitle = (props) => {
	const { children, onClose, ...other } = props;

	return (
		<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
			{children}
			{onClose ? (
				<IconButton
					aria-label="close"
					onClick={onClose}
					sx={{
						position: "absolute",
						right: 8,
						top: 8,
						color: (theme) => theme.palette.grey[500],
					}}
				>
					<CloseIcon />
				</IconButton>
			) : null}
		</DialogTitle>
	);
};

BootstrapDialogTitle.propTypes = {
	children: PropTypes.node,
	onClose: PropTypes.func.isRequired,
};

export default function Popup(props) {
	const [open, setOpen] = React.useState(false);
	const [listData, setListData] = React.useState([]);
	React.useEffect(() => {
        Axios.get('http://localhost:8999/getData').then((response) => {
            // the response variable catches whatever data you get from the backend.
            setListData(response.data);
        })
    }, []);

	const handleClickOpen = () => {
		setOpen(true);
	};
	const handleClose = () => {
		setOpen(false);
	};

	return (
		<div>
			<Button
				variant="contained"
				className="card__button"
				onClick={handleClickOpen}
			>
				Get Rewards
			</Button>
			<BootstrapDialog
				onClose={handleClose}
				aria-labelledby="customized-dialog-title"
				open={open}
			>
				<BootstrapDialogTitle
					id="customized-dialog-title"
					onClose={handleClose}
				>
					{props.result}
					{/*this prop displays if the result is a success or failure depending on the validation*/}
				</BootstrapDialogTitle>
				<DialogContent dividers>
					<Typography gutterBottom>
						Your {props.pointsSelected} are on their way to your account
					</Typography>
					<Typography gutterBottom>
						You'll recieve an email regarding this in a few days
					</Typography>
					<Typography gutterBottom>
						Your confirmation code is as follows: {props.confirmCode}
					</Typography>
				</DialogContent>
				<DialogActions>
					<Button autoFocus onClick={handleClose}>
						Ok
					</Button>
				</DialogActions>
			</BootstrapDialog>
		</div>
	);
}
/*
 How to display the data on the frontend side:
 1. the points information must be entered into the popup window
    This includes information like 
    i. bank ID (either entered here or is automatically sent to the LP via user account)
    ii. points redeemed - this must not exceed the total number of points available for THAT user on THAT account
    iii. etc.

 2. the points information must be validated on the client side (this part is done already by Anthony)
 
 3. the points information must be sent to the loyalty program API- the indicator of the 
    the successful sending of the accrual file must be handled by someone
 
 4. the successful sending of the API request must be shown as a popup dialogue  
    (half done by Fauzaan-need information from the accrual file system and the validation system as well.)
    The popup dialog must contain a verification code that the user must enter (need to discuss what this is for)
 
 5. Once the data has been validated by the loyalty program API, the updated data needs to be reflected on the 
    client side on the partnerCards.js
    i. the updated data includes points information
   
*/ 
