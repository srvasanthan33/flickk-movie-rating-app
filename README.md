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
POST /admin/media/addImage/<movie_id>
```

#### add Movie Video
```
POST /admin/media/addVideo/<movie_id>
```

### User routes
#### add Rating

```
POST /movies/addRating/<movie_id>
```

#### view Movies

```
GET /movies
```

#### view movie by id
```
GET /movies/<movie_id>
```


## Contributing

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License

[MIT](https://choosealicense.com/licenses/mit/)
