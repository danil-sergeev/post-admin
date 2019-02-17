import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography, Button } from '@material-ui/core';
import {} from '@material-ui/icons';

const styles = (theme) => ({
	mainHeader: {
		display: 'grid',
		flexDirection: 'row',
		justifyContent: 'space-between'
	},
	button: {
		margin: theme.spacing.unit
	}
});

const MainHeader = ({ classes, name, surname, logout }) => (
	<div className={classes.mainHeader}>
		<div>
			<Typography component="h3" variant="h5">
				VK Postings
			</Typography>
		</div>
		<div>
			<Typography component="h5" variant="h5">
				{name} {surname}
			</Typography>
			<Button variant="outlined" color="secondary" className={classes.button} onClick={logout}>
				Logout
			</Button>
		</div>
	</div>
);

export default withStyles(styles)(MainHeader);
