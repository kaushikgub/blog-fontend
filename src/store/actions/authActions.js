import apiClient from "../../services/api";

export const logIn = (user) => {
    return (dispatch, getState) => {
        //asysc call
        apiClient.post('/login', user).then(res => {
            if (res.data !== 'Unauthenticated') {
                dispatch({
                    type: 'LOG_IN',
                    payload: {
                        user: res.data,
                        message: 'You are loged in',
                        errors: null
                    }
                })
            } else {
                dispatch({
                    type: 'LOG_IN_FAILED',
                    payload: {
                        user: null,
                        message: 'Login Error',
                        errors: null
                    }
                })
            }
        }).catch(err => {
            dispatch({
                type: 'LOG_IN_ERROR',
                payload: {
                    user: null,
                    message: 'Login Error',
                    errors: err.response.data.errors
                }
            })
        })
    }
};

export const logOut = (user) => {
    return (dispatch, getState) => {
        //asysc call
        apiClient.get('/logout').then(res => {
            dispatch({
                type: 'LOG_OUT',
                payload: {
                    user: null,
                    message: 'You are loged out',
                    errors: null
                }
            })
        })
    }
};