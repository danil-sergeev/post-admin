import React from 'react';
import {withStyles} from '@material-ui/core/styles';
import {ListItem, Typography, Avatar} from '@material-ui/core';
import {Forum as ForumIcon} from '@material-ui/icons';

const styles = (theme) => ({
    groupItem: {
        //
    },
    _id: {
        fontSize: 14
    }
});

const GroupItem = ({classes, postId, reachSubs, reachTotal, reachViral, toGroup, reports}) => (
    <ListItem>
        <Avatar>
          <ForumIcon />
        </Avatar>
        <Typography className={classes._id}>
            {postId}
        </Typography>
        <Typography>
            Reach total: {reachTotal}
        </Typography>
        <Typography>
            Reach subs: {reachSubs}
        </Typography>
        <Typography>
            Reach viral: {reachViral}
        </Typography>
        <Typography>
            To Group: {toGroup}
        </Typography>
        <Typography>
            Reports: {reports}
        </Typography>
    </ListItem>
);

export default withStyles(styles)(GroupItem);