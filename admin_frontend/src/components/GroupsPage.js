import React from 'react';
import { connect } from 'react-redux';
import { compose, bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import logout from '../actions';

import MainHeader from './MainHeader';
import GroupList from './GroupList';
import StaticFooter from './StaticFooter';

const styles = (theme) => ({
	groupsGrid: {
		display: 'grid',
		gridTemplateRows: 'auto 87vh auto',
		gridTemplateColumns: '1fr',
		width: '100%',
		height: '100%',
		position: 'relative',
		overflow: 'hidden',
		gridTemplateAreas: `
            'header'
            'content'
            'footer'
        `
	},
	headerContainer: {
		gridArea: 'header'
	},
	contentContainer: {
		gridArea: 'content'
	},
	footerContainer: {
		gridArea: 'footer'
	}
});

class GroupsPage extends React.Component {
	render() {
		const { classes, user, logout} = this.props;

		return (
			<div className={classes.groupsGrid}>
				<div className={classes.headerContainer}>
					<MainHeader logout={logout} {...user} />
				</div>

				<div className={classes.contentContainer}>
					<Typography component="h3" variant="h3">
						Choose a group!
					</Typography>
					<GroupList vkId={user.vkId}/>
				</div>

				<div className={classes.footerContainer}>
					<StaticFooter />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user
	};
};


const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			logout
		},
		dispatch
	);


export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(GroupsPage);
