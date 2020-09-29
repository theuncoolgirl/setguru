const UPDATE_EMAIL_VALUE = 'setlistfm/auth/UPDATE_EMAIL_VALUE';
const UPDATE_PASSWORD_VALUE = 'setlistfm/auth/UPDATE_PASSWORD_VALUE';
const UPDATE_TOKEN_VALUE = 'setlistfm/auth/UPDATE_TOKEN_VALUE';
const DELETE_TOKEN = 'setlistfm/auth/DELETE_TOKEN';

const updateEmailValue = value => ({ type: UPDATE_EMAIL_VALUE, value });
const updatePasswordValue = value => ({ type: UPDATE_PASSWORD_VALUE, value });
const updateTokenValue = value => ({ type: UPDATE_TOKEN_VALUE, value });
const deleteToken = () => ({ type: DELETE_TOKEN });

export const actions = {
    updateEmailValue,
    updatePasswordValue,
    updateTokenValue,
    deleteToken
};

const tryLogin = () => {
    return async (dispatch, getState) => {
        // get email and password from the state
        const { auth: { email, password } } = getState();
        console.log(email, password);
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
                console.log(data);
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    };
};

const logout = () => (dispatch, getState) => {
    window.localStorage.removeItem('SETLIST_TOKEN');
    dispatch(deleteToken());
}


export const thunks = {
    tryLogin,
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
        case DELETE_TOKEN:
            return {
                ...state,
                token: ''
            }
        default:
            return state;
    }
};

export default reducer;