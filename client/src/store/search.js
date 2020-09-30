import { setlistfmKey } from '../config';

// state shape
// {
//     searchResults: [
//         // setlist objects  
//     ]
// }

export const fetchSetlists = async (searchTerm, page) => {
    const termEncoded = encodeURIComponent(searchTerm);
    const response = await fetch(`https://api.setlist.fm/rest/1.0/search/artists?artistName=${termEncoded}&p=${page}&sort=relevance`, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'x-api-key': `${setlistfmKey}`,
            // 'Access-Control-Allow-Origin': 'http://localhost:3001'
        },
        // mode: 'no-cors'
    });
}
