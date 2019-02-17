import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import { Typography } from '@material-ui/core';

import { bindActionCreators, compose } from 'redux';
import { vkAuth } from '../actions';

import VkOauthButton from './VkOauthButton';
import StaticFooter from './StaticFooter';

const styles = (theme) => ({
	grid: {
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
		gridArea: 'header',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	},
	contentContainer: {
		gridArea: 'content',
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	},
	footerContainer: {
		gridArea: 'footer'
	}
});

class IntroPage extends Component {
	render() {
		const { classes, vkAuth, isAuthenticated } = this.props;

		if (isAuthenticated) {
			return <Redirect to="/groups" />;
		}

		return (
			<div className={classes.grid}>
				<div className={classes.headerContainer}>
					<Typography variant="h3" component="h1">
						VK Postings Statistics
					</Typography>
				</div>

				<div className={classes.contentContainer}>
					<VkOauthButton vkAuth={vkAuth} />
				</div>

				<div className={classes.footerContainer}>
					<StaticFooter />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => ({
	isAuthenticated: state.auth.isAuthenticated
});

const mapDispatchToProps = (dispatch) =>
	bindActionCreators(
		{
			vkAuth
		},
		dispatch
	);

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(IntroPage);
