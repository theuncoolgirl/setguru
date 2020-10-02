const UPDATE_SETLISTID_VALUE = 'setlistfm/setlist/UPDATE_SETLISTID_VALUE';
const RECEIVE_SETLIST_DETAILS = 'setlistfm/setlist/RECEIVE_SETLIST_DETAILS';

const updateSetlistidValue = value => ({ type: UPDATE_SETLISTID_VALUE, value });
const receiveSetlistDetails = value => ({ type: RECEIVE_SETLIST_DETAILS, value });

export const actions = {
    updateSetlistidValue,
    receiveSetlistDetails,
};

const getSetlist = () => {
    return async (dispatch, getState) => {
        const { setlist: { setlistId } } = getState();
        const response = await fetch('api/setlist', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ setlistId }),
        });
        try {
            if (response.status >= 200 && response.status < 400) {
                const data = await response.json();
                dispatch(receiveSetlistDetails(data));
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    }
}

export const thunks = {
    getSetlist,
}

const initialState = {
    setlistId: null
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_SETLISTID_VALUE:
            return {
                ...state,
                setlistId: action.value
            };
        case RECEIVE_SETLIST_DETAILS:
            return {
                ...state,
                setlistDetails: action.value
            }
        default:
            return state;
    }
};

export default reducer;