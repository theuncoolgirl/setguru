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
        const response = await fetch('/api/search', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ searchQuery }),
        });
        try {
            if (response.status >= 200 && response.status < 400) {
                const data = await response.json();
                dispatch(receiveSetlists(data));
                // TODO: REDIRECT TO SEARCH RESULTS PAGE
                // window.location.href = '/search';
                // TODO: THINK ABOUT MAKING SEARCH RESULTS DYNAMIC
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const thunks = {
    getSetlists
}

const initialState = {
    setlists: null,
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SEARCH_VALUE:
            return {
                ...state,
                searchQuery: action.value
            }
        case RECEIVE_SETLISTS:
            return {
                ...state,
                setlists: action.value
            }
        default:
            return state;
    }
};

export default reducer;