import * as types from '../constants/services';
import history from '../utils/history';

export default function redirect(to) {
    return (dispatch) => {
        history.push(to);
        dispatch({
            type: types.REDIRECT,
            payload: {to}
        });
    };
};