# Reactify

Reactify is a full-featured e-commerce platform built using the MERN (MongoDB, Express.js, React, Node.js) stack. It provides a seamless shopping experience with authentication, product management, and secure transactions.

## Features
- User authentication with JWT
- Product listing and management
- Shopping cart functionality
- Secure checkout and payment processing
- Order history and user profiles
- Admin panel for managing products and orders
- Responsive UI built with React

## Tech Stack
- **Frontend:** React.js
- **Backend:** Node.js, Express.js
- **Database:** MongoDB (Atlas)
- **Authentication:** JSON Web Token (JWT)

## Installation

### Prerequisites
Ensure you have the following installed:
- **Node.js** (Version: 14)
- **MongoDB** (Atlas or local instance)
- **Git**

### Clone Repository
```bash
git clone https://github.com/yourusername/reactify.git
cd reactify
```

### Install Dependencies
```bash
npm install
```

## Environment Variables
Create a `.env` file in the root directory and add the following variables:
```plaintext
MONGO_URI=your_mongo_connection_string
JWT_SECRET=your_jwt_secret
PORT=5000
```

⚠️ **Important:** Never expose sensitive information in public repositories.

## Running the Application

### Start the Development Server
```bash
npm run dev
```

## Deployment
For production, ensure to build the frontend and serve it with the backend:
```bash
cd frontend
npm run build
mv build ../backend
```
Then, use a process manager like PM2 to run the backend:
```bash
cd backend
npm install -g pm2
pm2 start server.js --name reactify
```

## Git Ignore
Ensure the following files are ignored in `.gitignore`:
```plaintext
.env
/frontend/build
/node_modules
```

## License
This project is licensed under the MIT License.

## Contact
For issues or feature requests, open an issue on GitHub.

