const { combineReducers } = require("redux");
const { default: authReducer } = require("./authReducer");

const rootReducer = combineReducers({
    auth: authReducer
})

export default rootReducer;