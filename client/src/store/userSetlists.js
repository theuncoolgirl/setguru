const ADD_SETLIST = 'setlistfm/userSetlists/ADD_SETLIST';
const REMOVE_SETLIST = 'setlistfm/userSetlists/REMOVE_SETLIST';
const CHECK_SETLIST = 'setlistfm/userSetlists/CHECK_SETLIST'

const addSetlist = (value) => ({ type: ADD_SETLIST, value })
const removeSetlist = () => ({ type: REMOVE_SETLIST })
const checkSetlist = (value) => ({ type: CHECK_SETLIST, value })

export const actions = {
    addSetlist,
    removeSetlist,
    checkSetlist
};

const createUserSetlist = () => {
    return async (dispatch, getState) => {
        const userId = localStorage.getItem("USERID");
        const { setlist: { setlistId } } = getState();
        const response = await fetch('/api/usersetlists', {
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

const getUserSetlists = async () => {
    const userId = localStorage.getItem("USERID");
    const response = await fetch(`/api/usersetlists/${userId}`)
    try {
        if (response.status >= 200 && response.status < 400) {
            console.log(response.body);
            const data = await response.json();
            return data.userSetlist;
        } else {
            console.error('Bad response');
        }
    } catch (e) {
        console.error(e);
    }
};

const setlistCheck = () => {
    return async (dispatch, getState) => {
        const { setlist: { setlistId } } = getState();
        const listOfSetlists = await getUserSetlists();
        console.log("LIST: ", listOfSetlists);
        const setlistArray = listOfSetlists.map((setlist) => {
            return setlist.setListId
        });
        const hasSetlist = setlistArray.includes(setlistId);
        dispatch(checkSetlist(hasSetlist));
    }
}

const deleteSetlist = () => {
    return async (dispatch, getState) => {
        const userId = localStorage.getItem("USERID");
        const { setlist: { setlistId } } = getState();
        await fetch(`/api/usersetlists/${userId}/${setlistId}`, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
        });
    };
}

export const thunks = {
    createUserSetlist,
    getUserSetlists,
    setlistCheck,
    deleteSetlist
}

const initialState = {};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SETLIST:
            return {
                ...state,
                userSetlists: action.value
            };
        case REMOVE_SETLIST:
            return {
                ...state,
                userSetlists: null
            }
        case CHECK_SETLIST:
            return {
                ...state,
                hasCurrentSetlist: action.value
            };
        default:
            return state;
    }
};

export default reducer;