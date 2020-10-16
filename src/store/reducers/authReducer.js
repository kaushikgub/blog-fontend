const authReducer = (state = {}, action) => {
    switch (action.type) {
        case 'LOG_IN':
            return {
                ...state,
                auth: action.payload
            }

        case 'LOG_IN_ERROR':
            return {
                ...state,
                auth: action.payload
            }

        case 'LOG_IN_FAILED':
            return {
                ...state,
                auth: action.payload
            }

        case 'LOG_OUT':
            return {
                ...state,
                auth: null
            }
        default:
            return state;
    }
}

export default authReducer;