import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {List, Typography} from '@material-ui/core';

import PostItem from './PostItem';

const styles = (theme) => ({
    postList: {
        gridArea: 'postList',
        overflow: 'auto'
    },
});

const PostList = ({classes, posts}) => (
    <div className={classes.postList}>
        <List>
            {posts && posts.length ? (
                posts.map((post) => <PostItem key={post.postId} {...post} />)
            ) : (
                <Typography variant="subheading" className={classes.noPosts}>
                    Something went wrong. There is no posts yet...
                </Typography>
            )}
        </List>
    </div>
);

export default withStyles(styles)(PostList);