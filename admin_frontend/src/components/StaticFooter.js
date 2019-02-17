import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

const styles = (theme) => ({
	staticFooter: {
		textAlign: 'center'
	}
});

const StaticFooter = ({ classes }) => (
	<Typography variant="subheading" className={classes.staticFooter}>
		Telegram: @yungcatx
	</Typography>
);

export default withStyles(styles)(StaticFooter);
