# setGuru

*By Erin Shields*

Check out a live version of **setGuru** here: [setGuru Live](http://setguru.herokuapp.com)

setGuru is a clone of the website Setlist.fm, a site where users can view setlists from various live shows/concerts. The backend of setGuru is built with Express.js with a PostgreSQL database. Frontend rendering is handled with React/Redux. The app leverages the [Setlist.fm API](https://api.setlist.fm/docs/1.0/index.html) to source, search, and display setlist data. 

**Table of Contents**
* [Technologies](#technologies)
* [setGuru Overview](#setguru-overview)
* [Installation](#installation)
* [Application Architecture](#application-architecture)
* [Backend Overview](#backend-overview)
* [Frontend Overview](#frontend-overview)
* [User Authorization](#user-authentication)
* [Known Bug Log](#known-bug-log)
* [Final Thoughts & Next Steps](#final-thoughts-and-next-steps)

## Technologies
* React
* Redux
* Express.js
* Sequelize
* PostgreSQL
* Heroku

## setGuru Overview

setGuru is a full-stack web app that allows users to make an account, find, save, and comment on the setlists of concerts they've attended, as well as view additional information about the relevant artists.

> Curent Status: Ongoing Development

### setGuru in Action:
![seGuru in Action](./client/public/SetGuru-Demo-20210104.gif)

## Installation
1. Clone this repository:
    ```bash
    $ git clone https://github.com/theuncoolgirl/setguru.git
    ```
2. Install npm dependencies:
    ```bash
    $ npm install
    ```
3. Create a **.env** file based on the **.envexample** with proper settings for your development environment.
4. Setup your PostgreSQL user, password and database and make sure it matches your **.env** file with CREATEDB privileges.
5. Migrate and seed your database:
    ```bash
    $ npm run db:migrate
    $ npm rund db:seed:all
    ```
6. For development, you'll need to run `npm start` in both main project directory and client directory so that both frontend and backend servers run (utilizing a proxy server). 
    ```bash
    $ npm start
    $ cd client/
    $ npm start
    ```

## Application Architecture
setGuru is a fullstack application. The majority of its logic occurs within the frontend's Redux store, along with interactions with the Setlist.fm. For the styling of its frontend React components, setGuru utilizes the Material UI framework.

The backend is built with [Express](https://expressjs.com/) and serves the front end, fetches data from the [PostgreSQL](https://www.postgresql.org/) database with [Sequelize](https://sequelize.org/master/manual/model-querying-basics.html), responds to frontend requests, and acts as an intermediary to serve setlist data from the [Setlist.fm API](https://api.setlist.fm/docs/1.0/index.html) via a customized version of the [setlistfm-js](https://www.npmjs.com/package/setlistfm-js) library. 

The database schema is relatively simple as the majority of the setlist data is pulled directly from the Setlist.fm API.

### Database Schema
![seGuru Database Schema](./client/public/datbaseSchema.png)

## Backend Overview
setGuru utilizes an Express server with a PostgreSQL database. The backend server is simple in that it is responsible for serving the frontend, receiving requests and fetching relevant data from the database, and acting as an intermediary between the frontend and the Setlist.fm API (which does not allow for requests to be made by the frontend). 

The setlistfm-js library is used as a wrapper to more easily facilitate calls to the Setlist.fm API. In order to support pagination on the Search Results page, a customization to the library was made in order to pass through 

## Frontend Overview

## User Authentication

## Known Bug Log

## Final Thoughts and Next Steps
* Spotify integration
* Suggestive search implementation



