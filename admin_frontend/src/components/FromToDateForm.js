import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Paper, Typography, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Mutation } from 'react-apollo';
import {FETCH_POSTS_REACHES_MUTATION, FETCH_POST_REACHES} from '../queries';


import Calendar from 'react-calendar';

const styles = (theme) => ({
	formWrapper: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2
	},
	button: {
		margin: theme.spacing.unit
	}
});


class FromToDateForm extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			from: {
				value: new Date()
			},
			to: {
				value: new Date()
			}
		};
	}

	handleCalendarChange = (event) => {
		event.persist();
		const { name, value } = event.target;
		this.setState((prevState) => ({
			[name]: {
				...prevState[name],
				value
			}
		}));
	};

	updateCache = (cache, {data: {fetchPostsReaches}}) => {
		const {postReaches} = cache.readQuery({query: FETCH_POST_REACHES});

		cache.writeQuery({
			query: FETCH_POST_REACHES,
			data: {
				postReaches: postReaches.concat(fetchPostsReaches)
			}
		});
	};

	render() {
		const { classes, token } = this.props;

		return (
			<Mutation mutation={FETCH_POSTS_REACHES_MUTATION} update={this.updateCache}>
				{(fetchPostsReaches) => (
					<form
						onSubmit={async (event) => {
							
							event.preventDefault();
							
							await fetchPostsReaches({
								variables: {
									token: token,
									ownerId: this.props.match.params.groupId,
									fromTime: this.state.from.value,
									toTime: this.state.to.value
								}
							});
						}}
					>
						<Paper className={classes.formWrapper}>
							<Typography variant="subheading">Please choose FROM date:</Typography>
							<Calendar onChange={this.handleCalendarChange} value={this.state.from.value} name="from" />

							<Typography variant="subheading">Please choose TO date:</Typography>
							<Calendar onChange={this.handleCalendarChange} value={this.state.to.value} name="to" />

							<Button variant="outlined" color="primary" className={classes.button} type="submit">
								Upload
							</Button>
						</Paper>
					</form>
				)}
			</Mutation>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		token: state.auth.token
	};
};

export default compose(withStyles(styles), connect(mapStateToProps))(FromToDateForm);
