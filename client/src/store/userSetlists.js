const ADD_SETLIST = 'setlistfm/userSetlists/ADD_SETLIST';
const REMOVE_SETLIST = 'setlistfm/userSetlists/REMOVE_SETLIST';

const addSetlist = (value) => ({ type: ADD_SETLIST, value })
const removeSetlist = (value) => ({ type: REMOVE_SETLIST, value })

export const actions = {
    addSetlist,
    removeSetlist,
};

const createUserSetlist = () => {
    return async (dispatch, getState) => {
        const userId = localStorage.getItem("USERID");
        const { setlist: { setlistId } } = getState();
        const response = await fetch('/api/setlist', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                userId,
                setlistId
            }),
        });
        try {
            if (response.status >= 200 && response.status < 400) {
                const data = await response.json();
                console.log(data);
                dispatch(addSetlist(setlistId));
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const thunks = {
    createUserSetlist
}

const initialState = [];

function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SETLIST:
            return [...state, action.value]
        default:
            return state;
    }
};

export default reducer;