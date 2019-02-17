import React from 'react';
import { connect, bindActionCreators } from 'react-redux';
import { compose } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import { Query } from 'react-apollo';


import { FETCH_POST_REACHES } from '../queries';
import {logout} from '../actions';

import MainHeader from './MainHeader';
import FromToDateForm from './FromToDateForm';
import PostsDeleteForm from './PostsDeleteForm';
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
	header: {
		gridArea: 'header'
	},
	content: {
		gridArea: 'content'
	},
	footer: {
		gridArea: 'footer'
	}
});

const GroupByIdPage = ({ classes, user, logout }) => (
	<div className={classes.grid}>
		<div className={classes.header}>
			<MainHeader logout={logout} name={user.firstName} surname={user.lastName}/>
		</div>

		<Query query={FETCH_POST_REACHES} variables={this.props.match.params.groupId}>
			{({ loading, error, data }) => {
				if (loading) return 'Loading...';
				if (error) return `Error: ${error}`;

				const { postReaches } = data;

				return (
					<div className={classes.content}>
						{postReaches && postReaches.length ? (
							<PostsDeleteForm posts={postReaches} />
						) : (
							<FromToDateForm />
						)}
					</div>
				);
			}};
		</Query>

		<div className={classes.footer}>
			<StaticFooter />
		</div>
	</div>
);

const mapStateToProps = (state) => {
	return {
		isAuthenticated: state.auth.isAuthenticated,
		user: state.auth.user
	};
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
	logout
}, dispatch)

export default compose(withStyles(styles), connect(mapStateToProps, mapDispatchToProps))(GroupByIdPage);
