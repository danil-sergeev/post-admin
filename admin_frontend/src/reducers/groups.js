import { combineReducers } from 'redux';
import * as types from '../constants/groups';

const initialState = {
	activeGroup: '',
	groups: []
};

const activeGroup = (state = initialState.activeGroup, action) => {
    switch(action.type) {
        case types.SET_ACTIVE_GROUP:
            return getGroupId(action.payload.group);
        case types.UNSET_ACTIVE_GROUP:
            return null
        default:
            return state;
    }
};


const groups = (state = initialState.groups, action) => {
	console.log(action);
	switch (action.type) {
		case types.FETCH_GROUPS_SUCCESS:
			return {
				groups: action.payload.groups
			};
		default:
			return state;
	}
};

export default combineReducers({
    activeGroup,
	groups
});


export const getGroupId = (group) => group.groupId;