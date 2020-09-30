import { setlistfmKey } from '../config/index';
import setlistfm from 'setlistfm-js';

const setlistfmClient = new setlistfm({
    key: setlistfmKey,
    format: "json",
    language: "en",
    itemsPerPage: 5,
});

const searchResults = (searchTerm, page) => {
    return setlistfmClient.searchSetlists({
        artistName: searchTerm
    }, page)
        .then(function (results) {
            console.log(results)
            return results
        })
        .catch(function (error) {
            return error
        });
}

// searchResults(`The Flatliners`, `2`);

module.exports = searchResults;