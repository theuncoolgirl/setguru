const UPDATE_USERNAME_VALUE = 'setlistfm/userprofile/UPDATE_USERNAME_VALUE';
const UPDATE_ATTENDED_CONCERTS = 'setlistfm/userSetlists/UPDATE_ATTENDED_CONCERTS';

const updateUsernameValue = (value) => ({ type: UPDATE_USERNAME_VALUE, value });
const updateAttendedConcerts = (value) => ({ type: UPDATE_ATTENDED_CONCERTS, value });


export const actions = {
    updateUsernameValue,
    updateAttendedConcerts
};

const getUsername = () => {
    return async (dispatch, getState) => {
        const userId = localStorage.getItem("USERID");
        const response = await fetch(`/api/users/${userId}`);
        try {
            if (response.status >= 200 && response.status < 400) {
                const data = await response.json();
                const username = data.user.username;
                dispatch(updateUsernameValue(username));
            } else {
                console.error('Bad response');
            }
        } catch (e) {
            console.error(e);
        }
    }
}

// #1 - Function to generate array of setlistId's associated with User
// WORKING
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

// #2 - Function to retrieve details from setlist.fm from a single setlistId
const getSetlistDetails = async (setlistId) => {
    const response = await fetch('/api/setlist', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ setlistId: setlistId }),
    });
    try {
        if (response.status >= 200 && response.status < 400) {
            const data = await response.json();
            console.log("DATA from getSetlistDetails: ", data)
            return data;
        } else {
            console.error('Bad response');
        }
    } catch (e) {
        console.error(e);
    }
}

// #3 - Function to create array of setlist detail objects, using 1's setlistId 
// array and 2's getSetlistDetails function. 
// ** dispatch finished array to state
// ** incorporate comments at some point 
const getAttendedConcerts = () => {
    return async (dispatch, getState) => {
        const userSetlists = await getUserSetlists();

        const getDetails = await Promise.all(userSetlists.map(async (setlist) => {
            const data = await getSetlistDetails(setlist.setListId);
            const setlistDetails = {};
            const { eventDate, artist, venue } = data.results
            setlistDetails.setListId = setlist.setListId;
            setlistDetails.comments = setlist.comments;
            setlistDetails.date = eventDate;
            setlistDetails.artist = artist.name;
            setlistDetails.venue = venue.name;
            setlistDetails.city = venue.city.name;
            setlistDetails.state = venue.city.stateCode;
            setlistDetails.country = venue.city.country.name;
            return setlistDetails
        }))
        console.log("DETAILS: ", getDetails);
        dispatch(updateAttendedConcerts(getDetails));
    }
}

export const thunks = {
    getAttendedConcerts,
    getUsername
}

const initialState = {};

function reducer(state = initialState, action) {
    switch (action.type) {
        case UPDATE_USERNAME_VALUE:
            return {
                ...state,
                username: action.value
            }
        case UPDATE_ATTENDED_CONCERTS:
            console.log("state updating")
            return {
                ...state,
                attendedConcerts: action.value
            }
        default:
            return state;
    }
};

export default reducer;