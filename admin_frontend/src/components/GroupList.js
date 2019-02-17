import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { List, Typography } from '@material-ui/core';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import {GET_GROUPS_BY_ID} from '../queries'

import GroupItem from './GroupItem';

const styles = (theme) => ({
	groupList: {
		gridArea: 'groupList',
		overflow: 'auto'
	},
	noGroups: {
		textAlign: 'center'
	}
});


const GroupList = ({ classes, vkId }) => (
	<div className={classes.groupList}>
		<Query query={GET_GROUPS_BY_ID} variables={vkId}>
			{({ loading, error, data }) => {
				if (loading) return 'Loading...';
				if (error) return `Error: ${error}`;

				const { myGroups } = data;

				return (
					<List>
						{myGroups && myGroups.length ? (
							myGroups.map((group) => <GroupItem key={group.groupId} {...group} />)
						) : (
							<Typography variant="subheading" className={classes.noGroups}>
								There is no groups yet...
							</Typography>
						)}
					</List>
				);
			}};
		</Query>
	</div>
);

export default withStyles(styles)(GroupList);
