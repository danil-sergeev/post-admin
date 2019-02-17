import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Button } from "@material-ui/core";


const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
    },
});  

const VkOauthButton = ({classes, vkAuth}) => {
    return (
        <div>
            <Button variant="outlined" color="primary" className={classes.button} onClick={vkAuth}>
                VK Auth
            </Button>
        </div>
    )
};


export default withStyles(styles)(VkOauthButton);