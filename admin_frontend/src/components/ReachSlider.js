import React from 'react';
import Slider from 'rc-slider';
import { Mutation } from 'react-apollo';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { TextField, Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

import { FETCH_POST_REACHES, DELETE_POST_REACHES_MUTATION } from '../queries';

const styles = (theme) => ({
	textField: {
		marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
	},
	formWrapper: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
	}
});

class ReachSlider extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			min: null,
			max: null
		};
	}
	onSliderChange = (value) => {
		console.log(value);
	};
	onMinChange = (e) => {
		this.setState({
			min: +e.target.value
		});
	};
	onMaxChange = (e) => {
		this.setState({
			max: +e.target.value
		});
	};

	updateCache = (cache, { data: deletePostsWithReaches }) => {
		console.log(deletePostsWithReaches);
		cache.writeQuery({
			query: FETCH_POST_REACHES,
			data: {
				postReaches: null
			}
		});
	};

	render() {
		const { classes, token } = this.props;
		return (
			<Mutation mutation={DELETE_POST_REACHES_MUTATION} update={this.updateCache}>
				{(deletePostsWithReaches) => (
					<form
						onSubmit={async (event) => {
							event.preventDefault();

							await deletePostsWithReaches({
								variables: {
									token: token,
									ownerId: this.props.match.params.groupId,
									min: this.state.min,
									max: this.state.max
								}
							});
						}}
						className={classes.formWrapper}
					>
						<TextField
							id="min"
							label="Min"
							type="number"
							className={classes.textField}
							margin="normal"
							value={this.state.min}
							onChange={this.onMinChange}
							InputProps={{
								readOnly: true
							}}
							variant="outlined"
						/>
						<TextField
							id="max"
							label="Max"
							className={classes.textField}
							margin="normal"
							value={this.state.max}
							onChange={this.onMaxChange}
							InputProps={{
								readOnly: true
							}}
							variant="outlined"
						/>
						<Slider min={this.state.min} max={this.state.max} onChange={this.onSliderChange} />
						<Button variant="outlined" color="primary" className={classes.button} type="submit">
							Delete
						</Button>
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

export default compose(withStyles(styles), connect(mapStateToProps))(ReachSlider);
