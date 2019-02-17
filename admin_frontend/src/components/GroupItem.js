import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { ListItem, ListItemText } from '@material-ui/core';

const styles = (theme) => ({
	groupItem: {
		//
	}
});

const GroupItem = ({ classes, groupTitle , groupId,  }) => (
	<ListItem button component={Link} to={`/group/${groupId}`}>
        <ListItemText primary={groupTitle}/>
	</ListItem>
);

export default withStyles(styles)(GroupItem);
