const ADD_SETLIST = 'setlistfm/userSetlists/ADD_SETLIST';
const REMOVE_SETLIST = 'setlistfm/userSetlists/REMOVE_SETLIST';
const CHECK_SETLIST = 'setlistfm/userSetlists/CHECK_SETLIST';
const UPDATE_COMMENTS = 'setlistfm/userSetlists/UPDATE_COMMENTS';
const UPDATE_NEW_COMMENT_VALUE = 'setlistfm/userSetlists/UPDATE_NEW_COMMENT_VALUE';

const addSetlist = (value) => ({ type: ADD_SETLIST, value });
const removeSetlist = () => ({ type: REMOVE_SETLIST });
const checkSetlist = (value) => ({ type: CHECK_SETLIST, value });
const updateComments = (value) => ({ type: UPDATE_COMMENTS, value });
const updateNewCommentValue = (value) => ({ type: UPDATE_NEW_COMMENT_VALUE, value });

export const actions = {
    addSetlist,
    removeSetlist,
    checkSetlist,
    updateComments,
    updateNewCommentValue,
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
                await response.json();
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

const getComments = () => {
    return async (dispatch, getState) => {
        const { setlist: { setlistId } } = getState();
        const response = await fetch(`/api/usersetlists/comments/${setlistId}`);
        try {
            if (response.status >= 200 && response.status < 400) {
                const data = await response.json();
                const comments = data.comments.map(comment => {
                    return {
                        userId: comment.User.id,
                        username: comment.User.username,
                        comment: comment.comments
                    }
                })
                dispatch(updateComments(comments));
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    }
}

const addComment = () => {
    return async (dispatch, getState) => {
        const userId = localStorage.getItem("USERID");
        const { setlist: { setlistId }, userSetlists: { newComment } } = getState();
        const response = await fetch(`/api/usersetlists/${userId}/${setlistId}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                newComment
            }),
        });
        try {
            if (response.status >= 200 && response.status < 400) {
                await response.json();
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const thunks = {
    createUserSetlist,
    getUserSetlists,
    setlistCheck,
    deleteSetlist,
    getComments,
    addComment,
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
            };
        case CHECK_SETLIST:
            return {
                ...state,
                hasCurrentSetlist: action.value
            };
        case UPDATE_COMMENTS:
            return {
                ...state,
                comments: action.value
            };
        case UPDATE_NEW_COMMENT_VALUE:
            return {
                ...state,
                newComment: action.value
            };
        default:
            return state;
    }
};

export default reducer;