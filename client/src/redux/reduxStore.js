import {createStore, combineReducers, applyMiddleware} from "redux"
import authReducer from "./authReducer"
import {composeWithDevTools} from 'redux-devtools-extension'
import thunk from "redux-thunk";

const rootReducer = combineReducers({
    auth: authReducer,
})

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)))

// window.store = store
//*  window.store.getState()

store.subscribe(() => console.log('subscribe:', store.getState()))

// export default store
// export RootState = ReturnType<typeof rootReducer>