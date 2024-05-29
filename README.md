
# JWT-simple-login-registration

**JWT-simple-login-registration** is a simple login/registration system using JWT for authentication and authorization to access protected URLs.

## Features

- User registration and login
- JWT-based authentication and authorization
- Access to protected URLs
- Secure password hashing with bcrypt
- Environment variable management with dotenv
- Session handling with cookies

## Technologies Used

- **MongoDB** and **Mongoose**: For database management
- **bcrypt**: For secure password hashing
- **dotenv**: For environment variables
- **Cookies**: For session handling
- **JWT (JSON Web Tokens)**: For authentication and authorization
- **Express.js**: For the backend framework
- **Bootstrap**: For a responsive user interface

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/Clickys/JWT-simple-login-registration.git
   cd JWT-simple-login-registration
   ```

2. Install the dependencies:

   ```bash
   npm install
   ```

3. Set up environment variables:

   Create a `.env` file in the root directory and add the following:

   ```env
   MONGO_URI=your_mongodb_uri
   JWT_SECRET=your_jwt_secret
   ```

4. Start the application:

   ```bash
   npm start
   ```

## Usage

- **Registration**: Register a new user by providing a username and password.
- **Login**: Authenticate the user and receive a JWT.
- **Access Protected URLs**: Use the JWT to access protected URLs.

## Contributing


## License

This project is licensed under the MIT License.
