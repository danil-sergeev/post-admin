import * as types from '../constants/auth';
import requestApi from '../utils/request';
import redirect from './services';

export const vkAuth = () => {
    return (dispatch) => {
        dispatch({
            type: types.VK_AUTH_REQUEST
        });

        return requestApi('api/v1/oauth/vk/callback')
            .then(response => {
                const {user} = response;

                // if (!user.isAllowed) {
                //     dispatch({
                //         type: types.VK_AUTH_FAILURE,
                //         payload: 'Your account is not activated'
                //     });
                // };
                console.log(user);

                localStorage.setItem('token', user.accessToken);

                dispatch({
                    type: types.VK_AUTH_SUCCESS,
                    payload: user
                });

            })
            .catch(reason => dispatch({
                type: types.VK_AUTH_FAILURE,
                payload: reason
            }));
    };
};

export const logout = () => {
    return (dispatch) => {
        
        dispatch({
            type: types.LOGOUT_REQUEST
        });

        return requestApi('api/v1/logout')
            .then(response => {
                localStorage.removeItem('token');
                dispatch({
                    type: types.LOGOUT_SUCCESS,
                    payload: response
                });
            })
            .catch(reason => dispatch({
                type: types.LOGOUT_FAILURE,
                payload: reason
            }));
    };
};

export const recieveAuth = () => {
    return (dispatch, getState) => {
        const {token} = getState().auth;


        if (!token) {
            dispatch({
                type: types.RECIEVE_AUTH_FAILURE
            });
        };
        

        return requestApi('api/v1/users/me')
            .then(json => {
                dispatch({
                    type: types.RECIEVE_AUTH_SUCCESS,
                    payload: json,
                });
            })
            .catch(reason => dispatch({
                type: types.RECIEVE_AUTH_FAILURE,
                payload: reason
            }));
    };
};