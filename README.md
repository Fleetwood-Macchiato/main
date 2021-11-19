# Project Name

//TBD

## Description

Sick of the same Dolce Gusto coffee? Starbucks messed up your order again or you simply want to know wheres the best brew in town? ☕️ Hundreds of options await you in Barcelona and //INSERT PROJECT NAME// will help you source your next favorite spot! Add your favourites ❤️ leave ratings 💯 and filter by preferences 🤓

## User Stories

- **404** - As a user I want to see a nice 404 page when I go to a page that doesn’t exist so that I know it was my fault
- **500** - As a user I want to see a nice error page when the super team screws it up so that I know that is not my fault
- **homepage** - As a user I want to be able to access the homepage so that I can see what the app is about, login and signup
- **sign up** - As a user I want to sign up on the webpage so that I can see all the coffee spots that fit what I'm looking for
- **login** - As a user I want to be able to log in on the webpage so that I can get back to my account and save my favourites and leave reviews
- **logout** - As a user I want to be able to log out from the webpage so that I can make sure no one will access my account
- **cafe list** - As a user I want to see all the coffee spots available so that I can choose which ones I want to watch and add them to my favourites
- **rating create** - As a user I want to create a review so that I can invite let others know my opinion on the cafe
- **edit user** - As a user I want to be able to edit my profile.
- **results listing** - As a user I want to see the cafe details and the typical drinks, location, price level so that I can decide if I want to check it out or not based on my preferences

## Backlog

List of other features outside of the MVPs scope

TBD

## ROUTES:

- GET /
  - renders the homepage
- GET /auth/signup
  - redirects to / if user logged in
  - renders the signup form (with flash msg)
- POST /auth/signup
  - redirects to / if user logged in
  - body:
    - username (TBD IF NECESSARY - for leaving reviews?)
    - email
    - password
- GET /auth/login
  - redirects to / if user logged in
  - renders the login form (with flash msg)
- POST /auth/login
  - redirects to / if user logged in
  - body:
    - username
    - password
- POST /auth/logout

  - body: (empty)

- GET /coffee-spots
  - renders the cafe list + add to favorites function
- POST /coffee-spot/create-rating
  - redirects to / if user is anonymous
  - body:
    - cafe name
    - rating/review
- GET /cafe/:id
  - renders the cafe detail page
  - includes the list of drinks, location, price points
  - add to favourites button & leave rating/create review buttom
- POST /cafe/:id/rating
  - redirects to / if user is anonymous
  - body: (empty - the user is already stored in the session)

## Models

User model

```
{
username: String,
email: String,
password: String,

}

Favorites model
{
cafeId: String,
favorite: Boolean,
}

```

Ratings model
{
cafeId: String,
rating: Number,

}

```


## Links

### Trello

[Link to your trello board](https://trello.com) or picture of your physical board

### Git

The url to your repository and to your deployed project

[Repository Link](http://github.com)

[Deploy Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)
```
