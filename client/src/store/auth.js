const UPDATE_EMAIL_VALUE = 'setlistfm/auth/UPDATE_EMAIL_VALUE';
const UPDATE_PASSWORD_VALUE = 'setlistfm/auth/UPDATE_PASSWORD_VALUE';
const UPDATE_TOKEN_VALUE = 'setlistfm/auth/UPDATE_TOKEN_VALUE';
const UPDATE_USERNAME_VALUE = 'setlistfm/auth/UPDATE_USERNAME_VALUE';
const DELETE_TOKEN = 'setlistfm/auth/DELETE_TOKEN';
const POP_DEMO_USER = 'setlistfm/auth/POP_DEMO_USER'

const updateEmailValue = value => ({ type: UPDATE_EMAIL_VALUE, value });
const updatePasswordValue = value => ({ type: UPDATE_PASSWORD_VALUE, value });
const updateTokenValue = value => ({ type: UPDATE_TOKEN_VALUE, value });
const updateUsernameValue = value => ({ type: UPDATE_USERNAME_VALUE, value });
const deleteToken = () => ({ type: DELETE_TOKEN });
const popDemoUser = () => ({ type: POP_DEMO_USER });

export const actions = {
    updateEmailValue,
    updatePasswordValue,
    updateTokenValue,
    updateUsernameValue,
    deleteToken,
    popDemoUser,
};

const tryLogin = () => {
    return async (dispatch, getState) => {
        // get email and password from the state
        const { auth: { email, password } } = getState();
        // AJAX call PUT request to check login information
        const response = await fetch('/api/session', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        try {
            if (response.status >= 200 && response.status < 400) {
                const data = await response.json();
                dispatch(updateTokenValue(data.token));
                window.localStorage.setItem('SETLIST_TOKEN', data.token);
                window.localStorage.setItem('USERID', data.userId)
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    };
};

const trySignup = () => {
    return async (dispatch, getState) => {
        // get username, email, and password from the state
        const { auth: { username, email, password } } = getState();
        // AJAX call POST request to create new User
        const response = await fetch('/api/users', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, email, password }),
        });
        try {
            if (response.status >= 200 && response.status < 400) {
                await response.json();
                window.location.href = '/login';
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    }
}

const logout = () => (dispatch, getState) => {
    window.localStorage.removeItem('SETLIST_TOKEN');
    dispatch(deleteToken());
}

export const thunks = {
    tryLogin,
    trySignup,
    logout
}

const initialState = {
    token: "",
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_EMAIL_VALUE:
            return {
                ...state,
                email: action.value
            }
        case UPDATE_PASSWORD_VALUE:
            return {
                ...state,
                password: action.value
            }
        case UPDATE_TOKEN_VALUE:
            return {
                ...state,
                token: action.value
            }
        case UPDATE_USERNAME_VALUE:
            return {
                ...state,
                username: action.value
            }
        case DELETE_TOKEN:
            return {
                ...state,
                token: ''
            }
        case POP_DEMO_USER:
            return {
                ...state,
                email: 'demo@example.com',
                password: 'password'
            }
        default:
            return state;
    }
};

export default reducer;