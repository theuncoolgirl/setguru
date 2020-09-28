# FEATURES & User Stories
I will be cloning the setlist.fm site for my React/Redux Solo Project, leveraging the Setlist FM API, with the intention of eventually leveraging the Spotify API to integrate a feature where a user can generate a Spotify playlist within the app based on a particular setlist or group of selected songs. 

MVP Features, User Stories, and Data Schema are outlined below, along with some stretch goals/features that I hope to eventually incorporate (including the Spotify API integration).  

## Features - MVP
- [ ] Landing page/homepage that includes information about the site and link to signup/login.
- [ ] Authentication - sign up with username/email/password, login/logout, demo user login. Search functionality will be available w/o login, but if user tries to navigate to protected portions of site, will be redirected to login/signup. 
- [ ] Search setlists by Artist, Venue, Location, and filter results by a number of additional parameters
- [ ] Setlist detail page that contains details of show/setlist. Logged in users can add the concert/setlist to their list of concerts.
- [ ] Ability to add/remove/edit setlists to user's list of setlists with comments. 
- [ ] User/Profile Page that contains list of setlist/concerts attended.

## Backlog
- [ ] Artist setlist page that contains list of related setlists and statistics such as "most played songs". 
- [ ] Ability to generate playlist from "most played songs"
- [ ] Ability to generate Spotify playlists with Spotify's API
- [ ] Link to Youtube video next to songname
- [ ] Song Details Page
- [ ] Generate an "Average Setlist" by year.
- [ ] View upcoming events near you on a map using Google Map API
- [ ] "Songs on Albums" graphical representation on Setlist Details page

## User Stories
1. As an unauthorized user, I want to view a landing page that provides me with information about the site, and a search bar as a starting point to my navigation. 
    - Acceptance Criteria:
        - [ ] User can visit the `/` path and will be served a homepage/landing page that provides information about the site, a navigation bar & search bar, and links to log-in or sign-up.
1. As an unauthorized user, I want to be able to sign up for the website via a signup form in order to access protected content. 
    - Acceptance Criteria:
        - [ ] User can visit the `/sign-up` path and will be served a form asking for a username, email, and password.  
        - [ ] After user enters valid information for all fields, a new user row is added to the User table, and user is directed to a login page. 
        - [ ] If a user enters invalid sign-up information, they receive a message specific to the information that is incorrect. 
        - [ ] If a user enters an email that is already in use for another user, they receive a message indicating such, with a link to `/log-in`
        - [ ] Session should last 1 day
        - [ ] Use auth with JWT from Redux example
1. As an unauthorized user, I want to be able to login to the website, via a form, in order to access my private information.
    - Acceptance Criteria
        - [ ] User can visit the `/login` path and will be served a form requesting email and password, along with link to sign-up page. 
        - [ ] After user enters valid login information, the user is redirected to their user detail page at `/users/${userId}`.
        - [ ] After user successfully logs in, a session is created with the necessary cookies/etc. 
        - [ ] If a user enters incorrect log-in information, they receive an error message.
1. As an authorized user, I want to be able to log out of the application in order to protect my private information. 
    - Acceptance Criteria
        - [ ] From any page on the site, the user can click a "Log out" link, which will manually delete their session cookie (logging them out), and redirecting them to the `/` homepage.
1. As an unauthorized user, I want a clear and consistent way to navigate across the site. 
    - Acceptance Criteria
        - [ ] Every page has a consistent navigation display containing:
            - Login/Logout button depending on login status
            - Search Bar
            - User Profile Page
            - Homepage `/`
1. As an unauthorized user, I want to be able to search for a show by artist name, venue name, or location, so that I can view the associated setlist and songs on that setlist. 
    - Acceptance Criteria
        - [ ] User can use search bar at the top of each page to search for setlists by artist name, venue name, location and be directed to a page listing the search results. 
        - [ ] Search results will be served at `/search?query=${searchTerm}`. 
        - [ ] User can view the date, artist, venue, location, and first X songs of setlist for each search result. 
        - [ ] Search results will be ordered by date, descending. 
        - [ ] Search results will be limited to 10 setlists per page. 
        - [ ] User can further filter search results on search results page by artist, country, venue, and year. 
1. As an unauthorized user, I want to be able to navigate to an artist-specific page so that I can view all setlists by that artist. 
    - Acceptance Criteria
        - [ ] User can visit `/setlists/${artistId}` pages to view setlist filtered to a specific artist. 
        - [ ] Results will be presented in similar manner to those on search results page. 
1. As an authorized user, I want to be able to indicate that I have attended a specific show, so that I can view a collection of shows that I have attended. 
    - Acceptance Criteria
        - [ ] User can click on a "I was there!" button on a Setlist Detail Page `/setlists/${setlistId}`, which will prompt them to add a comment. Upon submit, a corresponding row to the "Setlists" database table will be added. 
        - [ ] Once a user clicks on the "I was there" button, it will update to a "I wasn't there" button that the user can click on to delete that record from the table. 
        - [ ] The total number of users who attended the show will be displayed on the Setlist Detail page, and when a user adds themselves to a show/setlist, the total number of users who have attended the show will update. 
        - [ ] User can view a list of all attended events and their comments on the User Profile page at `/users/${userId}`. If the profile page is for the user who is logged in, they will be able to remove themselves from the show. 
1. As an authorized user, I want to be able to view user's profile pages so that I can see what concerts they have attended and what artists they like. 
    - Acceptance Criteria
        - [ ] User can visit `/users/${userId}` to view the details page of a specific user, including their attended concerts, favorite artists, and date they joined the site. 
        - [ ] If a user is viewing their own profile page, they will have the option of removing a concert/setlist from their list of conerts/setlists. 


## Data Schema
Most data for the setlist.fm clone will be pulled from the setlist.fm API, but app will require the following data to be stored in its database:

1. Users
    - username
    - email
    - password hash
1. Setlists
    - userId (belongsTo Users.id)
    - setlistId (from setlist.fm API)
    - comments
    - isStarred
1. [Optional] Playlists
    - userId (belongsTo Users.id)
    - title
    - playlistId (from spotify API)

## Paths
- `/` Home/Landing Page
- `/signup` Signup Page
- `/login` Login Page
- `/logout` Link to Logout, redirects to homepage
- `/search?query=${searchTerm}` Search Results
- `/setlists/${setlistId}` Individual Setlist Page
- `/users/${userId}` User Profile Page
- `/setlists/${artistId}` Setlists by Artists [optional]
- `/setlists/${venueId}` Setlists by Venue [optional]
- `/artists/${artistId}` Artist Detail Page [optional]

## Components
TBD