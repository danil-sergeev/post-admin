import * as types from '../constants/groups';
import requestApi from '../utils/request';
import redirect from './services';

export const getGroups = () => {
	return (dispatch, getState) => {
		const { vkId } = getState().auth.user;

		dispatch({
			type: types.FETCH_GROUPS_REQUEST
		});

		return requestApi(`api/v1/groups/my/${vkId}`)
			.then((response) => {
				dispatch({
					type: types.FETCH_GROUPS_SUCCESS,
					payload: response
				});
			})
			.catch((reason) =>
				dispatch({
					type: types.FETCH_GROUPS_FAILURE,
					payload: reason
				})
			);
	};
};

export const fetchGroup = (groupId) => {
	return (dispatch, getState) => {
		dispatch({
			type: types.FETCH_GROUP_REQUEST
		});

		return requestApi(`api/v1/groups/${groupId}`)
			.then((response) => {
				dispatch({
					type: types.FETCH_GROUP_SUCCESS,
					payload: response
				});

				return response;
			})
			.catch((reason) =>
				dispatch({
					type: types.FETCH_GROUPS_FAILURE,
					payload: reason
				})
			);
	};
};

export const selectActiveGroup = (groupId) => {
	return (dispatch) => {
		return dispatch(fetchGroup(groupId)).then((data) => {
			if (!data) {
				return dispatch({
					type: types.UNSET_ACTIVE_GROUP
				});
			}

			dispatch({
				type: types.SET_ACTIVE_GROUP,
				payload: data
			});

			dispatch(redirect(`/group/${data.group.groupId}`));
		});
	};
};
