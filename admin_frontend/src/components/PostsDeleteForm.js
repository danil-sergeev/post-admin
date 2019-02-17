import React from 'react';
import { withStyles } from '@material-ui/core/styles';

import { Paper, Typography, Button } from '@material-ui/core';

import PostList from './PostList';
import ReachSlider from './ReachSlider';

const styles = (theme) => ({
    formWrapper: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
		alignItems: 'center',
		alignContent: 'center'
    },
    button: {
        marginLeft: theme.spacing.unit,
		marginRight: theme.spacing.unit
    },
});


const PostsDeleteForm = ({classes, posts, deletePostsByReach}) => (
    <div className={classes.formWrapper}>
        <PostList posts={posts} />
        <Paper> 
            <ReachSlider />   
        </Paper>
    </div>
);

export default withStyles(styles)(PostsDeleteForm);
