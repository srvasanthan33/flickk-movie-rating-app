# Flickk-movie-rating-backend App

This project is a movie rating backend application built using Node.js, Express.js, and MongoDB. It allows administrators to manage movies and media (images and videos), and normal users to view movies and add ratings.

## Features

- **Admin Routes**:
  - Add, update, and delete movies
  - Upload images and videos for movies

- **User Routes**:
  - View list of movies
  - Add ratings to movies

- **Media Management**:
  - Store and retrieve movie thumbnails and videos

## Installation

After downloading the file, install node_modules for the project 

```bash
npm install
```

Setting Environment variables

```bash
PORT=5500
MONGO_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
```

Start the sever 

```
npm run devStart
```


## Usage
### Home
#### View All Movie Details

```
GET /api/v1/flickk
```

#### View Movie By Id

```
GET /api/v1/flickk/<movie_id>
```

#### view Thumbnail
```
GET /api/v1/flickk/thumbnail/<movie_id>
```

#### view Video
```
GET /api/v1/flickk/video/<movie_id>
```
### Authentication 
#### Login
```
POST /api/v1/auth/login
```
#### Signup
```
POST /api/v1/auth/signup
```
#### Logout
```
POST /api/v1/auth/logout
```

### Admin Routes
#### Add Movie
```
POST /api/v1/admin/addMovie
```
Movie details are sent via req body

#### Update Movie
```
PATCH /api/v1/admin/updateMovie/<movie_id>
```
Movie details are sent via req body

#### delete Movie
```
DELETE /api/v1/admin/deleteMovie/<movie_id>
```

#### add Movie Thumbnail
```
POST /api/v1/admin/media/addImage/<movie_id>
```

#### add Movie Video
```
POST /api/v1/admin/media/addVideo/<movie_id>
```

### User routes
#### add Rating

```
POST api/v1/movies/addRating/<movie_id>
```

#### view Movies

```
GET api/v1/movies
```

#### view movie by id
```
GET api/v1/movies/<movie_id>
```



## Contributing
You are welcome to contribute on this project   
