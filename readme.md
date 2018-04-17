# Refactor Mongoose code
* Create a models directory
* Use module.exports
* Require everything correctly

# Add Seeds File
* Add a seeds.js file
* Run the seeds file everytime the server starts

# Add the Comment model
* Make our errors go away
* Display comments on campground show page

# Comment New / Create
* Discuss nested routes
* Add the comment new and create routes
* Add the new comment form

# Style Campground Show Page
* Add sidebar to show page
* Display comments nicely

# Finish Styling Show Page
* Add public directory
* Add custom stylesheet

# Auth Pt. 1 - Add User Model
* Install all packages needed for auth
* Define User model

# Auth Pt. 2 - Register / Signup
* Configure Passport
* Add register routes
* Add register template

# Auth Pt. 3 - Login
* Add login routes
* Add login template

# Auth Pt. 4 - Logout/Navbar
* Add logout route
* Prevent user from adding a comment if not signed in
* Add links to navbar

# Auth Pt. 5 - Show/Hide navbar links
* Show/hide auth links correctly

# Refactor the Routes
* Use Express router to reorganize all routes

# Users + Comments
* Associate users and comments
* Save author's name to a comment automatically

# Users + Campgrounds
* Prevent an unauthenticated user from creating a campground
* Save username+id to newly created campground

# Editing Campgrounds
* Add Method-Override
* Add Edit Route for Campgrounds
* Add Link to Edit Page
* Add Updae Route
* Fit $set problem

# Deleting Campgrounds
* Add Destroy Route
* Add Delete button

# Authorization Part 1: Campgrounds
* User can only edit his/her campgrounds
* User can only delete his/her campgrounds
* Hide/Show edit and delete buttons

# Editing Comments
* Add Edit route for comments
* Add Edit button
* Add Update route

Campground Edit Route: /campgrounds/:id/edit
Comment Edit Router: /campgrounds/:id/comments/:comment_id/edit

# Deleting Comments
* Add Destroy route
* Add Delete button

Campground Destroy Route: /campgrounds/:id
Comment Destroy Route: /campgrounds/:id/comments/:comment_id

# Authorization Part 2: Comments
* User can only edit his/her comments
* User can only delete his/her comments
* Hide/Show edit and delete buttons
* Refactor Middleware

# Adding in Flash!
* Install and configure connect-flash
* Add bootstrap alerts to header

# Set up separate Development(local) & Production(online) Database

# Updating Login and Signup page
# Updating Navbar for mobile responsive

# Adding Google Maps
* Sign up for Google Developer account
* Get Google Maps API key
* Get Geocoding API key and enable it
* Add Google Maps scripts to application
* Update models, views and routes

# Install Moment JS
* Time since created for comments