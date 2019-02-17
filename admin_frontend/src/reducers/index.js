import {combineReducers} from 'redux';
import auth from './auth';
import groups from './groups';
import posts from './posts';

export default combineReducers({
    auth,
    groups,
    posts
});