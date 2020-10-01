const UPDATE_SEARCH_VALUE = 'setlistfm/search/UPDATE_SEARCH_VALUE'
const RECEIVE_SETLISTS = 'setlistfm/search/RECEIVE_SETLISTS'

const receiveSetlists = value => ({ type: RECEIVE_SETLISTS, value });
const updateSearchValue = value => ({ type: UPDATE_SEARCH_VALUE, value });

export const actions = {
    receiveSetlists,
    updateSearchValue
};

const getSetlists = () => {
    return async (dispatch, getState) => {
        const { search: { searchQuery } } = getState();
    }
}

// const trySignup = () => {
//     return async (dispatch, getState) => {
//         // get username, email, and password from the state
//         const { auth: { username, email, password } } = getState();
//         // AJAX call POST request to create new User
//         const response = await fetch('/api/users', {
//             method: 'POST',
//             headers: { 'Content-Type': 'application/json' },
//             body: JSON.stringify({ username, email, password }),
//         });
//         try {
//             if (response.status >= 200 && response.status < 400) {
//                 const data = await response.json();
//                 console.log(data);
//                 window.location.href = '/login';
//             } else {
//                 console.error('Bad response');
//             }
//         } catch (e) {
//             console.error(e);
//         }
//     }
// }

export const thunks = {
    getSetlists
}

const initialState = {
    setlists: {},
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SEARCH_VALUE:
            return {
                ...state,
                searchQuery: action.value
            }
        case RECEIVE_SETLISTS:
        // return {
        //     ...state,
        //     setlists
        // }
        default:
            return state;
    }
};

export default reducer;