const ADD_SETLIST = 'setlistfm/userSetlists/ADD_SETLIST';
const REMOVE_SETLIST = 'setlistfm/userSetlists/REMOVE_SETLIST';
const CHECK_SETLIST = 'setlistfm/userSetlists/CHECK_SETLIST'

const addSetlist = (value) => ({ type: ADD_SETLIST, value })
const removeSetlist = (value) => ({ type: REMOVE_SETLIST, value })
const checkSetlist = (value) => ({ type: CHECK_SETLIST, value })

export const actions = {
    addSetlist,
    removeSetlist,
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
    console.log("Beginning")
    const userId = localStorage.getItem("USERID");
    console.log(userId);
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


export const thunks = {
    createUserSetlist,
    getUserSetlists,
    setlistCheck
}

const initialState = {};

function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_SETLIST:
            return {
                ...state,
                userSetlists: action.value
            };
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