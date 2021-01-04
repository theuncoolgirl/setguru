# setGuru

*By Erin Shields*

Check out a live version of **setGuru** here: [setGuru Live](http://setguru.herokuapp.com)

setGuru is a clone of the website setlist.fm, a site where users can view setlists from various live shows/concerts. The backend of setGuru is built with Express.js with a PostgreSQL database. Frontend rendering is handled with React/Redux.

**Table of Contents**
* [setGuru Overview](#setguru-overview)
* [Installation](#installation)
* [Security & Authorization](#security-and-authorization)
* [Final Thoughts & Next Steps](#final-thoughts-and-next-steps)

## setGuru Overview

setGuru is a full-stack web app that allows users to make an account, find, save, and comment on the setlists of concerts they've attended, as well as view additional information about the relevant artists.

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

## Database Schema
setGuru's backend is built using [Express](https://expressjs.com/), [Sequelize](https://sequelize.org/master/manual/model-querying-basics.html),  and a [PostgreSQL](https://www.postgresql.org/) database.
*Insert Screenshot of Database Schema Here*

## Backend Overview

## Frontend Overview

## Security and Authorization

## Final Thoughts and Next Steps
* Spotify integration
* Suggestive search implementation



