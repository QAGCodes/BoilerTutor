
import React, {useReducer} from 'react';

// Auth context object
// users: list of registered users
// user: currently logged in user
// authenticated: boolean indicating 
const initialState = {
    user: null,
    authenticated: false
}

// Dispatch types (for the reducer function)
const LOGIN = 'LOGIN';
const LOGOUT = 'LOGOUT';
const REGISTER = 'REGISTER';

const AuthContext = React.createContext(initialState);

const reducer = (state, action) => {
    switch (action.type) {
        case LOGIN:
            return {...state, user: action.payload, authenticated: true};

        case LOGOUT:
            return {...state, user: null, authenticated: false};

        case REGISTER:
            let newUsers = [...state.users]
            newUsers.push(action.payload)
            console.log(newUsers);
            return {user: action.payload, authenticated: true, users: newUsers};

        default:
            return state;

    }
}

export const AuthProvider = (props) => {
   const [state, dispatch] = useReducer(reducer, initialState);


    const login = (user) => {
        let userExists = false;
        let userInList = null;
        for (let i = 0; i < state.users.length; i++) {
            let element = state.users[i];
            if (element.email === user.email) {
                userExists = true;
                userInList = element;
            }
        }
        if (userExists) {
            if (user.password === userInList.password) {
                dispatch({type: LOGIN, payload: userInList});
            }
            else {
                console.log("wrong password");
                alert("wrong password");  
            }
            
        }
        else {
            console.log("user not found");
            alert("user not found");
        }

    }

    const logout = () => {
        dispatch({ type: LOGOUT });
    }
    

    const register = (user) => {
        let userExists = false;
        for (let i = 0; i < state.users.length; i++) {
            let element = state.users[i];
            if (element.email === user.email) {
                userExists = true;
            }
        }
        if (userExists) {
            console.log("user exists");
            alert("User exists");
        }
        else {
            dispatch({type: REGISTER, payload: user});
        }
        
    }



    return (
        <AuthContext.Provider value={{ state: state, login: login, logout: logout, register: register }}>
            {props.children}
        </AuthContext.Provider>
    );
 
}

export default AuthContext