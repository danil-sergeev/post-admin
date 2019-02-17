import * as types from '../constants/posts';

const initialState = {
    posts: []
};

const posts = (state=initialState, action) => {
    switch (action.type) {
        case types.FETCH_POSTS_SUCCESS:
            return {
                posts: action.payload.posts
            }
        case types.DELETE_POSTS_SUCCESS:
            return {
                posts: null
            }
        default:
            return state
    }
};

export const getPostId = (post) => post.postId; 


export default posts;