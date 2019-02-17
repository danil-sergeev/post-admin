import * as types from '../constants/posts';
import * as groupTypes from '../constants/groups';
import redirect from './services';
import requestApi from '../utils/request';

// TODO:
// POST FETCHING ACTIONS
// MOST COMPLICATED PART OF THIS PROJECT

export const fetchPostsByTime = (from, to) => {
	return (dispatch, getState) => {
		const { activeId } = getState().groups;

		dispatch({
			type: types.FETCH_POSTS_REQUEST
		});

		return requestApi(`api/v1/posts/fetch/${activeId}`, undefined, {fromTime: from, toTime: to })
			.then((response) => {
                dispatch({
                    type: types.FETCH_POSTS_SUCCESS, 
                    payload: response
                });
            })
			.catch((reason) =>
				dispatch({
					type: types.FETCH_POSTS_FAILURE,
					payload: reason
				})
			);
	};
};


export const deletePostsByReach = (posts, reach) => {

    return (dispatch, getState) => {

        const { activeId } = getState().groups;

        dispatch({
            type: types.DELETE_POSTS_REQUEST
        });

        return requestApi(`api/v1/posts/delete/${activeId}`, undefined, {posts: posts, reachTotal: reach})
            .then(({message}) => {
                dispatch({
                    type: types.DELETE_POSTS_SUCCESS,
                });

                dispatch({
                    type: groupTypes.UNSET_ACTIVE_GROUP
                });

                dispatch(redirect('/groups'));

                return message
            })
            .catch((reason) => dispatch({
                type: types.DELETE_POSTS_FAILURE,
                payload: reason
            }));
    };
};